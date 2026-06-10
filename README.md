# EcoTrack AI

A production-ready Carbon Footprint Awareness Platform built for the Hack2Skill challenge. EcoTrack AI helps users calculate their carbon footprint, receive AI-driven personalized recommendations, and adopt sustainable habits.

## 🚀 Features

- **Carbon Footprint Calculator**: Accurately measures your carbon emissions based on transportation, energy usage, food, and waste.
- **Smart AI Assistant**: A conversational AI powered by Google Gemini that analyzes your carbon footprint and provides actionable, personalized sustainability advice.
- **Dynamic Dashboard**: Beautiful interactive charts to visualize your emissions breakdown and track your Eco Score.
- **Sustainability Challenges**: Participate in challenges like "Zero Waste Week" or "Plant-Based Month" to actively reduce your carbon footprint.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Zustand, React Query, Recharts
- **Backend**: Node.js, Express.js, TypeScript, Zod, Helmet
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Generative AI (Gemini)

## 📦 Project Structure

The project is structured as a monorepo containing:
- `frontend/` - The React application
- `backend/` - The Node.js Express API server

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or newer)
- MongoDB account (or local instance)
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/Hirthick7/hack2Skill.git
cd hack2Skill
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with your secrets (see `.env.example` if available, or use the format below):
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Start the backend development server:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

## 💡 Usage
1. Open `http://localhost:5173` in your browser.
2. Click **Calculate My Footprint** to enter your daily habits and receive your Eco Score.
3. Check the **Dashboard** for a breakdown of your emissions.
4. Go to the **AI Assistant** to chat with Gemini about how to reduce your specific emissions.
5. Visit the **Challenges** page to commit to eco-friendly habits.

## 🛡️ Security
This platform follows security best practices:
- Secure HTTP headers using Helmet
- Rate limiting to prevent brute-force and DDoS
- NoSQL Injection protection via MongoDB Sanitization
- Strict runtime input validation using Zod

## 📄 License
This project is built for the Hack2Skill Carbon Footprint Awareness Platform challenge.
