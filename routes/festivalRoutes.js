// routes/festivalRoutes.js
const express = require('express');
const router = express.Router();
const Festival = require('../models/Festival');

// Route to get today's festival
// router.get('/today', festivalController.getTodayFestival);

// Route to add a new festival
router.post('/add', async (req, res) => {
    const { date, name, shortdescription, description } = req.body;
    console.log('Received data:', req.body); // Log incoming data
    try {
        // Validate input data
        if (!date || !name || !shortdescription || !description) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newFestival = new Festival({ date, name, shortdescription, description });
        await newFestival.save();
        res.status(201).json({ message: 'Festival added successfully', festival: newFestival });
    } catch (error) {
        console.error('Error adding festival:', error);
        res.status(500).json({ error: 'Error adding festival data', details: error.message });
    }
});

// Route to update an existing festival
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { date, name, shortdescription, description } = req.body;
    console.log('Received data for update:', req.body); // Log incoming data

    try {
        // Validate input data
        if (!date || !name || !shortdescription || !description) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Find the festival by ID and update it
        const updatedFestival = await Festival.findByIdAndUpdate(
            id,
            { date, name, shortdescription, description },
            { new: true } // Return the updated document
        );

        if (!updatedFestival) {
            return res.status(404).json({ error: 'Festival not found' });
        }

        res.status(200).json({ message: 'Festival updated successfully', festival: updatedFestival });
    } catch (error) {
        console.error('Error updating festival:', error);
        res.status(500).json({ error: 'Error updating festival data', details: error.message });
    }
});


// Route to get festivals by date
router.get('/date/:date', async (req, res) => {
    const { date } = req.params; // Extract date from request parameters
    try {
        const festivals = await Festival.find({ date }); // Query the database
        if (festivals.length === 0) {
            return res.status(404).json({ message: 'No festivals found for this date.' });
        }
        res.status(200).json(festivals); // Return the found festivals
    } catch (error) {
        console.error('Error fetching festivals:', error);
        res.status(500).json({ error: 'Error fetching festival data', details: error.message });
    }
});

module.exports = router;
