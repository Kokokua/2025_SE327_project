# SE327 Term Project - Bookstore Reengineering

## Project Overview
This project involves reengineering a web store from SE262 using a completely different technology stack.

### Team Members
- Panuwat Songkram (662115038) - [@panuwat-lab](https://github.com/panuwat-lab)
- Phutthichai Hankamjohn (662115035) - [@EmperorR555](https://github.com/EmperorR555)
- Ratthasas Singhamanee (662115041) - [@Ratthasas](https://github.com/Ratthasas)
- Thanaphat Sanngoen (652115019) - [@Thanaphat14](https://github.com/Thanaphat14)

## Technology Stack

### Old Stack (SE262)
- **UI Framework:** Custom CSS
- **Frontend:** EJS + Vanilla JavaScript
- **Backend:** Express.js (Node.js)
- **Database:** MySQL

### New Stack (Current Project) ✅
- **UI Framework:** Tailwind CSS 3
- **Frontend:** Vue.js 3 + Pinia + Vue Router
- **Backend:** NestJS (TypeScript) + TypeORM + Passport JWT
- **Database:** PostgreSQL 15

## Project Structure

**Main Branch Structure:**
```
term-project-production/
├── README.md                          # Main project documentation
├── .gitignore                         # Git ignore rules
├── .github/                           # GitHub templates
│   ├── pull_request_template.md       # PR template
│   └── ISSUE_TEMPLATE/                # Issue templates
│
├── legacy/                            # SE262 original project (reference)
│   ├── backend/                       # Express.js backend
│   ├── frontend_ejs/                  # EJS templates
│   ├── admin-frontend/                # Admin panel
│   ├── public/                        # Static assets & images
│   ├── sql/                           # Database schema
│   └── docker-compose.yml             # Docker setup
│
├── docs/                              # Project documentation
│   ├── technology-survey.md           # ✅ Technology comparison
│   ├── comparison-tables.md           # ✅ Quick reference tables
│   └── implementation-notes.md        # Implementation tracking
│
└── sonar-project.properties           # SonarQube configuration
```

**Branch Model:**
- **`main`** - Main branch with documentation and legacy code
- **`backend`** - NestJS backend implementation
- **`frontend`** - Vue.js 3 frontend implementation
- **`chore/ci`** - CI/CD configurations

**How to Access Code:**
```bash
# Backend code (NestJS + PostgreSQL)
git checkout backend
cd backend

# Frontend code (Vue 3 + Tailwind CSS)
git checkout frontend
cd frontend
```

## Progress Tracking

### Phase 1: Technology Survey & Planning ✅
- [x] Project setup and Git repository initialization
- [x] Organize project structure
- [x] Technology Survey & Comparison
  - [x] Frontend frameworks comparison (Vue.js, React, Svelte)
  - [x] Backend frameworks comparison (NestJS, FastAPI, Django)
  - [x] Create weighted scoring tables
  - [x] Document selection rationale
- [x] Create comprehensive documentation
  - [x] Technology survey report
  - [x] Comparison tables
  - [x] Implementation notes template

### Phase 2: Backend Development (NestJS) - Next
- [ ] Project setup and core configuration
- [ ] Database schema and TypeORM setup
- [ ] Authentication module (JWT)
- [ ] Books module (CRUD, search, filter)
- [ ] Users module
- [ ] Orders module
- [ ] Tags module
- [ ] Admin module
- [ ] Swagger documentation
- [ ] API testing

### Phase 3: Frontend Development (Vue.js 3)
- [ ] Project setup and core configuration
- [ ] API services layer
- [ ] Pinia stores (auth, cart, books, orders)
- [ ] Common components (Navbar, Footer, etc.)
- [ ] Public pages (Home, Book Detail, Cart, Checkout)
- [ ] Authentication pages (Login, Register)
- [ ] User pages (Profile, Order History)
- [ ] Admin dashboard (Books, Orders, Users, Reports)

### Phase 4: Integration & Testing
- [ ] Frontend-Backend integration
- [ ] User flow testing
- [ ] Admin flow testing
- [ ] Bug fixing
- [ ] Performance optimization

### Phase 5: Documentation & Presentation
- [ ] Final report writing
- [ ] Presentation slides preparation
- [ ] Demo preparation
- [ ] Self-assessment letters

## Timeline
- **Assigned:** September 19, 2024
- **Submission:** October 30, 2024
- **Presentation:** October 31, 2024

## Quick Start

### Running Legacy Project (SE262 - Reference Only)
```bash
cd legacy/backend
npm install
# Setup MySQL database and .env file
node server.js
```

See [legacy/README.md](legacy/README.md) for detailed setup instructions (if available).

### Running New Project (In Development)
Development is in progress on separate branches:
- **Backend:** `git checkout backend` → See `backend/README.md`
- **Frontend:** `git checkout frontend` → See `frontend/README.md` (coming soon)

## Documentation

### Available Documentation
- 📘 **[Technology Survey](docs/technology-survey.md)** - Comprehensive comparison of all technology options
- 📊 **[Comparison Tables](docs/comparison-tables.md)** - Quick reference scoring tables
- 📝 **[Implementation Notes](docs/implementation-notes.md)** - Development progress tracking
- 📂 **Legacy Project** - Original SE262 project (in `legacy/` folder for reference)

## Development Workflow

### Branch Naming Convention
- `backend/feature-name` - Backend features
- `frontend/feature-name` - Frontend features
- `docs/document-name` - Documentation
- `fix/bug-description` - Bug fixes

### Commit Convention
```
type(scope): description

Types:
- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code restructuring
- test: tests
- chore: maintenance
```

## License
This is an academic project for SE327 (Software Metrics) course at Chiang Mai University.
