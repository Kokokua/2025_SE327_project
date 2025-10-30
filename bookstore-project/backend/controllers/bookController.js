const bookModel = require('../models/bookModel');
const path = require('path');
const fs = require('fs').promises;
const imagesDir = path.join(__dirname, '../public/images');
const db = require('../db');

(async () => {
  try {
    await fs.mkdir(imagesDir, { recursive: true });
    console.log(`Images directory created at: ${imagesDir}`);
  } catch (err) {
    console.error('Error creating images directory:', err);
  }
})();

async function getBooks(req, res) {
  try {
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const rows = await bookModel.getBooksByTags(tags);

    // Process image URLs
    const booksWithImages = rows.map(book => {
      let imageUrl = null;
      if (book.image) {
        const cleanFilename = book.image.replace(/^.*[\\\/]/, '').replace(/[^a-zA-Z0-9._-]/g, '');
        imageUrl = `/images/${cleanFilename.toLowerCase()}`;
      }
      return {
        ...book,
        image: imageUrl,
        price: parseFloat(book.price),
        discounted_price: book.discounted_price ? parseFloat(book.discounted_price) : null
      };
    });

    res.json(booksWithImages);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({
      error: 'Failed to fetch books',
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
}

async function checkImages(req, res) {
  const fs = require('fs');
  try {
    // Query images from books table
    const [books] = await require('../db').query('SELECT image FROM books');
    const missing = await Promise.all(
      books.map(async (book) => {
        const filename = `public/images/${book.image}`;
        const exists = await fs.promises.access(filename)
          .then(() => true)
          .catch(() => false);
        return exists ? null : book.image;
      })
    );

    res.json({
      totalImages: books.length,
      missingImages: missing.filter(Boolean),
      existingImages: books.length - missing.filter(Boolean).length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addBook(req, res) {
  let tempImagePath = null;
  try {
    if (req.file) {
      tempImagePath = path.join(imagesDir, req.file.filename);
    } 
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is missing.' });
    }
  
    const { title, seller, description, price, discounted_price, tags } = req.body;
    if (!title?.trim() || !seller?.trim() || !price) {
      throw new Error('MISSING_REQUIRED_FIELDS');
    }

    if(discounted_price){
      if(price < discounted_price){
        throw new Error("Discounted price should be less than to price");
      }
    }

    const tagsArray = tags ? tags.split(/,\s*/)
      .map(t => t.trim())
      .filter(t => t.length > 0)
      : [];

    if (tagsArray.length === 0) {
      return res.status(400).json({ error: "At least one valid tag is required" });
    }

    // First create book without image
    const id = await bookModel.createBook({
      title,
      seller,
      description,
      price,
      discounted_price,
      tags: tagsArray
    });

    // Process image after getting ID
    if (req.file) {
      const newFilename = `${id}${req.tempExtension}`;
      const newPath = path.join(imagesDir, newFilename);
      
      try {
        await fs.rename(tempImagePath, newPath);
        await bookModel.updateBookImage(id, newFilename);
      } catch (renameErr) {
        // If rename fails, delete temp file and rethrow
        await fs.unlink(tempImagePath).catch(() => {});
        throw renameErr;
      }
    }

    res.json({ id });
  } catch (err) {
    // Always clean up temp file if it exists
    if (tempImagePath) {
      await fs.unlink(tempImagePath).catch(() => {
        console.error('Failed to delete temp file:', tempImagePath);
      });
    }
  
    if (err.message === "Discounted price should be less than to price") {
      return res.status(400).json({ error: err.message });
    }
  
    if (err.message === 'MISSING_REQUIRED_FIELDS') {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (err.message.startsWith('Invalid tags:')) {
      return res.status(400).json({
        error: 'Invalid tags detected',
        invalidTags: err.message.replace('Invalid tags: ', '').split(', ')
      });
    }
    
    console.error('Add Book Error:', err);
    res.status(500).json({
      error: process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal server error'
    });
  }  
}

async function deleteBook(req, res) {
  try {
    const id = req.params.id;

    const book = await bookModel.getBookById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await bookModel.deleteBook(id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : null
    });
  }
}

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      seller,
      description,
      price,
      discounted_price,
      tags
    } = req.body;

    if (!title?.trim() || !seller?.trim() || !price) {
      throw new Error('MISSING_REQUIRED_FIELDS');
    }

    if(discounted_price){
      if(price < discounted_price){
        throw new Error("Discounted price should be less than to price");
      }
    }

    // Process tags from comma-separated string
    const tagsArray = tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [];

    if (tagsArray.length === 0) {
      throw new Error("At least one valid tag is required");
    }

    // Get old book data to delete previous image
    let oldBook;
    if (req.file) {
      oldBook = await bookModel.getBookById(id);
      if (!oldBook) {
        throw new Error('Book not found');
      }
    }

    // Update book data including new image filename if uploaded
    await bookModel.updateBook(id, {
      title,
      seller,
      description,
      price,
      discounted_price: discounted_price || null,
      tags: tagsArray,
      image: req.file ? req.file.filename : undefined
    });

    // Delete old image after successful update
    if (req.file && oldBook.image) {
      const oldImagePath = path.join('public/images', oldBook.image);
      await fs.unlink(oldImagePath).catch(err => console.error('Error deleting old image:', err));
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
  }
}

const getTotalBooks = async (req, res) => {
  try {
    const [result] = await db.query('SELECT COUNT(*) AS total FROM books');
    res.json({ total: result[0].total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBooks, checkImages, addBook, deleteBook, updateBook, getTotalBooks };