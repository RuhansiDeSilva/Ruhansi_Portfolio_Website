import React, { useEffect } from 'react';
import './SocialAccounts.css';

const SocialAccounts: React.FC = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up-social');
                }
            });
        }, { threshold: 0.2 });

        const items = document.querySelectorAll('.social-btn');
        items.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="social-section" id="contact">
            <div className="social-header">
                <h2>Let's Connect</h2>
                <p>Reach out to me to discuss projects, collaborations, or just to say hi!</p>
            </div>

            <div className="social-flex">
                <a href="https://github.com/RuhansiDeSilva" target="_blank" rel="noopener noreferrer" className="social-btn github">
                    <i className="devicon-github-original"></i>
                    <span>GitHub</span>
                </a>

                <a href="https://www.linkedin.com/in/ruhansidesilva/" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                    <i className="devicon-linkedin-plain"></i>
                    <span>LinkedIn</span>
                </a>

                <a href="https://www.instagram.com/ruu_sds_?igsh=MWp1cGJnY2cyYmhnbg==" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>📷</span>
                    <span>Instagram</span>
                </a>

                <a href="tel:0704461280" className="social-btn phone">
                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>📞</span>
                    <span>0704461280</span>
                </a>

                <a href="mailto:ruhansisasithma@gmail.com" className="social-btn email">
                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>📧</span>
                    <span>Email Me</span>
                </a>
            </div>
        </div>
    );
};

export default SocialAccounts;
