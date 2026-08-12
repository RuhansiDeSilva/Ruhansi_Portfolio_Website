import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Note: removed auto-play since user requested click-to-play
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error("Play prevented", e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="landing-container">
      <div className="content-wrapper">
        <div className="video-section">
          <div className="video-glow"></div>
          <div className="video-wrapper">
            <video
              ref={videoRef}
              className="promo-video"
              src="/Woman_speaking_at_desk_202608051034.mp4"
              loop
              muted={isMuted}
              playsInline
              onClick={handleVideoClick}
            />
            <button className="mute-btn" onClick={toggleMute}>
              {isMuted ? '🔇 Unmute Sound' : '🔊 Mute Sound'}
            </button>
          </div>
        </div>
        <div className="text-section">
          <h1 className="hero-title">Hi, I'm Ruhansi De Silva</h1>
          <p className="hero-subtitle">
            Data Science & AI Enthusiast — passionate about transforming complex data into intelligent systems that drive real-world impact. Exploring Machine Learning, Generative AI & beyond.
          </p>
          <div className="action-buttons">
            <button className="primary-btn" onClick={() => navigate('/about')}>Get Started</button>
          </div>
        </div>
      </div>
      <div className="background-elements">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>
    </div>
  );
}

export default App;
