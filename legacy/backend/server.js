const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

// Route files
const adminRoutes = require('./routes/adminRoutes');
const bookRoutes = require('./routes/bookRoutes');
const tagRoutes = require('./routes/tagRoutes');
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use(express.static('public'));

// Set EJS as the view engine and define the views folder
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, '../frontend_ejs', 'views'), // Frontend EJS
  path.join(__dirname, '../admin-frontend', 'views') // Admin EJS
]);

// Serve static files (CSS, JS, images) from frontend_ejs/public
app.use(express.static(path.join(__dirname, '../frontend_ejs', 'public')));

// Session middleware
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Debugging
console.log('Serving static files from:', path.join(__dirname, '../frontend_ejs/public'));
console.log('Views directory:', app.get('views'));

// Mount routes
app.use('/api/books', bookRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/tags', tagRoutes);
app.use('/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);

// Render the main "home" page at root
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/contact', (req, res) => {
  res.render('contact'); 
});

app.get('/profile', (req, res) => {
  res.render('profile'); 
});

app.get('/general', (req, res) => {
  res.render('general'); 
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up'); 
});

app.get('/login', (req, res) => {
  res.render('login'); 
});
app.get('/cart', (req, res) => {
  res.render('cart'); 
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
