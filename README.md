# TriQi

TriQi is a full-stack orientation platform that helps users discover suitable academic and career paths.

It combines:
- A guided orientation questionnaire
- A weighted scoring engine
- Ranked domain recommendations with explanations
- Personalized roadmap generation
- Admin tools for managing orientation content

## Table of Contents

- Overview
- Tech Stack
- Monorepo Structure
- Core Features
- Architecture Summary
- Environment Variables
- Getting Started (Local)
- Getting Started (Docker)
- Available Scripts
- API Overview
- Authentication and Roles
- Testing Strategy
- CI Pipeline (GitHub Actions)
- Troubleshooting
- Roadmap
- License

## Overview

TriQi contains two main applications:
- Backend API: NestJS application in [backend](backend)
- Frontend web app: Next.js application in [frontend](frontend)

The backend provides authentication, domain content management, result generation, and roadmap logic.
The frontend consumes backend APIs and offers user and admin interfaces.

## Tech Stack

### Backend
- NestJS (TypeScript)
- MongoDB + Mongoose
- JWT authentication (Passport + bcrypt)
- Validation with class-validator and class-transformer
- Jest for tests

### Frontend
- Next.js (App Router)
- React + TypeScript
- Axios for API communication

### DevOps
- Docker + Docker Compose
- GitHub Actions CI workflow

## Monorepo Structure

```text
TriQi/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── src/
│   │   ├── admin/
│   │   ├── ai/
│   │   ├── auth/
│   │   ├── categories/
│   │   ├── domains/
│   │   ├── institutions/
│   │   ├── questions/
│   │   ├── results/
│   │   ├── roadmap-templates/
│   │   ├── roadmaps/
│   │   └── users/
│   └── test/
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── src/
├── docker-compose.yml
├── .env.example
└── .github/
    └── workflows/
        └── ci.yml
```

## Core Features

### User
- Register and login with JWT
- Complete orientation questionnaire
- Get ranked domains and explanations
- Generate and track personal roadmaps
- Access result history

### Admin
- Manage categories
- Manage domains linked to categories
- Manage questionnaire items and weights
- Manage roadmap templates
- Manage institutions (module present, evolving)

## Architecture Summary

### Backend modules
Key domain modules are organized in [backend/src](backend/src):
- Authentication and authorization in [backend/src/auth](backend/src/auth)
- Content and taxonomy in [backend/src/categories](backend/src/categories), [backend/src/domains](backend/src/domains), and [backend/src/questions](backend/src/questions)
- Result computation in [backend/src/results](backend/src/results)
- Roadmap generation in [backend/src/roadmaps](backend/src/roadmaps) and [backend/src/roadmap-templates](backend/src/roadmap-templates)

### Frontend API integration
The frontend API client is defined in [frontend/src/services/api.ts](frontend/src/services/api.ts).
It uses NEXT_PUBLIC_API_URL as base URL and injects JWT from local storage.

## Environment Variables

Project-level environment variables are listed in [.env.example](.env.example).

### Required for backend
- PORT: backend listening port (default 3001)
- MONGO_URI: MongoDB connection string
- JWT_SECRET: JWT signing secret

### Required for frontend
- NEXT_PUBLIC_API_URL: backend base URL exposed to browser code

### Docker-related
- FRONTEND_PORT: host port bound to frontend container
- BACKEND_PORT: host port bound to backend container
- MONGO_PORT: host port bound to MongoDB container

## Getting Started (Local)

### Prerequisites
- Node.js 20+
- npm 10+
- MongoDB running locally or on Atlas

### 1) Clone repository

```bash
git clone https://github.com/your-username/TriQi.git
cd TriQi
```

### 2) Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### 3) Configure environment

Create a backend environment file at backend/.env:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/triqi
JWT_SECRET=replace_with_a_secure_secret
```

Optional frontend environment file at frontend/.env.local:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4) Run backend

```bash
cd backend
npm run start:dev
```

Backend URL:
- http://localhost:3001

### 5) Run frontend (new terminal)

```bash
cd frontend
npm run dev
```

Frontend URL:
- http://localhost:3000

## Getting Started (Docker)

### 1) Create root .env file

```bash
cp .env.example .env
```

### 2) Build and run services

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: localhost:27017

### 3) Stop services

```bash
docker compose down
```

To remove persisted Mongo volume:

```bash
docker compose down -v
```

## Available Scripts

### Backend scripts
From [backend/package.json](backend/package.json):
- npm run start
- npm run start:dev
- npm run start:prod
- npm run build
- npm run lint
- npm run test
- npm run test:cov
- npm run test:e2e

### Frontend scripts
From [frontend/package.json](frontend/package.json):
- npm run dev
- npm run build
- npm run start
- npm run lint

## API Overview

### Auth
- POST /auth/register
- POST /auth/login

### Categories
- POST /categories
- GET /categories
- GET /categories/:id
- PATCH /categories/:id
- DELETE /categories/:id

### Domains
- POST /domains
- GET /domains
- GET /domains/:id
- PATCH /domains/:id
- DELETE /domains/:id

### Questions
- POST /questions
- GET /questions
- GET /questions/admin
- PATCH /questions/:id
- DELETE /questions/:id

### Results
- POST /results/submit
- GET /results/my
- GET /results/my/latest

### Roadmap templates
- POST /roadmap-templates
- GET /roadmap-templates
- PATCH /roadmap-templates/:id
- DELETE /roadmap-templates/:id

### Roadmaps
- POST /roadmaps/generate
- GET /roadmaps/my
- PATCH /roadmaps/tasks/:taskId

## Authentication and Roles

Protected routes require:

```text
Authorization: Bearer <jwt-token>
```

Roles:
- USER: complete test, view results, manage own roadmap
- ADMIN: content management and admin operations

## Testing Strategy

Backend test types:
- Unit tests for services and core logic
- E2E tests in [backend/test](backend/test)

Run backend tests:

```bash
cd backend
npm run test
npm run test:cov
npm run test:e2e
```

Frontend currently has lint/build checks in CI. Add frontend tests later as test coverage grows.

## CI Pipeline (GitHub Actions)

Workflow file:
- [.github/workflows/ci.yml](.github/workflows/ci.yml)

Triggers:
- push
- pull_request

Jobs:
- Backend job: install, lint, test, build
- Frontend job: install, lint, test if present, build

Caching:
- npm cache enabled per app using each lockfile

Failure behavior:
- If any step fails, the workflow fails

## Troubleshooting

### docker compose up --build fails
- Ensure Docker Desktop is running
- Ensure ports 3000, 3001, and 27017 are free
- Check logs:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

### Backend cannot connect to Mongo
- Verify MONGO_URI in root .env for Docker
- For local run, verify backend/.env points to a reachable Mongo instance

### CORS or frontend API issues
- Verify NEXT_PUBLIC_API_URL points to backend URL
- Verify backend is listening on PORT used by frontend

## Roadmap

Planned and in-progress items include:
- Dashboard and analytics views
- Real-time notifications
- Enhanced institution recommendation flow
- Expanded frontend automated testing

## License

Built for educational purposes.

TriQi - Dounia Elgarrai - 2026
