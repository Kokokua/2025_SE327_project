const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Too many login attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false
});

router.get('/', userController.getAllUsers);
router.get('/total', userController.getTotalUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.post('/login', loginLimiter, userController.loginUser); 
router.get('/profile/:id', userController.getUserById);

module.exports = router;
