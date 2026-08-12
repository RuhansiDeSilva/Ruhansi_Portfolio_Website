import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutMe.css';
import './Skills.css';

/* ─── Skill categories ──────────────────────────────────────────────── */
const categories = [
    {
        title: '💻 Programming Languages',
        skills: [
            { label: 'Python', icon: 'devicon-python-plain colored' },
            { label: 'SQL', icon: 'devicon-azuresqldatabase-plain colored' },
            { label: 'Java', icon: 'devicon-java-plain colored' },
            { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
            { label: 'R', icon: 'devicon-r-plain colored' },
        ],
    },
    {
        title: '📊 Data & Analytics',
        skills: [
            { label: 'Data Analysis', icon: 'devicon-jupyter-plain colored' },
            { label: 'EDA', icon: 'devicon-anaconda-original colored' },
            { label: 'Statistical Analysis', icon: 'devicon-rstudio-plain colored' },
            { label: 'Data Visualization', icon: 'devicon-plotly-plain colored' },
            { label: 'Feature Engineering', icon: 'devicon-python-plain colored' },
            { label: 'Business Intelligence', icon: 'devicon-grafana-plain colored' },
            { label: 'Advanced SQL', icon: 'devicon-postgresql-plain colored' },
        ],
    },
    {
        title: '🤖 ML & Libraries',
        skills: [
            { label: 'Scikit-learn', icon: 'devicon-scikitlearn-plain colored' },
            { label: 'Pandas', icon: 'devicon-pandas-plain colored' },
            { label: 'NumPy', icon: 'devicon-numpy-plain colored' },
            { label: 'Matplotlib', icon: 'devicon-matplotlib-plain colored' },
            { label: 'Seaborn', icon: 'devicon-python-plain colored' },
        ],
    },
    {
        title: '⚙️ Frameworks & Tools',
        skills: [
            { label: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
            { label: 'Spring Boot', icon: 'devicon-spring-plain colored' },
            { label: 'React', icon: 'devicon-react-original colored' },
            { label: 'Git & GitHub', icon: 'devicon-github-original' },
        ],
    },
];

/* ─── Bubbles (background decoration) ─────────────────────────────── */
const BUBBLE_ICONS = [
    { icon: 'devicon-python-plain colored', color: '#3776AB' },
    { icon: 'devicon-azuresqldatabase-plain colored', color: '#F29111' },
    { icon: 'devicon-java-plain colored', color: '#ED8B00' },
    { icon: 'devicon-pandas-plain colored', color: '#150458' },
    { icon: 'devicon-numpy-plain colored', color: '#4DABCF' },
    { icon: 'devicon-react-original colored', color: '#61DAFB' },
    { icon: 'devicon-fastapi-plain colored', color: '#009688' },
    { icon: 'devicon-scikitlearn-plain colored', color: '#F89939' },
    { icon: 'devicon-r-plain colored', color: '#276DC3' },
    { icon: 'devicon-javascript-plain colored', color: '#F7DF1E' },
    { icon: 'devicon-matplotlib-plain colored', color: '#11557C' },
    { icon: 'devicon-anaconda-original colored', color: '#44A833' },
    { icon: 'devicon-postgresql-plain colored', color: '#336791' },
    { icon: 'devicon-spring-plain colored', color: '#6DB33F' },
    { icon: 'devicon-github-original', color: '#E84E31' },
];

const BUBBLES = BUBBLE_ICONS.map((b, i) => {
    const seed = (i * 137.508) % 100;
    const size = 58 + seed * 0.42;   // 58–100 px  — smaller, cleaner
    const left = seed * 0.91;
    const dur = 16 + (i % 8) * 1.6;
    const delay = (i * 1.1) % 8;
    return { ...b, size, left, dur, delay };
});

/* ─── Component ────────────────────────────────────────────────────── */
const Skills: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="about-container skills-page">
            {/* Devicons CDN */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
            />

            {/* ── Background bubble animation ── */}
            <div className="bubbles-bg" aria-hidden="true">
                {BUBBLES.map((b, i) => (
                    <div
                        key={i}
                        className="bubble-bg"
                        style={{
                            width: `${b.size}px`,
                            height: `${b.size}px`,
                            left: `${b.left}%`,
                            animationDuration: `${b.dur}s`,
                            animationDelay: `${b.delay}s`,
                            '--bcolor': b.color,
                        } as React.CSSProperties}
                    >
                        <i className={`${b.icon} bub-icon`} />
                    </div>
                ))}
            </div>

            {/* ── Foreground content ── */}
            <div className="about-content skills-content">
                <button className="back-btn" onClick={() => navigate('/about')}>
                    ← Back to About Me
                </button>
                <h1 className="about-title">Core Skills</h1>
                <p className="skills-subtitle">
                    Technologies &amp; techniques I work with every day.
                </p>

                {/* Category cards grid */}
                <div className="skills-grid">
                    {categories.map((cat, ci) => (
                        <div
                            className="skill-category-card"
                            key={cat.title}
                            style={{ animationDelay: `${0.3 + ci * 0.15}s` }}
                        >
                            <h2 className="category-title">{cat.title}</h2>
                            <div className="skill-badges">
                                {cat.skills.map((s) => (
                                    <div className="skill-badge" key={s.label}>
                                        <i className={`${s.icon} skill-icon`} />
                                        <span>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ambient orbs */}
            <div className="background-elements">
                <div className="orb about-orb-1" style={{ background: 'rgba(252,132,192,0.18)' }} />
                <div className="orb about-orb-2" />
            </div>
        </div>
    );
};

export default Skills;
