import { useNavigate } from 'react-router-dom';
import ProjectsMap from './ProjectsMap.tsx';
import Certifications from './Certifications.tsx';
import SocialAccounts from './SocialAccounts.tsx';
import ThankYou from './ThankYou.tsx';
import Events from './Events.tsx';
import './AboutMe.css';

const AboutMe: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <nav className="home-navbar sticky-header">
                <div className="nav-logo" onClick={() => navigate('/')}>Ruhansi<span>.AI</span></div>
                <div className="nav-links">
                    <span onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>About</span>
                    <span onClick={() => { document.getElementById('projects-map')?.scrollIntoView({ behavior: 'smooth' }); }}>Projects</span>
                    <span onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</span>
                </div>
            </nav>
            <div className="about-container">
                <div className="about-content">
                    <div className="about-hero-section">
                        <div className="pitch-content">
                            <h2 className="pitch-title">Bridging the Gap Between Data and Decisions</h2>
                            <p className="pitch-text">
                                Hi, I'm Ruhansi De Silva. I'm a student at the University of Sri Jayewardenepura, passionate about turning messy, chaotic data into clear, actionable intelligence.
                                Instead of just building models in a vacuum, I design systems that solve actual business and human pain—whether
                                that's automating an inbox, predicting key attrition risks, or securing enterprise portals.
                                I'm constantly learning, coding with Python and React, and building custom AI agents to work alongside us.
                            </p>
                            <div className="pitch-actions">
                                <button className="pitch-btn primary-btn" onClick={() => {
                                    document.getElementById('projects-map')?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    Explore My Work ↓
                                </button>
                                <button className="pitch-btn secondary-btn" onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    Let's Connect
                                </button>
                            </div>
                        </div>
                    </div>

                    <h1 className="about-title" style={{ marginTop: '5rem', marginBottom: '3rem' }}>Deep Dive</h1>

                    <div className="about-grid">
                        <div className="about-card intro-card cursor-pointer" onClick={() => navigate('/vision')} style={{ cursor: 'pointer' }}>
                            <h2>My Vision</h2>
                            <p>
                                I don't write code for code's sake—I seek clarity. My vision is to build intelligent platforms that act as partner modules to human workers, resolving real operational friction in healthcare, analytics, and enterprise logistics.
                            </p>
                            <span style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px', display: 'inline-block' }}>Read vision statement →</span>
                        </div>

                        <div className="about-card skills-card delay-1 cursor-pointer" onClick={() => navigate('/skills')} style={{ cursor: 'pointer' }}>
                            <h2>Core Skills</h2>
                            <ul className="skills-list">
                                <li>🐍 Python</li>
                                <li>📊 Data Analysis &amp; EDA</li>
                                <li>🤖 Machine Learning</li>
                                <li>🧠 Generative AI &amp; LLMs</li>
                                <li>⚙️ FastAPI &amp; React</li>
                            </ul>
                            <span style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '15px', display: 'inline-block' }}>Explore skills →</span>
                        </div>

                        <div className="about-card journey-card delay-2 cursor-pointer" onClick={() => navigate('/journey')} style={{ cursor: 'pointer' }}>
                            <h2>My Journey</h2>
                            <p>
                                From building a foundation in statistics and Python to training healthcare estimators and attrition neural nets, my learning has progressed to generative AI, vector databases, and custom agents that run autonomously.
                            </p>
                            <span style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px', display: 'inline-block' }}>View timeline →</span>
                        </div>
                    </div>
                </div>

                <div className="background-elements">
                    <div className="orb about-orb-1"></div>
                    <div className="orb about-orb-2"></div>
                </div>
            </div>

            <ProjectsMap />
            <Certifications />
            <Events />
            <SocialAccounts />
            <ThankYou />
        </>
    );
};

export default AboutMe;
