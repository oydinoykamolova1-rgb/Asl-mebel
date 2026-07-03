// ==========================================
// ASL MEBELLAR - FRONTEND LOGIC & STATE
// ==========================================

// 1. PRODUCT DATABASE (Mock Data)
const PRODUCTS = [
  {
    id: 1,
    name: '"Imperiya" premium yotoqxona to\'plami',
    category: 'yotoqxona',
    price: 14500000,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    description: 'Luks to\'plam: keng karovat, 6 eshikli shkaf, 2 dona tumba va oyna (tryumo). Rossiya materiallaridan tayyorlangan.',
    badge: 'Xit'
  },
  {
    id: 2,
    name: '"Modern Walnut" yotoqxona garnituri',
    category: 'yotoqxona',
    price: 9800000,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
    description: 'Yumshoq bosh qismli zamonaviy karovat va ixcham shkaflar. Elegant jigarrang va tillarang uyg\'unligi.',
    badge: 'Yangi'
  },
  {
    id: 3,
    name: '"Chesterfield" premium yumshoq mebel to\'plami',
    category: 'mehmonxona',
    price: 12200000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    description: '1 ta katta divan va 2 ta shinam kreslo. Premium darajadagi Turkiya matosi va mustahkam yog\'och karkas.',
    badge: 'Ommabop'
  },
  {
    id: 4,
    name: '"Venetsiya" mehmonxona TV-stenka',
    category: 'mehmonxona',
    price: 4600000,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    description: 'Shisha eshikli shkaflar va keng TV osti stendi. MDF bo\'yoq materialidan ishlangan premium ko\'rinish.',
    badge: ''
  },
  {
    id: 5,
    name: '"Premium Gold" oshxona garnituri',
    category: 'oshxona',
    price: 18500000,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    description: 'Metrlab o\'lchanadigan premium oshxona mebeli. Akril fasadlar, petlyalar silliq yopiluvchi blum tizimi.',
    badge: 'Tavsiya etamiz'
  },
  {
    id: 6,
    name: '"Vena Royal" oshxona stol-stul to\'plami',
    category: 'oshxona-stul',
    price: 6400000,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
    description: 'Tabiiy eman daraxtidan yasalgan stol va 6 ta yumshoq o\'rindiqli stullar to\'plami.',
    badge: ''
  },
  {
    id: 7,
    name: '"Luks oyna" koridor mebeli',
    category: 'koridor',
    price: 3900000,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    description: 'Kiyim ilgich, poyabzal saqlash uchun tokchalar va katta oyna. Koridor uchun juda qulay va ixcham yechim.',
    badge: 'Arzon narx'
  },
  {
    id: 8,
    name: '"Sliding Classic" kupe shkafi',
    category: 'koridor',
    price: 7200000,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    description: 'Keng va qulay garderob kupe shkafi. Alyuminiy slayd profillar va to\'liq oynali eshiklar.',
    badge: ''
  }
];

// 2. STATE VARIABLES
let cart = JSON.parse(localStorage.getItem('asl_mebel_cart')) || [];
let currentCategoryFilter = 'all';

// 3. DOM ELEMENTS
const pageViews = document.querySelectorAll('.page-view');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');

const cartOverlay = document.getElementById('cart-overlay');
const cartToggle = document.getElementById('cart-toggle');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPriceEl = document.getElementById('cart-total-price');
const cartBadgeCountEl = document.getElementById('cart-badge-count');
const cartFooterPane = document.getElementById('cart-footer-pane');

const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('catalog-search');
const sortSelect = document.getElementById('catalog-sort');
const filterCategoriesContainer = document.getElementById('filter-categories-container');

// Forms
const checkoutForm = document.getElementById('checkout-form');
const customOrderForm = document.getElementById('custom-order-form');

// ==========================================
// 4. INITIALIZATION & EVEN LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();
  setupNavigation();
  setupMobileMenu();
  setupCartToggles();
  setupCatalogFilters();
  setupFormHandlers();
  setupPhoneMasking();
});

// ==========================================
// 5. VIEW ROUTING / NAVIGATION
// ==========================================
function switchView(viewId) {
  // Hide all views, deactivate all links
  pageViews.forEach(view => view.classList.remove('active'));
  navLinks.forEach(link => link.classList.remove('active'));
  mobileNavLinks.forEach(link => link.classList.remove('active'));

  // Show selected view
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Activate matching menu items
  const matchingLinks = document.querySelectorAll(`[data-view="${viewId}"]`);
  matchingLinks.forEach(link => link.classList.add('active'));

  // Close mobile drawer
  mobileMenu.classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupNavigation() {
  // Add listeners to standard navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      switchView(view);
    });
  });

  // Mobile navigation
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      switchView(view);
    });
  });

  // Logo Button
  document.getElementById('logo-btn').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('home');
  });
}

function setupMobileMenu() {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });

  mobileMenuCloseBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });

  // Click outside to close mobile menu
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ==========================================
// 6. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = '<i class="fa-solid fa-circle-info toast-icon"></i>';
  if (type === 'success') {
    icon = '<i class="fa-solid fa-circle-check toast-icon"></i>';
  } else if (type === 'error') {
    icon = '<i class="fa-solid fa-triangle-exclamation toast-icon"></i>';
  }

  toast.innerHTML = `
    ${icon}
    <div class="toast-message">${message}</div>
  `;

  container.appendChild(toast);

  // Auto-remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3500);
}

// ==========================================
// 7. CATALOG RENDER & FILTERING
// ==========================================
function renderProducts() {
  if (!productsGrid) return;

  // 1. Get filter criteria
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const sortOption = sortSelect ? sortSelect.value : 'default';

  // 2. Filter products
  let filtered = PRODUCTS.filter(prod => {
    const matchesCategory = currentCategoryFilter === 'all' || prod.category === currentCategoryFilter;
    const matchesSearch = prod.name.toLowerCase().includes(query) || prod.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // 3. Sort products
  if (sortOption === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // 4. Build HTML
  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="cart-empty" style="grid-column: 1 / -1; padding: 50px 0;">
        <i class="fa-solid fa-box-open"></i>
        <p>Mahsulotlar topilmadi. Qidiruv so'zini o'zgartirib ko'ring.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(prod => {
    const formattedPrice = new Intl.NumberFormat('uz-UZ').format(prod.price);
    const badgeHTML = prod.badge ? `<span class="product-badge">${prod.badge}</span>` : '';
    
    return `
      <div class="product-card">
        ${badgeHTML}
        <div class="product-img-wrapper">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
          <div class="product-img-overlay">
            <button class="btn btn-outline" onclick="addToCart(${prod.id})"><i class="fa-solid fa-cart-plus"></i> Savatga qo'shish</button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${prod.category.toUpperCase()}</span>
          <h3 class="product-title">${prod.name}</h3>
          <div class="product-price">${formattedPrice} <span>so'm</span></div>
          <button class="btn-add-cart" onclick="addToCart(${prod.id})">
            <i class="fa-solid fa-bag-shopping"></i> Savatga qo'shish
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterCatalogByCategory(category) {
  currentCategoryFilter = category;
  switchView('catalog');
  
  // Highlight the active button
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
}

function setupCatalogFilters() {
  if (filterCategoriesContainer) {
    filterCategoriesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const cat = e.target.getAttribute('data-category');
        currentCategoryFilter = cat;
        
        // Toggle active button style
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        renderProducts();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderProducts);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', renderProducts);
  }
}

// ==========================================
// 8. CART MANAGEMENT (LOCALSTORAGE BASED)
// ==========================================
function setupCartToggles() {
  cartToggle.addEventListener('click', () => {
    cartOverlay.classList.add('open');
    renderCart();
  });

  cartCloseBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
  });

  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.classList.remove('open');
    }
  });
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartBadge();
  renderCart();
  showToast(`"${product.name}" savatga qo'shildi!`, 'success');
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
    showToast(`Mahsulot savatdan olib tashlandi`, 'info');
  }

  saveCart();
  updateCartBadge();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
  showToast(`Mahsulot savatdan olib tashlandi`, 'info');
}

function saveCart() {
  localStorage.setItem('asl_mebel_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartBadgeCountEl) {
    cartBadgeCountEl.textContent = totalItemsCount;
  }
}

function renderCart() {
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Savatchangiz bo'sh. Katalogni ochib mebellar qo'shishingiz mumkin.</p>
        <button class="btn btn-primary btn-block" onclick="switchView('catalog'); document.getElementById('cart-overlay').classList.remove('open');">Xarid qilish</button>
      </div>
    `;
    cartTotalPriceEl.textContent = "0 so'm";
    cartFooterPane.style.display = "none";
    return;
  }

  cartFooterPane.style.display = "block";

  let cartHTML = '';
  let totalSum = 0;

  cart.forEach(item => {
    const formattedPrice = new Intl.NumberFormat('uz-UZ').format(item.price);
    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;

    cartHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">${formattedPrice} so'm</div>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-controls">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;
  cartTotalPriceEl.textContent = new Intl.NumberFormat('uz-UZ').format(totalSum) + " so'm";
}

// ==========================================
// 9. FORM SUBMISSIONS (BACKEND API INTEGRATION)
// ==========================================
function setupFormHandlers() {
  // Regular Cart Checkout Form
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('checkout-name').value.trim();
      const phone = document.getElementById('checkout-phone').value.trim();
      const address = document.getElementById('checkout-address').value.trim();

      if (!name || phone.length < 9 || !address) {
        showToast("Iltimos, ma'lumotlarni to'liq va to'g'ri kiriting!", "error");
        return;
      }

      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const submitBtn = checkoutForm.querySelector('.checkout-submit-btn');
      
      // Disable UI to prevent double submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Yuborilmoqda... <i class="fa-solid fa-spinner fa-spin"></i>';

      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            address,
            cart,
            totalAmount
          })
        });

        const result = await response.json();

        if (response.ok) {
          showToast(result.message || "Buyurtmangiz muvaffaqiyatli qabul qilindi!", "success");
          cart = [];
          saveCart();
          updateCartBadge();
          renderCart();
          cartOverlay.classList.remove('open');
          checkoutForm.reset();
          // Reset phone prefix
          document.getElementById('checkout-phone').value = "+998";
        } else {
          showToast(result.error || "Buyurtma yuborishda xatolik yuz berdi.", "error");
        }
      } catch (err) {
        console.error('Order submission error:', err);
        showToast("Server bilan bog'lanishda xatolik yuz berdi.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Buyurtma berish <i class="fa-solid fa-check"></i>';
      }
    });
  }

  // Custom Order Form
  if (customOrderForm) {
    customOrderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('custom-name').value.trim();
      const phone = document.getElementById('custom-phone').value.trim();
      const furnitureType = document.getElementById('custom-type').value;
      const dimensions = document.getElementById('custom-dimensions').value.trim();
      const material = document.getElementById('custom-material').value;
      const color = document.getElementById('custom-color').value.trim();
      const details = document.getElementById('custom-details').value.trim();

      if (!name || phone.length < 9 || !furnitureType) {
        showToast("Ism, telefon raqam va mebel turi to'ldirilishi shart!", "error");
        return;
      }

      const submitBtn = customOrderForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Yuborilmoqda... <i class="fa-solid fa-spinner fa-spin"></i>';

      try {
        const response = await fetch('/api/custom-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            furnitureType,
            dimensions,
            material,
            color,
            details
          })
        });

        const result = await response.json();

        if (response.ok) {
          showToast(result.message || "Maxsus buyurtmangiz yuborildi!", "success");
          customOrderForm.reset();
          // Reset phone prefix
          document.getElementById('custom-phone').value = "+998";
          switchView('home');
        } else {
          showToast(result.error || "Buyurtma yuborishda xatolik yuz berdi.", "error");
        }
      } catch (err) {
        console.error('Custom order submission error:', err);
        showToast("Server bilan bog'lanishda xatolik yuz berdi.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Buyurtmani Yuborish <i class="fa-solid fa-paper-plane"></i>';
      }
    });
  }
}

// ==========================================
// 10. PHONE NUMBER FORMATTING / MASK
// ==========================================
function setupPhoneMasking() {
  const phoneInputs = [
    document.getElementById('checkout-phone'),
    document.getElementById('custom-phone')
  ];

  phoneInputs.forEach(input => {
    if (!input) return;

    input.addEventListener('focus', () => {
      if (input.value === "") {
        input.value = "+998";
      }
    });

    input.addEventListener('input', (e) => {
      // Prevent deleting +998
      if (!input.value.startsWith('+998')) {
        input.value = '+998' + input.value.replace(/\D/g, '');
      }

      // Restrict characters to valid phone numbers (allow digits, +, and spaces/dashes)
      let cleaned = input.value.replace(/[^\d+]/g, '');
      
      // Limit length to +998 followed by 9 digits (total 13 chars)
      if (cleaned.length > 13) {
        cleaned = cleaned.substring(0, 13);
      }
      
      input.value = cleaned;
    });

    input.addEventListener('blur', () => {
      if (input.value === "+998" || input.value.length < 4) {
        input.value = "";
      }
    });
  });
}
