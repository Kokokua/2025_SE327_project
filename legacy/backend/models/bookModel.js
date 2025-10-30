const db = require('../db');

async function getBooksByTags(tags = []) {
  let query = `
    SELECT b.*, 
      (
        SELECT JSON_ARRAYAGG(name) 
        FROM tags t
        JOIN book_tags bt ON t.id = bt.tag_id
        WHERE bt.book_id = b.id
      ) AS tags
    FROM books b
  `;
  let queryParams = [];

  if (tags.length > 0) {
    query += `
      WHERE EXISTS (
        SELECT 1 FROM book_tags bt
        JOIN tags t ON bt.tag_id = t.id
        WHERE bt.book_id = b.id
        AND t.name IN (?)
        GROUP BY bt.book_id
        HAVING COUNT(DISTINCT t.name) = ?
      )
    `;
    queryParams.push(tags, tags.length);
  }
  const [rows] = await db.query(query, queryParams);
  return rows;
}

async function createBook({ title, seller, description, price, discounted_price, tags = [], image }) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    if (tags.length > 0) {
      const [existingTags] = await connection.query(
        'SELECT name FROM tags WHERE name IN (?)',
        [tags]
      );
      
      const existingTagNames = existingTags.map(t => t.name);
      const invalidTags = tags.filter(t => !existingTagNames.includes(t));
      
      if (invalidTags.length > 0) {
        throw new Error(`Invalid tags: ${invalidTags.join(', ')}`);
      }
    }

    // Insert book with image
    const [bookResult] = await connection.query(
      `INSERT INTO books 
       (title, seller, description, price, discounted_price, image) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        seller,
        description,
        parseFloat(price),
        discounted_price ? parseFloat(discounted_price) : null,
        image || null
      ]
    );
    const bookId = bookResult.insertId;

    if (tags.length > 0) {
      const [tagIds] = await connection.query(
        'SELECT id FROM tags WHERE name IN (?)',
        [tags]
      );
      
      await connection.query(
        'INSERT INTO book_tags (book_id, tag_id) VALUES ?',
        [tagIds.map(t => [bookResult.insertId, t.id])]
      );
    }

    await connection.commit();
    return bookId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function updateBookImage(id, image) {
  const connection = await db.getConnection();
  try {
    await connection.query(
      'UPDATE books SET image = ? WHERE id = ?',
      [image, id]
    );
  } finally {
    connection.release();
  }
}

async function deleteBook(id) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    const [orders] = await connection.query(
      'SELECT DISTINCT order_id FROM order_items WHERE book_id = ?',
      [id]
    );
    const orderIds = orders.map(o => o.order_id);

    await connection.query('DELETE FROM books WHERE id = ?', [id]);

    if (orderIds.length > 0) {
      for (const orderId of orderIds) {
        const [result] = await connection.query(
          `SELECT SUM(price_at_purchase * quantity) AS newTotal 
           FROM order_items 
           WHERE order_id = ?`,
          [orderId]
        );
        
        const newTotal = result[0].newTotal || 0;
        
        await connection.query(
          'UPDATE orders SET total_price = ? WHERE id = ?',
          [newTotal, orderId]
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function updateBook(id, { title, seller, description, price, discounted_price, tags, image }) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Dynamically build update query
    let updateFields = ['title = ?', 'seller = ?', 'description = ?', 'price = ?', 'discounted_price = ?'];
    let queryParams = [title, seller, description, parseFloat(price), discounted_price ? parseFloat(discounted_price) : null];

    if (image !== undefined) {
      updateFields.push('image = ?');
      queryParams.push(image);
    }

    queryParams.push(id);

    await connection.query(
      `UPDATE books SET ${updateFields.join(', ')} WHERE id = ?`,
      queryParams
    );


    if (tags !== undefined) {
      const uniqueTags = [...new Set(tags)];

      if (uniqueTags.length > 0) {
        const [existingTags] = await connection.query(
          'SELECT id, name FROM tags WHERE name IN (?)',
          [uniqueTags]
        );

        const existingTagNames = existingTags.map(t => t.name);
        const missingTags = uniqueTags.filter(t => !existingTagNames.includes(t));
        if (missingTags.length > 0) {
          throw new Error(`Invalid tags: ${missingTags.join(', ')}`);
        }

        const tagIds = existingTags.map(t => t.id);

        await connection.query('DELETE FROM book_tags WHERE book_id = ?', [id]);

        const values = tagIds.map(tagId => [id, tagId]);
        await connection.query(
          'INSERT INTO book_tags (book_id, tag_id) VALUES ?',
          [values]
        );
      } else {
        await connection.query('DELETE FROM book_tags WHERE book_id = ?', [id]);
      }
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function getBookById(id) {
  const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { getBooksByTags, createBook, deleteBook, updateBook, getBookById, updateBookImage};