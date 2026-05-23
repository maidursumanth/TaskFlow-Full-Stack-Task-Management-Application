const db = require("../config/db");

// ✅ Create Task
const createTask = (userId, title, description, status, priority, due_date, callback) => {
    const sql = `
        INSERT INTO tasks (user_id, title, description, status, priority, due_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [userId, title, description, status, priority, due_date], callback);
};

// ✅ Get All Tasks (for logged-in user)
const getTasksByUser = (userId, callback) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC";
    db.query(sql, [userId], callback);
};

// ✅ Get Single Task
const getTaskById = (taskId, userId, callback) => {
    const sql = "SELECT * FROM tasks WHERE id = ? AND user_id = ?";
    db.query(sql, [taskId, userId], callback);
};

// ✅ Update Task
const updateTask = (taskId, userId, title, description, status, priority, due_date, callback) => {
    const sql = `
        UPDATE tasks 
        SET title = ?, description = ?, status = ?, priority = ?, due_date = ?
        WHERE id = ? AND user_id = ?
    `;
    db.query(sql, [title, description, status, priority, due_date, taskId, userId], callback);
};

// ✅ Delete Task
const deleteTask = (taskId, userId, callback) => {
    const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
    db.query(sql, [taskId, userId], callback);
};

module.exports = {
    createTask,
    getTasksByUser,
    getTaskById,
    updateTask,
    deleteTask
};