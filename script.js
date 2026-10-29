/* ═══════════════════════════════════════════════
   Portfolio — Interactive Scripts
   ═══════════════════════════════════════════════ */

// ─── Mobile Menu Toggle ────────────────────────
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');     
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ─── Navbar Background on Scroll ───────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class for visual feedback
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ─── Smooth Scroll for Anchor Links ────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ─── Scroll-Triggered Animations ───────────────
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.project-card, .skill-category, .testimonial-card, .highlight, .trust-logo').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add visible styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Stagger animations for grid items
document.querySelectorAll('.projects-grid, .skills-grid, .testimonials-grid, .trust-logos').forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ─── Contact Form Handler ──────────────────────
function handleSubmit(e) {
    e.preventDefault();

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Visual feedback
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate send (replace with actual form handling)
    setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #34d399 0%, #059669 100%)';
        btn.style.opacity = '1';

        // Reset form
        e.target.reset();

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 2500);
    }, 1200);
}

// ─── Active Nav Link Highlight ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link style
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        color: var(--text) !important;
        background: rgba(255,255,255,0.08);
    }
`;
document.head.appendChild(navStyle);

// ─── Typing Effect for Code Block ──────────────
const codeBlock = document.querySelector('.code-block');
if (codeBlock) {
    const codeContent = codeBlock.innerHTML;
    codeBlock.innerHTML = '';
    codeBlock.style.opacity = '1';

    let charIndex = 0;
    const typingSpeed = 8;

    function typeCode() {
        if (charIndex < codeContent.length) {
            // Handle HTML tags - add them instantly
            if (codeContent[charIndex] === '<') {
                const closingIndex = codeContent.indexOf('>', charIndex);
                codeBlock.innerHTML += codeContent.substring(charIndex, closingIndex + 1);
                charIndex = closingIndex + 1;
            } else {
                codeBlock.innerHTML += codeContent[charIndex];
                charIndex++;
            }
            setTimeout(typeCode, typingSpeed);
        }
    }

    // Start typing when code window is in view
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeCode, 600);
                codeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    codeObserver.observe(codeBlock.closest('.code-window'));
}

