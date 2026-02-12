import { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeText = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Create backend URL - assumes backend is running on port 5000
            const response = await axios.post('http://localhost:5000/analyze', { text });
            setResult(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to analyze text. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const getSentimentClass = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'positive';
            case 'Negative': return 'negative';
            default: return 'neutral';
        }
    };

    return (
        <div className="container">
            <h1>Text Sentiment Analyzer</h1>

            <textarea
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
            />

            <button
                onClick={analyzeText}
                disabled={loading || !text.trim()}
            >
                {loading ? 'Analyzing...' : 'Check Sentiment'}
            </button>

            {loading && <div className="loading">Processing sentiment...</div>}

            {error && <div className="error">{error}</div>}

            {result && (
                <div className="result">
                    <h3>Analysis Result</h3>
                    <div className={`sentiment-badge ${getSentimentClass(result.sentiment)}`}>
                        {result.sentiment}
                    </div>
                    <p className="score">Sentiment Score: {result.score}</p>
                </div>
            )}
        </div>
    );
}

export default App;
