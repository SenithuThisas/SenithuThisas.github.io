// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Cursor Effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Change cursor on hover
const hoverElements = document.querySelectorAll('a, button, .project-item, .nav-link, .icon-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(0.5)';
        cursor.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursor.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 5px 20px rgba(0, 255, 0, 0.1)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
    }
});

// Mobile menu elements
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Navigation active state management
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
            // Add glow effect to current section
            section.style.boxShadow = `0 0 ${Math.min(20, window.scrollY/20)}px rgba(0, 255, 0, ${Math.min(0.3, window.scrollY/1000)})`;
        } else {
            section.style.boxShadow = 'none';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Set active nav on page load
updateActiveNav();

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Update active nav when clicking links and close mobile menu
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// Hero title animation
const titleWords = document.querySelectorAll('.title-word');
titleWords.forEach((word, index) => {
    setTimeout(() => {
        word.style.transform = 'translateY(0)';
        word.style.opacity = '1';
        word.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.8)';
    }, index * 200);
});

// Neon border animation for hero image
const imageBorder = document.querySelector('.image-border-animation');
if (imageBorder) {
    let hue = 100;
    setInterval(() => {
        hue = (hue + 1) % 360;
        imageBorder.style.borderColor = `hsl(${hue}, 100%, 50%)`;
        imageBorder.style.boxShadow = `0 0 20px hsl(${hue}, 100%, 50%)`;
    }, 50);
}

// Typewriter effect for hero text
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(element, text, i + 1), 50 + Math.random() * 50);
    }
}

const heroText = document.querySelector('.hero-text');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    setTimeout(() => typeWriter(heroText, text), 1000);
}

// Skills progress animation
const progressLines = document.querySelectorAll('.progress-line');
window.addEventListener('scroll', function() {
    if (isElementInViewport(document.querySelector('.skills-progress'))) {
        progressLines.forEach(line => {
            const width = line.getAttribute('data-width');
            line.style.width = width + '%';
            line.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.8)';
        });
    }
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Projects filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
        
        const filterValue = this.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Floating elements animation
function floatElements() {
    document.querySelectorAll('.project-item, .icon-item').forEach(el => {
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 2;
        el.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
    });
}
floatElements();

// Project hover effects
projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.project-overlay');
        overlay.style.backgroundColor = `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 50)}, 0.8)`;
    });
});

// Testimonials slider
const testimonialItems = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    testimonialItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialItems[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
    
    // Add glow effect to active testimonial
    testimonialItems[index].style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
    dot.addEventListener('mouseenter', () => {
        dot.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.8)';
    });
    dot.addEventListener('mouseleave', () => {
        if (!dot.classList.contains('active')) {
            dot.style.boxShadow = 'none';
        }
    });
});

document.querySelector('.slider-next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showSlide(currentSlide);
});

document.querySelector('.slider-prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
    showSlide(currentSlide);
});

// Auto slide change
const testimonialInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showSlide(currentSlide);
}, 5000);

// Pause auto-slide on hover
const slider = document.querySelector('.testimonials-slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});
slider.addEventListener('mouseleave', () => {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
        backToTopBtn.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.boxShadow = 'none';
    }
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Tooltips for skills icons
const iconItems = document.querySelectorAll('.icon-item');
iconItems.forEach(item => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = item.getAttribute('data-tooltip');
    item.appendChild(tooltip);
    
    item.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
        tooltip.style.textShadow = '0 0 5px rgba(0, 255, 0, 0.8)';
        item.style.transform = 'scale(1.1)';
        item.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
    });
    
    item.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message with glow effect
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Thank you for your message! I will get back to you soon.';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '50%';
        successMsg.style.left = '50%';
        successMsg.style.transform = 'translate(-50%, -50%)';
        successMsg.style.padding = '2rem 3rem';
        successMsg.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        successMsg.style.color = '#00ff00';
        successMsg.style.border = '2px solid #00ff00';
        successMsg.style.borderRadius = '10px';
        successMsg.style.zIndex = '9999';
        successMsg.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.8)';
        successMsg.style.animation = 'pulse 2s infinite';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(successMsg);
            }, 500);
        }, 3000);
        
        contactForm.reset();
    });
}

// Animate elements when scrolling
const animateOnScroll = function() {
    const animatedElements = document.querySelectorAll('.skills-icons, .project-item, .about-content, .contact-content');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
        }
    });
};

// Set initial styles for animated elements
document.querySelectorAll('.skills-icons, .project-item, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Random color generator for elements
function getRandomNeonColor() {
    const colors = [
        '#00ff00', '#00ff88', '#00ffff', '#ff00ff', 
        '#ffff00', '#ff8800', '#ff0088'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add random glow to some elements periodically
setInterval(() => {
    document.querySelectorAll('.icon-item, .project-item').forEach(el => {
        if (Math.random() > 0.7) {
            el.style.boxShadow = `0 0 15px ${getRandomNeonColor()}`;
            setTimeout(() => {
                el.style.boxShadow = 'none';
            }, 1000);
        }
    });
}, 3000);

// Helper function to generate random neon colors
function getRandomNeonColor() {
    const colors = [
        '#00ff00', '#00ff88', '#00ffff', '#ff00ff', 
        '#ffff00', '#ff8800', '#ff0088'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add random glow to text elements
setInterval(() => {
    document.querySelectorAll('.glow-text').forEach(el => {
        if (Math.random() > 0.4) { // 30% chance to glow
            const originalColor = el.style.color || getComputedStyle(el).color;
            const originalTextShadow = el.style.textShadow || getComputedStyle(el).textShadow;
            
            el.style.color = getRandomNeonColor();
            el.style.textShadow = `0 0 10px ${getRandomNeonColor()}`;
            
            setTimeout(() => {
                el.style.color = originalColor;
                el.style.textShadow = originalTextShadow;
            }, 1000);
        }
    });
}, 3000);

// Helper function to generate random neon colors
function getRandomNeonColor() {
    const colors = [
         '#00ff00', '#00ff88', '#00ffff', '#ff00ff', 
        '#ffff00', '#ff8800', '#ff0088'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add random glow to logo
setInterval(() => {
    const logo = document.querySelector('.logo');
    if (Math.random() > 0.3) { // 40% chance to glow
        // Store original values
        const originalColor = logo.style.color || getComputedStyle(logo).color;
        const originalTextShadow = logo.style.textShadow || getComputedStyle(logo).textShadow;
        
        // Apply random glow
        const glowColor = getRandomNeonColor();
        logo.style.color = glowColor;
        logo.style.textShadow = `
            0 0 10px ${glowColor},
            0 0 20px ${glowColor},
            0 0 30px rgba(0, 0, 0, 0.5)
        `;
        
        // Revert after 1 second
        setTimeout(() => {
            logo.style.color = originalColor;
            logo.style.textShadow = originalTextShadow;
        }, 1000);
    }
}, 3000);
