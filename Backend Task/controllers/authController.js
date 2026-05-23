const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Signup
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        userModel.creatUser(name, email, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "User already exists" });
            }

            res.json({ message: "User Registered Successfully" });
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Login
const login = (req, res) => {
    const { email, password } = req.body;

    userModel.findUserByEmail(email, async (err, result) => {
        if (err || result.length === 0) {
            return res.status(400).json({ error: "User Not Found" });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Password" });
        }

        const token = jwt.sign(
            { id: user.id },
            "secretkey",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login Successful",
            token
        });
    });
};

// ✅ Get Profile
const getProfile = (req, res) => {
    const userId = req.user.id;

    userModel.findUserById(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Server error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(result[0]);
    });
};

// ✅ Update Profile
const updateProfile = (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;

    userModel.updateUser(userId, name, email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Update failed" });
        }

        res.json({ message: "Profile updated successfully" });
    });
};

module.exports = {
    signup,
    login,
    getProfile,
    updateProfile
};
