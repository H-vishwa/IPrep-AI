# IPrep-AI

IPrep-AI is a full-stack web application that helps users prepare for technical interviews with AI-generated, role-specific questions and detailed answers. Users can create interview prep sessions, pin important questions, add personal notes, and organize their preparation efficiently.

**Live Demo:** [https://sparkly-tanuki-37ddcb.netlify.app/](https://sparkly-tanuki-37ddcb.netlify.app/)

---

## Features

- **AI-powered generation of interview questions and answers**: Get customized practice questions and model answers based on your role, experience, and topics.
- **Role, experience, and topic-based customization**: No generic preparation—everything is tailored to you.
- **User authentication and profile management**: Secure login and personalized dashboard.
- **Session management**: Create, view, and delete interview prep sessions.
- **Pin & note questions**: Pin important questions and add personal notes for deeper learning.
- **Responsive UI**: Modern, mobile-friendly design.
- **Concept explanations**: Unlock detailed AI-generated explanations to master each topic.

---

## Project Structure

```
backend/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  config/
  uploads/
  server.js
  package.json
frontend/
  pre-pai/
    src/
    public/
    index.html
    package.json
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Google Gemini API key (for AI features)

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_AI_API_KEY=your_google_gemini_api_key
   PORT=8000
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend/pre-pai
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`, `/api/auth/upload-image`
- **Sessions:** `/api/sessions/create`, `/api/sessions/my-sessions`, `/api/sessions/:id`, `/api/sessions/:id` (DELETE)
- **Questions:** `/api/questions/add`, `/api/questions/:id/pin`, `/api/questions/:id/note`
- **AI:** `/api/ai/generate-questions`, `/api/ai/generate-explanation`

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router, React Hot Toast
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer
- **AI:** Google Gemini API

---

## License

This project is for educational purposes.

---

Feel free to customize this README as needed for your project!
