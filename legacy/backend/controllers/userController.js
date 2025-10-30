const userModel = require('../models/userModel');
require('dotenv').config(); 
const db = require('../db');
const jwt = require('jsonwebtoken');
const sanitize = require('sanitize-html');

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await userModel.getAllUsers();
        res.json(rows); // Send the rows directly
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const [rows] = await userModel.getUserById(req.params.id);
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log('Login attempt:', req.body);  // Log incoming request
        
        const { usernameOrEmail: rawUsernameOrEmail, password: rawPassword } = req.body;
        
        // Input validation
        if (!rawUsernameOrEmail || !rawPassword) {
            console.error('Missing credentials');
            return res.status(400).json({ error: 'Username/Email and password are required' });
        }

        // Sanitization
        const usernameOrEmail = sanitize(rawUsernameOrEmail, { allowedTags: [], allowedAttributes: {} });
        const password = sanitize(rawPassword, { allowedTags: [], allowedAttributes: {} });
        

        console.log('Sanitized credentials:', { usernameOrEmail, password });

        // Database query
        const [users] = await userModel.getUserByUsernameOrEmail(usernameOrEmail);
        console.log('Database response:', users);

        if (users.length === 0) {
            console.warn('No user found for:', usernameOrEmail);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Password comparison
        console.log('Stored password:', users[0].password);
        console.log('Provided password:', password);
        
        if (password !== users[0].password) {
            console.warn('Password mismatch for user:', users[0].id);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // JWT generation
        const token = jwt.sign(
            { userId: users[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Generated token for user:', users[0].id);
        
        res.json({
            token,
            user: {
                id: users[0].id,
                username: users[0].username,
                email: users[0].email
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

const createUser = async (req, res) => {
    try {
        const user = req.body;
        const errors = [];

        if (!user.username) errors.push('Username is required');
        if (!user.password) errors.push('Password is required');
        if (!user.email) errors.push('Email is required');
        if (!user.date_of_birth) errors.push('Birth date is required');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (user.email && !emailRegex.test(user.email)) {
            errors.push('Invalid email format');
        }

        if (user.date_of_birth && isNaN(Date.parse(user.date_of_birth))) {
            errors.push('Invalid date format');
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const [result] = await userModel.createUser(user);
        const newUserId = result.insertId;
        res.status(201).json({ id: newUserId, ...user });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const [result] = await userModel.deleteUser(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        // Check if password is being updated
        if (!updatedData.password) {
            const [existingUser] = await userModel.getUserById(userId);
            updatedData.password = existingUser[0].password;
        }

        const [result] = await userModel.updateUser(userId, updatedData);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });

        const [updatedUser] = await userModel.getUserById(userId);
        res.json(updatedUser[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTotalUsers = async (req, res) => {
    try {
        const [result] = await db.query('SELECT COUNT(*) AS total FROM users');
        res.json({ total: result[0].total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser, getTotalUsers, loginUser};
