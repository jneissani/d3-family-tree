const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/familytree', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for family data
const familySchema = new mongoose.Schema({
    name: String,
    hebrewName: String,
    gender: String,
    birthplace: String,
    deathplace: String,
    birthday: Date,
    deathday: Date,
    hebrewBirthday: String,
    hebrewDeathday: String,
    persianBirthday: String,
    persianDeathday: String,
    image: String,
    spouse: Object,
    children: Array,
    // Add other relevant fields
});

const FamilyMember = mongoose.model('FamilyMember', familySchema);

// API Endpoint to get family data
app.get('/api/family', async (req, res) => {
    try {
        const familyData = await FamilyMember.find();
        res.json(familyData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});