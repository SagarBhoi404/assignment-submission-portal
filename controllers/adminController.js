const Assignment = require('../models/assignmentModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || role !== 'Admin') {
            return res.status(400).json({ error: 'Invalid input or role.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: 'Admin registered successfully.', admin });
    } catch (error) {
        res.status(500).json({ error: 'Error registering admin.' });
    }
};


const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const admin = await User.findOne({ email, role: 'Admin' });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in.' });
    }
};

const viewAssignments = async (req, res) => {
    try {
        const { id: adminId } = req.user;
        const assignments = await Assignment.find({ admin: adminId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: "Error fetching assignments." });
    }
};

const acceptAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });

        res.json({ message: "Assignment accepted.", assignment });
    } catch (error) {
        res.status(500).json({ error: "Error accepting assignment." });
    }
};

const rejectAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });

        res.json({ message: "Assignment rejected.", assignment });
    } catch (error) {
        res.status(500).json({ error: "Error rejecting assignment." });
    }
};

module.exports = { registerAdmin, loginAdmin, viewAssignments, acceptAssignment, rejectAssignment };
