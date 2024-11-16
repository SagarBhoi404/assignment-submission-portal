const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
        res.status(500).json({ error: "Error registering user." });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: "Login successful.", token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in." });
    }
};

const uploadAssignment = async (req, res) => {
    try {
        const { task, admin } = req.body;
        const { id: userId } = req.user;

        if (!task || !admin) {
            return res.status(400).json({ error: "Task and admin are required." });
        }

        const assignment = await Assignment.create({ userId, task, admin, status: 'Pending' });
        res.status(201).json({ message: "Assignment uploaded successfully.", assignment });
    } catch (error) {
        res.status(500).json({ error: "Error uploading assignment." });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' }, { name: 1, email: 1 });
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: "Error fetching admins." });
    }
};

module.exports = { registerUser, loginUser, uploadAssignment, getAllAdmins };
