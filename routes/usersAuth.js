const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../models/user')

//Register
authRouter.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(5, 10));
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Login
authRouter.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Forgot Password
authRouter.post('/api/forget-password', (req, res) => {
    res.json({ message: 'Password reset instructions sent' });
});

module.exports = authRouter