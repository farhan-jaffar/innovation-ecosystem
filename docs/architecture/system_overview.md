# AI-Powered Innovation Ecosystem Platform Architecture

## System Topography

```
[ Next.js 14 Web Portal ] (White + Green #16a34a Design System)
       │
       ├── REST API / JSON ──> [ Express Core API (apps/api) ] ──> [ PostgreSQL + Prisma ]
       │                                     │
       ├── WebSockets ────────> [ Socket.io Realtime (apps/realtime) ] ──> [ Redis Cache ]
       │                                     │
       └── AI Pipelines ──────> [ Python FastAPI Engine (apps/ai-engine) ]
                                             ├── Grok LLM / Groq Llama 3
                                             ├── Neo4j Innovation Knowledge Graph
                                             └── Qdrant Vector Store (Talent Match)
```

## Key Infrastructure Components

1. **Web App (`apps/web`)**: Next.js 14 App Router, React 18, Tailwind CSS with customized green design tokens (`#16a34a`), Lucide React Icons.
2. **Core API (`apps/api`)**: Node.js Express server, JWT authentication, RBAC middleware, Prisma ORM for PostgreSQL.
3. **AI Engine (`apps/ai-engine`)**: Python 3.11, FastAPI, Grok (xAI) & Groq LLM integration, Neo4j graph database connector, Qdrant vector database connector.
4. **Realtime Socket Server (`apps/realtime`)**: Node.js, Socket.io for messaging, live collaborative workspace, and notifications.
5. **Shared Packages (`packages/`)**:
   - `shared-types`: Common TypeScript interfaces and domain enums.
   - `ui`: Shared UI component library (Button, Card, Modals).
   - `config`: Shared ESLint, Tailwind tokens, and TypeScript configs.
