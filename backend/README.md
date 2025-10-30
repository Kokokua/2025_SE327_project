# Backend Service

NestJS backend service for the bookstore project.

## Prerequisites

- Node.js >= 18
- npm or yarn

## Installation

```bash
cd backend
npm install
```

## Environment Setup

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Health Check

Once running, verify the service is up:

```
GET http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok"
}
```

## TODO

- [ ] Configure database connection (TypeORM/Prisma)
- [ ] Set up authentication
- [ ] Implement business logic
- [ ] Add API documentation (Swagger)

