import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from './ProjectsMap';
import './ProjectDetails.css';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const project = projects.find(p => p.id === Number(id));

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="pd-not-found">
                <h2>Project Not Found</h2>
                <button onClick={() => navigate('/')}>Go Back Home</button>
            </div>
        );
    }

    return (
        <div className="pd-container" style={{ '--pd-theme': project.themeColor } as React.CSSProperties}>
            <div className="pd-glass-bg"></div>

            <button className="pd-back-btn" onClick={() => navigate(-1)}>
                <i className="devicon-github-original" style={{ display: 'none' }}></i> {/* Placeholder for layout if needed */}
                ← Back to Projects
            </button>

            <div className="pd-header">
                <h1 style={{ color: project.themeColor }}>{project.name}</h1>
                <p className="pd-description">{project.description}</p>

                <div className="pd-tags">
                    {project.tags.map(tag => (
                        <span className="pd-tag" key={tag.label}>
                            <i className={`${tag.icon} colored`}></i>
                            {tag.label}
                        </span>
                    ))}
                </div>

                {project.githubLink !== '#' && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="pd-github-btn">
                        <i className="devicon-github-original"></i>
                        <span>View Source Code</span>
                        <div className="pd-btn-glow" style={{ background: project.themeColor }}></div>
                    </a>
                )}
            </div>

            <div className="pd-content">
                {project.summary && (
                    <div className="pd-summary-section">
                        <h2 style={{ color: project.themeColor }}>Project Overview</h2>
                        <div className="pd-summary">
                            {project.summary.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                )}

                {project.image && (
                    <div className="pd-video-section">
                        <h2 style={{ color: project.themeColor }}>Demonstration</h2>
                        <div className="pd-video-container" style={{ borderColor: project.themeColor }}>
                            <img src={project.image} alt={`${project.name} Demonstration`} className="pd-image" />
                        </div>
                    </div>
                )}
            </div>

            {/* Ambient Background Lights */}
            <div className="pd-ambient light-1" style={{ background: project.themeColor }}></div>
        </div>
    );
};

export default ProjectDetails;
