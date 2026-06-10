# EcoTrack AI

EcoTrack AI is a full-stack web application designed to help individuals calculate their carbon footprint, discover their largest emission sources, and receive personalized, AI-driven sustainability tips.

## Architecture 🚀
The project was recently restructured for simplicity and seamless deployment as a unified monolith:
- **Backend:** Flask (Python) exposing RESTful APIs (`/api/carbon`, `/api/ai`, `/api/challenges`).
- **Frontend:** Vanilla HTML, CSS, and JS served directly from Flask's `templates/` and `static/` directories.
- **AI Integration:** Google Gemini Flash model integration for personalized coaching.

## Features ✨
- 🧮 **Carbon Footprint Calculator:** Input your transportation, energy, food, and waste data to calculate your total yearly emissions.
- 🤖 **AI Sustainability Coach:** Ask personalized questions based on your specific emission profile.
- 🎯 **Eco Challenges:** Take on actionable challenges to reduce your carbon footprint and earn points.
- 🎨 **Modern Design:** Built with a beautiful, responsive glassmorphic dark-mode UI.

## Getting Started 🛠️

### Prerequisites
- Python 3.10+
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd carbon-footprint-platform
   ```

2. **Setup your environment variables:**
   Ensure you have a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=mongodb://localhost:27017/ecotrack
   ```

3. **Install dependencies:**
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\Activate.ps1
   # On Mac/Linux:
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **View the app:**
   Open your browser and navigate to `http://localhost:5000`

## Project Structure 📁
```
carbon-footprint-platform/
│
├── api/                   # Python Backend logic
│   ├── config/            # DB and Environment config
│   ├── routes/            # Flask Blueprints
│   └── services/          # Business logic and AI integration
│
├── static/                # Frontend assets
│   ├── style.css          # Glassmorphic CSS
│   └── main.js            # Vanilla JS API integration
│
├── templates/             # HTML files
│   └── index.html         # Main dashboard UI
│
├── app.py                 # Flask server entrypoint
├── requirements.txt       # Python dependencies
└── .env                   # Secrets & config
```
