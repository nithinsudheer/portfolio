/* ========================================
   WARTIN LABS PORTFOLIO - MAIN JAVASCRIPT
   ======================================== */

'use strict';

/* ========================================
   DARK MODE TOGGLE
   ======================================== */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        // Read current theme from DOM (set by inline script) or default to light
        this.currentTheme = document.documentElement.getAttribute('data-theme') || 
                           localStorage.getItem('theme') || 
                           'light';
        
        this.init();
    }
    
    init() {
        // Update icon to match current theme (don't call setTheme again, just update icon)
        this.updateIcon();
        
        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    updateIcon() {
        // Update toggle icon - moon for light mode, sun for dark mode
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.currentTheme === 'dark' ? '☀' : '☾';
        }
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateIcon();
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

/* ========================================
   SMOOTH SCROLL NAVIGATION
   ======================================== */

class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }
    
    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Skip empty hash or just '#'
        if (!href || href === '#') return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('navMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
            
            // Smooth scroll to target
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('mobileMenuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }
    
    init() {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => this.toggle());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar')) {
                    this.close();
                }
            });
            
            // Close menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.close();
                }
            });
        }
    }
    
    toggle() {
        this.navMenu.classList.toggle('active');
        
        // Update hamburger icon
        const hamburger = this.menuToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.textContent = this.navMenu.classList.contains('active') ? '✕' : '☰';
        }
    }
    
    close() {
        this.navMenu.classList.remove('active');
        const hamburger = this.menuToggle?.querySelector('.hamburger');
        if (hamburger) {
            hamburger.textContent = '☰';
        }
    }
}

/* ========================================
   TYPEWRITER EFFECT FOR HERO HEADLINE
   UPDATED: Now reads from config.js
   ======================================== */

class TypewriterEffect {
    constructor() {
        this.element = document.getElementById('typewriterText');
        
        // Get settings from config.js
        if (typeof portfolioConfig !== 'undefined' && portfolioConfig.typewriter) {
            this.phrases = portfolioConfig.typewriter.phrases;
            this.typingSpeed = portfolioConfig.typewriter.typingSpeed || 100;
            this.deletingSpeed = portfolioConfig.typewriter.deletingSpeed || 50;
            this.pauseAfterComplete = portfolioConfig.typewriter.pauseAfterComplete || 2000;
            this.pauseAfterDelete = portfolioConfig.typewriter.pauseAfterDelete || 500;
        } else {
            // Fallback if config not loaded
            console.warn('⚠️ Config not loaded. Using default typewriter phrases.');
            this.phrases = [
                'in Weeks, Not Months.',
                'Before Competition.',
                'With Real Users.'
            ];
            this.typingSpeed = 100;
            this.deletingSpeed = 50;
            this.pauseAfterComplete = 2000;
            this.pauseAfterDelete = 500;
        }
        
        this.currentPhraseIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        
        if (this.element) {
            this.init();
        }
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            // Delete character
            this.currentText = currentPhrase.substring(0, this.currentText.length - 1);
        } else {
            // Add character
            this.currentText = currentPhrase.substring(0, this.currentText.length + 1);
        }
        
        // Update the element
        this.element.textContent = this.currentText;
        
        // Calculate next delay
        let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        
        // If finished typing current phrase
        if (!this.isDeleting && this.currentText === currentPhrase) {
            delay = this.pauseAfterComplete;
            this.isDeleting = true;
        }
        // If finished deleting
        else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            delay = this.pauseAfterDelete;
        }
        
        setTimeout(() => this.type(), delay);
    }
}

/* ========================================
   FORM VALIDATION & SUBMISSION
   ======================================== */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = this.validateForm();
        
        if (isValid) {
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitButton = this.form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            this.submitForm(data)
                .then(() => {
                    // Show success message
                    this.showSuccess();
                    
                    // Reset form
                    this.form.reset();
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                })
                .catch((error) => {
                    console.error('Form submission error:', error);
                    alert('Sorry, there was an error sending your message. Please try again or email directly.');
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        }
    }
    
    validateForm() {
        let isValid = true;
        const fields = ['email', 'name', 'subject', 'message'];
        
        fields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let errorMessage = '';
        
        // Check if empty
        if (!value) {
            errorMessage = 'This field is required.';
        }
        // Email validation
        else if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address.';
            }
        }
        // Name validation (at least 2 characters)
        else if (fieldName === 'name' && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters.';
        }
        // Subject validation (at least 3 characters)
        else if (fieldName === 'subject' && value.length < 3) {
            errorMessage = 'Subject must be at least 3 characters.';
        }
        // Message validation (at least 10 characters)
        else if (fieldName === 'message' && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters.';
        }
        
        // Show/hide error
        if (errorMessage) {
            this.showError(field, errorMessage);
            return false;
        } else {
            this.clearError(field);
            return true;
        }
    }
    
    showError(field, message) {
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.classList.add('error');
    }
    
    clearError(field) {
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.classList.remove('error');
    }
    
    showSuccess() {
        if (this.successMessage) {
            this.successMessage.classList.add('show');
            
            // Hide after 5 seconds
            setTimeout(() => {
                this.successMessage.classList.remove('show');
            }, 5000);
        }
    }
    
    submitForm(data) {
        // TODO: Replace with actual form submission endpoint
        // Example with fetch API:
        /*
        return fetch('YOUR_FORM_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        */
        
        // Simulated submission for now
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve();
            }, 1500);
        });
    }
}

/* ========================================
   NAVBAR SCROLL BEHAVIOR
   ======================================== */

class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 0) {
            this.navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            this.navbar.style.boxShadow = 'none';
        }
        
        this.lastScroll = currentScroll;
    }
}

/* ========================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ======================================== */

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in-item');
        fadeElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Stop observing once animated
                this.observer.unobserve(entry.target);
            }
        });
    }
}

/* ========================================
   INITIALIZE ALL COMPONENTS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize configuration
    initializeConfig();
    
    // Initialize all components
    const themeManager = new ThemeManager();
    const smoothScroll = new SmoothScroll();
    const mobileMenu = new MobileMenu();
    const typewriterEffect = new TypewriterEffect();
    const contactForm = new ContactForm();
    const navbarScroll = new NavbarScroll();
    const scrollAnimations = new ScrollAnimations();
    
    console.log('✅ Portfolio initialized');
});

/* ========================================
   CONFIG INITIALIZATION
   ======================================== */

function initializeConfig() {
    if (typeof portfolioConfig === 'undefined') {
        console.warn('⚠️ Config not loaded. Using default values.');
        return;
    }
    
    const config = portfolioConfig;
    
    // Update logos
    const navLogo = document.getElementById('navLogo');
    const footerLogo = document.getElementById('footerLogo');
    if (navLogo) navLogo.textContent = config.brand.logo;
    if (footerLogo) footerLogo.textContent = config.brand.logo;
    
    // Update builder section
    const builderName = document.getElementById('builderName');
    const builderTagline = document.getElementById('builderTagline');
    const builderRole = document.getElementById('builderRole');
    if (builderName) builderName.textContent = config.personal.name;
    if (builderTagline) builderTagline.textContent = config.personal.tagline;
    if (builderRole) builderRole.textContent = config.personal.role;
    
    // Update email links
    const contactEmail = document.getElementById('contactEmail');
    const footerEmail = document.getElementById('footerEmail');
    if (contactEmail) {
        contactEmail.href = `mailto:${config.personal.email}`;
        contactEmail.textContent = config.personal.email;
    }
    if (footerEmail) {
        footerEmail.href = `mailto:${config.personal.email}`;
    }
    
    // Update social media links - Navigation
    const navLinkedIn = document.getElementById('navLinkedIn');
    const navTwitter = document.getElementById('navTwitter');
    if (navLinkedIn) navLinkedIn.href = config.social.linkedin;
    if (navTwitter) navTwitter.href = config.social.twitter;
    
    // Update social media links - Footer
    const footerLinkedIn = document.getElementById('footerLinkedIn');
    const footerTwitter = document.getElementById('footerTwitter');
    const footerGithub = document.getElementById('footerGithub');
    if (footerLinkedIn) footerLinkedIn.href = config.social.linkedin;
    if (footerTwitter) footerTwitter.href = config.social.twitter;
    if (footerGithub) footerGithub.href = config.social.github;
    
    // Update copyright if company name exists
    const footerCopyright = document.getElementById('footerCopyright');
    if (footerCopyright && config.brand.companyName) {
        footerCopyright.innerHTML = `&copy; 2025 ${config.brand.companyName} | Built in days using my own method | Helping founders launch faster worldwide`;
    }
    
    console.log('✅ Config initialized');
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance optimization
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
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */

// Optimize scroll events with throttle
const optimizedScroll = throttle(() => {
    // Scroll-dependent functions here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Optimize resize events with debounce
const optimizedResize = debounce(() => {
    // Resize-dependent functions here
}, 250);

window.addEventListener('resize', optimizedResize);

/* ========================================
   EXPORT FOR MODULE USAGE (Optional)
   ======================================== */

// If using ES6 modules:
// export { ThemeManager, SmoothScroll, MobileMenu, TypewriterEffect, ContactForm };