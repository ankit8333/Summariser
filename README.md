# 🧠 AI Text Summariser

A full-stack web application that accepts large text and generates AI-powered summaries using GROQ_API.

---

## 📁 Full File Structure

```
ai-summariser/
│
├── frontend/                        # React + Tailwind CSS frontend
│   ├── public/
│   │   └── index.html               # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── TextInput.jsx        # Large textarea for user input
│   │   │   ├── SummaryOutput.jsx    # Displays AI summary result
│   │   │   ├── HistoryCard.jsx      # Single saved summary card
│   │   │   └── Loader.jsx           # Animated loading spinner
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Main summariser page
│   │   │   └── History.jsx          # Saved summaries page
│   │   ├── utils/
│   │   │   └── api.js               # Axios API helper functions
│   │   ├── App.jsx                  # Root component with routing
│   │   ├── index.js                 # React DOM render entry point
│   │   └── index.css                # Tailwind CSS imports
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── package.json                 # Frontend dependencies
│
├── backend/                         # Node.js + Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── models/
│   │   └── Summary.js               # Mongoose schema for summaries
│   ├── controllers/
│   │   └── summaryController.js     # Business logic for summarisation
│   ├── routes/
│   │   └── summaryRoutes.js         # API route definitions
│   ├── middleware/
│   │   └── errorHandler.js          # Global error handler
│   ├── .env                         # Environment variables (DO NOT COMMIT)
│   ├── server.js                    # Express app entry point
│   └── package.json                 # Backend dependencies
│
└── README.md                        # This file
```

---

## 🚀 Setup Instructions

### Backend
```bash
cd backend
npm install
# Fill in your .env file (see backend/.env)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-summariser
GROQ_API_KEY=plz put your API

```

---

## 🌐 API Endpoints

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | /api/summarise      | Summarise text using OpenAI  |
| GET    | /api/summaries      | Get all saved summaries      |
| DELETE | /api/summaries/:id  | Delete a saved summary       |

##how look like
<img width="2876" height="1800" alt="Screenshot 2026-06-21 151001" src="https://github.com/user-attachments/assets/64404b4a-dc07-4725-b1c9-c926fca6d34a" />
<img width="2880" height="1798" alt="Screenshot 2026-06-21 150953" src="https://github.com/user-attachments/assets/b8bcde87-32d8-4a3f-b970-774919ec0b1b" />
