const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// LOGIN PAGE
router.get('/', adminController.showLogin);
router.post('/login', adminController.handleLogin);

// DASHBOARD
router.get('/dashboard', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    next();
}, adminController.showDashboard);

// BOOKS
router.get('/books', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    next();
}, adminController.showBooks);

// ORDERS
router.get('/orders', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    next();
}, adminController.showOrders);

// USERS
router.get('/users', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    next();
}, adminController.showUsers);

// REPORTS
router.get('/reports', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    next();
}, adminController.showReports);

// LOGOUT
router.get('/logout', adminController.logout);

module.exports = router;
