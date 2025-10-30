const db = require('../db'); 

class Order {
  // Create a new order with transaction
  static async createOrder(userId, items, totalPrice) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Create order
      const [orderResult] = await connection.query(
        'INSERT INTO orders (user_id, total_price) VALUES (?, ?)',
        [userId, totalPrice]
      );
      const orderId = orderResult.insertId;

      // Add order items
      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase) ' +
          'VALUES (?, ?, ?, (SELECT COALESCE(discounted_price, price) FROM books WHERE id = ?))',
          [orderId, item.bookId, item.quantity, item.bookId]
        );
      }

      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Get orders by user
  static async getOrdersByUser(userId) {
    const [orders] = await db.query(`
      SELECT o.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'book_id', oi.book_id,
            'title', b.title,
            'quantity', oi.quantity,
            'price', oi.price_at_purchase
          )
        ) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN books b ON oi.book_id = b.id
      WHERE o.user_id = ?
      GROUP BY o.id
    `, [userId]);

    return orders;
  }

  static async deleteOrder(orderId) {
    await db.query('DELETE FROM orders WHERE id = ?', [orderId]);
  }
}

module.exports = Order;