import React, { useEffect, useRef } from 'react';
import './Certifications.css';

const certs = [
    {
        id: 1,
        title: 'How to Start a Career in Blockchain Security',
        issuer: 'TechXplore 2.0 – Association of Computing Students, USJ',
        date: '2025',
        icon: '🔗',
        link: 'https://www.linkedin.com/posts/ruhansi-de-silva-40422934a_blockchainsecurity-newlearning-techxplore-activity-7420713607736451072-6IMy',
        tags: ['Blockchain', 'Security', 'Career'],
    },
    {
        id: 2,
        title: 'Machine Learning Certification',
        issuer: 'Certified in Machine Learning & Data Science',
        date: '2025',
        icon: '🤖',
        link: 'https://www.linkedin.com/posts/ruhansi-de-silva-40422934a_machinelearning-datascience-proudmoment-activity-7396924682077310976-4GvQ',
        tags: ['Machine Learning', 'Data Science'],
    },
];

const Certifications: React.FC = () => {
    const certRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.cert-card, .ms-account-card');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="certs-section">
            <div className="certs-header">
                <h2>Certifications</h2>
                <p>Continuous Learning & Validated Expertise</p>
            </div>

            <div className="certs-grid" ref={certRef}>
                {certs.map((cert) => (
                    <a
                        className="cert-card"
                        key={cert.id}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="cert-icon">{cert.icon}</div>
                        <div className="cert-info">
                            <h3>{cert.title}</h3>
                            <p className="cert-issuer">{cert.issuer}</p>
                            <div className="cert-tags">
                                {cert.tags.map((tag, idx) => (
                                    <span className="cert-tag" key={idx}>{tag}</span>
                                ))}
                            </div>
                            <span className="cert-date">{cert.date}</span>
                        </div>
                        <div className="cert-link-indicator">
                            <span>View Certificate ↗</span>
                        </div>
                    </a>
                ))}
            </div>

            {/* Microsoft Learn Account */}
            <div className="ms-account-section">
                <div className="ms-account-card cert-card">
                    <div className="ms-icon">
                        <svg viewBox="0 0 23 23" width="48" height="48">
                            <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                            <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                            <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                            <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                        </svg>
                    </div>
                    <div className="ms-info">
                        <h3>Microsoft Learn Profile</h3>
                        <p className="ms-subtitle">Explore my learning paths, achievements & badges</p>
                    </div>
                    <a
                        href="https://learn.microsoft.com/en-us/users/ruhansidesilva-8237/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-link-btn"
                    >
                        <span>Visit Profile</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Certifications;
