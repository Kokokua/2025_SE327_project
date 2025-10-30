const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

fs.mkdirSync('/app/public/images', { recursive: true });

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();

        // Pull the book id from the route parameter
        const bookId = req.params.id;

        cb(null, `${bookId}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        req.tempExtension = ext;  
        cb(null, `temp_${uuidv4()}${ext}`);
    }
});

const postUpload = multer({
    storage: postStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});


// GET /api/books
router.get('/', bookController.getBooks);

// POST /api/books
router.post('/', postUpload.single('image'), bookController.addBook);

// DELETE /api/books/:id
router.delete('/:id', bookController.deleteBook);

// UPDATE /api/books/:id
router.put('/:id', upload.single('image'), bookController.updateBook);

router.get('/total', bookController.getTotalBooks);

module.exports = router;