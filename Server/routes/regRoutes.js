
const express = require('express');
const Register = require('../models/regModel');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { title, description, date, time, location, userId } = req.body; 

    const newRegistration = new Register({
        title,
        description,
        date,
        time,
        location,
        user: userId,
    });

    try {
        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userRegs = await Register.find({ user: req.params.userId });
        res.status(200).json(userRegs);
    } catch (error) {
        console.error('Error fetching user registrations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/unregister/:id', async (req, res) => {
    try {
        const deletedRegistration = await Register.findByIdAndDelete(req.params.id);
        if (!deletedRegistration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        res.status(200).json({ message: 'Successfully unregistered' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
