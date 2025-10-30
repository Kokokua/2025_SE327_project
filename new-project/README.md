# New Project - Bookstore Reengineered

## Overview
This is the reengineered version of the SE262 bookstore project using modern technology stack.

## Technology Stack

### Frontend
- **Framework:** Vue.js 3 (Composition API)
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **UI Library:** Vuetify 3
- **HTTP Client:** Axios
- **Build Tool:** Vite

### Backend
- **Framework:** NestJS (TypeScript)
- **ORM:** TypeORM
- **Database:** MySQL
- **Authentication:** Passport JWT
- **Validation:** class-validator
- **Documentation:** Swagger/OpenAPI

## Project Structure

```
new-project/
├── frontend/                  # Vue.js 3 Frontend
│   ├── src/
│   │   ├── assets/           # Static assets
│   │   ├── components/       # Vue components
│   │   │   ├── common/       # Shared components
│   │   │   ├── book/         # Book-related components
│   │   │   ├── cart/         # Cart components
│   │   │   └── admin/        # Admin components
│   │   ├── views/            # Page components
│   │   ├── stores/           # Pinia stores
│   │   ├── services/         # API services
│   │   ├── router/           # Vue Router config
│   │   ├── composables/      # Reusable composition functions
│   │   ├── utils/            # Utility functions
│   │   ├── App.vue           # Root component
│   │   └── main.js           # Entry point
│   ├── public/               # Public static files
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── backend/                   # NestJS Backend
    ├── src/
    │   ├── main.ts           # Bootstrap
    │   ├── app.module.ts     # Root module
    │   ├── common/           # Shared utilities
    │   │   ├── decorators/   # Custom decorators
    │   │   ├── filters/      # Exception filters
    │   │   ├── guards/       # Auth guards
    │   │   ├── interceptors/ # Response interceptors
    │   │   └── pipes/        # Validation pipes
    │   ├── config/           # Configuration
    │   ├── books/            # Books module
    │   │   ├── books.module.ts
    │   │   ├── books.controller.ts
    │   │   ├── books.service.ts
    │   │   ├── entities/
    │   │   └── dto/
    │   ├── users/            # Users module
    │   ├── auth/             # Authentication module
    │   ├── orders/           # Orders module
    │   ├── tags/             # Tags module
    │   └── admin/            # Admin module
    ├── test/                 # E2E tests
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- MySQL Server 8.0+

### Backend Setup

```bash
cd new-project/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Run migrations
npm run migration:run

# Start development server
npm run start:dev

# API Documentation will be available at:
# http://localhost:3000/api/docs
```

### Frontend Setup

```bash
cd new-project/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Set VITE_API_URL=http://localhost:3000

# Start development server
npm run dev

# Application will run at:
# http://localhost:5173
```

## Development Workflow

### Running Both Services

**Terminal 1 (Backend):**
```bash
cd new-project/backend
npm run start:dev
```

**Terminal 2 (Frontend):**
```bash
cd new-project/frontend
npm run dev
```

### Code Style
- ESLint + Prettier for code formatting
- Commit messages follow Conventional Commits
- TypeScript strict mode enabled

### Testing
```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test:unit
```

## Features

### User Features
- ✅ Browse books with advanced search and filters
- ✅ User authentication (JWT-based)
- ✅ Shopping cart with persistence
- ✅ Order placement and history
- ✅ User profile management

### Admin Features
- ✅ Dashboard with statistics
- ✅ Book management (CRUD)
- ✅ User management
- ✅ Order management
- ✅ Sales reports and analytics

## API Documentation

Swagger documentation is available at:
- **Development:** http://localhost:3000/api/docs
- **Production:** TBD

## Key Improvements Over Old Project

| Aspect | Old Project | New Project |
|--------|-------------|-------------|
| **Type Safety** | None (JavaScript) | Full TypeScript |
| **Frontend** | Server-side rendering (EJS) | SPA with Vue.js 3 |
| **State Management** | Session + Local variables | Pinia (centralized) |
| **API Documentation** | Manual | Auto-generated (Swagger) |
| **Validation** | Basic/None | class-validator (automatic) |
| **Code Organization** | MVC (loose) | Modular (NestJS modules) |
| **Error Handling** | Try-catch (inconsistent) | Exception filters (centralized) |
| **Authentication** | Session-based | JWT tokens |
| **Testing** | None | Jest (unit + E2E) |
| **Build Process** | None | Vite (fast HMR) |

## Environment Variables

### Backend (.env)
```
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=bookstore

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1d

# Server
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Bookstore
```

## Deployment

### Backend (Production)
```bash
npm run build
npm run start:prod
```

### Frontend (Production)
```bash
npm run build
# Output will be in dist/ folder
# Deploy to Vercel, Netlify, or any static hosting
```

## Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` in backend .env matches your frontend URL
- Check CORS configuration in `main.ts`

### Database Connection
- Verify MySQL is running
- Check credentials in .env
- Ensure database exists

### Port Already in Use
```bash
# Change PORT in .env
# Or kill process using the port
```

## Contributing
This is an academic project. For team collaboration:
1. Create feature branch
2. Make changes
3. Create Pull Request
4. Wait for review
5. Merge to main

## License
Academic project for SE327 course at Chiang Mai University.

