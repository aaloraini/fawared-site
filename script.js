// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productModal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const quoteForm = document.getElementById('quoteForm');

// State
let products = [];
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProducts();
    setupEventListeners();
    setupSmoothScroll();
    setupStickyNavigation();
}

// Load Products
async function loadProducts() {
    try {
        isLoading = true;
        showLoadingState();
        
        const response = await fetch('products/products.json');
        if (!response.ok) {
            throw new Error('Failed to load products');
        }
        
        products = await response.json();
        renderProducts();
        
    } catch (error) {
        console.error('Error loading products:', error);
        showErrorState();
    } finally {
        isLoading = false;
    }
}

// Render Products
function renderProducts() {
    if (!products.length) {
        showEmptyState();
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.code}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-code">${product.code}</h3>
                <p class="product-name">${product.name}</p>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
            </div>
        </div>
    `).join('');

    // Add click handlers to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.dataset.productId;
            openProductModal(productId);
        });
    });
}

// Loading States
function showLoadingState() {
    productsGrid.innerHTML = '<div class="loading">جاري تحميل التشكيلة...</div>';
}

function showErrorState() {
    productsGrid.innerHTML = `
        <div class="error-state" style="text-align: center; padding: 3rem; color: #666;">
            <h3>عذراً، حدث خطأ في تحميل التشكيلة</h3>
            <p>يرجى المحاولة مرة أخرى لاحقاً</p>
            <button class="btn btn-primary" onclick="loadProducts()" style="margin-top: 1rem;">إعادة المحاولة</button>
        </div>
    `;
}

function showEmptyState() {
    productsGrid.innerHTML = `
        <div class="empty-state" style="text-align: center; padding: 3rem; color: #666;">
            <h3>لا توجد منتجات حالياً</h3>
            <p>يرجى المراجعة لاحقاً</p>
        </div>
    `;
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.code === productId);
    if (!product) return;

    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = `${product.code} - ${product.name}`;
    modalDescription.textContent = product.description || 'تصميم رخامي هندسي فاخر يناسب جميع الاستخدامات الداخلية والخارجية';
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
function setupEventListeners() {
    // Modal close
    modalClose.addEventListener('click', closeProductModal);
    
    // Close modal on outside click
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.style.display === 'block') {
            closeProductModal();
        }
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Contact form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', handleResize);
}

// Form Handling
function handleFormSubmission(e) {
    // Don't prevent default - let Formspree handle the submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'جاري الإرسال...';
    submitButton.disabled = true;
    
    // Formspree will handle the actual submission and redirect
    // The success message will be handled by Formspree's default behavior
}

function showFormMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    
    quoteForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupStickyNavigation() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Responsive Handling
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Image Lazy Loading Enhancement
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimization
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

// Analytics and Tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    
    // Example: Track product views
    if (eventName === 'product_view') {
        // In a real application, you would send this to your analytics service
        console.log('Product viewed:', properties.productCode);
    }
}

// Add product view tracking
document.addEventListener('click', function(e) {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
        const productCode = productCard.dataset.productId;
        trackEvent('product_view', { productCode });
    }
});

// Accessibility Enhancements
function setupAccessibility() {
    // Add keyboard navigation for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `عرض المنتج ${card.dataset.productId}`);
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add ARIA labels for modal
    productModal.setAttribute('role', 'dialog');
    productModal.setAttribute('aria-modal', 'true');
    productModal.setAttribute('aria-labelledby', 'modalTitle');
    
    modalClose.setAttribute('aria-label', 'إغلاق');
}

// Initialize accessibility when DOM is ready
document.addEventListener('DOMContentLoaded', setupAccessibility);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Performance Monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

// Initialize lazy loading after products are loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupLazyLoading, 100);
});
