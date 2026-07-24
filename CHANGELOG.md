# Changelog

All notable changes to the AI-Powered Innovation Ecosystem Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.8.0] - 2026-07-25 (Phase 6 Startup Hub Release)

### Added
- **Startup & University Spin-Off Discovery Feed (`/startups`)**: Discovery portal for deep-tech startups and university spin-offs with stage pills (`MVP`, `Prototype`, `Growth`), industry filters, pitch deck PDF badges, and academic research lineage indicators.
- **Register Startup Form (`/startups/create`)**: Registration flow for founders and university research spin-offs to publish pitch deck links, team size, funding raised, and affiliated university labs.
- **Startup Profile View (`/startups/[id]`)**: Full startup showcase featuring team composition, academic IP lineage links, pitch deck viewer button, and direct mentorship request modal.
- **Mentor Directory & Request Portal (`/mentors`)**: Verified industry mentor directory connecting startups with CTOs, VPs of AI, and venture partners for 1-on-1 advice.
- **Investor Directory & VC Showcase (`/investors`)**: Showcase of seed stage venture capital funds, corporate VC arms, and angel investors backing deep-tech spin-offs in Pakistan.
- **Startup Hub REST API Endpoints (`apps/api/src/routes/startupRoutes.ts`)**:
  - `GET /api/startups` (filtered startup list)
  - `GET /api/startups/:id` (startup profile & view counter)
  - `POST /api/startups` (register startup profile)
  - `GET /api/mentors` (mentor directory search)
  - `GET /api/investors` (investor directory search)
  - `POST /api/mentorship/request` (submit 1-on-1 mentorship request)
- **Domain Models & Seed Data**: Added `Startup`, `MentorProfile`, `InvestorProfile`, and `MentorshipRequest` Prisma models and pre-loaded DataStore with realistic Pakistan startups (CropVision AI, SolarGrid Dynamics), mentors (Zainab Khan), and VC funds (PakAgri Ventures).

---

## [0.7.0] - 2026-07-25 (Phase 5 Funding Marketplace Release)

### Added
- **Funding Opportunities Discovery Feed (`/funding`)**: National grant marketplace with filters for grant types (`National Grants`, `R&D Grants`, `Seed Funds`), eligibility badges (`Universities`, `Startups`, `Researchers`), domain chips, total budget indicators, and application deadline tracking.
- **Post Funding Opportunity / Grant Call Form (`/funding/create`)**: Grant call publication wizard for government ministries, corporate sponsors, and funding agencies.
- **Grant Detail View & Proposal Modal (`/funding/[id]`)**: Detail page displaying eligibility requirements, milestone disbursement types, and interactive grant proposal submission modal.
- **Funder Proposal Evaluation Dashboard (`/funding/[id]/proposals`)**: Funder evaluation portal to review grant proposals, approve funding, and automatically launch funded projects with mobilization grant disbursements.
- **Active Funded Projects Directory (`/funded-projects`)**: Transparency feed for tracking national grant execution, recipient labs, total awarded amounts, and milestone progress percentages.
- **Project Milestone & Financial Disbursement Tracker (`/funded-projects/[id]`)**: Financial ledger and milestone compliance tracker displaying tranche disbursements and escrow balances.
- **Funding Marketplace REST API Endpoints (`apps/api/src/routes/fundingRoutes.ts`)**:
  - `GET /api/funding` (filtered grant calls)
  - `GET /api/funding/:id` (detail view & view counter)
  - `POST /api/funding` (publish grant opportunity)
  - `POST /api/funding/:id/proposal` (submit technical grant proposal)
  - `GET /api/funding/:id/proposals` (funder proposal evaluation feed)
  - `PUT /api/funding/proposals/:proposalId` (approve/reject proposal)
  - `GET /api/funding/my-proposals` (applicant proposals tracking)
  - `GET /api/funding/funded-projects` (list active funded projects)
  - `GET /api/funding/funded-projects/:id` (project ledger & milestone tracker)
  - `PUT /api/funding/funded-projects/:id/milestone` (update milestone & release tranche disbursement)
- **Domain Models & Seed Data**: Added `FundingOpportunity`, `FundingProposal`, and `FundedProject` Prisma models and pre-loaded DataStore with realistic Pakistan grants (MoITT 15M AI Grand Challenge, HEC 8M Tech Transfer Fund, Systems Ltd 5M Accelerator Fund) and an active funded project with 2 released disbursement tranches.

---

## [0.6.0] - 2026-07-25 (Phase 4 Talent Marketplace Release)

### Added
- **Jobs & Fellowship Discovery Feed (`/jobs`)**: National tech job board with filters for job types (`Full Time`, `Research Fellowship`, `Internship`, `Contract`), domain chips, experience level badges, salary ranges, and remote/hybrid work toggle.
- **Post a Position Form (`/jobs/create`)**: Job posting wizard for tech companies, university AI labs, and government agencies to recruit top candidates.
- **Job Detail & Application Modal (`/jobs/[id]`)**: Position detail page with salary/perks, required technical skills, application modal with resume link, and **University Official Student Recommendation** modal.
- **Company ATS Kanban Board (`/jobs/[id]/ats`)**: 6-column Applicant Tracking System (`Applied` ➔ `Screened` ➔ `Schedule Interview` ➔ `Offer Sent` ➔ `Hired` / `Rejected`) for recruiters.
- **Talent Discovery Feed (`/talent`)**: Recruiter portal for browsing verified AI researchers, software engineers, Ph.D. scholars, and university students by skills, availability, and university affiliations.
- **Talent Marketplace REST API Endpoints (`apps/api/src/routes/talentRoutes.ts`)**:
  - `GET /api/jobs` (filtered job listings)
  - `GET /api/jobs/talent-feed` (talent search directory)
  - `GET /api/jobs/:id` (detail & view counter)
  - `POST /api/jobs` (create job position)
  - `POST /api/jobs/:id/apply` (submit job application & resume)
  - `GET /api/jobs/:id/applications` (fetch candidates for ATS)
  - `PUT /api/jobs/applications/:appId` (update ATS stage)
  - `POST /api/jobs/:id/recommend` (university student endorsement)
- **Domain Models & Seed Data**: Added `JobPosting`, `JobApplication`, and `UniversityRecommendation` Prisma models and pre-loaded DataStore with realistic Pakistan job openings (Senior AI Architect at Systems Limited, NCAI Research Fellow, Robotics Intern).

---

## [0.5.0] - 2026-07-25 (Phase 3 Research Hub Release)

### Added
- **Research Hub Discovery Feed (`/research`)**: National repository for discovering research papers, patents, open datasets, and prototypes with domain filters, publication type pills (`Papers`, `Patents`, `Open Datasets`), live search, citation counters, and commercial funding request indicators.
- **Publish Research / Patent Form (`/research/create`)**: Deposition form for academic papers, patent filings, and datasets supporting DOI references, open access licensing, and grant funding requests.
- **Research Detail View (`/research/[id]`)**: Full abstract viewer with DOI citations, author affiliations, PDF download tracker, and interactive **Commercialization & Collaboration Request Modal**.
- **University Research Showcase (`/universities/[id]/research`)**: Dedicated university showcase page for institutional IP and faculty publications.
- **Individual Researcher Portfolio (`/profile/[username]/research`)**: Researcher portfolio page displaying authored papers, patents, and datasets.
- **Research Hub REST API Endpoints (`apps/api/src/routes/researchRoutes.ts`)**:
  - `GET /api/research` (filtered list by domain, publicationType, search, fundingRequest, author)
  - `GET /api/research/:id` (detail & view counter)
  - `POST /api/research` (publish research paper/patent/dataset)
  - `POST /api/research/:id/download` (track PDF/Dataset downloads)
  - `POST /api/research/:id/collab` (submit commercialization/grant inquiry to authors)
- **Domain Models & Seed Data**: Added `Research` and `ResearchCollabInquiry` Prisma models and pre-loaded DataStore with realistic Pakistan research papers (Hyperspectral Crop Rust Detection), IP patents (Solar Microgrid DQN Controller), and Open Datasets (PCDH-2026).

---

## [0.4.0] - 2026-07-25 (Phase 2 Innovation Marketplace Release)

### Added
- **Marketplace Discovery Feed (`/marketplace`)**: Innovation marketplace feed featuring domain pills (`AgriTech`, `Robotics & AI`, `CleanEnergy`, `FinTech`, `HealthTech`, `EdTech`), ProjectType filter tabs, live search, and bookmarking.
- **Opportunity Creation Form (`/marketplace/create`)**: Rich posting interface for publishing Government Challenges, Industry RFPs, Research Lab Opportunities, and Hackathons.
- **Opportunity Detail View (`/marketplace/[id]`)**: Comprehensive detail view with organization badges, grant/budget tags, milestone roadmap, and interactive technical proposal submission modal.
- **Poster Application Kanban Board (`/marketplace/[id]/applications`)**: 5-column Kanban pipeline board (`Received` ➔ `In Review` ➔ `Shortlisted` ➔ `Accepted` / `Rejected`) for opportunity creators.
- **Applicant Tracking Dashboard (`/my-applications`)**: User proposal tracking interface displaying submission status and timeline.
- **Bookmarked Opportunities Dashboard (`/saved`)**: User saved opportunities dashboard.
- **Marketplace REST API Endpoints (`apps/api/src/routes/marketplaceRoutes.ts`)**:
  - `GET /api/marketplace` (filtered list)
  - `GET /api/marketplace/:id` (detail & view counter)
  - `POST /api/marketplace` (create post)
  - `PUT /api/marketplace/:id` (update post)
  - `DELETE /api/marketplace/:id` (delete post)
  - `POST /api/marketplace/:id/apply` (submit technical proposal)
  - `GET /api/marketplace/:id/applications` (fetch proposals for poster)
  - `PUT /api/marketplace/applications/:appId` (kanban status update)
  - `GET /api/marketplace/my-applications` (fetch applicant's proposals)
  - `POST /api/marketplace/:id/bookmark` (toggle bookmark)
  - `GET /api/marketplace/saved` (fetch saved opportunities)
- **Domain Models & Seed Data**: Added `PostedOpportunity`, `Application`, and `Bookmark` Prisma schema models and pre-loaded DataStore with 4 realistic Pakistan national challenges & grants.

---

## [0.3.0] - 2026-07-25 (Phase 0 Monorepo & DevOps Foundation Completion)

### Added
- **Socket.io Realtime Service (`apps/realtime`)**: Full WebSockets event server for real-time collaboration, chat, and room notifications.
- **Python FastAPI AI Engine (`apps/ai-engine`)**: Python microservice stub with Grok (xAI) and Groq LLM skill extraction, Neo4j, and Qdrant integration.
- **Shared Component Library (`packages/ui`)**: Shared React components (`Button`, `Card`) for monorepo reusability.
- **Shared Design Configuration (`packages/config`)**: Exported design tokens (`#16a34a` primary green system).
- **Local Dev Stack (`docker-compose.yml`)**: Multi-container Docker Compose definition for PostgreSQL, Redis, Neo4j, and Qdrant.
- **CI/CD Pipelines (`.github/workflows/`)**:
  - `ci.yml`: Automated typechecking, build verification, and linting.
  - `deploy-prod.yml`: Production deployment configurations for Vercel (web) & Railway (API/services).
- **Container Infrastructure (`infrastructure/docker/`)**: Production Dockerfiles for `api` and `ai-engine`.
- **Architecture Documentation (`docs/architecture/system_overview.md`)**: Full topography diagrams and component specifications.

### Changed
- **Root Build Pipeline**: Added `npm run build:all` command that builds `@innovation/shared-types`, `@innovation/ui`, `@innovation/api`, `@innovation/realtime`, and `@innovation/web` cleanly in sequence.

---

## [0.2.0] - 2026-07-25 (Phase 1 Audit Gap Closure)

### Added
- **API `POST /api/auth/logout`**: Implemented session logout endpoint.
- **API `POST /api/auth/refresh`**: Implemented JWT refresh token verification & rotation logic.
- **API `POST /api/auth/verify-email`**: Implemented token-based email verification endpoint.
- **API `PUT /api/auth/change-password`**: Endpoint for changing user passwords.
- **API `DELETE /api/users/me`**: Endpoint for account deletion.
- **API `POST /api/users/me/avatar`**: Endpoint for uploading avatar/logo image data.
- **Frontend `/settings/account`**: Account settings page supporting password change and account deletion.
- **Frontend `/auth/verify-email`**: Interactive email verification route handling token query params.
- **Frontend Onboarding 3-Step Wizard**: Upgraded registration flow into a full 3-step onboarding process (Role Selection -> Account Setup -> Role Profile Setup).
- **Environment Templates**: Created `.env.example` for `apps/api` and `apps/web`.

### Changed
- **JWT Authentication**: Replaced mock refresh token string with cryptographic JWT refresh tokens (`7d` expiry).
- **Profile Routing**: Unified profile routes and completeness metrics calculation.
- **Documentation**: Updated `phase1_audit.md` to reflect 100% completion of Phase 1 requirements.

---

## [0.1.0] - 2026-07-24 (Phase 1 Initial Release)

### Added
- Initial monorepo workspace setup with `apps/api`, `apps/web`, and `packages/shared-types`.
- Multi-role authentication & user profile system for Government, Universities, Companies, and Individuals.
- In-memory DataStore pre-seeded with 4 Pakistan stakeholder personas.
- Next.js 14 frontend with White background & Primary Green accent design system (`#16a34a`).
