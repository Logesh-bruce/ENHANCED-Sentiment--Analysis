# Text Sentiment Analyzer

A simple MERN stack application to analyze the sentiment of text inputs.
 
## Features

- **Frontend**: 
  - Built with React + Vite
  - Clean and minimal UI
  - Real-time sentiment analysis feedback
  - Loading indicators and error handling

- **Backend**:
  - Built with Node.js + Express
  - RESTful API endpoint `/analyze`
  - MongoDB integration to store analysis history
  - Simple keyword-based sentiment analysis logic

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud instance)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd text-sentiment-analyzer
```

### 2. Backend Setup
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (if not already present):
```env
MONGO_URI=mongodb://localhost:27017/sentiment_analyzer
PORT=5000
```

Start the backend server:
```bash
npm start
# OR for development with nodemon
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or similar).

## Usage

1. Open the frontend application in your browser.
2. Enter text into the input area.
3. Click "Check Sentiment".
4. View the result (Positive / Negative / Neutral) and score.

## Project Structure

```
text-sentiment-analyzer/
├── backend/          # Node.js + Express server
│   ├── models/       # Mongoose schemas
│   ├── server.js     # Main server file
│   └── ...
├── frontend/         # React + Vite application
│   ├── src/          # Source code
│   └── ...
└── README.md         # Project documentation
```

## License

ISC
