# 🏛️ Niti Nidhi

> A citizen-first digital governance platform to discover government schemes, apply for services, track applications, raise grievances, access local news, explore jobs, and interact with an AI chatbot — all in one place.

---

## 📱 What is Niti Nidhi?

**Niti Nidhi** is a mobile app built with **Expo React Native** + a **Node.js backend** that bridges citizens with government services. It supports:

- 🏷️ Browse & apply for government welfare schemes
- 📋 Track application status
- 📣 Submit public grievances/complaints
- 📰 Read local & state-level news
- 💼 Explore employment opportunities
- 🤖 Multilingual AI chatbot (powered by Ollama)
- 🔐 Firebase-based authentication

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Mobile Frontend | React Native + Expo SDK |
| Navigation | Expo Router + React Navigation |
| Auth | Firebase Auth (phone/email) |
| Backend | Node.js + Express.js |
| AI Chatbot | Ollama (local LLM) |
| Storage | JSON files (lightweight, demo-ready) |
| Firebase Admin | Firestore integration |

---

## 📁 Project Structure

```
Nitinidhi/
├── App.js                  # App entry point
├── app.json                # Expo config
├── package.json            # Frontend dependencies
├── .env                    # Environment variables (DO NOT commit)
├── app/
│   ├── _layout.js          # Root layout + onboarding logic
│   ├── Config.js           # API URLs (update this for your setup)
│   ├── AuthScreens.js      # Login / sign-up screens
│   ├── onboarding.js       # First-time onboarding flow
│   ├── SchemesScreen.js    # Government schemes list
│   ├── SchemeDetailsScreen.js
│   ├── EligibleSchemesScreen.js
│   ├── ApplicationFormScreen.js
│   ├── StatusScreen.js     # Application status tracking
│   ├── ComplaintFormScreen.js
│   ├── ComplaintDetailsScreen.js
│   ├── NewsScreen.js
│   ├── NewsDetailsScreen.js
│   ├── HelplineScreen.js
│   ├── JobDetailsScreen.js
│   ├── DocumentsScreen.js
│   ├── chatbot.js          # AI chatbot screen
│   ├── ProfileScreen.js
│   ├── (tabs)/             # Tab navigation screens
│   ├── api/                # Frontend API helpers
│   ├── components/         # Shared UI components
│   ├── config/             # Firebase client config
│   └── utils/              # Utility functions
└── backend/
    ├── server.js           # Express server entry point
    ├── package.json        # Backend dependencies
    ├── config/
    │   └── firebase.js     # Firebase Admin SDK setup
    ├── routes/
    │   ├── auth.js         # Auth endpoints (proxies to Django JWT)
    │   ├── schemes.js      # Schemes + applications
    │   ├── complaints.js   # Grievance management
    │   ├── news.js         # News CRUD
    │   ├── employment.js   # Jobs API
    │   ├── chatbot.js      # Ollama AI integration
    │   └── documents.js    # Documents API
    ├── services/           # Business logic
    ├── data/               # JSON file storage (auto-created)
    └── storage/
        └── localStorage.js # Lightweight JSON persistence layer
```

---

## ⚙️ Prerequisites

Make sure you have these installed before getting started:

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
  ```bash
  npm install -g expo-cli
  ```
- [Expo Go app](https://expo.dev/go) on your phone (to preview the app)
- [Ollama](https://ollama.com/) — only if you want the AI chatbot to work

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/janhavi-gattani/Nitinidhi.git
cd Nitinidhi
```

### 2. Set Up Environment Variables

Create a `.env` file in the **root of the project** (same folder as `package.json`):

```env
# ── Frontend (Expo) ──────────────────────────────────
# Your Django/backend API URL (use ngrok if running locally)
EXPO_PUBLIC_API_URL=https://your-ngrok-url.ngrok-free.app

# Firebase Web App config (get from Firebase Console > Project Settings)
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id

# Gemini API key (optional)
EXPO_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# ── Backend ──────────────────────────────────────────
# Ollama local LLM config
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2

# JWT secret (use any strong random string)
JWT_SECRET=your-very-strong-secret-key

# Node environment
NODE_ENV=development

# Backend server port
PORT=5000
```

> **Never commit your `.env` file.** It is already listed in `.gitignore`.

How to get Firebase config values:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Open your project → **Project Settings** (gear icon)
3. Scroll to **Your apps** → select your Web app → copy the config values

---

### 3. Update API URLs in `app/Config.js`

Open `app/Config.js` and update the URLs to match your running backend:

```js
// Your Django backend URL (ngrok URL if running locally)
export const DJANGO_API_URL = 'https://your-ngrok-url.ngrok-free.app';

// Your Node.js backend URL
export const NODE_API_URL = 'http://localhost:5000';
// OR if deployed: 'https://your-render-url.onrender.com'
```

---

### 4. Install Frontend Dependencies

From the **project root**:

```bash
npm install
```

---

### 5. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

### 6. (Optional) Set Up Firebase Admin for the Backend

If you want Firebase Auth + Firestore integration in the backend:

1. Go to [Firebase Console](https://console.firebase.google.com/) → Your Project → **Project Settings** → **Service Accounts**
2. Click **"Generate new private key"** and download the JSON file
3. Rename it to `serviceAccountKey.json`
4. Place it inside the `backend/` folder

> If `serviceAccountKey.json` is not present, the backend will still run but Firebase-related features will be skipped.

---

### 7. (Optional) Set Up Ollama for the AI Chatbot

1. Download and install [Ollama](https://ollama.com/download)
2. Pull the model and start the server:

```bash
# Pull the model
ollama pull llama3.2

# Start Ollama server
ollama serve
```

Make sure your `.env` has:
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

Other supported models:
```env
OLLAMA_MODEL=mistral
OLLAMA_MODEL=phi3
OLLAMA_MODEL=llama2
OLLAMA_MODEL=gemma
```

---

## ▶️ Running the App

You need **two terminals** — one for the backend and one for the frontend.

### Terminal 1 — Start the Backend

```bash
cd backend
npm start
```

For development with auto-reload:
```bash
cd backend
npm run dev
```

Backend runs at `http://localhost:5000`. Verify it works:
```
GET http://localhost:5000/health
```

### Terminal 2 — Start the Frontend

From the **project root**:

```bash
npm start
```

This opens the Expo Metro bundler. Then:
- Press `a` → open on Android emulator
- Press `i` → open on iOS simulator (macOS only)
- Scan the **QR code** with [Expo Go](https://expo.dev/go) on your phone

Other commands:
```bash
npm run android   # open on Android
npm run ios       # open on iOS
npm run web       # open in browser
```

---

## 🌐 Backend API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check |
| `POST` | `/api/auth/token` | Login — proxies to Django JWT |
| `GET` | `/api/schemes` | List all government schemes |
| `GET` | `/api/schemes/:id` | Scheme details |
| `POST` | `/api/schemes/apply` | Apply for a scheme |
| `GET` | `/api/schemes/applications/my` | User's application history |
| `POST` | `/api/complaints/submit` | Submit a grievance |
| `GET` | `/api/complaints/my-complaints` | User's complaints |
| `GET` | `/api/complaints/all` | All complaints (admin) |
| `GET` | `/api/news` | Get news list |
| `POST` | `/api/news` | Create a news entry |
| `GET` | `/api/employment` | List job opportunities |
| `POST` | `/api/employment` | Post a new job |
| `GET` | `/api/documents/user-documents` | Get user documents |
| `POST` | `/api/chatbot/chat` | Send message to AI chatbot |

---

## 🔧 Troubleshooting

### App can't connect to backend
- Make sure the backend is running on port 5000
- On a **physical device**, your phone and PC must be on the **same Wi-Fi network**
- Change `NODE_API_URL` in `app/Config.js` to your machine's local IP, e.g.:
  ```js
  export const NODE_API_URL = 'http://192.168.1.5:5000';
  ```
- If using ngrok: run `ngrok http 5000` and update `EXPO_PUBLIC_API_URL` in `.env`

### Firebase errors
- Double-check all `EXPO_PUBLIC_FIREBASE_*` values in `.env`
- Make sure **Phone Auth** or **Email/Password Auth** is enabled in Firebase Console → Authentication → Sign-in method

### Chatbot not responding
- Make sure Ollama is running: `ollama serve`
- Check the model is downloaded: `ollama list`
- Verify `OLLAMA_BASE_URL` and `OLLAMA_MODEL` in `.env`

### Metro bundler issues
```bash
npx expo start --clear    # clears Metro cache
```

### `node_modules` issues
```bash
rm -rf node_modules
npm install
```

---

## 🚢 Deployment

### Backend — Deploy to Render / Railway
1. Push code to GitHub
2. Connect repo to [Render](https://render.com) or [Railway](https://railway.app)
3. Set all backend environment variables in the dashboard (`OLLAMA_BASE_URL`, `JWT_SECRET`, `PORT`, etc.)
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Update `NODE_API_URL` in `app/Config.js` with your deployed URL

### Frontend — Build with Expo EAS
```bash
npm install -g eas-cli
eas login
eas build --platform android   # or ios
```

See [Expo EAS docs](https://docs.expo.dev/eas/) for full configuration.

---

## 📌 Important Notes

- The backend uses **local JSON files** for storage (`backend/data/`). Good for demos — for production, migrate to MongoDB, PostgreSQL, or Firestore.
- The repo has two navigation approaches (`app/` via Expo Router and `src/` via React Navigation). They are actively being unified.
- The `backend/serviceAccountKey.json` file should **never** be committed to GitHub — add it to `.gitignore`.

---

## 📄 License

Built for civic-tech and government-service delivery. Use responsibly and ensure compliance with local data privacy regulations before deploying citizen-facing features.
