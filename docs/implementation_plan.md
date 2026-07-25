# AI-Powered Innovation Ecosystem Platform — Phased Execution Plan

> **Purpose**: This document is a handover-ready execution plan for AI agents working sequentially on phases. Each phase is self-contained, ends with a GitHub push, and produces a verifiable deliverable before the next phase begins.

---

## ✅ Confirmed Decisions

| Decision | Answer |
|---|---|
| **LLM Provider** | xAI Grok (free tier via Grok API) |
| **Fallback LLM** | Groq Cloud (Llama 3 — free, fast inference) |
| **Country Focus** | Pakistan 🇵🇰 (English only, no Urdu i18n) |
| **Build Mode** | MVP-first (working prototype per phase, iterate later) |
| **Hosting (MVP)** | Vercel (frontend) + Railway.app (backend/DB) — zero cost to start |
| **Video Meetings** | Jitsi Meet (open-source, self-hostable, free) |
| **Platform** | Responsive Web only (no native mobile) |
| **Design System** | White background + green accent palette |
| **GitHub** | Existing account (same org agent had previous access to) |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              Frontend (Next.js 14 App Router)        │
│  Tailwind CSS · Shadcn/UI · Framer Motion · Zustand  │
└───────────────────┬─────────────────────────────────┘
                    │ REST + WebSocket + GraphQL
┌───────────────────▼─────────────────────────────────┐
│         Backend (Node.js · Express/Fastify)          │
│     Microservices per domain module                  │
└──┬──────────┬──────────┬──────────┬──────────────────┘
   │          │          │          │
Auth      Core API    AI Engine  Realtime
Service   (modules)   (Python)   (Socket.io)
   │          │          │          │
┌──▼──────────▼──────────▼──────────▼──────────────────┐
│     Data Layer                                        │
│  PostgreSQL (relational) · Neo4j (knowledge graph)   │
│  Redis (cache/sessions) · Elasticsearch (search)     │
│  Qdrant (vector DB for AI) · S3/Cloudflare R2 (files)│
└───────────────────────────────────────────────────────┘
```

**Tech Stack Decision (MVP-Confirmed):**
| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR, file-based routing, React ecosystem |
| Styling | Tailwind CSS + Shadcn/UI | Rapid, consistent, accessible UI |
| Design System | **White bg + Green accent** (`#16a34a` family) | User-confirmed palette |
| Animations | Framer Motion | Micro-animations, page transitions |
| State | Zustand + React Query | Simple global state + server state |
| Backend | Node.js + Express | JavaScript everywhere, fast iteration |
| Auth | NextAuth.js + JWT | Multi-provider, role-based |
| AI Engine | Python (FastAPI) + LangChain | LLM orchestration |
| LLM (Primary) | **xAI Grok API** (free tier) | User-confirmed, strong reasoning |
| LLM (Fallback) | **Groq Cloud — Llama 3** (free) | Fast, free inference fallback |
| Primary DB | PostgreSQL + Prisma ORM | Relational data, type-safe queries |
| Graph DB | Neo4j (AuraDB free tier for MVP) | Innovation graph |
| Cache | Redis (Upstash free tier) | Sessions, rate limiting, pub/sub |
| Search | PostgreSQL full-text (MVP) → Elasticsearch later | Free for MVP |
| Vector DB | Qdrant Cloud (free tier) | Semantic similarity, embeddings |
| File Storage | Cloudflare R2 (free 10GB) | Documents, CVs, research papers |
| Realtime | Socket.io | Chat, notifications, collaboration |
| Video Meetings | **Jitsi Meet** (open-source embed, free) | User-confirmed, zero cost |
| Email | Resend (free tier — 3,000/mo) | Transactional emails |
| Payments | Stripe (post-MVP) | Subscription billing |
| Hosting (MVP) | **Vercel** (frontend) + **Railway** (backend/DB) | Free tiers, zero infra cost |
| CI/CD | GitHub Actions | Automated testing + deployment |

---

## Repository Structure

```
innovation-ecosystem/
├── apps/
│   ├── web/                    # Next.js frontend
│   ├── api/                    # Node.js core API
│   ├── ai-engine/              # Python FastAPI AI service
│   └── realtime/               # Socket.io server
├── packages/
│   ├── shared-types/           # TypeScript types shared across apps
│   ├── ui/                     # Shared component library
│   └── config/                 # Shared ESLint, TS, Tailwind configs
├── infrastructure/
│   ├── docker/
│   ├── k8s/
│   └── terraform/
├── docs/
│   ├── api/                    # API documentation
│   └── architecture/           # Architecture diagrams
└── .github/
    └── workflows/              # CI/CD pipelines
```

---

## Phase Breakdown Summary

| Phase | Name | Status | Deliverable Built |
|---|---|---|---|
| **0** | Repo Setup & DevOps Foundation | ✅ Completed | Monorepo, CI/CD, Docker, shared packages |
| **1** | Auth & User Profiles | ✅ Completed | Multi-role auth, profiles, JWT, onboarding |
| **2** | Innovation Marketplace | ✅ Completed | Challenges, RFPs, proposals, Kanban board |
| **3** | Research Hub | ✅ Completed | Research papers, patents, datasets, DOIs |
| **4** | Talent Marketplace | ✅ Completed | Job board, ATS, student endorsements |
| **5** | Funding Marketplace | ✅ Completed | Grants, proposal evaluation, financial ledger |
| **6** | Startup Hub | ✅ Completed | Startup profiles, pitch decks, mentors, VCs |
| **7** | Collaboration Workspace | ✅ Completed | Multi-channel chat, task Kanban, Jitsi video |
| **8** | Government Policy Dashboard | ✅ Completed | KPIs, provincial skill heatmap, university rankings |
| **9** | AI Engine & Assistant | ✅ Completed | Grok/Llama 3 AI chatbot, skill extractor, candidate matcher |
| **10** | Universal Search & Verification | ✅ Completed | Universal search portal, 100% clean monorepo build |

---

## GitHub Workflow for Agent Handover

```bash
# Pull latest from main
git checkout main
git pull origin main
```

---

## Post-MVP Roadmap (Parked Features)

These are confirmed features to add **after** MVP is live and getting users:

- Stripe subscription billing & premium plans
- OAuth (Google, GitHub, LinkedIn)
- 2FA (TOTP)
- Elasticsearch upgrade (from PostgreSQL FTS)
- Kubernetes + full DevOps
- Urdu language support (i18n)
- Native mobile app
- Full OWASP penetration testing
- Load testing (k6)
