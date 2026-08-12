import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsMap.css';

export interface Project {
    id: number;
    name: string;
    description: string;
    summary?: string;
    githubLink: string;
    tags: { label: string; icon: string }[];
    themeColor: string;
    video?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        name: 'Sales Forecast Dashboard',
        description: 'An advanced data analytics tracking system employing predictive models to forecast sales and extract actionable business insights.',
        githubLink: 'https://github.com/RuhansiDeSilva/Sales-forecast-Dashboard---end-to-end-project.git',
        tags: [
            { label: 'Python', icon: 'devicon-python-plain' },
            { label: 'Pandas', icon: 'devicon-pandas-plain' },
            { label: 'Data Analysis', icon: 'devicon-jupyter-plain' },
        ],
        themeColor: '#c084fc',
        video: '/Forcecasting video.mp4'
    },
    {
        id: 2,
        name: 'Health Care Insurance Prediction',
        description: 'A robust machine learning pipeline trained to predict health insurance costs using sophisticated patient demographic data analysis.',
        githubLink: 'https://github.com/RuhansiDeSilva/Health_Care_Insuarance_prediction.git',
        tags: [
            { label: 'ML', icon: 'devicon-scikitlearn-plain' },
            { label: 'Python', icon: 'devicon-python-plain' },
            { label: 'Stats', icon: 'devicon-rstudio-plain' }
        ],
        themeColor: '#66fcf1',
        video: '/health care.mp4'
    },
    {
        id: 3,
        name: 'Sentiment Analysis',
        description: 'A deep Natural Language Processing (NLP) architecture designed to categorize and evaluate complex textual data sentiments.',
        githubLink: 'https://github.com/RuhansiDeSilva/Sentiment-Analysis-.git',
        tags: [
            { label: 'NLP', icon: 'devicon-python-plain' },
            { label: 'Analytics', icon: 'devicon-anaconda-original' }
        ],
        themeColor: '#ff6b6b'
    },
    {
        id: 4,
        name: 'Employee Attrition Prediction',
        description: 'A predictive forecasting model designed to identify behavioral patterns and accurately predict employee retention and churn.',
        githubLink: 'https://github.com/RuhansiDeSilva/employee-attrition-prediction.git',
        tags: [
            { label: 'Scikit-learn', icon: 'devicon-scikitlearn-plain' },
            { label: 'Feature Eng.', icon: 'devicon-python-plain' }
        ],
        themeColor: '#fca311',
        video: '/attrition.mp4'
    },
    {
        id: 5,
        name: 'Student Placement Prediction',
        description: 'An ML-based predictive system parsing academic and extracurricular metrics to project student migration and placement success.',
        githubLink: 'https://github.com/RuhansiDeSilva/Student-Migration-Placement-Prediction.git',
        tags: [
            { label: 'ML', icon: 'devicon-tensorflow-original' },
            { label: 'Data Viz', icon: 'devicon-plotly-plain' }
        ],
        themeColor: '#4ea8de'
    },
    {
        id: 6,
        name: 'ACE Frontline Web App',
        description: 'A comprehensive, fully-featured enterprise web application built securely for ACE Frontline Security Service.',
        githubLink: 'https://github.com/RuhansiDeSilva/ACE_Frontline_Security_Service_Web_App.git',
        tags: [
            { label: 'React', icon: 'devicon-react-original' },
            { label: 'Spring Boot', icon: 'devicon-spring-plain' },
            { label: 'SQL', icon: 'devicon-postgresql-plain' }
        ],
        themeColor: '#00f576',
        video: '/web app.mp4'
    },
    {
        id: 7,
        name: 'AI Email Support Agent',
        description: 'An AI-powered agent to automate email support and generate professional response drafts using Zapier AI Agents.',
        summary: "I recently built an AI Email Support Agent for a fictional online business, Neha Clothing Store, using Zapier AI Agents—with no coding or programming.\n\n🛍️ Scenario: Customers send emails requesting order details, product catalogs, fabric information, delivery details, and other support. Since emails may arrive after business hours, staff cannot always reply immediately.\n🤖 Solution: The AI Agent automatically reads the email, analyzes the customer's intent using prompt instructions, and generates a professional reply draft.\n🎯 Confidence-Based Decision: The generated response is evaluated with a confidence score. If the score is 7 or above, the response is automatically drafted for review. If it is below 7, a notification email (and optionally a WhatsApp alert) is sent to the support team for manual review.\n👨‍💼 When staff come online, they simply review the draft and send it instead of writing the email from scratch.\n📊 After publishing the agent, every incoming email triggers the workflow automatically, and the entire process can be monitored through Zapier Agent Activity.",
        githubLink: '#',
        tags: [
            { label: 'Zapier', icon: 'devicon-javascript-plain' },
            { label: 'AI Agents', icon: 'devicon-python-plain' }
        ],
        themeColor: '#ff007f',
        video: '/email.mp4'
    }
];

const ProjectsMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleProjectClick = (id: number) => {
        // Create an element for white flash animation on click before navigating
        const card = document.getElementById(`proj-card-${id}`);
        if (card) {
            card.classList.add('flash-white-animation');
            setTimeout(() => {
                navigate(`/project/${id}`);
                card.classList.remove('flash-white-animation');
            }, 300); // Navigate after short animation
        } else {
            navigate(`/project/${id}`);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.15 });

        const cards = document.querySelectorAll('.adv-project-card');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="adv-projects-section" id="projects-map" ref={mapRef}>
            <div className="adv-projects-header">
                <h2>Featured Projects</h2>
                <p>A timeline of my major technical accomplishments</p>
            </div>

            <div className="adv-timeline-container">
                <div className="adv-timeline-line">
                    <div className="adv-timeline-glow"></div>
                </div>

                {projects.map((proj, index) => {
                    return (
                        <div className={`adv-timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={proj.id}>
                            {/* Timeline Node */}
                            <div className="adv-timeline-node" style={{ borderColor: proj.themeColor, boxShadow: `0 0 15px ${proj.themeColor}80` }}>
                                <div className="node-core" style={{ background: proj.themeColor }}></div>
                            </div>

                            {/* Project Card */}
                            <div
                                id={`proj-card-${proj.id}`}
                                className="adv-project-card"
                                style={{ '--proj-color': proj.themeColor } as React.CSSProperties}
                                onClick={() => handleProjectClick(proj.id)}
                            >
                                <div className="card-glass-bg"></div>
                                <div className="card-content">
                                    <h3 style={{ color: proj.themeColor }}>{proj.name}</h3>
                                    <p>{proj.description}</p>

                                    <div className="card-tags">
                                        {proj.tags.map(tag => (
                                            <span className="proj-tag" key={tag.label}>
                                                <i className={`${tag.icon} colored`}></i>
                                                {tag.label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="card-action">
                                        {proj.githubLink !== '#' && (
                                            <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="adv-github-btn" onClick={(e) => e.stopPropagation()}>
                                                <i className="devicon-github-original"></i>
                                                <span>View Code</span>
                                                <div className="btn-glow" style={{ background: proj.themeColor }}></div>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Ambient background styling */}
            <div className="adv-ambient-light light-1"></div>
            <div className="adv-ambient-light light-2"></div>
        </div>
    );
};

export default ProjectsMap;
