import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutMe.css';
import './Journey.css';

const Journey: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <div className="about-content" style={{ maxWidth: '800px' }}>
                <button className="back-btn" onClick={() => navigate('/about')}>
                    ← Back to About Me
                </button>
                <h1 className="about-title" style={{ textAlign: 'center' }}>My Journey</h1>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Foundational Math & Scripting</h3>
                            <span>Step 1: The Sparks</span>
                            <p>
                                My journey in tech began at the University of Sri Jayewardenepura. Rather than jumping straight into framework hype, I focused on core mathematics: probability distributions, multivariate statistics, and SQL normalization algorithms. Implementing clean scripting models in Python showed me how data can uncover hidden operational pattern branches.
                            </p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Predictive Modeling & Statistical Testing</h3>
                            <span>Step 2: Training ML Models</span>
                            <p>
                                Transited from script development to training machine learning algorithms. I built my first classification neural net to forecast placement probabilities and trained regression algorithms on healthcare parameters. This step taught me critical data pre-processing hurdles—such as handling structured data class imbalances, and optimizing hyper-parameters to avoid overfitting.
                            </p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Full-Stack Deployment & API Design</h3>
                            <span>Step 3: Creating Complete Solutions</span>
                            <p>
                                Realized that predictive models are useless unless accessible to non-technical users. I expanded my toolkit to front-end development, wrapping Python predictors inside FastAPI backends, and configuring responsive glassmorphic interfaces. I worked directly on setting web hooks, managing states, and designing data visualizations to communicate model confidence.
                            </p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Finalist: 2026 Mini Hackathon</h3>
                            <span>Milestone: AI in Healthcare Category</span>
                            <p>
                                Recognized as a finalist in the 2026 Mini Hackathon under the "AI in Healthcare" category. I competed in a fast-paced environment to conceptualize and develop an innovative data-driven healthcare solution, showcasing my ability to tackle real-world medical challenges using machine learning under tight deadlines.
                            </p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>10-Week Project Management Bootcamp</h3>
                            <span>Milestone: Strategy & Leadership</span>
                            <p>
                                Completed an intensive 10-week project management bootcamp. This comprehensive training broadened my perspective beyond coding, equipping me with agile methodologies, cross-functional team coordination, and strategic planning skills necessary to govern AI and data projects from scoping through final delivery.
                            </p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Agentic Architectures & Automated Pipelines</h3>
                            <span>Present: Harnessing Generative AI</span>
                            <p>
                                Currently optimizing prompt flows, agentic routing models, and automated logic paths. I design workflows that leverage LLMs for sentiment classification, context routing, and automatic email responses—maximizing precision using confidence-score branches to delegate edge cases directly to humans.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="background-elements">
                <div className="orb about-orb-1" style={{ background: 'rgba(255, 200, 100, 0.15)' }}></div>
                <div className="orb about-orb-2"></div>
            </div>
        </div>
    );
};

export default Journey;
