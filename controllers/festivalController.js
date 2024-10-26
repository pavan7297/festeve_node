// controllers/festivalController.js
const Festival = require('../models/Festival');

// Get today's festival
exports.getTodayFestival = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    try {
        const festival = await Festival.findOne({ date: today });
        if (festival) {
            res.status(200).json({ festival: festival.name , shortdescription, description });
        } else {
            res.status(200).json({ message: 'No festival today.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add new festival data
// exports.addFestival = async (req, res) => {
//     const { date, name } = req.body;
//     try {
//         const newFestival = new Festival({ date, name , shortdescription,description });
//         await newFestival.save();
//         res.status(201).json({ message: 'Festival added successfully', festival: newFestival });
//     } catch (error) {
//         res.status(500).json({ error: 'Error adding festival data' });
//     }
// };

// exports.addFestival = async (req, res) => {
//     const { date, name } = req.body;
//     console.log('Received data:', req.body); // Log incoming data
//     try {
//         if (!date || !name) {
//             return res.status(400).json({ error: 'Date and name are required.' });
//         }

//         const newFestival = new Festival({ date, name });
//         await newFestival.save();
//         res.status(201).json({ message: 'Festival added successfully', festival: newFestival });
//     } catch (error) {
//         console.error('Error adding festival:', error);
//         res.status(500).json({ error: 'Error adding festival data', details: error.message });
//     }
// };

// controllers/festivalController.js
exports.addFestival = async (req, res) => {
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
};



exports.getFestivalsByDate = async (req, res) => {
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
};
