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
- `/bookstore-project` - Original SE262 bookstore project
  - `/backend` - Express.js backend
  - `/frontend_ejs` - EJS frontend
  - `/admin-frontend` - Admin panel
- `/new-backend` - NestJS backend (to be implemented)
- `/new-frontend` - Vue.js 3 frontend (to be implemented)
- `/docs` - Documentation and reports
- `/presentation` - Presentation materials

## Progress Tracking
- [x] Project setup and Git repository initialization
- [ ] Technology Survey & Comparison
  - [ ] Frontend frameworks comparison (Vue.js, React, Svelte)
  - [ ] Backend frameworks comparison (NestJS, FastAPI, Django)
- [ ] Backend Development (NestJS)
  - [ ] Project setup and core configuration
  - [ ] Authentication module (JWT)
  - [ ] Books module
  - [ ] Users module
  - [ ] Orders module
  - [ ] Admin module
- [ ] Frontend Development (Vue.js 3)
  - [ ] Project setup and core configuration
  - [ ] API services layer
  - [ ] Pinia stores (auth, cart, books)
  - [ ] Common components
  - [ ] Public pages (Home, Book Detail, Cart)
  - [ ] Authentication pages
  - [ ] User pages (Profile, Orders)
  - [ ] Admin dashboard
- [ ] Integration & Testing
- [ ] Documentation & Report
- [ ] Presentation Preparation

## Timeline
- **Assigned:** September 19, 2024
- **Submission:** October 30, 2024
- **Presentation:** October 31, 2024

## Quick Start

### Running Old Project (SE262)
```bash
cd bookstore-project
npm install
npm start
```

### Running New Project (Coming Soon)
Will be updated after implementation.

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
