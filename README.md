# InnovatePK — AI-Powered Innovation Ecosystem Platform 🇵🇰

> **A unified, end-to-end Innovation Operating System connecting Government Ministries, Universities, Tech Startups, and Researchers into a single national pipeline.**

---

## 📌 Live Deployed Application & Links

- **🌐 Live Production URL**: **[https://innovation-ecosystem-pk.vercel.app](https://innovation-ecosystem-pk.vercel.app)**
- **💻 Public GitHub Repository**: **[https://github.com/farhan-jaffar/innovation-ecosystem](https://github.com/farhan-jaffar/innovation-ecosystem)**
- **🤖 AI Engine Microservice Status**: Active (Powered by xAI Grok API `grok-4.5`)

---

## 🎯 The Real-World Problem & Our Solution

### The Real-World Problem
In emerging tech economies like Pakistan, the national innovation pipeline is deeply fragmented across four critical stakeholders:
1. **Government Ministries (MoITT, HEC, ICT R&D Fund)** allocate billions in research grants but lack transparent, real-time milestone tracking and ROI metrics.
2. **Universities & Research Labs** generate valuable intellectual property (peer-reviewed papers, patents, prototypes) that sit idle in academic silos without commercialization path.
3. **Enterprise Companies & Deep-Tech Startups** struggle to source specialized R&D talent, locate patentable technologies, or access seasoned mentors.
4. **Researchers, Engineers & Students** are disconnected from national grand challenges, commercial grants, and direct industry hiring.

### The Solution: InnovatePK
**InnovatePK** is a full-stack, multi-stakeholder Innovation Operating System designed to bridge this divide. It provides a single platform where government bodies launch challenges, universities publish IP patents, companies sponsor R&D, and AI orchestrates talent matching, proposal scoring, and policy analytics.

---

## ✨ Full Feature Overview

### 1. 🏛️ Multi-Role Ecosystem Authentication & Onboarding
- Role-tailored onboarding flows for **Government**, **University**, **Company**, and **Individual** profiles.
- Role badges, verification status indicators, and personalized dashboard views.

### 2. 💡 National Innovation Marketplace (`/marketplace`)
- Central challenge board for federal grand challenges, industry RFPs, research opportunities, and hackathons.
- Detailed proposal submission engine with proposed budgets, timelines, and milestone breakdowns.
- Visual status tracking (`Open`, `In Review`, `Funded`, `Closed`).

### 3. 🔬 Research & Intellectual Property Hub (`/research`)
- Repository for Pakistani universities to publish peer-reviewed papers, IPO patents, open datasets, and prototypes with DOI tracking.
- Automated **Commercialization Inquiry Engine**: Companies can directly request IP licensing or joint R&D partnerships.

### 4. 💼 Talent Marketplace & ATS (`/jobs`)
- Tech job board connecting enterprise tech firms and AI labs with university graduates and researchers.
- University Recommendation System allowing professors to endorse top students directly for open positions.

### 5. 💰 Grants & Innovation Funding Portal (`/funding`)
- Government grant calls and corporate R&D funds with milestone-based disbursement schedules.
- **Funded Project Ledger**: Real-time financial tracker displaying total grants awarded vs. disbursed amounts per milestone.

### 6. 🚀 Deep-Tech Startup Hub (`/startups`)
- University research spin-off directory categorized by stage (`Idea`, `Prototype`, `MVP`, `Growth`, `Scale`).
- Integrated **Mentorship Request System** connecting founders with verified industry mentors.
- **VC Investor Directory**: Filter investors by ticket size (`PKR 5M - 50M`) and target domains.

### 7. 💬 Collaboration Workspaces (`/workspace`)
- Integrated workspace replacing Slack, Jira, and Zoom for grant project teams.
- **Real-Time Multi-Channel Chat** (Socket.io).
- **Kanban Task Management Board** with drag/status updates (`To Do`, `In Progress`, `Review`, `Done`).
- **Jitsi Meet Video Meetings**: 1-click video conferencing rooms embedded directly in the workspace.

### 8. 📊 Federal Government Policy Dashboard (`/dashboard/government`)
- **Executive KPIs**: Total R&D Grants Allocated, Disbursed Funds, Commercialization Rate %, and Patent Registrations.
- **Provincial Technology & Skill Heatmap**: Live metrics across Punjab, ICT Islamabad, Sindh, KPK, and Balochistan.
- **National University R&D Ranking Board**: Ranking matrix tracking research output, spin-offs, and grant awards.

### 9. 🔍 Universal Search Portal (`/search`)
- Faceted global search querying across grants, papers, patents, startups, jobs, and profiles simultaneously.

### 10. 🤖 Floating AI Assistant Widget
- Persistent chatbot launcher button (`bottom-6 left-6`) visible on every page for immediate AI help.

---

## 🤖 The AI Feature: xAI Grok API Integration

The application features a dedicated **Python FastAPI AI Service (`apps/ai-engine`)** integrated with the **xAI Grok API (`grok-4.5`)** via OpenAI-compatible endpoints.

### What the AI Feature Does
1. **Conversational Assistant (`POST /api/ai/chat`)**: Answers complex questions regarding national R&D grant eligibility, university patents, talent availability, and startup spin-off strategies.
2. **AI Proposal Scorecard (`POST /api/ai/proposal-analysis`)**: Automatically evaluates funding proposals, computing an innovation score, budget feasibility rating, and risk assessment scorecard.
3. **Smart Talent Matcher (`POST /api/ai/recommend/talent`)**: Compares project skill requirements against university researcher CVs to recommend top matched candidates.
4. **Skill Extractor (`POST /api/ai/extract-skills`)**: Parses raw text to extract normalized technical skills, frameworks, and domain competencies.

### The System Prompt & Instructions Behind It

```python
SYSTEM_PROMPT = (
    "You are the AI Innovation Ecosystem Assistant for Pakistan (InnovatePK). "
    "You assist Government ministries (MoITT, HEC), Universities, Tech Companies, Startups, and Researchers. "
    "Provide clear, concise, actionable advice regarding national R&D grants, university research patents, "
    "talent matching, startup spin-offs, and national technology challenges. Keep responses well-formatted, professional, and helpful."
)
```

### Multi-Tier Fallback Architecture
To guarantee 100% uptime even if API credits or network calls are interrupted:
- **Tier 1 (Primary)**: Live xAI Grok API (`grok-4.5` / `grok-2-latest`).
- **Tier 2 (Secondary)**: Groq Cloud Llama 3.3 70B inference.
- **Tier 3 (Tertiary)**: Contextual Innovation Matcher (evaluates query intent to return relevant grant/patent records).

---

## 🛠️ Technology Stack & Tools Used

| Layer | Technology / Service | Role / Description |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | React Framework with SSR & static page generation |
| **Styling & Icons** | Tailwind CSS + Lucide React | Custom White & Green (`#16a34a`) Design System |
| **Animations** | Framer Motion | Smooth page transitions & micro-interactions |
| **Core API** | Node.js + Express.js | REST API handling auth, users, marketplace, workspace |
| **Data Layer** | PostgreSQL + Prisma ORM | Relational data schema & type-safe database access |
| **AI Microservice** | Python FastAPI + `openai` SDK | Grok LLM orchestration & scoring endpoints |
| **AI Model** | **xAI Grok API (`grok-4.5`)** | Primary reasoning & conversational intelligence |
| **Realtime Engine**| Socket.io | Multi-channel chat & live notifications |
| **Video Calls** | Jitsi Meet | Open-source embedded video conferencing |
| **Caching & Vector**| Redis & Docker Compose | Session storage & containerized dev stack |
| **Hosting** | Vercel | Production web deployment |
| **CI/CD** | GitHub Actions | Monorepo build validation pipeline |

---

## 📸 Screenshots of the App in Action

### 1. National Platform Overview & 4-Pillar Hero
![InnovatePK Hero & Stakeholders](/docs/architecture/system_overview.md)
*Connecting Government, Universities, Companies, and Talent in a unified green-accent design system.*

### 2. National Innovation Marketplace & Grants Portal
*Browse open national grand challenges, submit proposals, and review milestone budgets.*

### 3. Floating AI Assistant & Conversational Chat (xAI Grok)
*Persistent bottom-left floating widget launching live xAI Grok reasoning for grant & patent queries.*

### 4. Federal Government Policy Intelligence Dashboard
*Provincial talent heatmaps, grant disbursement ledgers, and university performance rankings.*

---

## 💻 How to Run the Project Locally

### Prerequisites
- Node.js `v20.x` or higher
- Python `3.10+`
- Git

### 1. Clone Repository
```bash
git clone https://github.com/farhan-jaffar/innovation-ecosystem.git
cd innovation-ecosystem
```

### 2. Install Node Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Create `apps/ai-engine/.env`:
```env
PORT=8000
XAI_API_KEY=xai-your-grok-api-key-here
XAI_MODEL=grok-4.5
```

Create `apps/api/.env`:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

### 4. Run Development Servers

Run the individual services in separate terminal windows:

```bash
# Terminal 1: Node.js Core API (Port 5000)
npm run dev:api

# Terminal 2: Next.js Web App (Port 3000)
npm run dev:web

# Terminal 3: Python AI Engine (Port 8000)
cd apps/ai-engine
pip install -r requirements.txt
python main.py
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 📜 Monorepo Build Commands

```bash
# Build all packages & apps in correct dependency sequence
npm run build:all

# Test Web App Build locally
npm run build:web
```

---

## 👤 Author & License

- **Developer**: Farhan Jaffar
- **GitHub**: [@farhan-jaffar](https://github.com/farhan-jaffar)
- **License**: MIT
