import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutMe.css';

const Vision: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <div className="about-content">
                <button className="back-btn" onClick={() => navigate('/about')}>
                    ← Back to About Me
                </button>
                <h1 className="about-title">My Vision</h1>
                <div className="about-card" style={{ animation: 'fadeUp 0.8s ease-out forwards', opacity: 0 }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '2', marginBottom: '1.8rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                        I build systems that make data talk—and design models that help humans make better decisions.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '1.8rem', color: 'var(--text-secondary)' }}>
                        To me, Data Science and AI aren't simply academic pursuits or lines of code on a terminal.
                        They are active tools to reduce operational friction. When a customer support desk has to search through thousands of historical messages, or an analyst runs manual prediction algorithms, there is a clear bottleneck. My vision is to create custom partner modules that work harmoniously alongside people—automating repetitive thinking so teams can focus on strategic decisions.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '1.8rem', color: 'var(--text-secondary)' }}>
                        As an undergraduate student at USJ, I prioritize applying statistical rigor directly to software engineering. Build first, measure meticulously, and deploy robust APIs. By focusing on explainable metrics and real-time interactive dashboards, I want to make complex machine learning accessible and clear for stakeholders who aren't technical.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '2', color: 'var(--text-secondary)' }}>
                        In the coming years, I aim to push the boundaries of agentic automation, developing self-correcting prompt flows and secure models that safeguard user privacy while driving enterprise efficiency.
                    </p>
                </div>
            </div>
            <div className="background-elements">
                <div className="orb about-orb-1"></div>
                <div className="orb about-orb-2"></div>
            </div>
        </div>
    );
};

export default Vision;
