// ========================
// DARK MODE
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode is already applied in <head> script
    // Just create the toggle button
    createDarkModeToggle();
});

function createDarkModeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.innerHTML = `
        <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="5" stroke="currentColor" stroke-width="2"/>
            <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17 10.5C16.8 14.6 13.4 18 9.3 18C5.2 18 2 14.8 2 10.7C2 6.6 5.4 3.2 9.5 3C9.2 3.6 9 4.3 9 5C9 7.8 11.2 10 14 10C14.7 10 15.4 9.8 16 9.5C16.6 9.8 17 10.1 17 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    toggleBtn.addEventListener('click', function() {
        const html = document.documentElement;
        html.classList.toggle('dark-mode');
        
        // Save preference
        if (html.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    document.body.appendChild(toggleBtn);
}

// ========================
// MOBILE NAVIGATION
// ========================
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
}

// Set active navigation link based on current page
setActiveNavLink();

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
// FAQ ACCORDION
// ========================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Initialize FAQ if on FAQ page
if (document.querySelector('.faq-container')) {
    document.addEventListener('DOMContentLoaded', initFAQ);
}

// ========================
// FILTER BUTTONS (Product Page)
// ========================
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter products
            productCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Initialize filters if on product page
if (document.querySelector('.filter-btn')) {
    document.addEventListener('DOMContentLoaded', initProductFilters);
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
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    
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
// NAVBAR SCROLL EFFECT
// ========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================
// PRODUCT BUY BUTTON
// ========================
function handleBuyButton() {
    const buyButtons = document.querySelectorAll('.buy-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            // Create order message
            const message = `สวัสดีค่ะ! สนใจสั่ง KissMoKa Foundation ${productName} (${productPrice})`;
            const encodedMessage = encodeURIComponent(message);

            // Open LINE chat with pre-filled message
            window.open(`https://lin.ee/KissMoKa?text=${encodedMessage}`, '_blank');
        });
    });
}

// Initialize buy buttons if on product page
if (document.querySelector('.product-card')) {
    document.addEventListener('DOMContentLoaded', handleBuyButton);
}

// ========================
// SCROLL TO TOP BUTTON
// ========================
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');

    document.body.appendChild(scrollBtn);

    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// ========================
// SCROLL ANIMATIONS
// ========================
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .promise-card, .faq-item, .benefit-card, .shade-card, .step-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations on scroll
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ========================
// LANGUAGE TOGGLE (EN / TH)
// ========================
const LANG_KEY = 'kmLang';

function initLangToggle() {
    const current = localStorage.getItem(LANG_KEY) || 'en';
    document.documentElement.setAttribute('data-lang', current);
    applyLang(current);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === current);
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            localStorage.setItem(LANG_KEY, lang);
            document.documentElement.setAttribute('data-lang', lang);
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
            applyLang(lang);
        });
    });
}

function applyLang(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = lang === 'th' ? (el.dataset.th || el.dataset.en) : el.dataset.en;
    });
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
        el.placeholder = lang === 'th' ? (el.dataset.thPlaceholder || el.dataset.enPlaceholder) : el.dataset.enPlaceholder;
    });
}

document.addEventListener('DOMContentLoaded', initLangToggle);

// ========================
// SEARCH OVERLAY
// ========================
const searchData = [
    { name: 'Porcelain', desc: 'Shade 01 · Fair · Cool undertone', url: 'product/index.html', swatch: '#f5e5d8' },
    { name: 'Ivory', desc: 'Shade 02 · Light · Neutral undertone', url: 'product/index.html', swatch: '#f7e0cb' },
    { name: 'Beige', desc: 'Shade 03 · Light-Medium · Warm', url: 'product/index.html', swatch: '#f2d5bc' },
    { name: 'Natural', desc: 'Shade 04 · Medium · Neutral', url: 'product/index.html', swatch: '#e8c5a8' },
    { name: 'Honey', desc: 'Shade 05 · Medium · Warm', url: 'product/index.html', swatch: '#deb598' },
    { name: 'Tan', desc: 'Shade 06 · Medium-Deep · Warm', url: 'product/index.html', swatch: '#d4a588' },
    { name: 'Caramel', desc: 'Shade 07 · Deep · Golden', url: 'product/index.html', swatch: '#c08968' },
    { name: 'Mocha', desc: 'Shade 08 · Deep · Warm', url: 'product/index.html', swatch: '#a67352' },
    { name: 'FAQ', desc: 'Frequently Asked Questions', url: 'faq/index.html', swatch: null },
    { name: 'Beauty Guide', desc: 'Tips & application guide', url: 'content/index.html', swatch: null },
    { name: 'Ingredients', desc: "What's in our formula?", url: 'ingredients/index.html', swatch: null },
    { name: 'Shade Quiz', desc: 'Find your perfect shade', url: 'quiz/index.html', swatch: null },
    { name: 'Blog', desc: 'Beauty tips & news', url: 'blog/index.html', swatch: null },
    { name: 'Contact', desc: 'Get in touch with us', url: 'contact/index.html', swatch: null },
    { name: 'Why Us', desc: 'Our brand story & values', url: 'why-us/index.html', swatch: null },
    { name: 'Loyalty Rewards', desc: 'Earn points, get rewards', url: 'loyalty/index.html', swatch: null },
];

function initSearch() {
    const trigger = document.getElementById('searchTrigger');
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const closeBtn = document.getElementById('searchClose');
    const results = document.getElementById('searchResults');
    if (!trigger || !overlay) return;

    const isSubPage = !window.location.pathname.endsWith('/') &&
        !window.location.pathname.endsWith('index.html') ||
        window.location.pathname.split('/').filter(Boolean).length > 1;

    const getPrefix = () => {
        const parts = window.location.pathname.split('/').filter(Boolean);
        const subDirs = ['product','faq','why-us','content','info','policy','quiz','blog','ingredients','contact','loyalty'];
        return parts.some(p => subDirs.includes(p)) ? '../' : '';
    };

    const openSearch = () => {
        overlay.classList.add('active');
        setTimeout(() => input && input.focus(), 100);
    };
    const closeSearch = () => {
        overlay.classList.remove('active');
        if (input) input.value = '';
        if (results) results.innerHTML = '';
    };

    trigger.addEventListener('click', openSearch);
    closeBtn && closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

    input && input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) { results.innerHTML = ''; return; }

        const matches = searchData.filter(item =>
            item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
        );

        if (!matches.length) {
            results.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }

        const prefix = getPrefix();
        results.innerHTML = matches.map(item => `
            <a href="${prefix}${item.url}" class="search-result-item">
                <span class="search-result-swatch" style="background:${item.swatch || 'rgba(212,148,159,0.2)'};">${item.swatch ? '' : '🔍'}</span>
                <span>
                    <span class="search-result-name">${item.name}</span>
                    <span class="search-result-meta">${item.desc}</span>
                </span>
            </a>
        `).join('');
    });
}

document.addEventListener('DOMContentLoaded', initSearch);

// ========================
// STICKY BUY BAR
// ========================
function initStickyBar() {
    if (!document.querySelector('.product-grid')) return;

    const bar = document.createElement('div');
    bar.className = 'sticky-buy-bar';
    bar.innerHTML = `
        <div class="sticky-info">
            <span class="sticky-name">KissMoKa Foundation</span>
            <span class="sticky-price">฿399</span>
        </div>
        <button class="buy-button" onclick="window.open('https://lin.ee/KissMoKa?text=${encodeURIComponent('สวัสดีค่ะ! สนใจสั่ง KissMoKa Foundation')}','_blank')">Order on LINE</button>
    `;
    document.body.appendChild(bar);

    const pageHeader = document.querySelector('.page-header');
    const threshold = pageHeader ? pageHeader.offsetTop + pageHeader.offsetHeight + 100 : 400;

    window.addEventListener('scroll', () => {
        bar.classList.toggle('visible', window.scrollY > threshold);
    });
}

document.addEventListener('DOMContentLoaded', initStickyBar);

// ========================
// BEFORE / AFTER SLIDER
// ========================
function initBASlider() {
    const range = document.getElementById('baRange');
    const after = document.getElementById('baAfter');
    const divider = document.getElementById('baDivider');
    if (!range || !after || !divider) return;

    const update = val => {
        after.style.width = val + '%';
        divider.style.left = val + '%';
    };

    range.addEventListener('input', () => update(range.value));
    update(50);
}

document.addEventListener('DOMContentLoaded', initBASlider);

// ========================
// SWATCH PICKER
// ========================
function initSwatchPickers() {
    document.querySelectorAll('.swatch-picker').forEach(picker => {
        const card = picker.closest('.product-card');
        if (!card) return;
        const image = card.querySelector('.product-image');
        const dots = picker.querySelectorAll('.swatch-dot');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                const c1 = dot.dataset.c1, c2 = dot.dataset.c2 || c1;
                if (image) image.style.background = `linear-gradient(135deg,${c1} 0%,${c2} 100%)`;
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initSwatchPickers);

// ========================
// SKELETON LOADING
// ========================
function initSkeletons() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    const realCards = [...grid.querySelectorAll('.product-card')];
    realCards.forEach(c => { c.dataset.origDisplay = c.style.display; c.style.display = 'none'; });

    const skels = realCards.map(() => {
        const el = document.createElement('div');
        el.className = 'skeleton-card';
        el.innerHTML = `<div class="skeleton skeleton-image"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton skeleton-btn"></div>`;
        grid.appendChild(el);
        return el;
    });

    setTimeout(() => {
        skels.forEach(s => s.remove());
        realCards.forEach(c => { c.style.display = ''; });
    }, 800);
}

document.addEventListener('DOMContentLoaded', initSkeletons);

// ========================
// RATING BARS ANIMATION
// ========================
function initRatingBars() {
    const bars = document.querySelectorAll('.rating-bar-fill');
    if (!bars.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = (entry.target.dataset.w || 0) + '%';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => { bar.style.width = '0'; obs.observe(bar); });
}

document.addEventListener('DOMContentLoaded', initRatingBars);

// ========================
// QUIZ LOGIC
// ========================
function initQuiz() {
    const quizForm = document.getElementById('quizForm');
    if (!quizForm) return;

    let answers = {};
    const steps = quizForm.querySelectorAll('.quiz-step');
    const dots = quizForm.querySelectorAll('.quiz-dot');
    const resultEl = document.getElementById('quizResult');

    function goTo(idx) {
        steps.forEach((s, i) => s.classList.toggle('active', i === idx));
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === idx);
            d.classList.toggle('done', i < idx);
        });
    }

    quizForm.querySelectorAll('.quiz-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            const step = opt.closest('.quiz-step');
            step.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('picked'));
            opt.classList.add('picked');
            answers[step.dataset.step] = opt.dataset.value;

            const cur = [...steps].indexOf(step);
            setTimeout(() => {
                if (cur < steps.length - 1) goTo(cur + 1);
                else showResult(answers);
            }, 320);
        });
    });

    const restartBtn = document.getElementById('quizRestart');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            answers = {};
            quizForm.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('picked'));
            if (resultEl) resultEl.classList.remove('active');
            quizForm.style.display = 'block';
            goTo(0);
        });
    }
}

const shadeMap = {
    'fair-cool':    { name: 'Porcelain (Shade 01)', color: '#f5e5d8', desc: 'Fair skin with cool undertones — light, barely-there coverage for a natural glow.' },
    'fair-neutral': { name: 'Ivory (Shade 02)',     color: '#f7e0cb', desc: 'Light skin with neutral undertones — adapts beautifully to your complexion.' },
    'fair-warm':    { name: 'Beige (Shade 03)',     color: '#f2d5bc', desc: 'Light-medium skin with warm undertones — a versatile, sun-kissed everyday shade.' },
    'medium-cool':  { name: 'Natural (Shade 04)',   color: '#e8c5a8', desc: 'Medium skin that leans cool — balanced coverage that blends seamlessly.' },
    'medium-neutral':{ name: 'Natural (Shade 04)', color: '#e8c5a8', desc: 'Medium skin with neutral undertones — our most popular, perfectly balanced shade.' },
    'medium-warm':  { name: 'Honey (Shade 05)',     color: '#deb598', desc: 'Medium skin with golden undertones — enhances your natural radiance beautifully.' },
    'deep-cool':    { name: 'Tan (Shade 06)',        color: '#d4a588', desc: 'Medium-deep skin — seamless coverage that looks like your skin, only better.' },
    'deep-neutral': { name: 'Caramel (Shade 07)',   color: '#c08968', desc: 'Deep skin with golden undertones — flawless coverage that celebrates your beauty.' },
    'deep-warm':    { name: 'Mocha (Shade 08)',      color: '#a67352', desc: 'Deep skin with warm undertones — rich, even coverage without any ashiness.' },
};

function showResult(answers) {
    const quizForm = document.getElementById('quizForm');
    const resultEl = document.getElementById('quizResult');
    if (!resultEl) return;

    const depth = answers['depth'] || 'medium';
    const undertone = answers['undertone'] || 'neutral';
    const match = shadeMap[`${depth}-${undertone}`] || shadeMap['medium-neutral'];

    const swatch = resultEl.querySelector('.quiz-result-swatch');
    const title = resultEl.querySelector('.quiz-result-title');
    const sub = resultEl.querySelector('.quiz-result-sub');

    if (swatch) swatch.style.background = match.color;
    if (title) title.textContent = `Your Match: ${match.name}`;
    if (sub) sub.textContent = match.desc;

    if (quizForm) quizForm.style.display = 'none';
    resultEl.classList.add('active');
}

document.addEventListener('DOMContentLoaded', initQuiz);

// ========================
// CONTACT FORM → LINE
// ========================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = (form.querySelector('#cName') || {}).value || '';
        const topic = (form.querySelector('#cTopic') || {}).value || '';
        const msg = (form.querySelector('#cMsg') || {}).value || '';
        const text = `สวัสดีค่ะ! ฉันชื่อ ${name}\nหัวข้อ: ${topic}\n${msg}`;
        window.open(`https://lin.ee/KissMoKa?text=${encodeURIComponent(text)}`, '_blank');
    });
}

document.addEventListener('DOMContentLoaded', initContactForm);

// ========================
// PWA: Service Worker
// ========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

// PWA install banner
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;

    const banner = document.createElement('div');
    banner.className = 'pwa-banner';
    banner.innerHTML = `
        <span class="pwa-banner-icon">💄</span>
        <div class="pwa-banner-text">
            <div class="pwa-banner-title">Add KissMoKa to Home Screen</div>
            <div class="pwa-banner-sub">Shop faster, even offline</div>
        </div>
        <button class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.85rem;" id="pwaBannerInstall">Install</button>
        <button class="pwa-banner-close" id="pwaBannerClose">&times;</button>
    `;
    document.body.appendChild(banner);
    setTimeout(() => banner.classList.add('show'), 3000);

    document.getElementById('pwaBannerInstall').addEventListener('click', () => {
        banner.classList.remove('show');
        deferredPrompt.prompt();
    });
    document.getElementById('pwaBannerClose').addEventListener('click', () => banner.classList.remove('show'));
});