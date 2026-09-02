# 🚀 StudentPilot AI

> **Living Engineering Observatory & AI-Powered Career Operating System**

---

## ⚡ Quick Start (TL;DR — Copy & Run)

Open **two separate terminal windows** in the project root:

### 🖥️ Terminal 1 — Backend:
`ash
cd backend
cp .env.example .env    # (On Windows CMD: copy .env.example .env)
npm install
npm run dev
`
> 🌐 **Backend API**: http://localhost:8000  
> 🩺 **Health Check**: http://localhost:8000/api/v1/health

---

### 💻 Terminal 2 — Frontend:
`ash
cd frontend
cp .env.example .env    # (On Windows CMD: copy .env.example .env)
npm install
npm run dev
`
> 🚀 **Frontend Web App**: http://localhost:8443/

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, Vite, TypeScript, TailwindCSS, Framer Motion, Zustand, TanStack Query, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, MongoDB Atlas, Redis, Mongoose, Zod, JWT
- **Core Laboratories**: Visual Terminal Engine, Star Pattern Mastery Lab, DSA Universe Map, Interactive Placement Galaxy

---

## 📋 Prerequisites

Before running the project, make sure you have:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (bundled with Node.js)
- **Git**

---

## ⚙️ Environment Variables Setup

### 1. Backend (ackend/.env)
Create a .env file from .env.example in the ackend/ directory:
`ash
cd backend
cp .env.example .env
`
Default configuration values:
`env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.msf4lvh.mongodb.net/studentpilot_db?retryWrites=true&w=majority
REDIS_URI=redis://localhost:6379
JWT_SECRET=super_secret_jwt_key_studentpilot_2026
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:8443
LOG_LEVEL=info
`

### 2. Frontend (rontend/.env)
Create a .env file from .env.example in the rontend/ directory:
`ash
cd frontend
cp .env.example .env
`
Default configuration values:
`env
VITE_API_BASE_URL=http://localhost:8000/api/v1
`

---

## 📂 Project Structure

`	ext
StudentPilotAI/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Database config
│   │   ├── middlewares/     # Auth, Security, Rate limit
│   │   ├── modules/         # Auth, Roadmap, Revision, StudyPlan, Universe
│   │   └── index.ts         # Main Express Server entry
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components, layout, visualizers
│   │   ├── pages/           # Welcome, Today, Career, World Labs
│   │   ├── store/           # Zustand state management
│   │   ├── dsa-universe/    # DSA visualizers and problem maps
│   │   └── App.tsx          # Main Router and Navigation
│   └── package.json
│
├── docs/                    # Architecture blueprints, PRDs, specs
├── docker-compose.yml       # Docker deployment configuration
└── README.md                # Project documentation
`

---

## 📜 Available Scripts

### Backend (/backend)
- 
pm run dev - Run server with automatic reload (tsx watch)
- 
pm run build - Compile TypeScript to JavaScript
- 
pm start - Run production server
- 
pm test - Run test suite

### Frontend (/frontend)
- 
pm run dev - Start Vite dev server (--host 0.0.0.0)
- 
pm run build - Build production bundle
- 
pm run preview - Preview production build locally
