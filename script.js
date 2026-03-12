// Global Variables
let cart = [];
let currentTheme = 'blue';
let products = [];
let productsLoaded = 8;

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        name: "Designer Dress",
        description: "Elegant evening dress perfect for special occasions",
        price: 299.99,
        image: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 5,
        category: "women"
    },
    {
        id: 2,
        name: "Casual T-Shirt",
        description: "Comfortable cotton t-shirt for everyday wear",
        price: 29.99,
        image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4,
        category: "men"
    },
    {
        id: 3,
        name: "Leather Handbag",
        description: "Premium leather handbag with multiple compartments",
        price: 199.99,
        image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 5,
        category: "accessories"
    },
    {
        id: 4,
        name: "Summer Blouse",
        description: "Light and airy blouse perfect for warm weather",
        price: 79.99,
        image: "https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4,
        category: "women"
    },
    {
        id: 5,
        name: "Denim Jeans",
        description: "Classic fit denim jeans with premium quality",
        price: 89.99,
        image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 5,
        category: "men"
    },
    {
        id: 6,
        name: "Statement Necklace",
        description: "Bold statement necklace to elevate any outfit",
        price: 59.99,
        image: "https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4,
        category: "accessories"
    },
    {
        id: 7,
        name: "Wool Sweater",
        description: "Cozy wool sweater for cold weather comfort",
        price: 129.99,
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 5,
        category: "women"
    },
    {
        id: 8,
        name: "Business Shirt",
        description: "Professional dress shirt for business occasions",
        price: 69.99,
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4,
        category: "men"
    },
    {
        id: 9,
        name: "Silk Scarf",
        description: "Luxurious silk scarf with elegant patterns",
        price: 49.99,
        image: "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 5,
        category: "accessories"
    },
    {
        id: 10,
        name: "Cocktail Dress",
        description: "Stunning cocktail dress for evening events",
        price: 249.99,
        image: "https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 5,
        category: "women"
    },
    {
        id: 11,
        name: "Polo Shirt",
        description: "Classic polo shirt for smart casual occasions",
        price: 49.99,
        image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4,
        category: "men"
    },
    {
        id: 12,
        name: "Designer Watch",
        description: "Elegant timepiece with modern design",
        price: 399.99,
        image: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 5,
        category: "accessories"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Load products
    loadProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup theme switcher
    setupThemeSwitcher();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup animations
    setupAnimations();
    
    // Load cart from localStorage
    loadCartFromStorage();
}

function setupEventListeners() {
    // Cart click handler
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            showCartModal();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup();
        });
    }
    
    // Navbar scrolling effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Responsive navigation
    setupResponsiveNavigation();
}

function setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
}

function changeTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update active theme button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    
    // Save theme preference
    localStorage.setItem('selectedTheme', theme);
    
    // Add animation effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function loadProducts() {
    products = [...sampleProducts];
    renderProducts();
}

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Render products up to the current loaded count
    const productsToShow = products.slice(0, productsLoaded);
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Hide "Load More" button if all products are loaded
    const loadMoreBtn = document.querySelector('button[onclick="loadMoreProducts()"]');
    if (loadMoreBtn && productsLoaded >= products.length) {
        loadMoreBtn.style.display = 'none';
    }
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-6 mb-4';
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    col.innerHTML = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <h5 class="product-title">${product.name}</h5>
                <p class="product-description">${product.description}</p>
                <div class="product-rating mb-2">
                    <span style="color: #F59E0B;">${stars}</span>
                    <small class="text-muted">(${product.rating}/5)</small>
                </div>
                <div class="product-price">$${product.price}</div>
                <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus me-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return col;
}

function loadMoreProducts() {
    productsLoaded += 4;
    renderProducts();
    
    // Add loading animation
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1000);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showAddToCartFeedback();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            saveCartToStorage();
        }
    }
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showCartModal() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
    } else {
        const cartHTML = cart.map(item => `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;" class="me-3">
                    <div>
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">$${item.price}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary me-3" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartItems.innerHTML = cartHTML + `
            <div class="cart-total mt-3 pt-3 border-top">
                <h5 class="text-end">Total: $${total.toFixed(2)}</h5>
            </div>
        `;
    }
    
    cartModal.show();
}

function showAddToCartFeedback() {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.className = 'alert alert-success position-fixed';
    feedback.style.cssText = 'top: 100px; right: 20px; z-index: 9999; opacity: 0; transition: opacity 0.3s ease;';
    feedback.innerHTML = '<i class="fas fa-check me-2"></i>Item added to cart!';
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => feedback.style.opacity = '1', 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => document.body.removeChild(feedback), 300);
    }, 3000);
}

function handleNewsletterSignup() {
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    const submitBtn = document.querySelector('.newsletter-form button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        emailInput.value = '';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; opacity: 0; transition: opacity 0.3s ease; max-width: 300px;';
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.opacity = '1', 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
}

function setupResponsiveNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close navbar when clicking on nav links (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
}

function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation styles and observe elements
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .testimonial-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const debouncedScrollHandler = debounce(handleNavbarScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Error handling
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.loadMoreProducts = loadMoreProducts;