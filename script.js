// ========================
// GLOBAL VARIABLES
// ========================
let currentFilter = 'all';

// ========================
// MOBILE NAVIGATION
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Set active navigation link
    setActiveNavLink();

    // Initialize all features
    initBuyButtons();
    initFilterButtons();
    initFAQ();
    initScrollAnimations();
    initStickyNavbar();
    initScrollToTop();
});

// ========================
// ACTIVE NAVIGATION LINK
// ========================
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = link.getAttribute('href');
        
        // Handle different path scenarios
        if (currentPath.includes(linkPath.replace('index.html', '')) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
}

// ========================
// BUY BUTTONS - ORDER NOW
// ========================
function initBuyButtons() {
    const buyButtons = document.querySelectorAll('.buy-button, .btn-primary');

    buyButtons.forEach(button => {
        // Skip if it's a navigation link
        if (button.tagName === 'A') return;

        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product information
            const productCard = this.closest('.product-card, .shade-card');
            let productName = 'KissMoKa Foundation';
            let productPrice = '฿399';
            let productShade = '';

            if (productCard) {
                const nameElement = productCard.querySelector('.product-name, .shade-info h3');
                const priceElement = productCard.querySelector('.product-price, .price');
                const shadeElement = productCard.querySelector('.shade-number');

                if (nameElement) productName = nameElement.textContent.trim();
                if (priceElement) productPrice = priceElement.textContent.trim();
                if (shadeElement) productShade = 'Shade ' + shadeElement.textContent.trim() + ' - ';
            }

            // Create order message for LINE
            const message = `สวัสดีค่ะ! สนใจสั่งซื้อ KissMoKa Foundation\n\n` +
                          `สินค้า: ${productShade}${productName}\n` +
                          `ราคา: ${productPrice}\n\n` +
                          `ขอข้อมูลเพิ่มเติมด้วยค่ะ`;
            
            const encodedMessage = encodeURIComponent(message);

            // Open LINE chat with pre-filled message
            window.open(`https://line.me/R/ti/p/@kissmoka?text=${encodedMessage}`, '_blank');
        });
    });
}

// ========================
// FILTER BUTTONS (Product Page)
// ========================
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card[data-category]');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;

            // Filter products with animation
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========================
// FAQ ACCORDION
// ========================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ========================
// SMOOTH SCROLLING
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ========================
// SCROLL ANIMATIONS
// ========================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all elements with data-scroll attribute
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => observer.observe(el));

    // Also observe product cards, shade cards, etc.
    const animatedElements = document.querySelectorAll(
        '.product-card, .shade-card, .promise-card, ' +
        '.benefit-card, .testimonial-card, .step-card, ' +
        '.guide-step, .feature-item, .product-card-mini'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(element);
    });

    // Add in-view class handler
    const style = document.createElement('style');
    style.textContent = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================
// STICKY NAVBAR
// ========================
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ========================
// SCROLL TO TOP BUTTON
// ========================
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Styles
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background: #d4949f;
        color: white;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        box-shadow: 0 4px 15px rgba(212, 148, 159, 0.4);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 25px rgba(212, 148, 159, 0.5)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(212, 148, 159, 0.4)';
    });
}

// ========================
// SOCIAL MEDIA BUTTONS
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Handle all social media buttons
    const socialButtons = document.querySelectorAll('.social-btn, .footer-social a');

    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get the platform from class or href
            const href = this.getAttribute('href');
            
            // If it's a valid external link, let it open
            if (href && (href.startsWith('http') || href.startsWith('https://'))) {
                // Link will open normally
                return;
            }
            
            // Otherwise, prevent default and show alert
            e.preventDefault();
            
            let platform = 'Social Media';
            if (this.classList.contains('line')) platform = 'LINE';
            else if (this.classList.contains('facebook')) platform = 'Facebook';
            else if (this.classList.contains('instagram')) platform = 'Instagram';
            else if (this.classList.contains('tiktok')) platform = 'TikTok';
            
            alert(`Opening ${platform}...\n\nNote: Replace social media links with your actual accounts!`);
        });
    });
});

// ========================
// PRODUCT CARD HOVER EFFECTS
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card, .shade-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ========================
// SHADE CARD CLICK TO VIEW DETAILS
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const shadeCards = document.querySelectorAll('.shade-card');

    shadeCards.forEach(card => {
        // Don't add click if there's already a buy button
        if (card.querySelector('.buy-button')) return;

        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            // Get shade information
            const shadeName = this.querySelector('h3')?.textContent || 'Foundation';
            const shadeNumber = this.querySelector('.shade-number')?.textContent || '';
            
            // Redirect to product page or show modal
            window.location.href = `product/index.html#shade-${shadeNumber}`;
        });
    });
});

// ========================
// FORM VALIDATION (Future use)
// ========================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================
// LOADING ANIMATION
// ========================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================
// CONSOLE WELCOME MESSAGE
// ========================
console.log('%c🧴 Welcome to KissMoKa Foundation! ', 'background: #d4949f; color: white; padding: 10px; font-size: 16px; border-radius: 5px;');
console.log('%cYour Natural Beauty Companion 💕', 'color: #d4949f; font-size: 14px;');

// ========================
// ERROR HANDLING
// ========================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ========================
// UTILITY FUNCTIONS
// ========================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================
// PERFORMANCE OPTIMIZATION
// ========================

// Optimize scroll event listeners
const optimizedScroll = throttle(function() {
    // Scroll handling logic here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ========================
// ACCESSIBILITY ENHANCEMENTS
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.buy-button, .filter-btn, .faq-question');

    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ========================
// PRINT STYLES
// ========================
window.addEventListener('beforeprint', function() {
    console.log('Preparing to print...');
});

window.addEventListener('afterprint', function() {
    console.log('Print complete');
});