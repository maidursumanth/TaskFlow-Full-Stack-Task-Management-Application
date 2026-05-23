const db = require("../config/db");

// Signup
const creatUser = (name, email, password, callback) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    db.query(sql, [name, email, password], callback);
};

// Login
const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
};

// ✅ Get user by ID
const findUserById = (id, callback) => {
    const sql = "SELECT id, name, email FROM users WHERE id = ?";
    db.query(sql, [id], callback);
};

// ✅ Update user
const updateUser = (id, name, email, callback) => {
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [name, email, id], callback);
};

module.exports = {
    creatUser,
    findUserByEmail,
    findUserById,
    updateUser
};
