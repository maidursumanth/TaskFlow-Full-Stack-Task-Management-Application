const taskModel = require("../models/taskModel");

// ✅ Create Task
const createTask = (req, res) => {
    console.log("User from token:", req.user);
    console.log("Task data:", req.body);

    const userId = req.user.id;
    const { title, description, status, priority, due_date } = req.body;

    taskModel.createTask(userId, title, description, status, priority, due_date, (err, result) => {
        if (err) {
            console.log("DB ERROR:", err);   // add this line
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Task created successfully" });
    });
};

// ✅ Get All Tasks
const getTasks = (req, res) => {
    const userId = req.user.id;

    taskModel.getTasksByUser(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch tasks" });
        }

        res.json(result);
    });
};

// ✅ Get Single Task
const getTask = (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    taskModel.getTaskById(taskId, userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching task" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(result[0]);
    });
};

// ✅ Update Task
const updateTask = (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, description, status, priority, due_date } = req.body;

    taskModel.updateTask(taskId, userId, title, description, status, priority, due_date, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update task" });
        }

        res.json({ message: "Task updated successfully" });
    });
};

// ✅ Delete Task
const deleteTask = (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    taskModel.deleteTask(taskId, userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete task" });
        }

        res.json({ message: "Task deleted successfully" });
    });
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};
