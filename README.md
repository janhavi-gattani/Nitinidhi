# Niti Nidhi

Niti Nidhi is a multi-module digital governance application designed to help citizens discover government schemes, apply for services, track applications, raise complaints, access local news, view employment opportunities, and interact with an AI assistant. The repository contains both a mobile frontend built with Expo React Native and a Node.js backend API that powers the app’s services.

This project is structured as a hybrid app with two navigation approaches:
- Expo Router-based screens under the app/ directory
- A separate React Navigation implementation under src/ for a simpler screen-based shell

The codebase is intended for prototyping, demos, and extension into a production-ready citizen service platform.

---

## 1. Project Overview

### Purpose
The application aims to provide a single platform for citizens to:
- browse and understand government welfare schemes
- submit scheme applications
- monitor application status
- submit public grievances/complaints
- read local and state-level news updates
- explore employment opportunities
- use a multilingual chatbot for guidance

### Target Users
- Citizens seeking government services
- Rural and semi-urban users who need simplified access to public schemes
- Administrators or stakeholders who may manage news and service content

### Project Type
- Mobile app frontend: React Native + Expo
- Backend API: Node.js + Express
- Authentication: Firebase Auth (frontend) and JWT-based backend auth patterns
- Storage: JSON files in the backend for lightweight demo persistence
- AI integration: Ollama-based chatbot service

---

## 2. Tech Stack

### Frontend
- React Native
- Expo SDK
- Expo Router
- React Navigation
- AsyncStorage
- Firebase SDK for authentication and Firestore access
- Expo Image Picker, File System, Document Picker, Speech, Sharing
- Gluestack UI components
- Lucide icons

### Backend
- Node.js
- Express.js
- dotenv
- CORS
- JWT
- Axios
- Firebase Admin SDK
- Multer (prepared for file uploads)
- Express Validator
- Ollama integration through REST API

### Development Tools
- ESLint
- TypeScript support
- Expo EAS configuration

---

## 3. Repository Structure

```text
Techfest-25/
├── App.js
├── app.json
├── package.json
├── tsconfig.json
├── eslint.config.js
├── .env
├── assets/
├── app/
│   ├── _layout.js
│   ├── ApplicationFormScreen.js
│   ├── AuthScreens.js
│   ├── chatbot.js
│   ├── ComplaintDetailsScreen.js
│   ├── ComplaintFormScreen.js
│   ├── Config.js
│   ├── DocumentsScreen.js
│   ├── EligibleSchemesScreen.js
│   ├── ExploreSchemes.js
│   ├── ExploreSchemesScreen.js
│   ├── HelplineScreen.js
│   ├── JobDetailsScreen.js
│   ├── JobUpdateScreen.js
│   ├── NewsDetailsScreen.js
│   ├── NewsScreen.js
│   ├── onboarding.js
│   ├── ProfileScreen.js
│   ├── SchemeDetailsScreen.js
│   ├── SchemesScreen.js
│   ├── StatusScreen.js
│   ├── Tokenutils.js
│   ├── (tabs)/
│   ├── api/
│   ├── components/
│   ├── config/
│   ├── data/
│   └── utils/
├── src/
│   ├── navigation/
│   └── screens/
└── backend/
    ├── server.js
    ├── package.json
    ├── README.md
    ├── config/
    ├── data/
    ├── routes/
    ├── services/
    └── storage/
```

---

## 4. Frontend Architecture

### Entry Point
- [App.js](App.js) is the app entry file and renders the navigator.
- The root navigation logic is provided through the app-level stack setup in [app/_layout.js](app/_layout.js).

### App Router Implementation
The folder [app](app) contains a broad set of screens and components using Expo Router. These screens include:
- onboarding flow
- authentication screens
- scheme browsing and detail screens
- application forms
- document management
- complaint submission and details
- news and helpline modules
- chatbot integration

### React Navigation Implementation
The folder [src](src) contains a smaller and more structured navigation shell:
- [src/navigation/AppNavigator.js](src/navigation/AppNavigator.js) defines the main stack navigator.
- [src/screens/HomeScreen.js](src/screens/HomeScreen.js) provides a simple home dashboard with navigation cards.

### Important Note
The repository currently contains both Expo Router-based files under [app](app) and a React Navigation-based lightweight shell under [src](src). This means the project is in a transitional state and some areas are still being developed or partially integrated.

---

## 5. Core Features

### 5.1 Onboarding
The onboarding experience is managed through [app/onboarding.js](app/onboarding.js) and the layout logic in [app/_layout.js](app/_layout.js). It uses AsyncStorage to remember whether the user has completed onboarding.

### 5.2 Authentication
Authentication-related logic is present in:
- [app/AuthScreens.js](app/AuthScreens.js)
- [app/api/auth.js](app/api/auth.js)
- [app/config/firebase.js](app/config/firebase.js)
- [backend/routes/auth.js](backend/routes/auth.js)

The frontend uses Firebase Auth for phone-based or credential-based flows, while the backend exposes authentication endpoints that proxy or prepare JWT-based sessions.

### 5.3 Government Schemes
The app includes screens and routes for:
- browsing schemes
- viewing scheme details
- eligibility and benefits information
- applying for a scheme

Backend support is implemented in [backend/routes/schemes.js](backend/routes/schemes.js), which provides:
- list of schemes
- detail lookup by ID
- application submission
- application history lookup

### 5.4 Complaints and Grievances
Complaint functionality is implemented through [backend/routes/complaints.js](backend/routes/complaints.js), which proxies complaint submission and retrieval to an external API. This is useful for integrating with public grievance management systems.

### 5.5 News and Updates
The app includes a news experience through [backend/routes/news.js](backend/routes/news.js) and [app/NewsScreen.js](app/NewsScreen.js). News can be filtered by level and location and is stored by the backend in JSON files.

### 5.6 Employment Opportunities
Employment-related APIs and storage are implemented in [backend/routes/employment.js](backend/routes/employment.js) and [backend/storage/localStorage.js](backend/storage/localStorage.js). They support listing, filtering, and publishing opportunities.

### 5.7 Chatbot
The chatbot endpoint is implemented in [backend/routes/chatbot.js](backend/routes/chatbot.js). It:
- accepts an incoming message
- builds a prompt with language-aware instructions
- calls an Ollama local model via the Ollama REST API
- returns either a normal response or a JSON redirect action for scheme applications

### 5.8 Voice Guidance
Voice guidance utilities are present in [app/components/VoiceGuidance.js](app/components/VoiceGuidance.js) and [app/components/VoiceGuidanceUtils.js](app/components/VoiceGuidanceUtils.js), enabling accessibility-focused spoken assistance.

---

## 6. Backend Architecture

### Server Entry
The main server is [backend/server.js](backend/server.js). It:
- initializes Express
- enables CORS
- loads environment variables
- initializes Firebase Admin
- mounts route modules
- exposes a health check endpoint

### Route Modules
The backend exposes these primary routes:
- /api/auth
- /api/users
- /api/schemes
- /api/applications
- /api/documents
- /api/chatbot
- /api/complaints
- /api/employment
- /api/news

### Storage Layer
The backend uses [backend/storage/localStorage.js](backend/storage/localStorage.js) as a lightweight persistence layer. It creates and maintains JSON files for:
- complaints
- applications
- news
- employment opportunities

This makes the backend easy to run locally without a database, but it is not suitable for production-scale concurrency or durability by itself.

### Firebase Integration
Backend Firebase setup is implemented in [backend/config/firebase.js](backend/config/firebase.js). It expects a service account JSON file named serviceAccountKey.json inside the backend directory. Without it, Firebase initialization is skipped and the backend falls back to non-Firebase behavior.

---

## 7. Environment Configuration

The project uses environment variables from the root [.env](.env) file and the backend environment configuration.

### Root Frontend Variables
The frontend environment file contains:
- EXPO_PUBLIC_API_URL
- EXPO_PUBLIC_FIREBASE_API_KEY
- EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
- EXPO_PUBLIC_FIREBASE_PROJECT_ID
- EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
- EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- EXPO_PUBLIC_FIREBASE_APP_ID

### Backend Variables
The backend environment configuration includes:
- OLLAMA_BASE_URL
- OLLAMA_MODEL
- JWT_SECRET
- NODE_ENV
- PORT

### Important Setup Note
The app includes hardcoded or environment-based URLs in [app/Config.js](app/Config.js), including:
- a Django base URL
- a Node backend URL

These values may need to be updated depending on your deployment target.

---

## 8. Installation and Running

### Prerequisites
- Node.js and npm
- Expo CLI / Expo Go
- A Firebase project (optional but strongly recommended for auth integration)
- An Ollama instance running locally if you want the chatbot to work end-to-end

### Install Root Dependencies
```bash
npm install
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Run the Frontend
From the project root:
```bash
npm start
```

Useful Expo commands:
```bash
npm run android
npm run ios
npm run web
```

### Run the Backend
```bash
cd backend
npm start
```

For development with auto-reload:
```bash
cd backend
npm run dev
```

### Ollama Setup for Chatbot
If you want the chatbot endpoint to work, make sure Ollama is installed and running:
```bash
ollama serve
```

Then set the model in the environment file:
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

---

## 9. API Reference

### Authentication
- POST /api/auth/token
  - proxies credentials to a Django/JWT-style API
- POST /api/auth/send-otp
  - legacy OTP endpoint
- POST /api/auth/verify-otp
  - legacy OTP verification
- POST /api/auth/register
  - register/update user data

### Schemes
- GET /api/schemes
- GET /api/schemes/:id
- POST /api/schemes/apply
- GET /api/schemes/applications/my

### Complaints
- POST /api/complaints/submit
- GET /api/complaints/my-complaints
- GET /api/complaints/all
- GET /api/complaints/:id
- PUT /api/complaints/:id/status

### News
- GET /api/news
- GET /api/news/:id
- POST /api/news
- PUT /api/news/:id
- DELETE /api/news/:id
- POST /api/news/seed-demo

### Employment
- GET /api/employment
- GET /api/employment/:id
- POST /api/employment
- POST /api/employment/seed-demo

### Documents
- GET /api/documents/user-documents

### Chatbot
- POST /api/chatbot/chat

### Health
- GET /health

---

## 10. Data and Storage Model

### Local JSON Storage
The backend stores persistence data in the [backend/data](backend/data) directory:
- applications.json
- complaints.json
- employment.json
- news.json

### Typical Record Shapes
- Application records include scheme metadata, user identifier, status, and submission timestamp.
- Complaint records include title, category, description, location, status, and ticket metadata.
- News records include level, location, priority, published date, and contact information.
- Employment records include department, eligibility, salary, last date, and application instructions.

---

## 11. Key Files and Their Roles

- [App.js](App.js): app entry point
- [app/_layout.js](app/_layout.js): onboarding and route-based layout logic
- [app/Config.js](app/Config.js): API URL and endpoint configuration
- [app/api/auth.js](app/api/auth.js): frontend authentication API helpers
- [app/config/firebase.js](app/config/firebase.js): Firebase client initialization
- [src/navigation/AppNavigator.js](src/navigation/AppNavigator.js): React Navigation stack
- [src/screens/HomeScreen.js](src/screens/HomeScreen.js): home screen UI
- [backend/server.js](backend/server.js): backend startup and routing
- [backend/routes/auth.js](backend/routes/auth.js): authentication endpoints
- [backend/routes/schemes.js](backend/routes/schemes.js): scheme catalog and applications
- [backend/routes/complaints.js](backend/routes/complaints.js): grievance proxy layer
- [backend/routes/news.js](backend/routes/news.js): news management API
- [backend/routes/employment.js](backend/routes/employment.js): jobs and opportunities API
- [backend/routes/chatbot.js](backend/routes/chatbot.js): AI assistant integration
- [backend/storage/localStorage.js](backend/storage/localStorage.js): lightweight persistence

---

## 12. Deployment Notes

### Expo App Deployment
The app is configured for Expo with EAS metadata in [app.json](app.json). It can be built for Android and iOS using Expo Application Services.

### Backend Deployment
The backend is structured to run on services such as Render, Railway, or a VPS. For production, it is recommended to replace JSON file persistence with a real database such as:
- MongoDB
- PostgreSQL
- Firestore

### Production Considerations
- secure JWT secret handling
- proper CORS restrictions
- real authentication and role-based authorization
- persistent database instead of local JSON files
- proper file upload storage instead of placeholder endpoints
- monitoring and logging

---

## 13. Current State and Caveats

The repository is a strong prototype and demo project, but a few areas remain transitional:
- some screens are implemented in the Expo Router structure while others are only shell screens in the React Navigation approach
- backend persistence uses local JSON files, not a production database
- Firebase Admin initialization requires serviceAccountKey.json
- complaints are forwarded to a hardcoded external endpoint
- chatbot depends on a local Ollama instance

These are acceptable for development and demonstration but should be upgraded before public production use.

---

## 14. Suggested Next Improvements

- unify the frontend navigation stack into a single architecture
- connect the UI to the backend consistently for all modules
- replace local JSON storage with MongoDB or Firestore
- add real document upload and storage
- add analytics, monitoring, and crash reporting
- implement proper role-based admin capabilities
- add automated tests for routes and screens

---

## 15. Quick Start Summary

```bash
npm install
cd backend && npm install
cd ..
npm start
```

In another terminal:
```bash
cd backend
npm start
```

If the chatbot is required, ensure Ollama is running before testing the /api/chatbot/chat route.

---

## 16. License and Usage

This repository appears to be a project for civic-tech and government-service information delivery. It should be used responsibly and aligned with local regulations and privacy expectations. Any deployment involving citizen data should include proper legal, privacy, and security review.
