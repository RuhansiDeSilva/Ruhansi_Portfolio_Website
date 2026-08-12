import React, { useEffect, useRef } from 'react';
import './Events.css';

const Events: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const photos = [
        '/events/event1.jpeg',
        '/events/event2.jpeg',
        '/events/event3.jpeg',
        '/events/event4.jpeg',
        '/events/event5.jpeg',
        '/events/event6.jpeg',
        '/events/event7.jpeg',
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="events-section" ref={sectionRef}>
            <div className="events-header">
                <h2>Events & Highlights</h2>
                <p>Participate for university events as committe member,volunteering</p>
            </div>

            <div className="slideshow-container">
                <div className="slideshow-track">
                    {/* Render photos multiple times to seamlessly loop visually */}
                    {[...photos, ...photos, ...photos].map((src, index) => (
                        <div className="slide-card" key={index}>
                            <img src={src} alt={`Event capture ${index}`} />
                            <div className="slide-overlay"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
