const express = require('express');
const Debate = require('../models/debateSchema');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { title, description, date, time, location } = req.body;

        if (!title || !description || !date || !time || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newDebate = new Debate({ title, description, date, time, location });
        await newDebate.save();

        res.status(201).json({ message: 'Debate added successfully', newDebate });
    } catch (error) {
        console.error('Error adding debate:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDebate = await Debate.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedDebate) {
            return res.status(404).json({ message: 'Debate not found' });
        }

        res.status(200).json(updatedDebate);
    } catch (error) {
        console.error('Error updating debate:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Extract the debate ID from the URL parameters
        
        const deletedDebate = await Debate.findByIdAndDelete(id);  // Find and delete the debate by ID

        if (!deletedDebate) {
            return res.status(404).json({ message: 'Debate not found' });  // If no debate found, return a 404 response
        }

        res.status(200).json({ message: 'Debate deleted successfully' });  // Send a success response
    } catch (error) {
        console.error('Error deleting debate:', error);
        res.status(500).json({ message: 'Server error' });  // Handle server errors
    }
});


router.get('/all', async (req, res) => {
    try {
        const debates = await Debate.find();
        res.status(200).json(debates);
    } catch (error) {
        console.error('Error fetching debates:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;