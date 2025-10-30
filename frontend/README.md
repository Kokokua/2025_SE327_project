# Bookstore Frontend

Modern Vue 3 frontend application for the Bookstore e-commerce project.

## Tech Stack

- **Framework:** Vue.js 3 (Composition API)
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **HTTP Client:** Axios
- **UI Framework:** Tailwind CSS (utility-first)

## Prerequisites

- Node.js >= 18
- npm or yarn
- Backend API running on `http://localhost:3000`

## Installation

```bash
cd frontend
npm install
```

## Environment Setup

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update `VITE_API_URL` if needed (default: `http://localhost:3000`)

## Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
src/
├── assets/           # Global styles (Tailwind CSS)
├── components/       # Reusable Vue components
│   └── layout/       # Layout components (Navbar, Footer)
├── router/           # Vue Router configuration
├── services/         # API services
│   ├── api.js        # Axios instance with interceptors
│   ├── authService.js
│   ├── booksService.js
│   ├── ordersService.js
│   └── tagsService.js
├── stores/           # Pinia stores
│   ├── auth.js       # Authentication state
│   ├── books.js      # Books state
│   └── cart.js       # Shopping cart state
├── views/            # Page components
│   ├── auth/         # Login, Register
│   ├── books/        # Book listing, detail
│   ├── cart/         # Cart, Checkout
│   ├── profile/      # User profile, orders
│   └── admin/        # Admin dashboard
├── App.vue           # Root component
└── main.js           # Application entry point
```

## Features

### User Features
- ✅ User registration and login
- ✅ Browse books with search and filters
- ✅ View book details
- ✅ Shopping cart functionality
- ✅ Place orders
- ✅ View order history
- ✅ User profile

### Admin Features
- ✅ Admin dashboard
- ✅ View all users
- ✅ View all orders
- ✅ Revenue analytics

## API Integration

The frontend connects to the NestJS backend at `http://localhost:3000`. All API requests include:
- JWT authentication via Bearer token
- Automatic token refresh
- Error handling and redirection

## Routes

- `/` - Home page
- `/books` - Book listing
- `/books/:id` - Book details
- `/cart` - Shopping cart
- `/checkout` - Checkout (requires auth)
- `/login` - Login
- `/register` - Register
- `/profile` - User profile (requires auth)
- `/orders` - Order history (requires auth)
- `/admin` - Admin dashboard (requires admin role)

## Development Notes

- Uses Composition API with `<script setup>`
- Tailwind CSS for utility-first styling
- Pinia for centralized state management
- Vue Router guards for authentication
- Axios interceptors for token management
