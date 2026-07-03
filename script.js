// ============================ Mobile menu ============================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link =>
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        })
    );
}

// ============================ Navbar scroll effect ============================
const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll);
onScroll();

// ============================ Fade-up on scroll ============================
const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeUpObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => fadeUpObserver.observe(el));

// ============================ Stat counters ============================
function animateCounter(el, target) {
    const duration = 1800, stepTime = 20;
    const increment = target / (duration / stepTime);
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + '+';
    }, stepTime);
}
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-target]').forEach(stat =>
                animateCounter(stat, parseInt(stat.getAttribute('data-target'), 10))
            );
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
const trust = document.querySelector('.hero-trust');
if (trust) statsObserver.observe(trust);

// ============================ Curriculum accordion ============================
document.querySelectorAll('.module-head').forEach(head => {
    head.addEventListener('click', () => {
        const module = head.parentElement;
        const body = module.querySelector('.module-body');
        const isOpen = module.classList.contains('open');

        // Close all
        document.querySelectorAll('.module').forEach(m => {
            m.classList.remove('open');
            const b = m.querySelector('.module-body');
            if (b) b.style.maxHeight = null;
        });

        // Open clicked (if it wasn't already open)
        if (!isOpen) {
            module.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
});
// Open the first module by default
const firstOpen = document.querySelector('.module.open .module-body');
if (firstOpen) firstOpen.style.maxHeight = firstOpen.scrollHeight + 'px';
