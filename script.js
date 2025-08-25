// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize reveal animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageElement = toast.querySelector('.toast__message');
    
    messageElement.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        hideToast();
    }, 3000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
}

// Add to cart functionality
function handleAddToCart(event) {
    event.preventDefault();
    const button = event.target;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-card__name').textContent;
    
    // Add loading state
    button.textContent = 'Adding...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.disabled = false;
        showToast(`${productName} added to cart!`);
    }, 800);
}

// Newsletter form validation and submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('#email').value.trim();
    const consent = form.querySelector('#consent').checked;
    const messageElement = document.getElementById('form-message');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Clear previous messages
    messageElement.textContent = '';
    messageElement.className = 'form-message';
    
    // Validation
    if (!email) {
        showFormMessage('Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!consent) {
        showFormMessage('Please agree to receive marketing communications.', 'error');
        return;
    }
    
    // Submit state
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.textContent = 'Subscribe';
        submitButton.disabled = false;
        
        // Success
        form.reset();
        showFormMessage('Thank you! You\'ve been subscribed to our newsletter.', 'success');
        showToast('Successfully subscribed to newsletter!');
    }, 1500);
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Search functionality (basic)
function handleSearch(event) {
    const searchTerm = prompt('Enter search term:');
    if (searchTerm) {
        showToast(`Searching for "${searchTerm}"...`);
        // In a real app, this would perform actual search
    }
}

// Cart functionality (basic)
function handleCartClick() {
    showToast('Opening cart...', 'info');
    // In a real app, this would open cart sidebar/modal
}

// Hero CTA click
function handleHeroCTA() {
    const bestSellersSection = document.querySelector('.best-sellers');
    if (bestSellersSection) {
        bestSellersSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scroll for navigation links
function handleNavClick(event) {
    // Only handle internal links
    const href = event.target.getAttribute('href');
    if (href && href.startsWith('#')) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize all event listeners
function initEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Toast close button
    const toastCloseButton = document.querySelector('.toast__close');
    if (toastCloseButton) {
        toastCloseButton.addEventListener('click', hideToast);
    }
    
    // Search button
    const searchButton = document.querySelector('.btn-icon[aria-label="Search"]');
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
    
    // Cart button
    const cartButton = document.querySelector('.btn-icon[aria-label="Shopping cart"]');
    if (cartButton) {
        cartButton.addEventListener('click', handleCartClick);
    }
    
    // Hero CTA
    const heroCTA = document.querySelector('.hero__cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', handleHeroCTA);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

// Handle page visibility for performance
function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers if needed
    } else {
        // Page is visible, resume animations
    }
}

// Keyboard navigation improvements
function handleKeyboardNavigation(event) {
    // Escape key closes toast
    if (event.key === 'Escape') {
        hideToast();
    }
    
    // Enter key on product cards triggers add to cart
    if (event.key === 'Enter' && event.target.classList.contains('product-card')) {
        const addToCartButton = event.target.querySelector('.add-to-cart');
        if (addToCartButton) {
            addToCartButton.click();
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    initEventListeners();
    
    // Add global event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyboardNavigation);
});

// Performance: Defer non-critical operations
window.addEventListener('load', () => {
    // Any operations that can wait until after page load
    console.log('Wellco Adult site loaded successfully');
});