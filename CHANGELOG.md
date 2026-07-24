# Changelog

All notable changes to the AI-Powered Innovation Ecosystem Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
