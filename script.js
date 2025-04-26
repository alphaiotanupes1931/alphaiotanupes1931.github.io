// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video transitions
    initVideoTransitions();
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation effects
    initNavigationEffects();
    
    // Initialize scroll effects
    initScrollEffects();
});

// Loading Screen Handler
function initLoadingScreen() {
    const loader = document.querySelector('.loader');
    const heroContent = document.querySelector('.hero-content');
    
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';
            
            // Trigger hero content animation
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 1500);
    });
}

// Video Transitions
function initVideoTransitions() {
   // Video montage functionality
   const videos = document.querySelectorAll('.hero-video');
   const diamond = document.querySelector('.diamond-transition');
   const glitch = document.querySelector('.glitch-overlay');
   let currentVideo = 0;
   let isTransitioning = false;  // Add this flag

   function setRandomTime(video) {
       if (video.duration) {
           const randomTime = Math.floor(Math.random() * (video.duration - 5));
           video.currentTime = randomTime;
       }
   }

   // Initialize videos
   videos.forEach(video => {
       video.addEventListener('loadedmetadata', () => {
           setRandomTime(video);
           video.play();  // Add this to ensure videos play
       });
   });

    function switchVideo() {
        if (isTransitioning) return;
        isTransitioning = true;

        // Start transition effects
        diamond.classList.add('active');
        glitch.classList.add('active');

        setTimeout(() => {
            // Hide current video
            videos[currentVideo].classList.remove('active');
            
            // Switch to next video
            currentVideo = (currentVideo + 1) % videos.length;
            videos[currentVideo].classList.add('active');
            setRandomTime(videos[currentVideo]);

            // End transition effects
            setTimeout(() => {
                diamond.classList.remove('active');
                glitch.classList.remove('active');
                isTransitioning = false;
            }, 800);
        }, 500);
    }

    // Start video switching cycle
    setInterval(switchVideo, 7000);
}

// Navigation Effects
function initNavigationEffects() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            nav.style.background = 'rgba(0, 0, 0, 0.7)';
        } else if (currentScroll > lastScroll) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        lastScroll = currentScroll;
    });
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('section, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Parallax Effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                document.querySelectorAll('.parallax').forEach(element => {
                    const speed = element.getAttribute('data-speed') || 0.5;
                    element.style.setProperty('--scroll-offset', `${scrolled * speed}px`);
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}