const db = require('../db');

const getAllUsers = () => {
    return db.query('SELECT * FROM users');
};

const getUserById = (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', [id]);
};

const createUser = ({ username, password, email, date_of_birth }) => {
    return db.query(
        'INSERT INTO users (username, password, email, date_of_birth) VALUES (?, ?, ?, ?)',
        [username, password, email, date_of_birth]
    );
};

const deleteUser = (id) => {
    return db.query('DELETE FROM users WHERE id = ?', [id]);
};

const updateUser = (id, { username, password, email, date_of_birth }) => {
    return db.query(
        'UPDATE users SET username = ?, password = ?, email = ?, date_of_birth = ? WHERE id = ?',
        [username, password, email, date_of_birth, id]
    );
};

const getUserByUsernameOrEmail = (usernameOrEmail) => {
    return db.query(
        'SELECT * FROM users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)',
        [usernameOrEmail, usernameOrEmail]
    );
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser, getUserByUsernameOrEmail };
