import React, { useEffect, useState } from 'react';
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
    }, [id]);

    // Widget 1: AI Email Agent Simulator States
    const [emailCategory, setEmailCategory] = useState('exchange');
    const [isSimulatingAgent, setIsSimulatingAgent] = useState(false);
    const [agentOutput, setAgentOutput] = useState<{
        confidence: number;
        action: string;
        draft: string;
        status: 'auto-drafted' | 'escalated';
    } | null>(null);

    const runEmailSimulation = () => {
        setIsSimulatingAgent(true);
        setAgentOutput(null);
        setTimeout(() => {
            setIsSimulatingAgent(false);
            if (emailCategory === 'exchange') {
                setAgentOutput({
                    confidence: 9.6,
                    action: 'Drafted response in Gmail',
                    draft: "Hi there, I'm so sorry we sent the wrong size! I've drafted a return shipping label for order #1042 to swap your S for an M. Let us know if this works!",
                    status: 'auto-drafted'
                });
            } else if (emailCategory === 'tracking') {
                setAgentOutput({
                    confidence: 9.3,
                    action: 'Drafted response in Gmail',
                    draft: "Dear customer, thank you for reaching out. Let me look up your order registry. Could you please reply with your order number so we can retrieve your tracking link immediately?",
                    status: 'auto-drafted'
                });
            } else {
                setAgentOutput({
                    confidence: 4.8,
                    action: 'Sent alert notification to Slack #support-team',
                    draft: "⚠️ Low confidence detection: Inquiry details require human review. Slack alert dispatched to support agents.",
                    status: 'escalated'
                });
            }
        }, 1000);
    };

    // Widget 2: Sentiment Analyzer States
    const [sentimentText, setSentimentText] = useState('');
    const [sentimentResult, setSentimentResult] = useState<{
        label: string;
        confidence: number;
        score: number;
    } | null>(null);

    const analyzeSentiment = () => {
        if (!sentimentText.trim()) return;
        const lower = sentimentText.toLowerCase();
        let score = 0.5;
        let label = 'Neutral';

        const posWords = ['good', 'great', 'love', 'amazing', 'perfect', 'awesome', 'helpful', 'fast', 'secure', 'best', 'happy', 'solved', 'satisfy'];
        const negWords = ['bad', 'error', 'slow', 'broke', 'fail', 'worst', 'angry', 'hate', 'waste', 'frustrated', 'delayed', 'incorrect', 'disappoint'];

        posWords.forEach(w => { if (lower.includes(w)) score += 0.15; });
        negWords.forEach(w => { if (lower.includes(w)) score -= 0.15; });

        score = Math.max(0.05, Math.min(0.95, score));
        if (score > 0.58) label = 'Positive';
        else if (score < 0.42) label = 'Negative';

        setSentimentResult({
            label,
            confidence: Math.round(50 + Math.abs(score - 0.5) * 100),
            score
        });
    };

    // Widget 3: Placement Predictor States
    const [gpa, setGpa] = useState(3.5);
    const [internships, setInternships] = useState(1);
    const [extracurriculars, setExtracurriculars] = useState('yes');

    if (!project) {
        return (
            <div className="pd-not-found">
                <h2>Project Not Found</h2>
                <button onClick={() => navigate('/about')}>Go Back Home</button>
            </div>
        );
    }

    const renderInteractiveShowcase = () => {
        if (project.id === 7) {
            return (
                <div className="interactive-widget-box" style={{ borderColor: project.themeColor }}>
                    <div className="widget-header" style={{ background: `${project.themeColor}15` }}>
                        <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                        <span className="widget-title">Zapier AI Agent Simulator</span>
                    </div>
                    <div className="widget-body">
                        <label className="widget-label">Select Customer Query Preset:</label>
                        <select
                            className="widget-select"
                            value={emailCategory}
                            onChange={(e) => {
                                setEmailCategory(e.target.value);
                                setAgentOutput(null);
                            }}
                        >
                            <option value="exchange">Sizing Issue (High Confidence Option)</option>
                            <option value="tracking">Shipping Status (High Confidence Option)</option>
                            <option value="unusual">Unusual Discount / Custom Cat Suit (Low Confidence Option)</option>
                        </select>

                        <button
                            className="widget-btn"
                            style={{ background: project.themeColor }}
                            onClick={runEmailSimulation}
                            disabled={isSimulatingAgent}
                        >
                            {isSimulatingAgent ? 'Agent processing query...' : 'Trigger Zapier AI Agent'}
                        </button>

                        {isSimulatingAgent && (
                            <div className="agent-thinking">
                                <div className="spinner" style={{ borderTopColor: project.themeColor }}></div>
                                <span>Evaluating prompt constraints...</span>
                            </div>
                        )}

                        {agentOutput && (
                            <div className={`agent-result-box ${agentOutput.status}`}>
                                <div className="result-header">
                                    <span>Confidence Score: <b>{agentOutput.confidence}/10</b></span>
                                    <span className={`status-badge ${agentOutput.status}`}>
                                        {agentOutput.status === 'auto-drafted' ? '✅ Safe to Draft' : '⚠️ Escalation Alert'}
                                    </span>
                                </div>
                                <div className="result-action"><b>Ref Route Action:</b> {agentOutput.action}</div>
                                <div className="result-draft">
                                    <b>Draft Result:</b>
                                    <p>{agentOutput.draft}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <span className="widget-caption">Interactive prototype demonstrating confidence-score branching models built in Zapier.</span>
                </div>
            );
        }

        if (project.id === 3) {
            return (
                <div className="interactive-widget-box" style={{ borderColor: project.themeColor }}>
                    <div className="widget-header" style={{ background: `${project.themeColor}15` }}>
                        <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                        <span className="widget-title">NLP Sentiment Sandbox</span>
                    </div>
                    <div className="widget-body">
                        <label className="widget-label">Type comments to test classification weights:</label>
                        <textarea
                            className="widget-textarea"
                            placeholder="Type customer reviews here... e.g. Customer support was slow and the feature broke immediately."
                            value={sentimentText}
                            onChange={(e) => setSentimentText(e.target.value)}
                        />

                        <button
                            className="widget-btn"
                            style={{ background: project.themeColor }}
                            onClick={analyzeSentiment}
                        >
                            Classify Phrase Polarity
                        </button>

                        {sentimentResult && (
                            <div className={`sentiment-result ${sentimentResult.label.toLowerCase()}`}>
                                <div className="sentiment-emoji">
                                    {sentimentResult.label === 'Positive' ? '😊' : sentimentResult.label === 'Negative' ? '😡' : '😐'}
                                </div>
                                <div className="sentiment-details">
                                    <h3>Classification: <span className="sentiment-name">{sentimentResult.label}</span></h3>
                                    <div className="sentiment-progress-bar">
                                        <div
                                            className="sentiment-progress-fill"
                                            style={{
                                                width: `${sentimentResult.score * 100}%`,
                                                background: sentimentResult.label === 'Positive' ? '#00f576' : sentimentResult.label === 'Negative' ? '#ff6b6b' : '#a8a8b1'
                                            }}
                                        ></div>
                                    </div>
                                    <span>Confidence Score: <b>{sentimentResult.confidence}%</b></span>
                                </div>
                            </div>
                        )}
                    </div>
                    <span className="widget-caption">A demo indicating how the Naive Bayes model identifies key sentiment indicators in feedback chunks.</span>
                </div>
            );
        }

        if (project.id === 5) {
            const prediction = (() => {
                const gpaVal = (gpa / 4.0) * 50;
                const internVal = Math.min(internships * 15, 30);
                const extraVal = extracurriculars === 'yes' ? 20 : 5;
                const raw = Math.min(99.8, gpaVal + internVal + extraVal);
                return {
                    pct: Math.round(raw),
                    label: raw > 82 ? 'Tier 1 Career Track' : raw > 60 ? 'Tier 2 Support Track' : 'Development Required'
                };
            })();

            return (
                <div className="interactive-widget-box" style={{ borderColor: project.themeColor }}>
                    <div className="widget-header" style={{ background: `${project.themeColor}15` }}>
                        <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                        <span className="widget-title">Placement Weight Simulator</span>
                    </div>
                    <div className="widget-body">
                        <div className="option-row">
                            <label>Cumulative GPA: (<b>{gpa.toFixed(2)}</b>)</label>
                            <input
                                type="range"
                                min="2.0"
                                max="4.0"
                                step="0.1"
                                value={gpa}
                                onChange={(e) => setGpa(parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="option-row">
                            <label>Completed Internships: (<b>{internships}</b>)</label>
                            <input
                                type="range"
                                min="0"
                                max="3"
                                step="1"
                                value={internships}
                                onChange={(e) => setInternships(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="option-row">
                            <label>Extracurricular Activities:</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="extras"
                                        value="yes"
                                        checked={extracurriculars === 'yes'}
                                        onChange={() => setExtracurriculars('yes')}
                                    /> Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="extras"
                                        value="no"
                                        checked={extracurriculars === 'no'}
                                        onChange={() => setExtracurriculars('no')}
                                    /> No
                                </label>
                            </div>
                        </div>

                        <div className="predictor-outcome">
                            <div className="outcome-value" style={{ color: project.themeColor }}>{prediction.pct}%</div>
                            <div className="outcome-label">
                                <h3>Predicted Placement Probability</h3>
                                <p>Suggested Track: <b>{prediction.label}</b></p>
                            </div>
                        </div>
                    </div>
                    <span className="widget-caption">Interactive weight calculator displaying predictions parsed from the students neural network parameters.</span>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="pd-container" style={{ '--pd-theme': project.themeColor } as React.CSSProperties}>
            <div className="pd-glass-bg"></div>

            <button className="pd-back-btn" onClick={() => navigate('/about')}>
                ← Back to About Portfolio
            </button>

            <div className="pd-header">
                <h1 style={{ color: project.themeColor }}>{project.catchyTitle}</h1>
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

                <div className="pd-slide-card slide-challenge">
                    <div className="slide-content-left">
                        <span className="slide-number">01</span>
                        <h2>The Challenge & Pain Points</h2>
                        <p>{project.challengeText}</p>
                    </div>
                    <div className="slide-content-right">
                        <div className="challenge-highlights-box">
                            <h3>Key Friction Points</h3>
                            <ul>
                                {project.challengeHighlights.map((hl, i) => (
                                    <li key={i}>
                                        <span className="bullet-point" style={{ background: project.themeColor }} />
                                        <span>{hl}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pd-slide-card slide-solution">
                    <div className="slide-full-width">
                        <span className="slide-number">02</span>
                        <h2>The Solution & Technical Contributions</h2>
                        <p className="solution-intro">{project.solutionText}</p>

                        <div className="solution-contributions-box">
                            <h3>My Key Contributions</h3>
                            <div className="contributions-grid">
                                {project.solutionContributions.map((contrib, i) => (
                                    <div className="contribution-item" key={i}>
                                        <div className="contrib-number" style={{ color: project.themeColor }}>{i + 1}</div>
                                        <p>{contrib}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pd-slide-card slide-implementation">
                    <div className="slide-content-left">
                        <span className="slide-number">03</span>
                        <h2>Technical Implementation</h2>
                        <p>{project.implementationText}</p>

                        <div className="impl-highlights">
                            {project.implementationHighlights.map((hl, i) => (
                                <span className="impl-badge" key={i} style={{ borderColor: `${project.themeColor}40` }}>
                                    ⚙️ {hl}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="slide-content-right">
                        {project.image ? (
                            <div className="pd-visual-container" style={{ borderColor: project.themeColor }}>
                                <img src={project.image} alt={`${project.name} Demonstration`} className="pd-image" />
                                <div className="pd-image-caption">Captioned visual displaying system operational dashboards.</div>
                            </div>
                        ) : (
                            renderInteractiveShowcase()
                        )}
                    </div>
                </div>

                <div className="pd-slide-card slide-impact">
                    <div className="slide-full-width">
                        <span className="slide-number">04</span>
                        <h2>Quantifiable Impact & Metrics</h2>

                        <div className="metrics-summary-grid">
                            {project.impactMetrics.map((met, i) => (
                                <div className="metric-scorecard-card" key={i} style={{ borderTopColor: project.themeColor }}>
                                    <div className="metric-scorecard-value" style={{ color: project.themeColor }}>{met.value}</div>
                                    <div className="metric-scorecard-label">{met.label}</div>
                                    <div className="metric-card-glow" style={{ background: project.themeColor }}></div>
                                </div>
                            ))}
                        </div>

                        <p className="impact-conclusion">{project.impactText}</p>
                    </div>
                </div>

            </div>

            <div className="pd-ambient light-1" style={{ background: project.themeColor }}></div>
        </div>
    );
};

export default ProjectDetails;
