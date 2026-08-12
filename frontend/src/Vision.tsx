import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutMe.css'; // Reusing about me styles for structure

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
                    <p style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '1.5rem' }}>
                        My vision is to become a skilled professional in the fields of Data Science and Artificial Intelligence,
                        using data-driven approaches and intelligent technologies to solve real-world problems.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '1.5rem' }}>
                        I aim to continuously develop my expertise in data analytics, machine learning, artificial intelligence,
                        and emerging technologies to build meaningful and impactful solutions. My goal is to transform complex data
                        into valuable insights and intelligent systems that support better decision-making and create positive impact
                        across different industries.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                        Through continuous learning, practical projects, and innovation, I aspire to grow as a Data Science and AI
                        professional who bridges the gap between data, technology, and real-world applications.
                    </p>
                </div>
            </div>
            <div className="background-elements">
                <div className="orb about-orb-1" style={{ background: 'rgba(69, 162, 158, 0.3)' }}></div>
                <div className="orb about-orb-2" style={{ background: 'rgba(102, 252, 241, 0.2)' }}></div>
            </div>
        </div>
    );
};

export default Vision;
