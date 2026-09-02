# 🚀 StudentPilot AI

> **Living Engineering Observatory & AI-Powered Career Operating System**

StudentPilot AI is an enterprise-grade, state-driven engineering learning operating system designed to guide learners from fundamental programming mental models to advanced DSA, system architecture, and placement readiness.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, Vite, TypeScript, TailwindCSS, Framer Motion, Zustand, TanStack Query, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, MongoDB Atlas, Redis, Mongoose, Zod, JWT
- **Core Laboratories**: Visual Terminal Engine, Star Pattern Mastery Lab, DSA Universe Map, Interactive Placement Galaxy

---

## 📋 Prerequisites

Before running the project, make sure you have:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)
- **Git**

---

## ⚙️ Environment Variables Setup

### 1. Backend (ackend/.env)
Create a .env file in the ackend/ directory with the following variables:
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
Create a .env file in the rontend/ directory:
`env
VITE_API_BASE_URL=http://localhost:8000/api/v1
`

---

## 🚀 How to Run the Project (Step-by-Step)

You need to run **two terminal windows** (one for Backend, one for Frontend).

### Step 1: Start the Backend Server

Open your terminal / Command Prompt:
`ash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies (First time only)
npm install

# 3. Start the development server
npm run dev
`
- **Backend URL**: http://localhost:8000
- **Health Check**: http://localhost:8000/api/v1/health

---

### Step 2: Start the Frontend Application

Open a **second terminal / Command Prompt**:
`ash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies (First time only)
npm install

# 3. Start the development server
npm run dev
`
- **Frontend URL**: http://localhost:8443/

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
pm run dev - Run server in development mode (with tsx hot-reloading)
- 
pm run build - Compile TypeScript to JavaScript
- 
pm start - Run production server
- 
pm test - Run backend tests

### Frontend (/frontend)
- 
pm run dev - Start Vite dev server (--host 0.0.0.0)
- 
pm run build - Build production bundle
- 
pm run preview - Preview production build locally
