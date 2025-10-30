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
- **Frontend:** EJS + Vanilla JavaScript
- **Backend:** Express.js (Node.js)
- **Database:** MySQL
- **UI:** Custom CSS

### New Stack (Current Project)
- **Frontend:** Vue.js 3 + Pinia + Vue Router + Vuetify
- **Backend:** NestJS (TypeScript) + TypeORM + Passport JWT
- **Database:** MySQL
- **UI Framework:** Vuetify

## Project Structure
```
2025_SE327_project/
├── README.md                          # Main project documentation
├── .gitignore                         # Git ignore rules
│
├── old-project/                       # SE262 original project
│   ├── bookstore-project/
│   │   ├── backend/                   # Express.js backend
│   │   ├── frontend_ejs/              # EJS templates
│   │   ├── admin-frontend/            # Admin panel
│   │   └── public/                    # Static assets
│   └── README.md                      # Old project documentation
│
├── new-project/                       # Reengineered project
│   ├── backend/                       # NestJS backend (to be implemented)
│   ├── frontend/                      # Vue.js 3 frontend (to be implemented)
│   └── README.md                      # Setup instructions
│
├── docs/                              # Project documentation
│   ├── technology-survey.md           # ✅ Complete technology comparison
│   ├── comparison-tables.md           # ✅ Quick reference tables
│   ├── implementation-notes.md        # Implementation tracking
│   └── final-report.pdf               # Final report (to be added)
│
├── presentation/                      # Presentation materials
│   ├── slides.pdf                     # Presentation slides (to be added)
│   └── demo-video.mp4                 # Demo video (optional)
│
└── bookstore-project/                 # ⚠️ To be moved to old-project/
    └── (Original project files)
```

**Note:** The `bookstore-project` folder should be moved into `old-project/` but encountered file lock issues. Will be reorganized in next session.

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

### Running Old Project (SE262)
```bash
cd old-project/bookstore-project/backend
npm install
# Setup MySQL database and .env file (see old-project/README.md)
node server.js
```

See [old-project/README.md](old-project/README.md) for detailed setup instructions.

### Running New Project (Coming Soon)
Will be updated after implementation. See [new-project/README.md](new-project/README.md) for planned architecture.

## Documentation

### Available Documentation
- 📘 **[Technology Survey](docs/technology-survey.md)** - Comprehensive comparison of all technology options
- 📊 **[Comparison Tables](docs/comparison-tables.md)** - Quick reference scoring tables
- 📝 **[Implementation Notes](docs/implementation-notes.md)** - Development progress tracking
- 📂 **[Old Project Guide](old-project/README.md)** - Original SE262 project documentation
- 🆕 **[New Project Guide](new-project/README.md)** - Reengineered project documentation

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
