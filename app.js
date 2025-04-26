function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentVideo, setCurrentVideo] = React.useState(0);

    React.useEffect(() => {
        // Hide loading screen after 2 seconds
        setTimeout(() => setIsLoading(false), 2000);

        // Rotate videos
        const interval = setInterval(() => {
            setCurrentVideo(prev => (prev + 1) % 4);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Loading Screen */}
            {isLoading && (
                <div className="loader">
                    <img src="KAPsiCrest.png" alt="Kappa Alpha Psi Crest" className="loader-logo" />
                    <div className="loader-progress"></div>
                </div>
            )}

            {/* Navigation */}
            <nav className="nav">
                <div className="nav-inner">
                    <a href="index.html" className="logo">
                        <span className="fraternity-name">ΚΑΨ</span>
                        <span className="chapter-name">ALPHA IOTA</span>
                    </a>
                    <div className="menu">
                        <a href="about.html" className="menu-link">ABOUT</a>
                        <a href="brothers.html" className="menu-link">BROTHERS</a>
                        <a href="media.html" className="menu-link">CHAPTER MEDIA</a>
                        <a href="brothersonly.html" className="menu-link">BROTHERS ONLY</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="hero">
                <div className="hero-bg">
                    <div className="video-container">
                        {/* Video montage */}
                        {['szn.mp4', 'videoplayback.mp4', 'videoplayback (1).mp4', 'videoplayback (2).mp4'].map((video, index) => (
                            <video 
                                key={index}
                                className={`hero-video ${currentVideo === index ? 'active' : ''}`}
                                autoPlay 
                                muted 
                                loop 
                                playsInline
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        ))}
                    </div>
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content">
                    <div className="fraternity-title">
                        <h2>KAPPA ALPHA PSI®</h2>
                        <h3>FRATERNITY, INCORPORATED</h3>
                        <h3>PRESENTS</h3>
                    </div>
                    <div className="chapter-title">
                        <h1>
                            <span className="title-animation">
                                <span className="stamp-letter">A</span>LPH<span className="stamp-letter">A</span>
                            </span>
                            <span className="title-animation">
                                <span className="stamp-letter">I</span>OT<span className="stamp-letter">A</span>
                            </span>
                            <span className="chapter-letters">(AI)</span>
                        </h1>
                        <div className="chapter-subtitle">THE MOST NOTORIOUS CHAPTER</div>
                    </div>
                    <div className="hero-info">
                        <p>Morgan State University · Baltimore, MD</p>
                        <p>Chartered May 29, 1931</p>
                    </div>
                </div>
            </main>

            {/* Polemarch Section */}
            <section className="polemarch-welcome">
                <div className="polemarch-image">
                    <img src="godley.jpg" alt="Polemarch Godley Pierre" />
                </div>
                <div className="polemarch-message">
                    <h2 className="polemarch-title">Polemarch's Welcome</h2>
                    <p className="polemarch-text">
                        Greetings to all who have come to learn more about the notorious Alpha Iota Chapter of Kappa Alpha Psi Fraternity, Inc. As the current Polemarch, I, <span className="red-text">(1AI23FA) Godley Pierre</span>, am honored to welcome you to our beloved chapter.
                    </p>
                </div>
            </section>

            {/* Mean Mugging Section */}
            <MeanMuggingSection />

            {/* Footer */}
            <Footer />
        </>
    );
}

// Mean Mugging Section Component
function MeanMuggingSection() {
    const lines = [
        {
            image: "welcome.jpg",
            name: "11 SURVIVORS OF DESTRUKTION",
            year: "FALL '24"
        },
        {
            image: "kappa.jpg",
            name: "5 Kombatants of Katastrophe",
            year: "FALL '23"
        },
        {
            image: "sp23.jpg",
            name: "The 5 Adversaries of Anarchy",
            year: "SPRING '23"
        }
    ];

    return (
        <section className="mean-mugging">
            <div className="container">
                <h2 className="section-title">RECENT LINES OF AI</h2>
                <div className="mean-mug-grid">
                    {lines.map((line, index) => (
                        <div key={index} className="mug-card">
                            <div className="mug-image">
                                <img src={line.image} alt={line.name} />
                                <div className="brother-info">
                                    <span className="line-name">{line.name}</span>
                                    <span className="line-year">{line.year}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Footer Component
function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="diamond-container">
                    <div className="glow"></div>
                    <div className="diamond"></div>
                </div>
                <div className="achievers-text">
                    <span className="glow-letter">A</span>chievers of the <span className="glow-letter">I</span>mpossible
                </div>
                <div className="social-links">
                    <a href="https://www.instagram.com/ainupes1931/?hl=en" className="social-link" target="_blank">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.facebook.com/people/The-Alpha-Iota-Chapter-of-%CE%9A%CE%91%CE%A8/100067518272851/" className="social-link" target="_blank">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://x.com/AINupes1931/status/1801345234472997026" className="social-link" target="_blank">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
                <div className="designer-credit">
                    designed by <span className="graffiti-text">reezy</span>
                </div>
            </div>
        </footer>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));