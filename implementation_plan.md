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

| Phase | Name | Duration Est. | MVP Deliverable |
|---|---|---|---|
| **0** | Repo Setup & DevOps Foundation | 1–2 days | Monorepo, CI/CD, Railway/Vercel deploy |
| **1** | Auth & User Profiles | 4–5 days | Login, 4 user types, basic profiles |
| **2** | Innovation Marketplace (Core) | 5–7 days | Project/challenge posting & discovery |
| **3** | Research Hub | 4–5 days | Research papers, patents, datasets |
| **4** | Talent Marketplace | 4–5 days | Jobs, internships, applications |
| **5** | Funding Marketplace | 4–5 days | Grants, proposals, fund tracking |
| **6** | Startup Hub | 4–5 days | Startup profiles, mentors, investors |
| **7** | Collaboration Workspace | 5–7 days | Chat, tasks, Jitsi meetings |
| **8** | AI Engine — Phase 1 (Core) | 5–7 days | Grok skill extraction, talent matching |
| **9** | AI Engine — Phase 2 (Advanced) | 7–10 days | Innovation Graph, Proposal Analysis, Chat |
| **10** | Dashboards & Analytics | 4–5 days | Role-based dashboards, KPI tracking |
| **11** | Notifications, Search & Discovery | 4–5 days | PG full-text search, smart notifications |
| **12** | Admin Panel & Moderation | 3–4 days | Admin tools, verification queue |
| **13** | Performance & Security | 3–4 days | Rate limiting, auth hardening, caching |
| **14** | Public Launch Prep | 2–3 days | Landing page, onboarding, seed data |

---

## Phase 0 — Repository Setup & DevOps Foundation

### Goal
Create the monorepo, configure tooling, establish CI/CD, and spin up local dev environment.

### Tasks
- [ ] Initialize Turborepo monorepo at `innovation-ecosystem/`
- [ ] Create workspace packages: `apps/web`, `apps/api`, `apps/ai-engine`, `apps/realtime`, `packages/shared-types`, `packages/ui`, `packages/config`
- [ ] Configure TypeScript (`tsconfig.json`) across all packages
- [ ] Configure ESLint + Prettier with shared configs
- [ ] **Set up Tailwind CSS + Shadcn/UI in `apps/web` with confirmed design tokens:**
  - Background: `#ffffff` (white)
  - Primary accent: `#16a34a` (green-600)
  - Secondary: `#dcfce7` (green-100 — tabs, chips)
  - Hover: `#15803d` (green-700)
  - Text: `#111827` (gray-900)
  - Muted: `#6b7280` (gray-500)
  - Configure in `tailwind.config.js` as `primary` color
- [ ] Create `docker-compose.yml` for local dev: PostgreSQL, Redis, Neo4j (AuraDB free for MVP), Qdrant
- [ ] Write `package.json` scripts: `dev`, `build`, `test`, `lint`
- [ ] Set up GitHub repository with branch protection on `main`
- [ ] Create GitHub Actions workflows:
  - `ci.yml` — lint, type-check, test on PRs
  - `deploy-preview.yml` — Vercel preview on PRs
  - `deploy-prod.yml` — deploy to Vercel (web) + Railway (api, ai-engine) on merge to `main`
- [ ] Create `.env.example` files for all apps (including `GROK_API_KEY`, `GROQ_API_KEY`)
- [ ] Write `README.md` with setup instructions
- [ ] Initialize Prisma in `apps/api` with PostgreSQL connection (Railway PostgreSQL)
- [ ] Create base database schema (empty models, will be populated per phase)
- [ ] Configure Vercel project linked to GitHub repo
- [ ] Configure Railway services: `api`, `ai-engine`, `realtime`, PostgreSQL, Redis

### GitHub Deliverable
- Commit: `feat: monorepo setup with CI/CD, Vercel+Railway deploy, green design system`
- Tag: `v0.1.0-foundation`

---

## Phase 1 — Authentication & User Profile System

### Goal
Multi-role authentication system with complete profile management for all 4 stakeholder types. All UI uses white background with green accent design system.

> **MVP Scope**: Core auth flows + profile CRUD. Skip 2FA and OAuth for MVP (add in Phase 13). Focus on email/password + role onboarding.

### Database Models
```
User (base)
├── id, email, passwordHash, role, status, createdAt
├── emailVerified, twoFactorEnabled
└── profileId (polymorphic FK)

GovernmentProfile
├── organizationName, ministry, jurisdiction
├── website, logo, verificationDocuments
└── contactInfo

UniversityProfile  
├── name, country, city, ranking, accreditation
├── departments[], faculties[], labs[], incubators[]
└── logo, website, verificationStatus

CompanyProfile
├── name, industry, size, stage (startup/SME/enterprise)
├── description, website, logo, socialLinks
└── verificationStatus

IndividualProfile
├── firstName, lastName, headline, bio
├── education[], experience[], skills[]
├── researchInterests[], publications[], patents[]
├── githubUrl, portfolioUrl, linkedinUrl
└── availability (open/busy/not_available)
```

### Features
**MVP (Phase 1):**
- [ ] Email + password registration with email verification (Resend)
- [ ] Role selection during onboarding: Government / University / Company / Individual
- [ ] Role-specific onboarding wizard (3 steps each — keep it simple)
- [ ] Profile completeness indicator (%) — green progress bar
- [ ] Profile edit pages for all 4 user types
- [ ] Public profile view pages (`/profile/[username]`)
- [ ] Avatar/logo upload (Cloudflare R2)
- [ ] JWT access tokens + refresh token rotation
- [ ] Role-based access control (RBAC) middleware
- [ ] Password reset flow
- [ ] Account settings (email, password, delete account)

**Post-MVP (skip for now):**
- [ ] OAuth (Google, GitHub, LinkedIn) — Phase 13
- [ ] 2FA — Phase 13
- [ ] Document verification upload — Phase 12 (Admin)

### API Endpoints
```
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
POST /auth/verify-email
POST /auth/forgot-password
POST /auth/reset-password
GET  /users/me
PUT  /users/me
GET  /users/:id/profile
POST /users/me/avatar
```

### Frontend Pages
```
/auth/register
/auth/login
/auth/verify-email
/auth/forgot-password
/onboarding/[step]
/profile/[username]
/settings/account
/settings/profile
```

### GitHub Deliverable
- PR: `feat: authentication and user profile system`
- Tag: `v0.2.0-auth`

---

## Phase 2 — Innovation Marketplace (Core Module)

### Goal
The central hub where all stakeholder types can post and discover opportunities.

### Database Models
```
Project/Opportunity
├── id, title, description, type (enum below)
├── postedBy (userId), organizationId
├── domain (enum: AI/HealthTech/AgriTech/EdTech/...)
├── budget, currency, budgetType (fixed/range/TBD)
├── deadline, startDate, duration
├── requiredSkills[], requiredRoles[]
├── status (draft/open/in_review/funded/closed/completed)
├── visibility (public/private/invite_only)
├── attachments[], tags[]
├── milestones[], timeline
└── viewCount, applicationCount, collaboratorCount

ProjectType Enum:
- GOVERNMENT_CHALLENGE
- INDUSTRY_CHALLENGE  
- RESEARCH_OPPORTUNITY
- HACKATHON
- COMPETITION
- FUNDING_OPPORTUNITY
- COLLABORATION_REQUEST
- OPEN_SOURCE_PROJECT

Application
├── projectId, applicantId, applicantType
├── coverLetter, proposedApproach
├── proposedBudget, proposedTimeline
├── attachments[], status
└── reviewNotes, reviewedBy, reviewedAt
```

### Features
- [ ] Create/edit opportunity form (rich text editor)
- [ ] Opportunity listing page with filters (type, domain, budget, deadline, location)
- [ ] Opportunity detail page with full information
- [ ] Application system (cover letter, attachments, proposal)
- [ ] Application tracking for posters (kanban: received → reviewed → shortlisted → accepted/rejected)
- [ ] Application tracking for applicants
- [ ] Save/bookmark opportunities
- [ ] Share opportunities
- [ ] Follow organizations (get notified of new posts)
- [ ] Domain-based categorization and tags
- [ ] Featured/sponsored opportunities
- [ ] Milestone tracker on projects
- [ ] Status management by poster

### Frontend Pages
```
/marketplace                    # Discovery feed
/marketplace/create             # Create opportunity
/marketplace/[id]               # Opportunity detail
/marketplace/[id]/applications  # Manage applications (poster)
/my-applications                # Track my applications
/saved                          # Bookmarked items
```

### GitHub Deliverable
- PR: `feat: innovation marketplace core`
- Tag: `v0.3.0-marketplace`

---

## Phase 3 — Research Hub

### Goal
Repository for universities and researchers to publish, discover, and commercialize research.

### Database Models
```
Research
├── id, title, abstract, fullText (or pdfUrl)
├── authors[], affiliations[]
├── domain, subDomain, keywords[]
├── publicationType (paper/patent/dataset/prototype/idea)
├── publishedDate, journalName, doi, externalUrl
├── license, accessType (open/restricted/commercial)
├── citations, downloads, views
├── collaborationOpen (bool)
├── fundingRequest (bool), fundingAmount
└── status (draft/published/archived)

Patent
├── researchId?, title, inventors[]
├── patentNumber, filingDate, grantDate
├── country, jurisdiction
└── licensingAvailable, licensingTerms

Dataset
├── researchId?, title, description
├── format, size, rows, columns
├── downloadUrl, previewUrl
└── license
```

### Features
- [ ] Research paper upload (PDF + metadata form)
- [ ] Patent registration form
- [ ] Dataset upload with preview
- [ ] Research discovery feed with filters (domain, type, date, affiliation)
- [ ] Citation tracking (import from DOI)
- [ ] Download and view tracking
- [ ] Collaboration request on research (company → researcher)
- [ ] Funding request flag (researchers can flag research needing funding)
- [ ] Government can "express interest" in research
- [ ] University research showcase page
- [ ] Researcher portfolio page (all their research)
- [ ] Related research suggestions (manual tags-based, AI enhanced in Phase 8)

### Frontend Pages
```
/research                       # Discovery
/research/create                # Upload research
/research/[id]                  # Research detail
/universities/[id]/research     # University research page
/profile/[username]/research    # Individual research portfolio
```

### GitHub Deliverable
- PR: `feat: research hub`
- Tag: `v0.4.0-research`

---

## Phase 4 — Talent Marketplace

### Goal
Companies post opportunities; platform connects them with best-matched talent.

### Database Models
```
JobPosting
├── id, companyId, title, description
├── type (FULL_TIME/PART_TIME/INTERNSHIP/RESEARCH_POSITION/CONTRACT)
├── domain, requiredSkills[], preferredSkills[]
├── experienceLevel (entry/mid/senior/expert)
├── salaryMin, salaryMax, currency, salaryType (monthly/yearly)
├── location, remote (bool), hybrid (bool)
├── applicationDeadline, startDate
├── perks[], responsibilities[], requirements[]
└── status (draft/active/paused/closed)

JobApplication
├── jobId, applicantId
├── coverLetter, resumeUrl
├── status (applied/screened/interview/offer/hired/rejected)
└── notes, interviewDate

UniversityRecommendation
├── jobId, universityId, studentId
└── recommendedBy, note, date
```

### Features
- [ ] Job/internship posting form
- [ ] Talent discovery page (companies browse individuals)
- [ ] Job listings page (individuals browse jobs)
- [ ] Apply to jobs (attach CV, cover letter)
- [ ] University can officially recommend students for jobs
- [ ] Applicant tracking system (ATS) for companies
- [ ] Saved candidates list for companies
- [ ] Job alerts for individuals (email + in-app)
- [ ] Resume/CV builder (basic structured form → PDF export)
- [ ] Skills endorsement (peer-to-peer)
- [ ] Interview scheduling (calendar integration)

### Frontend Pages
```
/jobs                           # Job discovery
/jobs/create                    # Post a job
/jobs/[id]                      # Job detail + apply
/company/[id]/jobs              # Company job board
/my-jobs                        # My applications
/talent                         # Talent discovery (companies)
/talent/[userId]                # Talent profile detail
```

### GitHub Deliverable
- PR: `feat: talent marketplace`
- Tag: `v0.5.0-talent`

---

## Phase 5 — Funding Marketplace

### Goal
Government, companies, and NGOs post grants; universities and startups apply and track funded projects.

### Database Models
```
FundingOpportunity
├── id, funderId (userId/orgId), title, description
├── type (GRANT/SCHOLARSHIP/INNOVATION_CHALLENGE/SEED_FUNDING/R&D_FUNDING)
├── amount, currency, fundingType (full/partial/milestone_based)
├── eligibility (individual/university/startup/company/any)
├── domain, requirements[]
├── applicationDeadline, projectStartDate, projectEndDate
├── maxApplicants, documentsRequired[]
└── status (draft/open/evaluation/closed/awarded)

FundingApplication
├── fundingId, applicantId, applicantType
├── proposalTitle, proposalDescription
├── budget (detailed breakdown), timeline, milestones[]
├── teamMembers[], supervisors[]
├── attachments[]
├── status (submitted/under_review/shortlisted/approved/rejected)
└── aiScore (from Phase 9), reviewerNotes[]

FundedProject
├── fundingApplicationId
├── currentMilestone, milestones[]{title, dueDate, status, evidence}
├── disbursements[]{amount, date, status}
├── progressReports[], finalReport
└── kpis[]{metric, target, actual}
```

### Features
- [ ] Funding opportunity creation form
- [ ] Funding discovery page with filters
- [ ] Proposal submission (multi-step form: team, budget, timeline, milestones)
- [ ] Proposal status tracking for applicants
- [ ] Proposal review dashboard for funders
- [ ] Funded project management (milestone tracking, progress reports)
- [ ] Disbursement tracking
- [ ] KPI dashboard for funders (government dashboard)
- [ ] Automated deadline reminders

### Frontend Pages
```
/funding                        # Funding opportunities
/funding/create                 # Post funding
/funding/[id]                   # Funding detail + apply
/funding/[id]/proposals         # Review proposals (funder)
/my-proposals                   # Track my proposals
/funded-projects                # Active funded projects
/funded-projects/[id]           # Project milestone tracker
```

### GitHub Deliverable
- PR: `feat: funding marketplace`
- Tag: `v0.6.0-funding`

---

## Phase 6 — Startup Hub

### Goal
Support researchers and students in spinning up startups with mentors, investors, incubators, and service providers.

### Database Models
```
Startup
├── id, founderIds[], name, tagline, description
├── industry, stage (idea/prototype/mvp/growth/scale)
├── foundedDate, country, city
├── logo, website, pitchDeckUrl, demoUrl
├── teamSize, revenue (range), fundingRaised
├── originType (university_research/personal/corporate_spinoff)
├── linkedResearchIds[], linkedUniversityId
└── status (active/stealth/acquired/closed)

MentorProfile
├── userId
├── expertise[], industries[], mentorshipType (free/paid)
├── hourlyRate?, availability, maxMentees
└── sessionLink, testimonials[]

InvestorProfile  
├── userId/orgId
├── investmentStages[], investmentDomains[]
├── ticketSizeMin, ticketSizeMax
├── portfolioStartups[], investmentCriteria
└── contactPreference

MentorshipRequest
├── startupId, mentorId, message
└── status, sessionScheduled
```

### Features
- [ ] Startup creation and profile management
- [ ] Startup discovery page (for investors, mentors, companies)
- [ ] Mentor directory with filter by expertise
- [ ] Investor directory
- [ ] Mentorship request flow
- [ ] Incubator/accelerator directory
- [ ] Service provider directory (lawyers, accountants, designers)
- [ ] Startup ← → Research linkage (show which research spawned the startup)
- [ ] Startup ← → University affiliation
- [ ] Pitch deck upload and sharing (private/public)

### Frontend Pages
```
/startups                       # Startup discovery
/startups/create                # Register startup
/startups/[id]                  # Startup profile
/mentors                        # Mentor directory
/investors                      # Investor directory
/mentorship/request/[mentorId]  # Request mentorship
```

### GitHub Deliverable
- PR: `feat: startup hub`
- Tag: `v0.7.0-startups`

---

## Phase 7 — Collaboration Workspace

### Goal
Replace external tools (Slack, Notion, Jira) with an integrated workspace inside the platform.

### Architecture
- Socket.io for realtime messaging
- Redis pub/sub for message broadcasting at scale
- Separate `apps/realtime` service
- Jitsi Meet embedded via iframe for video meetings (free, no account needed for participants)

> **MVP Scope**: Chat + tasks are priority. Jitsi for video. Skip document editor for MVP (link to Google Docs instead). Add full doc editor post-MVP.

### Database Models
```
Workspace
├── id, projectId (linked to marketplace item)
├── name, members[]{userId, role (admin/member/viewer)}
└── createdAt, settings

Channel
├── workspaceId, name, type (general/announcements/private)
└── members[]

Message
├── channelId, senderId, content (rich text)
├── attachments[], reactions[], threadId?
└── editedAt, deletedAt

Task
├── workspaceId, title, description
├── assignees[], createdBy
├── status (todo/in_progress/review/done)
├── priority, dueDate, labels[]
└── parentTaskId? (subtasks)

Document
├── workspaceId, title, content (JSON rich text)
├── createdBy, collaborators[]
└── version, history[]

Meeting
├── workspaceId, title, scheduledAt, duration
├── attendees[], meetingUrl
└── recordingUrl?, notes?
```

### Features
- [ ] Workspace creation (auto-created when a project is started)
- [ ] Channel-based messaging (text, file attachments, emoji reactions)
- [ ] Thread replies on messages
- [ ] Direct messaging between users
- [ ] Task board (Kanban) with drag-and-drop
- [ ] Task assignment, due dates, priority, labels
- [ ] Collaborative document editor (rich text, similar to Notion)
- [ ] Document version history
- [ ] Meeting scheduler with calendar view
- [ ] **Video meeting via Jitsi Meet** — generate a unique room URL (`meet.jit.si/innovation-{workspaceId}-{timestamp}`), open in modal iframe
- [ ] Notification center (in-app + email digests)
- [ ] File manager (upload, organize, share files within workspace)
- [ ] Project timeline/Gantt view
- [ ] @mentions and notifications

### Frontend Pages
```
/workspace/[id]                 # Workspace home
/workspace/[id]/channels/[channelId]
/workspace/[id]/tasks
/workspace/[id]/docs
/workspace/[id]/docs/[docId]
/workspace/[id]/meetings
/workspace/[id]/files
/messages/[userId]              # Direct messages
```

### GitHub Deliverable
- PR: `feat: collaboration workspace`
- Tag: `v0.8.0-workspace`

---

## Phase 8 — AI Engine Phase 1 (Core Intelligence)

### Goal
Build the Python FastAPI AI service and implement the first tier of AI features.

### Architecture
```
apps/ai-engine/ (Python FastAPI)
├── routers/
│   ├── embeddings.py       # Vector embedding endpoints
│   ├── recommendations.py  # Recommendation endpoints
│   ├── extraction.py       # Skill/CV extraction
│   └── analysis.py         # Proposal analysis
├── services/
│   ├── embedding_service.py
│   ├── recommendation_service.py
│   ├── extraction_service.py
│   └── llm_service.py      # Grok primary, Groq/Llama fallback
├── models/                 # Pydantic models
├── db/                     # Qdrant + Neo4j clients
└── main.py
```

### LLM Configuration
```python
# Primary: xAI Grok (free tier)
GROK_API_KEY = os.getenv("GROK_API_KEY")
grok_client = openai.OpenAI(
    api_key=GROK_API_KEY,
    base_url="https://api.x.ai/v1"
)

# Fallback: Groq Cloud — Llama 3 (free, fast)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")  
groq_client = Groq(api_key=GROQ_API_KEY)

# Strategy: try Grok first, fall back to Groq on rate limit/error
```

### AI Feature 1 — Skill Extraction
- Upload CV (PDF) → Extract skills, experience, education using **Grok** (with Groq/Llama fallback)
- Upload GitHub profile URL → Extract technologies from repos via GitHub API (no LLM cost)
- Upload research paper → Extract domain, keywords, methodologies via Grok
- Store extracted data as structured JSON + embeddings in Qdrant Cloud (free tier)

### AI Feature 2 — Talent Recommendation Engine
- When a job/project is posted → generate embedding of requirements
- Query Qdrant for nearest neighbor individuals
- Return ranked list with match score + explanation
- Support for "find me X" natural language queries

### AI Feature 3 — Research-to-Stakeholder Recommendation
- When research is published → embed abstract
- Query similar companies, government departments, investors
- Send smart notifications to relevant parties

### AI Feature 4 — Innovation Graph (Neo4j)
- Populate Neo4j nodes: User, Skill, Domain, Company, University, Research, Project
- Create relationships: HAS_SKILL, WORKS_AT, PUBLISHED, COLLABORATED_WITH, FUNDED_BY
- Expose graph query API endpoints
- Visualization component on frontend

### API Endpoints (AI Service)
```
POST /ai/extract-skills         # CV/GitHub → skills
POST /ai/embed                  # Text → vector embedding
POST /ai/recommend/talent       # Job description → top candidates
POST /ai/recommend/research     # Research → interested stakeholders
POST /ai/recommend/funding      # Project → relevant grants
POST /ai/graph/query            # Natural language → graph query
GET  /ai/graph/node/:id         # Node neighborhood
```

### GitHub Deliverable
- PR: `feat: ai-engine phase 1 - recommendations and skill extraction`
- Tag: `v0.9.0-ai-phase1`

---

## Phase 9 — AI Engine Phase 2 (Advanced AI)

### Goal
Innovation Assistant (chatbot), Proposal Analysis, Team Builder, Predictive Analytics, Fraud Detection.

### AI Feature 5 — Team Builder
- Input: Project description + required roles
- AI queries graph + vector DB
- Returns: Complete team suggestion (each role filled by best candidate)
- Considers availability, skills, past collaboration history

### AI Feature 6 — Proposal Analysis & Scoring
- Input: Funding proposal documents
- LLM extracts: completeness, innovation score, risk, budget reasonableness
- Output: Structured scorecard with per-dimension scores + notes
- Government reviewers see AI pre-ranked proposals

### AI Feature 7 — Innovation Assistant (Chat)
- LangChain agent with tools: search users, query graph, fetch research, generate timeline
- Natural language interface embedded across the platform
- Example: "Find top 5 NLP researchers in Lahore who are open to collaboration"
- Example: "Generate a project timeline for a 6-month AI health diagnostics project"
- Example: "Summarize this research paper and suggest companies that could commercialize it"

### AI Feature 8 — Predictive Analytics
- Skill demand forecasting (based on job postings trend data)
- Emerging technology detection (from research publications)
- University research-to-commercialization rate
- Innovation hotspot map (geographic clustering)

### AI Feature 9 — Fraud Detection
- Detect duplicate research submissions
- Flag suspicious company/university verifications
- Detect fake certificate uploads (document analysis)
- Spam proposal detection

### GitHub Deliverable
- PR: `feat: ai-engine phase 2 - innovation assistant and advanced analytics`
- Tag: `v0.10.0-ai-phase2`

---

## Phase 10 — Dashboards & Analytics

### Goal
Role-specific dashboards with KPIs, charts, and analytics.

### Government Dashboard
- [ ] National innovation overview (projects, funding, research, startups)
- [ ] Funded project progress tracking (all milestones across all projects)
- [ ] Skill demand heatmap by region and domain
- [ ] University performance rankings
- [ ] Research commercialization rate
- [ ] Economic impact metrics (jobs created, startups formed, patents filed)
- [ ] Predictive charts (future skill gaps, emerging technologies)

### University Dashboard
- [ ] Research output metrics (papers, patents, citations)
- [ ] Faculty collaboration activity
- [ ] Student placement rates
- [ ] Active projects and funding status
- [ ] Industry partnership metrics
- [ ] Research-to-startup pipeline

### Company Dashboard
- [ ] Hiring pipeline metrics
- [ ] R&D collaboration status
- [ ] Active contracts with universities
- [ ] Talent acquisition funnel
- [ ] Innovation project ROI

### Individual Dashboard
- [ ] Profile view analytics
- [ ] Application funnel (applied → shortlisted → hired)
- [ ] Skill gap analysis (vs. market demand)
- [ ] Career trajectory suggestions
- [ ] Research impact metrics (views, citations, downloads)

### Charts Library: Recharts (free, React-native) + custom SVG
> **MVP Scope**: Government + Individual dashboards are priority. University and Company dashboards can be simplified.

### GitHub Deliverable
- PR: `feat: role-specific dashboards and analytics`
- Tag: `v0.11.0-dashboards`

---

## Phase 11 — Notifications, Search & Discovery

### Goal
Global smart search and multi-channel notification system.

### Search (PostgreSQL Full-Text for MVP → Elasticsearch post-MVP)
- [ ] Global search bar (searches across all content types simultaneously)
- [ ] Search result types: People, Research, Jobs, Projects, Funding, Startups, Companies
- [ ] Faceted filtering per result type
- [ ] Search suggestions and autocomplete (using `pg_trgm` similarity)
- [ ] Saved searches with alerts
- [ ] Advanced search with boolean operators

> **MVP Note**: Use PostgreSQL `tsvector`/`tsquery` full-text search for MVP. It handles Pakistani English content well. Migrate to Elasticsearch when search volume grows.

### Notifications
- [ ] In-app notification center (bell icon, inbox)
- [ ] Real-time notifications via Socket.io
- [ ] Email notifications (Resend) with digest options (instant/daily/weekly)
- [ ] Notification categories: applications, messages, recommendations, funding, system
- [ ] Notification preferences per category
- [ ] Push notifications (web push)

### Discovery Feed
- [ ] Personalized home feed (AI-curated based on interests and behavior)
- [ ] "Trending in your domain" section
- [ ] "New research in your area" section
- [ ] Recommended connections

### GitHub Deliverable
- PR: `feat: search, discovery feed, and notifications`
- Tag: `v0.12.0-search-notifications`

---

## Phase 12 — Admin Panel & Moderation

> **MVP Change**: Monetization/Stripe moved to post-MVP. Phase 12 is now Admin Panel (needed before launch).

### Goal
Platform administration, content moderation, and verification workflows.

---

### Features
- [ ] Admin dashboard (user stats, content stats)
- [ ] User management (search, view, suspend, ban, change role)
- [ ] Verification queue (universities, companies, government agencies)
- [ ] Content moderation queue (flagged posts, research, profiles)
- [ ] Platform settings (feature flags, maintenance mode)
- [ ] Audit log (all admin actions)
- [ ] Announcement system (platform-wide notices)

### GitHub Deliverable
- PR: `feat: admin panel and moderation`
- Tag: `v0.12.0-admin`

---

## Phase 13 — Performance & Security Hardening

### Goal
Make the MVP production-ready with essential security and performance.

> **MVP Scope**: Focus on auth security, rate limiting, and basic performance. Skip full pentesting for MVP.

### Security (MVP essentials)
- [ ] Rate limiting on all endpoints (Upstash Redis + `express-rate-limit`)
- [ ] Input sanitization and validation (`zod` schemas on all endpoints)
- [ ] CORS configuration (whitelist frontend domain only)
- [ ] Helmet.js security headers
- [ ] File upload validation (type whitelist, size limit)
- [ ] JWT secret rotation strategy
- [ ] HTTPS enforced (handled by Vercel/Railway)
- [ ] Dependency audit (`npm audit`, `pip-audit`)
- [ ] Add OAuth (Google, GitHub) — deferred from Phase 1
- [ ] Add 2FA (TOTP) — deferred from Phase 1

### Performance (MVP essentials)
- [ ] Redis caching for expensive queries (recommendations, graph queries)
- [ ] Next.js Image optimization
- [ ] Lazy loading for heavy components (collaboration workspace, analytics)
- [ ] API response compression (gzip)
- [ ] PostgreSQL query indexing (review slow queries with `EXPLAIN ANALYZE`)
- [ ] Grok/Groq response streaming for AI assistant

### GitHub Deliverable
- PR: `feat: security hardening and performance optimizations`
- Tag: `v0.13.0-hardened`

---

## Phase 14 — Public Launch Preparation

### Goal
Marketing landing page, onboarding, seed data, and documentation for MVP launch.

### Features
- [ ] **Marketing landing page** (`/`) with:
  - Hero section (white bg, green CTA button)
  - "How it works" (4 stakeholder flows)
  - Feature highlights
  - Pakistan innovation stats / mission
  - Pricing teaser (free MVP)
  - Call-to-action (sign up)
- [ ] Onboarding tutorial (simple 3-step guide per user type)
- [ ] FAQ page
- [ ] Seed data scripts (5 demo users per role, 10 sample projects, 5 sample research papers)
- [ ] Demo mode (explore without signup — read-only)
- [ ] SEO: meta tags, `sitemap.xml`, `robots.txt`, OG images (green-themed)
- [ ] Error tracking: Sentry (free tier)
- [ ] Uptime monitoring: BetterStack (free tier)
- [ ] Privacy Policy and Terms of Service pages
- [ ] Beta waitlist / invite system

### GitHub Deliverable
- PR: `feat: launch preparation - landing page, onboarding, seed data`
- Tag: `v1.0.0-mvp-launch`

---

## GitHub Workflow for Agent Handover

Each agent should follow this workflow:

```bash
# 1. Pull latest from develop
git checkout develop
git pull origin develop

# 2. Create phase branch
git checkout -b phase/X-name

# 3. Work on phase tasks
# ... implement features ...

# 4. Commit with conventional commits
git commit -m "feat(auth): add email verification flow"
git commit -m "feat(auth): implement RBAC middleware"
git commit -m "test(auth): add unit tests for token rotation"

# 5. Push and open PR to develop
git push origin phase/X-name
# Open PR: "Phase X: [Name]"

# 6. After review, merge to develop
# After all phases complete → merge develop to main → tag release
```

### Branch Strategy
```
main          ← production
develop       ← integration (all phases merge here)
phase/0-setup
phase/1-auth
phase/2-marketplace
...
phase/15-launch
```

### Commit Convention (Conventional Commits)
```
feat(scope): new feature
fix(scope): bug fix
test(scope): tests
docs(scope): documentation
refactor(scope): code refactor
chore(scope): config, tooling
```

---

## Agent Handover Checklist (per phase)

Before handing to next agent, verify:

- [ ] All phase tasks are implemented
- [ ] TypeScript compiles without errors (`tsc --noEmit`)
- [ ] Linting passes (`eslint .`)
- [ ] All new API endpoints are documented
- [ ] `.env.example` updated with any new env vars
- [ ] Prisma migrations created and tested (`prisma migrate dev`)
- [ ] Basic unit tests written for critical functions
- [ ] PR opened and merged to `develop`
- [ ] Phase tag pushed (`git tag vX.Y.Z && git push --tags`)
- [ ] `README.md` updated with any new setup steps

---

## ✅ All Decisions Confirmed — Ready for Execution

> [!NOTE]
> All open questions have been answered by the product owner. Agents can begin Phase 0 immediately.

| # | Question | Decision |
|---|---|---|
| 1 | Country/Language | Pakistan 🇵🇰 · English only · No Urdu i18n |
| 2 | LLM Provider | Grok (primary) + Groq/Llama 3 (fallback) — both free |
| 3 | Hosting | MVP on Vercel (web) + Railway (backend) — zero cost |
| 4 | GitHub Repo | Existing account — same org agent had previous access |
| 5 | Build mode | MVP-first per phase · Iterate later |
| 6 | Video Meetings | Jitsi Meet (open-source embed, free) |
| 7 | Mobile | Responsive web only — no native app |
| 8 | Design | White background + green accent (`#16a34a` family) |

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
- Full collaborative document editor (vs. Google Docs link)
- AI Interview Assistant
- AI Patent Similarity Detector
- AI Market Opportunity Detection
