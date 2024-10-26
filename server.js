
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const festivalRoutes = require('./routes/festivalRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB , 
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

// Use festival routes
app.use('/api/festival', festivalRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
