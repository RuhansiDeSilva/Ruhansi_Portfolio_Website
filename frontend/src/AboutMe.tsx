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
            <div className="about-container">
                <div className="about-content">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        ← Back to Home
                    </button>

                    <h1 className="about-title">About Me</h1>

                    <div className="about-grid">
                        <div className="about-card intro-card cursor-pointer" onClick={() => navigate('/vision')} style={{ cursor: 'pointer' }}>
                            <h2>My Vision</h2>
                            <p>
                                My vision is to become a skilled professional in Data Science and Artificial Intelligence,
                                using data-driven approaches and intelligent technologies to solve real-world problems.
                                I aim to transform complex data into valuable insights and intelligent systems that
                                create positive impact across different industries.
                            </p>
                            <span style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px', display: 'inline-block' }}>Read more →</span>
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
                                Started with a strong Data Science foundation in Python, SQL, and statistics.
                                Progressed through real-world ML projects in healthcare, forecasting &amp; risk analysis,
                                then expanded into Generative AI, LLMs, RAG, and AI agents — now focused on
                                building end-to-end intelligent systems.
                            </p>
                            <span style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px', display: 'inline-block' }}>View timeline →</span>
                        </div>
                    </div>
                </div>

                {/* Background Orbs reused for consistency but with different colors/positions */}
                <div className="background-elements">
                    <div className="orb about-orb-1"></div>
                    <div className="orb about-orb-2"></div>
                </div>
            </div>

            {/* Render the Project Map Component inline below the About Me Grid! */}
            <ProjectsMap />
            <Certifications />
            <Events />
            <SocialAccounts />
            <ThankYou />
        </>
    );
};

export default AboutMe;
