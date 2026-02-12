require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Analysis = require('./models/Analysis');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sentiment_analyzer';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Sentiment Logic
const POSITIVE_WORDS = [
    'good', 'great', 'excellent', 'amazing', 'happy', 'love', 'best', 'perfect',
    'awesome', 'nice', 'success', 'joy', 'fun', 'win', 'like', 'wonderful',
    'fantastic', 'brilliant', 'clean', 'beautiful', 'cool', 'super', 'positive',
    'smart', 'easy', 'safe', 'strong', 'bright', 'sweet'
];
const NEGATIVE_WORDS = [
    'bad', 'terrible', 'awful', 'sad', 'angry', 'hate', 'worst', 'fail', 'poor',
    'wrong', 'pain', 'error', 'ugly', 'lose', 'dislike', 'horrible', 'nasty',
    'broken', 'weak', 'dirty', 'stupid', 'boring', 'slow', 'hard', 'negative',
    'sick', 'difficult', 'dumb', 'crazy'
];

function analyzeSentiment(text) {
    if (!text) return { sentiment: 'Neutral', score: 0 };

    const words = text.toLowerCase().match(/\w+/g) || [];
    let score = 0;

    words.forEach(word => {
        if (POSITIVE_WORDS.includes(word)) score++;
        if (NEGATIVE_WORDS.includes(word)) score--;
    });

    let sentiment = 'Neutral';
    if (score > 0) sentiment = 'Positive';
    if (score < 0) sentiment = 'Negative';

    return { sentiment, score };
}

// Routes
app.post('/analyze', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text input is required' });
        }

        // Process sentiment
        // Simulate delay for loading indicator
        await new Promise(resolve => setTimeout(resolve, 500));

        const { sentiment, score } = analyzeSentiment(text);

        // Save to DB
        const newAnalysis = new Analysis({
            text,
            sentiment,
            score
        });

        await newAnalysis.save();

        res.json({
            sentiment,
            score,
            originalText: text
        });
    } catch (err) {
        console.error('Error analyzing text:', err);
        res.status(500).json({ error: 'Server error analyzing text' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
