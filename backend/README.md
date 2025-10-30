# Backend Service - NestJS

Modern NestJS backend service for the bookstore e-commerce project with PostgreSQL, JWT authentication, and comprehensive API documentation.

## 🚀 Tech Stack

- **Framework:** NestJS 10 (Node.js + TypeScript)
- **Database:** PostgreSQL 15
- **ORM:** TypeORM
- **Authentication:** JWT (Passport)
- **Validation:** class-validator + class-transformer
- **API Docs:** Swagger/OpenAPI
- **Security:** Helmet

## 📋 Prerequisites

- Node.js >= 18
- npm or yarn
- Docker & Docker Compose (for database)

## 🛠️ Installation

```bash
cd backend
npm install
```

## ⚙️ Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update environment variables in `.env` as needed (optional for development)

## 🐳 Database Setup

Start PostgreSQL with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port `5432`
- pgAdmin on port `5050` (http://localhost:5050)

To stop:
```bash
docker-compose down
```

## 🏃 Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 📚 API Documentation

Once running, access Swagger documentation at:

**http://localhost:3000/api/docs**

Features:
- Interactive API testing
- JWT authentication support
- Request/Response schemas
- All endpoints documented

## 🔍 Health Check

Verify the service is running:

```bash
GET http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok"
}
```

## 🏗️ Project Structure

```
src/
├── config/              # Configuration files (database, jwt, app)
├── common/              # Shared utilities
│   ├── decorators/      # Custom decorators (@CurrentUser, @Roles, @Public)
│   ├── guards/          # Auth guards (JWT, Roles)
│   └── interceptors/    # Logging & Transform interceptors
├── app.module.ts        # Root module
├── main.ts              # Bootstrap file
└── health.controller.ts # Health check endpoint
```

## 📦 Next Steps (Module Implementation)

- [ ] Auth module (JWT, register, login)
- [ ] Users module (CRUD, profile)
- [ ] Books module (CRUD, search, filter)
- [ ] Orders module (create, list, details)
- [ ] Tags module (CRUD, book associations)
- [ ] Admin module (statistics, reports)

## 🔐 Security Features

- ✅ Helmet for security headers
- ✅ CORS configured for frontend
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Input validation & sanitization
- ✅ Environment variables protection

## 🎯 Key Features

- Full TypeScript support
- Auto-generated API documentation
- Request/Response logging
- Standardized error handling
- Role-based access control
- Database migration support
- Docker containerization

