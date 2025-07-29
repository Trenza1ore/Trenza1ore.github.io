// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .blog-card, .section-title');
    if (animateElements.length > 0) {
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Doom easter egg - click Hugo Huang 10 times to play E1M1
    const logoText = document.querySelector('.logo-text');
    let clickCount = 0;
    let audio = null;
    
    if (logoText) {
        // Preload audio
        audio = new Audio('/audio/doom-e1m1.mp3');
        audio.volume = 0.3; // Set volume to 30%
        
        logoText.addEventListener('click', function(e) {
            e.preventDefault();
            clickCount++;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Check if we've reached 10 clicks
            if (clickCount >= 10) {
                // Play the Doom music
                audio.currentTime = 0;
                audio.play().then(() => {
                    // Stop after 17.5 seconds
                    setTimeout(() => {
                        audio.pause();
                        audio.currentTime = 0;
                    }, 17500);
                }).catch(err => {
                    console.log('Audio play failed:', err);
                });
                
                // Reset counter
                clickCount = 0;
                
                // Add a subtle visual effect
                this.style.animation = 'doomGlow 2s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 2000);
            }
        });
    }
}); 