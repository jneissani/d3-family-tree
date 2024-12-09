const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const multer = require('multer');
//const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.memberId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/family_tree', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for family data
const familySchema = new mongoose.Schema({
    name: String,
    hebrewName: String,
    gender: String,
    birthplace: String,
    deathplace: String,
    birthday: String,
    deathday: String,
    hebrewBirthday: String,
    hebrewDeathday: String,
    persianBirthday: String,
    persianDeathday: String,
    image: String,
    spouse: Object,
    children: Array,
});

const FamilyMember = mongoose.model('FamilyMember', familySchema);

// API Endpoint to get all family data
app.get('/api/family', async (req, res) => {
    try {
        const familyData = await FamilyMember.find();
        res.json(familyData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/*
const upload = multer({ storage });

// API endpoint to upload an image
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    try {
        const imagePath = req.file.path; // Path to the uploaded image
        res.json({ message: 'Image uploaded successfully', imagePath });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});