document.addEventListener("DOMContentLoaded", function () {
  let currentBook = null;
  let allBooks = []; 
  const CART_KEY = 'shopping_cart';
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  document.querySelectorAll('.product-list').forEach(container => {
    container.addEventListener('click', function (e) {
      const card = e.target.closest('.product-card');
      if (card) {
        const bookId = card.dataset.bookId;
        const book = allBooks.find(b => b.id == bookId);
        showBookDetails(book);
      }
    });
  });
  hamburger.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  // Fetch and Display Products
  Promise.all([
    fetch('/api/books'),
    fetch('/api/orders')
  ])
    .then(([booksRes, ordersRes]) => Promise.all([booksRes.json(), ordersRes.json()]))
    .then(([books, ordersData]) => {
      const orders = ordersData.data;
      allBooks = books; 

      const orderCountMap = new Map();
      const revenueMap = new Map();

      orders.forEach(order => {
        const seenBooks = new Set();
        order.items.forEach(item => {
          const bookId = item.book_id;

          if (!seenBooks.has(bookId)) {
            orderCountMap.set(bookId, (orderCountMap.get(bookId) || 0) + 1);
            seenBooks.add(bookId);
          }

          const itemRevenue = item.price * item.quantity;
          revenueMap.set(bookId, (revenueMap.get(bookId) || 0) + itemRevenue);
        });
      });

      const discountedBooks = books
        .filter(book => book.discounted_price !== null)
        .sort((a, b) => {
          const countDiff = (orderCountMap.get(b.id) || 0) - (orderCountMap.get(a.id) || 0);
          return countDiff !== 0 ? countDiff : a.title.localeCompare(b.title);
        })
        .slice(0, 10);

      const bestsellers = [...books]
        .sort((a, b) => {
          const revenueA = revenueMap.get(a.id) || 0;
          const revenueB = revenueMap.get(b.id) || 0;
          return revenueB - revenueA;
        })
        .slice(0, 10);

      renderSection('homeTodayDeal', discountedBooks);
      renderSection('homeBestSeller', bestsellers);
    })
    .catch(error => console.error('Error:', error));

  // Render Function
  function renderSection(containerId, books) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const productList = container.querySelector('.product-list') || document.createElement('div');
    productList.className = 'product-list';

    productList.innerHTML = books.length ?
      books.map(book => `
        <div class="product-card">
          <div class="image-container">
            <img src="${book.image || 'placeholder.jpg'}" 
                 alt="${book.title}" 
                 loading="lazy">
          </div>
          <h3 class="title">${book.title}</h3>
          <div class="price">
            ${book.discounted_price ? `
              <span class="original">$${book.price.toFixed(2)}</span>
              <span class="discounted">$${book.discounted_price.toFixed(2)}</span>
            ` : `$${book.price.toFixed(2)}`}
          </div>
        </div>
      `).join('') :
      `<p class="empty-msg">No products found</p>`;

    if (!container.querySelector('.product-list')) {
      container.appendChild(productList);
    }
  }

  function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = totalItems || '';
      el.style.display = totalItems ? 'inline-block' : 'none';
    });
  }

  function addToCart(bookId) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return; 
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.bookId === bookId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        bookId: bookId,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }

    saveCart(cart);
    showToast(`${currentBook.title} added to cart`);
  }

  function showBookDetails(book) {
    currentBook = book;
    document.getElementById('detail-title').textContent = book.title;
    document.getElementById('detail-image').src = book.image || 'placeholder.jpg';

    // Price display
    const priceElement = document.getElementById('detail-price');
    if (book.discounted_price) {
      priceElement.innerHTML = `
            <span class="original">$${book.price.toFixed(2)}</span>
            <span class="discounted">$${book.discounted_price.toFixed(2)}</span>
        `;
    } else {
      priceElement.textContent = `$${book.price.toFixed(2)}`;
    }

    // Tags display
    const tagsContainer = document.getElementById('detail-tags');
    tagsContainer.innerHTML = '';
    if (book.tags && book.tags.length > 0) {
      book.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-pill';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });
    } else {
      tagsContainer.innerHTML = '<span class="text-muted">No tags available</span>';
    }

    // Description
    document.getElementById('detail-description').textContent =
      book.description || 'No description available.';

    // Show modal
    new bootstrap.Modal(document.getElementById('bookDetailsModal')).show();
  }

  // Add to cart button handler
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    if (currentBook) {
      addToCart(currentBook.id);
    }
  });

  // Toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-success border-0';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    document.body.appendChild(toast);
    new bootstrap.Toast(toast, { autohide: true, delay: 3000 }).show();
    setTimeout(() => toast.remove(), 3500);
  }

  // Update product card rendering to include data-book-id
  function renderSection(containerId, books) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const productList = container.querySelector('.product-list') || document.createElement('div');
    productList.className = 'product-list';

    productList.innerHTML = books.length ?
      books.map(book => `
            <div class="product-card" data-book-id="${book.id}">
                <div class="image-container">
                    <img src="${book.image || 'placeholder.jpg'}" 
                        alt="${book.title}" 
                        loading="lazy">
                </div>
                <h3 class="title">${book.title}</h3>
                <div class="price">
                    ${book.discounted_price ? `
                        <span class="original">$${book.price.toFixed(2)}</span>
                        <span class="discounted">$${book.discounted_price.toFixed(2)}</span>
                    ` : `$${book.price.toFixed(2)}`}
                </div>
            </div>
        `).join('') :
      `<p class="empty-msg">No products found</p>`;

    if (!container.querySelector('.product-list')) {
      container.appendChild(productList);
    }
  }

  // Initialize cart count
  updateCartCount();
});
