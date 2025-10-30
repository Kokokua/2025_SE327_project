# Implementation Notes

This document tracks implementation progress, decisions, and learnings throughout the project.

---

## Week 1: Project Setup & Planning

### Date: [To be filled]

#### Completed
- [x] Git repository initialization
- [x] Project structure setup
- [x] Technology survey and comparison
- [x] Technology selection (Vue.js 3 + NestJS)
- [x] Documentation structure

#### Decisions Made
1. **Frontend: Vue.js 3**
   - Reason: Best learning curve + team timeline fit
   - UI Library: Vuetify 3
   - State Management: Pinia

2. **Backend: NestJS**
   - Reason: Team already learned + TypeScript safety
   - ORM: TypeORM
   - Auth: Passport JWT

3. **Database: MySQL 8.0**
   - Reason: Keep same as old project for easier data migration

#### Issues Encountered
- None yet (planning phase)

#### Next Steps
- Setup NestJS backend project
- Setup Vue.js 3 frontend project
- Database schema design review

---

## Week 2: Backend Development (Planned)

### Backend Setup

#### Tasks
- [ ] Initialize NestJS project
- [ ] Configure TypeORM with MySQL
- [ ] Setup environment variables
- [ ] Configure Swagger documentation
- [ ] Setup JWT authentication base

#### Modules to Implement
1. **Auth Module** (Priority: High)
   - User registration
   - Login with JWT
   - JWT strategy
   - Auth guards

2. **Books Module** (Priority: High)
   - CRUD operations
   - Search and filter
   - Pagination
   - Tag relationships

3. **Users Module** (Priority: Medium)
   - User profile
   - Update profile
   - Get user details

4. **Orders Module** (Priority: Medium)
   - Create order
   - Get user orders
   - Order history

5. **Tags Module** (Priority: Low)
   - Manage tags
   - Associate with books

6. **Admin Module** (Priority: Medium)
   - Admin dashboard data
   - Reports
   - User management

#### API Endpoints Checklist

**Authentication**
- [ ] `POST /api/auth/register` - Register new user
- [ ] `POST /api/auth/login` - Login and get JWT
- [ ] `GET /api/auth/me` - Get current user

**Books**
- [ ] `GET /api/books` - Get all books (with filters)
- [ ] `GET /api/books/:id` - Get book details
- [ ] `POST /api/books` - Create book (Admin)
- [ ] `PUT /api/books/:id` - Update book (Admin)
- [ ] `DELETE /api/books/:id` - Delete book (Admin)

**Users**
- [ ] `GET /api/users/me` - Get current user profile
- [ ] `PUT /api/users/me` - Update profile
- [ ] `GET /api/users/:id` - Get user by ID (Admin)

**Orders**
- [ ] `POST /api/orders` - Create order
- [ ] `GET /api/orders` - Get my orders
- [ ] `GET /api/orders/:id` - Get order details
- [ ] `GET /api/orders/all` - Get all orders (Admin)

**Tags**
- [ ] `GET /api/tags` - Get all tags
- [ ] `POST /api/tags` - Create tag (Admin)
- [ ] `PUT /api/tags/:id` - Update tag (Admin)
- [ ] `DELETE /api/tags/:id` - Delete tag (Admin)

**Admin**
- [ ] `GET /api/admin/stats` - Dashboard statistics
- [ ] `GET /api/admin/users` - List all users
- [ ] `GET /api/admin/reports/sales` - Sales reports

---

## Week 3: Frontend Development (Planned)

### Frontend Setup

#### Tasks
- [ ] Initialize Vue.js 3 project with Vite
- [ ] Install and configure Vuetify 3
- [ ] Setup Vue Router
- [ ] Setup Pinia stores
- [ ] Configure Axios
- [ ] Setup environment variables

#### Pages to Implement
1. **Public Pages**
   - [ ] Home (Book listing)
   - [ ] Book Detail
   - [ ] Login
   - [ ] Register
   - [ ] Cart
   - [ ] Checkout

2. **User Pages** (Auth Required)
   - [ ] Profile
   - [ ] Order History
   - [ ] Order Details

3. **Admin Pages** (Admin Only)
   - [ ] Admin Dashboard
   - [ ] Manage Books
   - [ ] Manage Orders
   - [ ] Manage Users
   - [ ] Reports

#### Components Checklist

**Common Components**
- [ ] Navbar
- [ ] Footer
- [ ] LoadingSpinner
- [ ] ErrorMessage
- [ ] ConfirmDialog

**Book Components**
- [ ] BookCard
- [ ] BookList
- [ ] BookFilter
- [ ] BookSearch
- [ ] BookDetail

**Cart Components**
- [ ] CartItem
- [ ] CartSummary
- [ ] CheckoutForm

**Admin Components**
- [ ] AdminSidebar
- [ ] AdminNavbar
- [ ] BookForm
- [ ] UserTable
- [ ] OrderTable
- [ ] StatsCard

#### Pinia Stores
- [ ] Auth Store (user, token, login, logout)
- [ ] Cart Store (items, add, remove, update, clear)
- [ ] Books Store (books, filters, fetch)
- [ ] Orders Store (orders, create, fetch)

---

## Week 4: Integration & Testing (Planned)

### Integration Tasks
- [ ] Connect frontend to backend APIs
- [ ] Test all user flows
- [ ] Handle errors properly
- [ ] Add loading states
- [ ] Implement notifications

### Testing Checklist

**User Flows to Test**
- [ ] Register new account
- [ ] Login with credentials
- [ ] Browse books
- [ ] Search and filter books
- [ ] View book details
- [ ] Add to cart
- [ ] Update cart quantities
- [ ] Remove from cart
- [ ] Checkout and place order
- [ ] View order history
- [ ] Update profile
- [ ] Logout

**Admin Flows to Test**
- [ ] Admin login
- [ ] View dashboard stats
- [ ] Add new book
- [ ] Edit existing book
- [ ] Delete book
- [ ] View all orders
- [ ] View all users
- [ ] Generate reports

### Bug Tracking

| ID | Description | Severity | Status | Fixed Date |
|----|-------------|----------|--------|------------|
| - | (To be filled as bugs are found) | - | - | - |

---

## Challenges & Solutions

### Challenge 1: [To be filled]
**Problem:** 
**Solution:** 
**Learning:**

### Challenge 2: [To be filled]
**Problem:**
**Solution:**
**Learning:**

---

## Code Snippets & Learnings

### Useful Patterns

#### NestJS: Custom Decorator for Current User
```typescript
// current-user.decorator.ts
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage in controller
@Get('me')
getProfile(@CurrentUser() user: User) {
  return user;
}
```

#### Vue.js: Composable for API Calls
```javascript
// composables/useApi.js
export function useApi() {
  const loading = ref(false);
  const error = ref(null);

  async function execute(apiCall) {
    loading.value = true;
    error.value = null;
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, execute };
}
```

---

## Performance Optimizations

### To Implement
- [ ] Frontend: Lazy load routes
- [ ] Frontend: Image optimization
- [ ] Frontend: Component lazy loading
- [ ] Backend: Database query optimization
- [ ] Backend: Caching (Redis)
- [ ] Backend: Pagination for large datasets

---

## Security Considerations

### Implemented
- [ ] JWT authentication
- [ ] Password hashing (bcrypt)
- [ ] Input validation (class-validator)
- [ ] SQL injection protection (TypeORM)
- [ ] XSS protection
- [ ] CORS configuration
- [ ] Rate limiting
- [ ] Helmet.js security headers

### To Consider
- [ ] HTTPS in production
- [ ] Secure cookie settings
- [ ] File upload validation
- [ ] Environment variable security

---

## Deployment Notes

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Environment Variables

**Backend (.env)**
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=******
DB_DATABASE=bookstore

JWT_SECRET=******
JWT_EXPIRATION=1d

PORT=3000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Bookstore
```

### Build Commands

**Backend**
```bash
npm run build
npm run start:prod
```

**Frontend**
```bash
npm run build
# Output in dist/ folder
```

---

## Team Notes

### Responsibilities
- **Member 1:** Backend (Books, Tags)
- **Member 2:** Backend (Auth, Users, Orders)
- **Member 3:** Frontend (Public pages, Cart)
- **Member 4:** Frontend (Admin pages, Dashboard)

### Communication
- Daily standups: [Time TBD]
- Code review required before merge
- Use Pull Requests for all changes

### Git Workflow
```bash
# Get latest
git pull origin main

# Create feature branch
git checkout -b backend/feature-name

# Commit changes
git add .
git commit -m "feat: add feature description"

# Push and create PR
git push origin backend/feature-name
```

---

## Resources & References

### Documentation
- [Vue.js 3 Official Docs](https://vuejs.org/)
- [NestJS Official Docs](https://docs.nestjs.com/)
- [Vuetify 3 Docs](https://vuetifyjs.com/)
- [TypeORM Docs](https://typeorm.io/)
- [Pinia Docs](https://pinia.vuejs.org/)

### Tutorials
- (To be added as we find useful resources)

### Troubleshooting
- (To be added as we solve problems)

---

**Last Updated:** October 30, 2025  
**Next Review:** [To be scheduled]

