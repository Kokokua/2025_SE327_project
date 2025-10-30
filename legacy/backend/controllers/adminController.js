const db = require('../db');
exports.showLogin = (req, res) => {
    if (req.session.user) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin-login', { error: null });
};

exports.createAdmin = async (req, res) => {
    const { username, password, email } = req.body;

    await db.query('INSERT INTO admins (username, password, email) VALUES (?, ?, ?)', 
        [username, password, email]);

    res.send('Admin created successfully!');
};
exports.handleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch admin user from DB
        const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
        console.log("Database Query Result:", rows);

        if (rows.length === 0) {
            console.log("User not found.");
            return res.render('admin-login', { error: 'Invalid credentials!' });
        }
        const admin = rows[0];
        console.log("Stored Password:", admin.password);
        console.log("Entered Password:", password);
        if (password !== admin.password) {
            console.log("Password mismatch.");
            return res.render('admin-login', { error: 'Invalid credentials!' });
        }
        // Store user in session
        req.session.user = { id: admin.id, username: admin.username, email: admin.email };
        console.log("Login successful!");
        return res.redirect('/admin/dashboard');
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

// DASHBOARD
exports.showDashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    res.render('admin-dashboard', {
        user: req.session.user,
        activePage: 'dashboard'
    });
};

// BOOKS
exports.showBooks = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    res.render('admin-books', {
        user: req.session.user,
        activePage: 'books'
    });
};

// ORDERS
exports.showOrders = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    res.render('admin-orders', {
        user: req.session.user,
        activePage: 'orders'
    });
};

// USERS
exports.showUsers = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    res.render('admin-users', {
        user: req.session.user,
        activePage: 'users'
    });
};

// REPORTS
exports.showReports = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    res.render('admin-reports', {
        user: req.session.user,
        activePage: 'reports'
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin'); 
    });
};
