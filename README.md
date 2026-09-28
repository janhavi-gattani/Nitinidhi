# 🇮🇳 Niti Nidhi

**Niti Nidhi** is a digital governance mobile app that helps citizens discover government schemes, apply for services, track applications, raise complaints, read local news, explore job opportunities, and chat with an AI assistant — all in one place.

Built with **React Native + Expo** (frontend) and **Node.js + Express** (backend).

---

## 📱 Features

- 🏛️ Browse & apply for government schemes
- 📋 Track your application status
- 📢 Submit grievances / complaints
- 📰 Read local & state-level news
- 💼 Explore employment opportunities
- 🤖 AI chatbot (powered by Ollama)
- 🔐 Firebase authentication
- 🌐 Multilingual voice guidance

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React Native, Expo SDK, Expo Router |
| Auth | Firebase Auth |
| Backend | Node.js, Express.js |
| AI Chatbot | Ollama (local LLM) |
| Storage | JSON files (lightweight demo) |

---

## 📁 Project Structure

```
Nitinidhi/
├── App.js                  # App entry point
├── app/                    # All screens (Expo Router)
│   ├── _layout.js
│   ├── AuthScreens.js
│   ├── onboarding.js
│   ├── SchemesScreen.js
│   ├── chatbot.js
│   └── ...
├── backend/                # Node.js backend
│   ├── server.js
│   ├── routes/
│   ├── config/
│   └── data/
├── assets/
├── .env                    # ⚠️ Not committed — create this yourself
└── package.json
```

---

## 🚀 Getting Started (Clone & Run)

Follow these steps to run the project on your laptop.

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo Go app](https://expo.dev/go) on your Android/iOS phone **OR** an Android emulator
- [Git](https://git-scm.com/)
- *(Optional for chatbot)* [Ollama](https://ollama.com/)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/janhavi-gattani/Nitinidhi.git
cd Nitinidhi
```

---

### 2️⃣ Set Up Environment Variables

The `.env` file is **not committed** to GitHub for security reasons. You need to create it yourself.

Create a file called `.env` in the **root of the project**:

```env
# Backend URL — replace with your laptop's local IP when testing on a physical phone
EXPO_PUBLIC_API_URL=http://localhost:5000

# Firebase config — get these from your Firebase Console
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Gemini API (optional, for AI features)
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Backend settings
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
JWT_SECRET=any-long-random-secret-string
NODE_ENV=development
PORT=5000
```

> 💡 **Where to get Firebase keys?**
> Go to [Firebase Console](https://console.firebase.google.com/) → Your Project → Project Settings → Your Apps → SDK config → Copy the config values.

---

### 3️⃣ Install Frontend Dependencies

Run this from the root of the project:

```bash
npm install
```

---

### 4️⃣ Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

### 5️⃣ Run the Backend Server

Open a **new terminal window**, navigate to the project folder, then:

```bash
cd backend
npm start
```

You should see: `✅ Server running on port 5000`

> 💡 For auto-reload during development, use `npm run dev` instead.

---

### 6️⃣ Run the Frontend (Expo App)

In your **original terminal** (at the **project root**, not inside `backend/`):

```bash
npx expo start
```

This starts the Expo dev server and shows a QR code in the terminal. Then choose how to run the app:

| Platform | Command / Action |
|---|---|
| 📱 Physical phone (Android/iOS) | Scan the QR code with the [Expo Go](https://expo.dev/go) app |
| 🤖 Android emulator | Press `a` in terminal **or** run `npx expo start --android` |
| 🍎 iOS simulator (Mac only) | Press `i` in terminal **or** run `npx expo start --ios` |
| 🌐 Web browser | Press `w` in terminal **or** run `npx expo start --web` |

> 💡 You can also use `npm start` — it runs `expo start` under the hood via the `scripts` in `package.json`.

**If you get a "dev client" error** and the app doesn't open in Expo Go, try:
```bash
npx expo start --go
```

**To run directly on a connected Android device:**
```bash
npx expo run:android
```

**To run on iOS simulator (Mac only):**
```bash
npx expo run:ios
```

> ⚠️ `npx expo run:android` / `run:ios` require a full native build (Android Studio / Xcode). For quick testing, use **Expo Go** with `npx expo start`.

---

### 7️⃣ (Optional) Set Up Ollama for the AI Chatbot

If you want the chatbot to work:

**Step 1** — Download and install Ollama: https://ollama.com/

**Step 2** — Pull a model:
```bash
ollama pull llama3.2
```

**Step 3** — Start the Ollama server:
```bash
ollama serve
```

Make sure your `.env` has:
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

> You can also use other models: `mistral`, `phi3`, `llama2`, or `gemma`.

---

## 🌐 Using a Physical Phone? Set Your Local IP

When testing on a **physical phone**, replace `localhost` in `EXPO_PUBLIC_API_URL` with your laptop's local IP address (both must be on the same Wi-Fi).

**Find your local IP:**

```bash
# Windows
ipconfig
# Look for "IPv4 Address" under your Wi-Fi adapter (e.g. 192.168.1.5)

# Mac / Linux
ifconfig | grep "inet "
```

Then update `.env`:
```env
EXPO_PUBLIC_API_URL=http://192.168.x.x:5000
```

---

## 🔑 Backend API Reference

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/health` | Server health check |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/token` | Get auth token |
| GET | `/api/schemes` | List all schemes |
| GET | `/api/schemes/:id` | Scheme details |
| POST | `/api/schemes/apply` | Apply for a scheme |
| GET | `/api/schemes/applications/my` | My applications |
| POST | `/api/complaints/submit` | Submit a complaint |
| GET | `/api/complaints/my-complaints` | My complaints |
| GET | `/api/news` | Get news list |
| GET | `/api/employment` | Get job listings |
| POST | `/api/chatbot/chat` | Chat with AI assistant |

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| `Network request failed` | Make sure backend is running and `EXPO_PUBLIC_API_URL` uses your correct local IP (not `localhost`) when testing on a phone |
| `Firebase: Error (auth/...)` | Double-check your Firebase config keys in `.env` |
| Chatbot not responding | Make sure Ollama is running (`ollama serve`) and the model is pulled |
| Expo QR code not working | Phone and laptop must be on the same Wi-Fi network |
| `Module not found` | Run `npm install` in both the root folder **and** the `backend/` folder |
| Port 5000 already in use | Change `PORT=5001` in `.env` and update `EXPO_PUBLIC_API_URL` accordingly |

---

## 📝 Notes

- The backend uses **JSON files** for data storage — no external database needed to run locally.
- `serviceAccountKey.json` (Firebase Admin) should be placed inside `backend/config/` for full Firebase Admin features. Without it, some backend Firebase features will be skipped.
- This project was built as a **prototype/demo** for Techfest 2025. Not intended for production use without further hardening.

---

## 📄 License

Built for **Techfest 2025** as a civic-tech prototype for government service delivery. Use responsibly and in accordance with applicable data privacy regulations.
