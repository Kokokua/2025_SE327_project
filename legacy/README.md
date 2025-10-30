# Legacy Bookstore Project (SE262)

## Overview
This folder contains the original bookstore project from SE262 course, preserved for reference and comparison purposes during the reengineering process.

## Technology Stack
- **Frontend:** EJS Templates + Vanilla JavaScript  
- **Backend:** Express.js (Node.js)
- **Database:** MySQL
- **Deployment:** Docker + Nginx

## Structure

```
legacy/
├── backend/              # Express.js backend API
│   ├── controllers/      # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API route definitions
│   ├── db.js             # Database configuration
│   └── server.js         # Application entry point
│
├── frontend_ejs/         # User-facing EJS frontend
│   ├── public/           # Static assets (CSS, JS)
│   └── views/            # EJS templates
│
├── admin-frontend/       # Admin panel interface
│   └── views/            # Admin EJS templates
│
├── public/               # Shared static files
│   └── images/           # Product images (65 books + icons)
│
├── sql/                  # Database schema
│   └── init.sql          # Database initialization script
│
├── nginx/                # Nginx configuration
├── docker-compose.yml    # Docker orchestration
└── Dockerfile.node       # Node.js container definition
```

## How to Run (Reference)

### Prerequisites
- Node.js v14 or higher
- MySQL Server 8.0+
- Docker (optional)

### Setup with Docker

```bash
cd legacy
docker-compose up -d
```

### Manual Setup

1. **Install Dependencies:**
```bash
cd legacy/backend
npm install
```

2. **Setup Database:**
```bash
mysql -u root -p
CREATE DATABASE bookstore;
USE bookstore;
SOURCE sql/init.sql;
```

3. **Configure Environment:**
Create `.env` in `backend/` folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bookstore
PORT=3000
```

4. **Run Server:**
```bash
cd backend
node server.js
```

5. **Access:**
- Main Site: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## Features

### User Features
- Browse books with search and filter
- User registration and authentication
- Shopping cart management
- Order placement and tracking
- User profile management

### Admin Features
- Dashboard with statistics
- Book management (CRUD operations)
- User management
- Order management
- Sales reports and analytics

## Key Characteristics (For Comparison)

| Aspect | Implementation |
|--------|----------------|
| **Architecture** | Monolithic MVC |
| **Type Safety** | None (JavaScript) |
| **Frontend** | Server-side rendering (EJS) |
| **State Management** | Session + DOM manipulation |
| **API Documentation** | None |
| **Validation** | Manual, inconsistent |
| **Error Handling** | Try-catch blocks |
| **Authentication** | Session-based |
| **Testing** | None |
| **Build Process** | None |

## Purpose

This legacy code serves as:
1. **Baseline** for metrics comparison
2. **Reference** for business logic understanding
3. **Comparison point** for improvement measurements
4. **Documentation** of original architecture

## Notes

- This code is **not maintained** and is for reference only
- Do not use for production deployments
- See the main project (`backend/` and `frontend/` branches) for the reengineered version
- Database schema and business logic have been preserved for consistency

## Related Documentation

- [Technology Survey](../docs/technology-survey.md) - Why we're reengineering
- [Comparison Tables](../docs/comparison-tables.md) - Old vs New comparison
- [Implementation Notes](../docs/implementation-notes.md) - Progress tracking

