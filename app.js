// CRITICAL CURSOR OPTIMIZATION - TOP PRIORITY
// Single smooth blue circle cursor with hardware acceleration
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.mouse = { x: 0, y: 0 };
        this.currentX = 0;
        this.currentY = 0;
        
        // Ensure cursor element exists
        if (!this.cursor) {
            this.createCursor();
        }
        
        this.init();
    }
    
    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
    }
    
    init() {
        // Use immediate coordinate mapping without interpolation delays
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }, { passive: true });
        
        // Start render loop
        this.render();
    }
    
    render() {
        // Direct coordinate mapping for immediate response
        this.currentX = this.mouse.x;
        this.currentY = this.mouse.y;
        
        // Use CSS transform for hardware acceleration and optimal performance
        this.cursor.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
        
        // Use requestAnimationFrame for smooth 60fps movement
        requestAnimationFrame(() => this.render());
    }
}

// Infinite Typing Animation with Bengali Support
class TypingAnimation {
    constructor() {
        this.element = document.getElementById('typingText');
        this.texts = ['Arpan Chatterjee', 'অর্পণ চট্টোপাধ্যায়'];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        if (this.element) {
            this.init();
        }
    }
    
    init() {
        // Start typing animation
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (!this.isDeleting && this.currentCharIndex < currentText.length) {
            // Typing character by character
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            // Apply Bengali font class for proper Unicode rendering
            if (this.currentTextIndex === 1) {
                this.element.classList.add('bengali');
            } else {
                this.element.classList.remove('bengali');
            }
            
            setTimeout(() => this.type(), this.typeSpeed);
        } else if (this.isDeleting && this.currentCharIndex > 0) {
            // Deleting character by character
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            // Switch between typing and deleting with pause
            if (!this.isDeleting) {
                // Pause before deleting
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.pauseTime);
            } else {
                // Reset for next text with 2-second pause
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
            }
        }
    }
}

// Scroll Animations using Intersection Observer API
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create intersection observer for performance-optimized scroll animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    // Unobserve after animation to improve performance
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe all animatable elements
        this.observeElements();
    }
    
    observeElements() {
        const elements = document.querySelectorAll(
            '.project-card, .timeline-item, .skill-item, .cert-card, .research-item, .hobby-item'
        );
        elements.forEach(el => this.observer.observe(el));
    }
    
    animateElement(element) {
        // Staggered animation delays for cascading effects
        if (element.classList.contains('timeline-item')) {
            const delay = parseInt(element.dataset.delay) || 0;
            setTimeout(() => {
                element.classList.add('animate');
            }, delay);
        } else {
            // Add staggered delay based on element position
            const elements = Array.from(element.parentNode.children);
            const index = elements.indexOf(element);
            const delay = index * 100; // 100ms stagger
            
            setTimeout(() => {
                element.classList.add('animate');
            }, delay);
        }
        
        // Animate progress bars for projects
        if (element.classList.contains('project-card')) {
            this.animateProgressBar(element);
        }
        
        // Animate skill bars with smooth transitions
        if (element.classList.contains('skill-item')) {
            this.animateSkillBar(element);
        }
    }
    
    animateProgressBar(projectCard) {
        const progressFill = projectCard.querySelector('.progress-fill');
        if (progressFill) {
            const progress = progressFill.dataset.progress;
            setTimeout(() => {
                progressFill.style.width = progress + '%';
            }, 300);
        }
    }
    
    animateSkillBar(skillItem) {
        const skillProgress = skillItem.querySelector('.skill-progress');
        if (skillProgress) {
            const skill = skillProgress.dataset.skill;
            setTimeout(() => {
                skillProgress.style.width = skill + '%';
            }, 300);
        }
    }
}

// Hardware-Accelerated Particle System
class ParticleSystem {
    constructor(container, count = 50) {
        this.container = container;
        this.count = count;
        this.particles = [];
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        // Create particles with hardware acceleration
        for (let i = 0; i < this.count; i++) {
            this.createParticle();
        }
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(50, 184, 198, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.willChange = 'transform';
        
        const x = Math.random() * (this.container.offsetWidth || window.innerWidth);
        const y = Math.random() * (this.container.offsetHeight || window.innerHeight);
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
        
        this.container.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: vx,
            vy: vy
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            const containerWidth = this.container.offsetWidth || window.innerWidth;
            const containerHeight = this.container.offsetHeight || window.innerHeight;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= containerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= containerHeight) {
                particle.vy *= -1;
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(containerWidth, particle.x));
            particle.y = Math.max(0, Math.min(containerHeight, particle.y));
            
            // Use transform for hardware acceleration
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        this.particles.forEach(particle => {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        this.particles = [];
    }
}

// Enhanced Project Card Interactions
class ProjectInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            // Add smooth hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(50, 184, 198, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
            
            // Add click interaction for better UX
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                }, 150);
            });
        });
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth scroll with offset for fixed navigation
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance-Optimized Event Handlers
class PerformanceOptimizer {
    constructor() {
        this.ticking = false;
        this.init();
    }
    
    init() {
        // Throttle scroll events to prevent browser overload
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
        
        // Throttle resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    updateScrollAnimations() {
        // Update scroll-based animations if needed
        // This is handled by IntersectionObserver for better performance
    }
    
    handleResize() {
        // Reinitialize particle systems on resize
        const heroParticles = document.querySelector('.hero-particles');
        const footerParticles = document.querySelector('.footer-particles');
        
        if (heroParticles && window.heroParticleSystem) {
            window.heroParticleSystem.destroy();
            window.heroParticleSystem = new ParticleSystem(heroParticles, 30);
        }
        
        if (footerParticles && window.footerParticleSystem) {
            window.footerParticleSystem.destroy();
            window.footerParticleSystem = new ParticleSystem(footerParticles, 20);
        }
    }
}

// Accessibility and Keyboard Navigation
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Enhanced focus management
        const focusableElements = document.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #32b8c6';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }
}

// Enhanced Certification Card Interactions
class CertificationInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        const certCards = document.querySelectorAll('.cert-card');
        certCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(50, 184, 198, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
            
            // Add click feedback
            card.addEventListener('click', (e) => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-10px) scale(1.05)';
                }, 100);
            });
        });
    }
}

// Hobby Item Flip Effects
class HobbyInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        const hobbyItems = document.querySelectorAll('.hobby-item');
        hobbyItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) rotateY(5deg)';
                item.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.3)';
                
                // Icon flip effect
                const icon = item.querySelector('.hobby-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotateY(180deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) rotateY(0deg)';
                item.style.boxShadow = '';
                
                // Reset icon
                const icon = item.querySelector('.hobby-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotateY(0deg)';
                }
            });
        });
    }
}

// Main Application Initialization
class PortfolioApp {
    constructor() {
        this.components = {};
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        try {
            // Initialize cursor first (TOP PRIORITY)
            this.components.cursor = new CustomCursor();
            
            // Initialize typing animation
            this.components.typing = new TypingAnimation();
            
            // Initialize scroll animations
            this.components.scrollAnimations = new ScrollAnimations();
            
            // Initialize interactions
            this.components.projectInteractions = new ProjectInteractions();
            this.components.certificationInteractions = new CertificationInteractions();
            this.components.hobbyInteractions = new HobbyInteractions();
            
            // Initialize smooth scrolling
            this.components.smoothScroll = new SmoothScroll();
            
            // Initialize performance optimizer
            this.components.performanceOptimizer = new PerformanceOptimizer();
            
            // Initialize accessibility manager
            this.components.accessibilityManager = new AccessibilityManager();
            
            // Initialize particle systems
            this.initializeParticles();
            
            // Add loading completion
            this.handleLoadingComplete();
            
            console.log('Portfolio application initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio application:', error);
            // Graceful degradation - continue with basic functionality
        }
    }
    
    initializeParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        const footerParticles = document.querySelector('.footer-particles');
        
        if (heroParticles) {
            window.heroParticleSystem = new ParticleSystem(heroParticles, 30);
        }
        
        if (footerParticles) {
            window.footerParticleSystem = new ParticleSystem(footerParticles, 20);
        }
    }
    
    handleLoadingComplete() {
        // Add loading animation completion
        setTimeout(() => {
            document.body.classList.add('loaded');
            
            // Remove loading states
            const loadingElements = document.querySelectorAll('[data-loading]');
            loadingElements.forEach(element => {
                element.removeAttribute('data-loading');
                element.classList.add('loaded');
            });
        }, 500);
    }
}

// Error Handling and Graceful Degradation
window.addEventListener('error', (e) => {
    console.warn('Resource failed to load:', e.target);
    // Continue with animations even if some resources fail
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.warn('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent default error handling
});

// Initialize the application
const portfolioApp = new PortfolioApp();

// Ensure all critical animations start immediately
document.addEventListener('DOMContentLoaded', () => {
    // Force cursor initialization if it hasn't started
    if (!document.querySelector('.custom-cursor')) {
        new CustomCursor();
    }
    
    // Start typing animation immediately
    const typingElement = document.getElementById('typingText');
    if (typingElement && !typingElement.textContent) {
        new TypingAnimation();
    }
});

// Performance monitoring (development only)
if (window.performance && window.performance.mark) {
    window.performance.mark('portfolio-app-start');
    
    window.addEventListener('load', () => {
        window.performance.mark('portfolio-app-end');
        window.performance.measure('portfolio-app-load', 'portfolio-app-start', 'portfolio-app-end');
        
        const measure = window.performance.getEntriesByName('portfolio-app-load')[0];
        if (measure) {
            console.log(`Portfolio app loaded in ${measure.duration.toFixed(2)}ms`);
        }
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CustomCursor,
        TypingAnimation,
        ScrollAnimations,
        ParticleSystem,
        PortfolioApp
    };
}