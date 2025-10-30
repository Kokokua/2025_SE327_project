# Old Project (SE262)

## Overview
This directory contains the original bookstore project from SE262 course.

## Technology Stack
- **Frontend:** EJS Templates + Vanilla JavaScript
- **Backend:** Express.js (Node.js)
- **Database:** MySQL
- **UI:** Custom CSS

## Project Structure
```
bookstore-project/
├── backend/              # Express.js backend
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── db.js           # Database configuration
│   └── server.js       # Entry point
├── frontend_ejs/        # EJS frontend
│   ├── public/         # Static assets (CSS, JS)
│   └── views/          # EJS templates
├── admin-frontend/      # Admin panel
│   └── views/          # Admin EJS templates
├── public/             # Shared static files
│   └── images/         # Product images
└── sql/                # Database initialization
    └── init.sql        # Database schema
```

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Setup Steps

1. **Install Dependencies:**
```bash
cd bookstore-project/backend
npm install
cd ../
npm install
```

2. **Setup Database:**
```bash
# Create MySQL database
mysql -u root -p

CREATE DATABASE bookstore;
USE bookstore;
SOURCE bookstore-project/sql/init.sql;
```

3. **Configure Environment:**
Create `.env` file in backend folder:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bookstore
PORT=3000
```

4. **Run Server:**
```bash
cd bookstore-project/backend
node server.js
```

5. **Access Application:**
- Main Site: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## Features
- Browse books with search and filter
- User authentication (login/register)
- Shopping cart functionality
- Order management
- Admin dashboard
  - Manage books (CRUD)
  - Manage users
  - View orders
  - Sales reports

## API Endpoints

### Public Endpoints
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Protected Endpoints (Require Authentication)
- `GET /api/users/me` - Get current user
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Admin Endpoints
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/reports` - Get sales reports

## Database Schema

### Tables
- `users` - User accounts
- `books` - Book information
- `tags` - Book tags/categories
- `book_tags` - Many-to-many relationship
- `orders` - Order information
- `order_items` - Order line items

## Known Issues
- No input validation on frontend
- Session management is basic
- No unit tests
- CSS is not modular
- No build process

## Why Reengineering?
This project is being reengineered with modern technologies to:
1. Improve code maintainability
2. Add type safety with TypeScript
3. Implement modern UI/UX patterns
4. Better separation of concerns
5. Automated testing capabilities
6. Better state management
7. API documentation
8. Scalability improvements

