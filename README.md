# AI-Powered Innovation Ecosystem Platform 🇵🇰

> Monorepo Operating System connecting Government, Universities, Startups, and Researchers into a unified national innovation pipeline.

---

## 🏗️ Architecture & Monorepo Structure

```text
innovation-ecosystem/
├── apps/
│   ├── web/           # Next.js 14 App Router Frontend (White & Green #16a34a UI)
│   ├── api/           # Node.js Express Core API (Auth, Profiles, RBAC)
│   ├── ai-engine/     # Python FastAPI Microservice (Grok/Groq LLM, Skill Extraction)
│   └── realtime/      # Node.js Socket.io Server (Real-time Messaging & Events)
├── packages/
│   ├── shared-types/  # Cross-app TypeScript definitions & domain enums
│   ├── ui/            # Shared React component library
│   └── config/        # Shared Tailwind design tokens & ESLint/TS configs
├── infrastructure/    # Production Dockerfiles & container configs
├── docs/              # System architecture documentation
└── docker-compose.yml # Local development stack (PostgreSQL, Redis, Neo4j, Qdrant)
```

---

## ⚡ Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Databases (Docker)
```bash
docker-compose up -d
```

### 3. Run Development Servers
```bash
# Core API (Port 5000)
npm run dev:api

# Next.js Web App (Port 3000)
npm run dev:web

# Socket.io Realtime Service (Port 5001)
npm run dev:realtime

# Python AI Engine (Port 8000)
cd apps/ai-engine && uvicorn main:app --reload
```

---

## 🛠️ Monorepo Build Commands

```bash
# Build entire monorepo in sequence (shared-types -> ui -> api -> realtime -> web)
npm run build:all

# Individual package builds
npm run build:shared
npm run build:ui
npm run build:api
npm run build:realtime
npm run build:web
```

---

## 📜 Releases & Changelog
Refer to [CHANGELOG.md](file:///C:/Users/hp/.gemini/antigravity-ide/scratch/innovation-ecosystem/CHANGELOG.md) for detailed version history and phase completion metrics.
