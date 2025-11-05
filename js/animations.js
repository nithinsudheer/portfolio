/* ========================================
   WARTIN LABS PORTFOLIO - ANIMATIONS
   ======================================== */

'use strict';

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-item');
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        // Observe all elements
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.reveal(entry.target);
            }
        });
    }
    
    reveal(element) {
        // Get all siblings with the same class in the same parent
        const parent = element.parentElement;
        const siblings = Array.from(parent.querySelectorAll('.fade-in-item'));
        const index = siblings.indexOf(element);
        
        // Calculate stagger delay
        const delay = index * 100; // 100ms between each item
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
        
        // Stop observing once revealed
        this.observer.unobserve(element);
    }
}

/* ========================================
   TIMELINE ANIMATIONS
   ======================================== */

class TimelineAnimations {
    constructor() {
        this.timelineRows = document.querySelectorAll('.timeline-row');
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };
        
        if (this.timelineRows.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Create observer for timeline rows
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        // Observe timeline rows
        this.timelineRows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-30px)';
            row.dataset.index = index;
            this.observer.observe(row);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateRow(entry.target);
            }
        });
    }
    
    animateRow(row) {
        const index = parseInt(row.dataset.index);
        const delay = index * 150; // 150ms delay between rows
        
        setTimeout(() => {
            row.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, delay);
        
        // Stop observing once animated
        this.observer.unobserve(row);
    }
}

/* ========================================
   CARD HOVER ANIMATIONS
   ======================================== */

class CardAnimations {
    constructor() {
        this.cards = document.querySelectorAll('.stack-card, .case-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.addHoverEffect(card);
        });
    }
    
    addHoverEffect(card) {
        card.addEventListener('mouseenter', (e) => {
            this.handleMouseEnter(e.currentTarget);
        });
        
        card.addEventListener('mouseleave', (e) => {
            this.handleMouseLeave(e.currentTarget);
        });
        
        // Add 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e, card);
        });
    }
    
    handleMouseEnter(card) {
        card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    }
    
    handleMouseLeave(card) {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

/* ========================================
   HERO HEADLINE TRANSITION
   ======================================== */

class HeadlineTransition {
    constructor() {
        this.headline = document.getElementById('rotatingHeadline');
        
        if (this.headline) {
            this.init();
        }
    }
    
    init() {
        // Add smooth transition style
        this.headline.style.transition = 'opacity 0.3s ease-in-out';
    }
}

/* ========================================
   TICKER ANIMATION
   ======================================== */

class TickerAnimation {
    constructor() {
        this.ticker = document.querySelector('.ticker-content');
        
        if (this.ticker) {
            this.init();
        }
    }
    
    init() {
        // Clone ticker content multiple times for seamless loop
        const tickerClone1 = this.ticker.cloneNode(true);
        const tickerClone2 = this.ticker.cloneNode(true);
        this.ticker.parentElement.appendChild(tickerClone1);
        this.ticker.parentElement.appendChild(tickerClone2);
        
        // Start animation
        this.animate();
    }
    
    animate() {
        const tickers = document.querySelectorAll('.ticker-content');
        let position = 0;
        const speed = 0.5; // Pixels per frame
        
        const scroll = () => {
            position -= speed;
            
            // Get the width of one ticker element
            const tickerWidth = tickers[0].offsetWidth;
            
            // Reset position when first ticker is fully scrolled
            if (Math.abs(position) >= tickerWidth) {
                position = 0;
            }
            
            // Apply transform to all ticker elements
            tickers.forEach(ticker => {
                ticker.style.transform = `translateX(${position}px)`;
            });
            
            requestAnimationFrame(scroll);
        };
        
        scroll();
    }
}

/* ========================================
   SECTION ENTRANCE ANIMATIONS
   ======================================== */

class SectionAnimations {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -150px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }
}

/* ========================================
   FORM INPUT ANIMATIONS
   ======================================== */

class FormAnimations {
    constructor() {
        this.inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        this.init();
    }
    
    init() {
        this.inputs.forEach(input => {
            this.addFocusAnimation(input);
        });
    }
    
    addFocusAnimation(input) {
        const formGroup = input.closest('.form-group');
        
        input.addEventListener('focus', () => {
            formGroup.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                formGroup.classList.remove('focused');
            }
        });
        
        // Check if already has value on page load
        if (input.value) {
            formGroup.classList.add('focused');
        }
    }
}

/* ========================================
   BUTTON RIPPLE EFFECT
   ======================================== */

class ButtonRipple {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });
    }
    
    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

/* ========================================
   PARALLAX SCROLL EFFECT
   ======================================== */

class ParallaxScroll {
    constructor() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (this.parallaxElements.length > 0) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll(); // Initial call
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

/* ========================================
   NUMBER COUNTER ANIMATION
   ======================================== */

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-counter]');
        this.observerOptions = {
            threshold: 0.5
        };
        
        if (this.counters.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.dataset.counter);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
}

/* ========================================
   SMOOTH PAGE LOAD ANIMATION
   ======================================== */

class PageLoadAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        // Add loaded class to body after page load
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
        });
    }
}

/* ========================================
   TEXT REVEAL ANIMATION
   ======================================== */

class TextReveal {
    constructor() {
        this.textElements = document.querySelectorAll('[data-text-reveal]');
        this.observerOptions = {
            threshold: 0.5
        };
        
        if (this.textElements.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        this.textElements.forEach(element => {
            this.prepareText(element);
            this.observer.observe(element);
        });
    }
    
    prepareText(element) {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => {
            return `<span class="word"><span class="word-inner">${word}</span></span> `;
        }).join('');
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.revealText(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    revealText(element) {
        const words = element.querySelectorAll('.word-inner');
        
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.transform = 'translateY(0)';
                word.style.opacity = '1';
            }, index * 50);
        });
    }
}

/* ========================================
   GRADIENT ANIMATION
   ======================================== */

class GradientAnimation {
    constructor() {
        this.gradientElements = document.querySelectorAll('[data-gradient-animate]');
        
        if (this.gradientElements.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.gradientElements.forEach(element => {
            this.animateGradient(element);
        });
    }
    
    animateGradient(element) {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.filter = `hue-rotate(${hue}deg)`;
        }, 50);
    }
}

/* ========================================
   CURSOR FOLLOW EFFECT
   ======================================== */

class CursorFollow {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.classList.add('custom-cursor');
        this.cursorDot = document.createElement('div');
        this.cursorDot.classList.add('custom-cursor-dot');
        
        // Only initialize on desktop
        if (window.innerWidth > 768) {
            this.init();
        }
    }
    
    init() {
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth follow animation
        const animateCursor = () => {
            // Cursor ring follows with delay
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            this.cursor.style.left = cursorX + 'px';
            this.cursor.style.top = cursorY + 'px';
            
            // Dot follows immediately
            dotX = mouseX;
            dotY = mouseY;
            
            this.cursorDot.style.left = dotX + 'px';
            this.cursorDot.style.top = dotY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        // Add hover effects
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    }
}

/* ========================================
   INITIALIZE ALL ANIMATIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    const scrollReveal = new ScrollReveal();
    const timelineAnimations = new TimelineAnimations();
    const cardAnimations = new CardAnimations();
    const headlineTransition = new HeadlineTransition();
    const tickerAnimation = new TickerAnimation();
    const sectionAnimations = new SectionAnimations();
    const formAnimations = new FormAnimations();
    const buttonRipple = new ButtonRipple();
    const pageLoadAnimation = new PageLoadAnimation();
    
    // Optional enhanced animations (comment out if not needed)
    // const parallaxScroll = new ParallaxScroll();
    // const counterAnimation = new CounterAnimation();
    // const textReveal = new TextReveal();
    // const gradientAnimation = new GradientAnimation();
    // const cursorFollow = new CursorFollow();
    
    console.log('✅ Animations initialized');
});

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */

// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.classList.add('reduce-animations');
}

// Respect user's reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-animations');
}

/* ========================================
   ADDITIONAL CSS FOR ANIMATIONS
   ======================================== */

// Add dynamic styles for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--text-accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
    }
    
    .custom-cursor.cursor-hover {
        width: 60px;
        height: 60px;
    }
    
    .custom-cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--text-accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
    }
    
    .form-group.focused label {
        color: var(--text-accent);
        transform: translateY(-2px);
    }
    
    .word {
        display: inline-block;
        overflow: hidden;
    }
    
    .word-inner {
        display: inline-block;
        transform: translateY(100%);
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.5s ease;
    }
    
    .reduce-animations * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(style);