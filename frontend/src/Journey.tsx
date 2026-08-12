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
                            <h3>The Spark — Data Science Foundation</h3>
                            <span>The Beginning</span>
                            <p>My journey in technology started with a strong interest in understanding how data can be transformed into meaningful insights and intelligent solutions. As a Data Science undergraduate, I developed a strong foundation in Python, SQL, statistics, probability, and data analysis.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Connecting Data, Algorithms & Decisions</h3>
                            <span>Undergraduate Studies</span>
                            <p>This foundation helped me understand the deep relationship between data, algorithms, and decision-making — the core pillars that drive every intelligent system.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Hands-On Machine Learning Projects</h3>
                            <span>Practical Experience</span>
                            <p>I expanded my knowledge through practical machine learning projects involving healthcare prediction, employee analytics, forecasting, and risk assessment systems. I gained hands-on experience in data preprocessing, feature engineering, model development, evaluation, and deployment.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Exploring AI & Generative AI</h3>
                            <span>Deep Dive</span>
                            <p>My learning journey gradually moved toward Artificial Intelligence and Generative AI, where I explored Natural Language Processing, Large Language Models, embeddings, Retrieval-Augmented Generation (RAG), and AI agents.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>Building Intelligent Systems</h3>
                            <span>Present</span>
                            <p>Currently, I am focused on building intelligent systems that combine advanced analytics, machine learning, and AI engineering to create impactful solutions for real-world challenges.</p>
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
