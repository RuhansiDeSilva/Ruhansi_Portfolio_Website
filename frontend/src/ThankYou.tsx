import React, { useEffect, useRef, useState } from 'react';
import './ThankYou.css';

const ThankYou: React.FC = () => {
    const thankYouRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.2 });

        if (thankYouRef.current) {
            observer.observe(thankYouRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="thankyou-container" ref={thankYouRef}>
            <div className={`thankyou-content ${isVisible ? 'thankyou-reveal' : ''}`}>
                <div className="thankyou-text">
                    <h1>Thank You.</h1>
                    <p>
                        I hope you enjoyed exploring my digital portfolio. If you're looking for a dedicated engineer
                        passionate about bringing beautiful designs and robust systems to life, let's get in touch.
                    </p>
                    <div className="social-links">
                        <button onClick={() => window.scrollTo(0, 0)} className="primary-btn">Back to Top</button>
                        <a href="tel:0704461280" className="secondary-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                            Contact Me
                        </a>
                    </div>
                </div>

                <div className="thankyou-image-wrapper">
                    <div className="image-outer">
                        <img src="/thank_you_image_v2.png" alt="Thank You" className="thankyou-image" />
                    </div>
                    <div className="thankyou-glow"></div>
                </div>
            </div>
            {/* Background elements */}
            <div className="background-elements">
                <div className="orb about-orb-1" style={{ background: 'rgba(255, 105, 180, 0.1)', top: '10%' }}></div>
                <div className="orb about-orb-2" style={{ background: 'rgba(56, 189, 248, 0.1)', bottom: '5%' }}></div>
            </div>
        </div>
    );
};

export default ThankYou;
