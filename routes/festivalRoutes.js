// routes/festivalRoutes.js
const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');

// Route to get today's festival
// router.get('/today', festivalController.getTodayFestival);

// Route to add a new festival
router.post('/add', festivalController.addFestival);

// Route to get festivals by date
router.get('/date/:date', festivalController.getFestivalsByDate);

module.exports = router;
