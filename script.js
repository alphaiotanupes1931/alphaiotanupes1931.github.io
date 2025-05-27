document.addEventListener('DOMContentLoaded', function() {

    initVideoTransitions();

    initLoadingScreen();

    initNavigationEffects();

    initScrollEffects();
});

function initLoadingScreen() {
    const loader = document.querySelector('.loader');
    const heroContent = document.querySelector('.hero-content');

    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';

            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 1500);
    });
}

function initVideoTransitions() {

   const videos = document.querySelectorAll('.hero-video');
   const diamond = document.querySelector('.diamond-transition');
   const glitch = document.querySelector('.glitch-overlay');
   let currentVideo = 0;
   let isTransitioning = false;  

   function setRandomTime(video) {
       if (video.duration) {
           const randomTime = Math.floor(Math.random() * (video.duration - 5));
           video.currentTime = randomTime;
       }
   }

   videos.forEach(video => {
       video.addEventListener('loadedmetadata', () => {
           setRandomTime(video);
           video.play();  
       });
   });

    function switchVideo() {
        if (isTransitioning) return;
        isTransitioning = true;

        diamond.classList.add('active');
        glitch.classList.add('active');

        setTimeout(() => {

            videos[currentVideo].classList.remove('active');

            currentVideo = (currentVideo + 1) % videos.length;
            videos[currentVideo].classList.add('active');
            setRandomTime(videos[currentVideo]);

            setTimeout(() => {
                diamond.classList.remove('active');
                glitch.classList.remove('active');
                isTransitioning = false;
            }, 800);
        }, 500);
    }

    setInterval(switchVideo, 7000);
}

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

function initScrollEffects() {

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

    document.querySelectorAll('section, .fade-in').forEach(el => {
        observer.observe(el);
    });

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