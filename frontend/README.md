# Frontend - Vue 3 + Vite + Tailwind CSS

Modern Vue 3 frontend for the bookstore e-commerce project.

## 🚀 Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite 5
- **UI Library:** Tailwind CSS 3
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **HTTP Client:** Axios

## 📋 Prerequisites

- Node.js >= 18
- npm or yarn

## 🛠️ Installation

```bash
cd frontend
npm install
```

## ⚙️ Environment Setup

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

## 🏃 Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── assets/          # Static assets (CSS, images)
├── components/      # Reusable Vue components
│   └── common/      # Common components (Navbar, Footer, etc.)
├── views/           # Page components
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── services/        # API services
├── App.vue          # Root component
└── main.js          # Application entry point
```

## 🎯 Features

- ✅ Vue 3 Composition API
- ✅ Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ Vue Router for navigation
- ✅ Pinia for state management
- ✅ Axios for API calls
- 🔄 Responsive design (TODO)
- 🔄 Authentication flow (TODO)
- 🔄 Shopping cart (TODO)

## 🔗 Backend API

This frontend connects to the NestJS backend running at:
- **API URL:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/docs

