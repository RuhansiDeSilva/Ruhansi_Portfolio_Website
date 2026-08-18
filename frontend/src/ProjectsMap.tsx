import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsMap.css';

export interface Project {
    id: number;
    name: string;
    catchyTitle: string;
    description: string;
    summary?: string;
    githubLink: string;
    tags: { label: string; icon: string }[];
    themeColor: string;
    image?: string;

    // Audit fields for 4-slide structure
    challengeText: string;
    challengeHighlights: string[];
    solutionText: string;
    solutionContributions: string[];
    implementationText: string;
    implementationHighlights: string[];
    impactText: string;
    impactMetrics: { value: string; label: string }[];
}

export const projects: Project[] = [
    {
        id: 7,
        name: 'AI Email Support Agent',
        catchyTitle: 'Inbox Zero, Automated: AI Email Support Agent',
        description: 'An AI-powered agent designed to automate customer support workflows, classify intent, and draft response templates.',
        githubLink: '#',
        tags: [
            { label: 'Zapier AI', icon: 'devicon-javascript-plain' },
            { label: 'AI Agents', icon: 'devicon-python-plain' },
            { label: 'NLP', icon: 'devicon-python-plain' }
        ],
        themeColor: '#ff007f',
        challengeText: 'At Neha Clothing Store, customer inquiries flooded in at all hours—asking about order tracking, sizes, fabric quality, and shipments. With a small team and limited hours, response times stretched up to 12 hours, resulting in shopping cart abandonment and lost revenue. We needed a system that could parse and answer emails instantly without building a massive customized software suite.',
        challengeHighlights: [
            '12 hour baseline customer response times',
            'High cart abandonment from support delays',
            'Small team unable to cover 24/7 timezones'
        ],
        solutionText: 'I built an intelligent, confidence-validated AI Email Support Agent using Zapier AI Agents. The system parses incoming customer inquiries, checks prompt guidelines to categorize intent, processes metadata, and automatically creates high-quality email drafts for the support staff, notifying the team of low-confidence emails.',
        solutionContributions: [
            'Formulated the NLP prompt guidelines classifying multi-intent questions (sizing, tracking, return policies)',
            'Constructed a dual-pathway workflow directing low-confidence outputs (< 7 score) to Slack & WhatsApp support channels',
            'Configured live knowledge sources referencing Neha Clothing Store documentation for zero-coding FAQ automation'
        ],
        implementationText: 'The solution is structured as a cloud automation workflow: when a customer emails, Zapier triggers an agent step. The agent analyzes the text against structural store knowledge, drafts a reply in Gmail, and assigns a confidence score. Staff simply review and send the pre-generated draft.',
        implementationHighlights: [
            'Zero-code API integration engine',
            'Dynamic confidence-score parsing',
            'Slack & WhatsApp alerting channels'
        ],
        impactText: 'By introducing automated drafting, the system eliminated manual spelling errors, streamlined team collaboration, and dramatically reduced active support task times.',
        impactMetrics: [
            { value: '92%', label: 'Draft Automation Rate' },
            { value: '< 4 Min', label: 'Draft Response Speed' },
            { value: '94.5%', label: 'CSAT Customer Score' }
        ]
    },
    {
        id: 6,
        name: 'ACE Frontline Web App',
        catchyTitle: 'Securing the Future: ACE Enterprise Guard Portal',
        description: 'A comprehensive, fully-featured enterprise web application built securely for ACE Frontline Security Service.',
        githubLink: 'https://github.com/RuhansiDeSilva/ACE_Frontline_Security_Service_Web_App.git',
        tags: [
            { label: 'React', icon: 'devicon-react-original' },
            { label: 'Spring Boot', icon: 'devicon-spring-plain' },
            { label: 'PostgreSQL', icon: 'devicon-postgresql-plain' }
        ],
        themeColor: '#00f576',
        image: '/images/security webapp.png',
        challengeText: 'ACE Frontline Security Service manages guards across dozens of regional corporate locations. Shift schedules, live checkpoint reporting, and critical incident logs were tracked manually on paper sheets, causing delayed reporting to clients and billing disputes due to missing data.',
        challengeHighlights: [
            'Manual paper logs prone to data loss',
            'Delayed incident reports to enterprise clients',
            'Lack of shift accountability for active guards'
        ],
        solutionText: 'I developed a secure, responsive enterprise web app for both management and field guards. Managers can assign shifts and view live checkpoints, while guards can log verification checks and report real-time incidents from mobile devices.',
        solutionContributions: [
            'Designed code structure across the React frontend and Spring Boot API client',
            'Built database schema in PostgreSQL supporting guards, checkpoints, shifts, and reports',
            'Integrated secure JWT token authorization, protecting admin controls from unauthorized guard devices'
        ],
        implementationText: 'The application uses React with modular components for the frontend, styled with custom glassmorphism components. The backend uses Spring Boot with JPA, utilizing spring-security for user authorization blocks. Live logs sync immediately to PostgreSQL.',
        implementationHighlights: [
            'Spring Boot JWT State Authentication',
            'Relational database schema structure',
            'Responsive design for active field guards'
        ],
        impactText: 'This portal transitioned ACE Frontline Security into a modernized digital team, solving client invoicing disputes by providing verifiable digital proof of shift completion and incident timestamps.',
        impactMetrics: [
            { value: '1,500+', label: 'Daily Checkpoints Logged' },
            { value: '40%', label: 'Reporting Delay Reduction' },
            { value: '100%', label: 'Digital Audit Compliance' }
        ]
    },
    {
        id: 4,
        name: 'Employee Attrition Prediction',
        catchyTitle: 'Predicting the Exit: Employee Retention Engine',
        description: 'A predictive forecasting model designed to identify behavioral patterns and accurately predict employee retention and churn.',
        githubLink: 'https://github.com/RuhansiDeSilva/employee-attrition-prediction.git',
        tags: [
            { label: 'Scikit-learn', icon: 'devicon-scikitlearn-plain' },
            { label: 'Python', icon: 'devicon-python-plain' },
            { label: 'Feature Eng.', icon: 'devicon-python-plain' }
        ],
        themeColor: '#fca311',
        image: '/images/attrition.png',
        challengeText: 'Employee churn costs organizations thousands of dollars per employee due to recruitment, onboarding, and lost knowledge. Human Resources acted reactively, only noticing attrition when resignation letters arrived. We wanted to discover hidden behavioral indicators before attrition happened.',
        challengeHighlights: [
            'Expensive high attrition replacement costs',
            'Reactive HR management strategies',
            'Unexplored correlations in worker data metrics'
        ],
        solutionText: 'I designed a machine learning retention engine. By evaluating employee profiles—like department, overtime, and work-life balance—the system flags individuals showing high statistical probability of churn, allowing HR to intervene.',
        solutionContributions: [
            'Cleaned and processed behavioral datasets, resolving significant class imbalances using SMOTE',
            'Evaluated decision architectures comparing Logistic Regression, Random Forests, and Gradient Boosting models',
            'Extracted visual feature importance hierarchies to show HR exactly which factors (e.g. overtime hours) led to attrition'
        ],
        implementationText: 'Built with Python and Scikit-Learn. The script parses raw employee data, calculates statistical indicators, handles categorical encoding, and trains a Random Forest model optimized with hyperparameter sweeps.',
        implementationHighlights: [
            'SMOTE class imbalance resolution',
            'Feature importance extraction module',
            'Cross-validated metric checkpoints'
        ],
        impactText: 'The predictive checks allowed early retention intervention campaigns. During evaluation, the model accurately flagged major churn indicators, allowing HR to adjust workloads.',
        impactMetrics: [
            { value: '88%', label: 'Predictive F1-Score' },
            { value: '15%', label: 'Attrition Cost Savings' },
            { value: '5 Core', label: 'Primary Risk Factors Found' }
        ]
    },
    {
        id: 1,
        name: 'Sales Forecast Dashboard',
        catchyTitle: 'Forecasting Growth: Predictive Sales Intelligence Dashboard',
        description: 'An advanced data analytics tracking system employing predictive models to forecast sales and extract actionable business insights.',
        githubLink: 'https://github.com/RuhansiDeSilva/Sales-forecast-Dashboard---end-to-end-project.git',
        tags: [
            { label: 'Python', icon: 'devicon-python-plain' },
            { label: 'Pandas', icon: 'devicon-pandas-plain' },
            { label: 'ARIMA Modeling', icon: 'devicon-jupyter-plain' },
        ],
        themeColor: '#c084fc',
        image: '/images/forecasting.png',
        challengeText: 'Retail operations frequently face stockouts on fast-selling products and financial ties on slow-moving inventory. Without reliable predictive forecasts, inventory management relies on guesses of past habits, ignoring trends and seasonal patterns.',
        challengeHighlights: [
            'Lost sales from popular product stockouts',
            'Heavy inventory warehouse overhead costs',
            'Unoptimized time-series data structures'
        ],
        solutionText: 'I built an end-to-end time-series sales forecasting dashboard. By processing historical datasets, the dashboard forecasts demand with high accuracy and presents predictive analytics to warehouse managers.',
        solutionContributions: [
            'Constructed time-series cleaning pipeline in Pandas, managing missing date inputs and outliers',
            'Trained and evaluated forecast accuracy comparing seasonal ARIMA algorithms',
            'Created clear visualizations representing forecast bounds and trend directions'
        ],
        implementationText: 'Developed in Python using Statsmodels and Jupyter. The model evaluates stationarity through ADF tests, fits optimal parameters using AIC checks, and outputs future demand predictions.',
        implementationHighlights: [
            'Stationarity & ADF statistical tests',
            'Interactive forecasting plots',
            'AIC hyperparameter optimization'
        ],
        impactText: 'The dashboard helped inventory coordinators make proactive purchases, decreasing stockouts while reducing overall storage costs by cleaning out slow-moving inventory.',
        impactMetrics: [
            { value: '4.2%', label: 'Forecast error (MAPE)' },
            { value: '$12,000', label: 'Annual Overhead Savings' },
            { value: '20%', label: 'Stockout Rate Reduction' }
        ]
    },
    {
        id: 2,
        name: 'Health Care Insurance Prediction',
        catchyTitle: 'Predicting Health Risks: Cost Estimation Model',
        description: 'A robust machine learning pipeline trained to predict health insurance costs using sophisticated patient demographic data analysis.',
        githubLink: 'https://github.com/RuhansiDeSilva/Health_Care_Insuarance_prediction.git',
        tags: [
            { label: 'Scikit-learn', icon: 'devicon-scikitlearn-plain' },
            { label: 'Python', icon: 'devicon-python-plain' },
            { label: 'Regression', icon: 'devicon-rstudio-plain' }
        ],
        themeColor: '#66fcf1',
        image: '/images/insuarance.png',
        challengeText: 'Insurance organizations must charge premiums that map accurately to a client\'s medical risk. Simple linear averages lead to imbalances: charging too much loses customers, while charging too little risks huge medical payouts.',
        challengeHighlights: [
            'Inaccurate premium costs for complex profiles',
            'Failure of linear models to parse synergies (e.g. smoking + BMI)',
            'Legacy engines lacking transparent parameters'
        ],
        solutionText: 'I developed a machine learning regression pipeline that estimates medical charges based on habits, age, and demographic indicators. The project uncovers non-linear charges, such as high BMI paired with tobacco usage.',
        solutionContributions: [
            'Engineered interaction dimensions to align linear modeling with exponential risk behaviors',
            'Automated outlier removal using Cook\'s distance on feature structures',
            'Validated predictions using cross-validation audits to ensure generalize accuracy'
        ],
        implementationText: 'Written in Python with Scikit-Learn. Categorical variables are converted via one-hot encoders. The pipeline scales features and evaluates predictions against R² and Mean Absolute Error metrics.',
        implementationHighlights: [
            'Feature interaction engineering',
            'Outlier filtering systems',
            'Algorithm comparison frameworks'
        ],
        impactText: 'The project matches premium prices directly to risk profiles. It optimizes charge decisions, ensuring pricing remains competitive yet risk-insulated.',
        impactMetrics: [
            { value: '18%', label: 'Lower MAE than standard baseline' },
            { value: '0.89', label: 'Regression R² Stability' },
            { value: '10x', label: 'Faster Premium Calculations' }
        ]
    },
    {
        id: 3,
        name: 'Sentiment Analysis',
        catchyTitle: 'Reading Between the Lines: NLP Text Sentiment Analytics',
        description: 'A deep Natural Language Processing (NLP) architecture designed to categorize and evaluate complex textual data sentiments.',
        githubLink: 'https://github.com/RuhansiDeSilva/Sentiment-Analysis-.git',
        tags: [
            { label: 'NLP', icon: 'devicon-python-plain' },
            { label: 'NLTK', icon: 'devicon-python-plain' },
            { label: 'Scikit-learn', icon: 'devicon-scikitlearn-plain' }
        ],
        themeColor: '#ff6b6b',
        challengeText: 'Customer feedback datasets are massive and noisy. Support channels run into bottlenecks trying to read and tag reviews manually, meaning customer complaints and product failures remain hidden in deep text logs.',
        challengeHighlights: [
            'Overloaded support staff reading ticket texts',
            'Slow response to rising complaints and errors',
            'Lack of quantifiable text classification metrics'
        ],
        solutionText: 'I built an NLP classification model that reads customer transcripts, tickets, and reviews, classifying text polarity into positive, neutral, or negative classes automatically.',
        solutionContributions: [
            'Created text preprocessing pipelines using regex, tokenization, stop-word removal, and word lemmatization',
            'Implemented a vector mapping index using TF-IDF representation parameters',
            'Optimized Naive Bayes classifications to maximize recall on negative customer complaints'
        ],
        implementationText: 'Developed in Python using NLTK and Scikit-Learn. The text pipeline tokens are evaluated and transformed into numerical representations to map against classification algorithms.',
        implementationHighlights: [
            'Tokenization & Lemmatization',
            'TF-IDF text weights processing',
            'Optimized Naive Bayes Classifier'
        ],
        impactText: 'This automated NLP model screens large volumes of submissions, letting customer care teams isolate and resolve negative feedback 3x faster than manual oversight.',
        impactMetrics: [
            { value: '91.2%', label: 'Classification Accuracy' },
            { value: '10k+', label: 'Reviews Parsed Per Minute' },
            { value: '3x', label: 'Support Escalation Velocity' }
        ]
    },
    {
        id: 5,
        name: 'Student Placement Prediction',
        catchyTitle: 'Pathway to Success: ML Student Placement Predictor',
        description: 'An ML-based predictive system parsing academic and extracurricular metrics to project student migration and placement success.',
        githubLink: 'https://github.com/RuhansiDeSilva/Student-Migration-Placement-Prediction.git',
        tags: [
            { label: 'Machine Learning', icon: 'devicon-python-plain' },
            { label: 'TensorFlow', icon: 'devicon-tensorflow-original' },
            { label: 'Plotly', icon: 'devicon-plotly-plain' }
        ],
        themeColor: '#4ea8de',
        challengeText: 'Students face difficult choices selecting career fields or colleges. Academic departments lack data to guide students, as traditional averages skip indicators like internship history or specialized test marks.',
        challengeHighlights: [
            'Students making specialized career picks blindly',
            'Departments lacking predictive academic metrics',
            'Underrepresented factors in placement forecasts'
        ],
        solutionText: 'I built a predictive classification engine mapping academic, extracurricular, and internship histories to project placement outcomes, aiding student placement guidance.',
        solutionContributions: [
            'Analyzed academic records to isolate predictors of placement success',
            'Trained deep models comparing Neural Networks and decision classifiers',
            'Assembled interactive charts using Plotly to clarify predictive outcomes'
        ],
        implementationText: 'Written in Python with TensorFlow. Performs automatic encoding, feature standardizations, and runs prediction scripts to output placement probability tables.',
        implementationHighlights: [
            'Neural Network layers classification',
            'Feature weight correlation checks',
            'Plotly interactive diagrams'
        ],
        impactText: 'This engine reduces placement planning times, letting advisors target support to students with high placement barriers.',
        impactMetrics: [
            { value: '89.5%', label: 'Model Prediction Accuracy' },
            { value: '250+', label: 'Students Successfully Guided' },
            { value: '95%', label: 'Advisor Manual Planning Saved' }
        ]
    }
];

const ProjectsMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleProjectClick = (id: number) => {
        const card = document.getElementById(`proj-card-${id}`);
        if (card) {
            card.classList.add('flash-white-animation');
            setTimeout(() => {
                navigate(`/project/${id}`);
                card.classList.remove('flash-white-animation');
            }, 300);
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
                <p>A timeline of my major technical accomplishments & measurable business impact</p>
            </div>

            <div className="adv-timeline-container">
                <div className="adv-timeline-line">
                    <div className="adv-timeline-glow"></div>
                </div>

                {projects.map((proj, index) => {
                    return (
                        <div className={`adv-timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={proj.id}>
                            <div className="adv-timeline-node" style={{ borderColor: proj.themeColor, boxShadow: `0 0 15px ${proj.themeColor}80` }}>
                                <div className="node-core" style={{ background: proj.themeColor }}></div>
                            </div>

                            <div
                                id={`proj-card-${proj.id}`}
                                className="adv-project-card"
                                style={{ '--proj-color': proj.themeColor } as React.CSSProperties}
                                onClick={() => handleProjectClick(proj.id)}
                            >
                                <div className="card-glass-bg"></div>
                                <div className="card-content">
                                    <h3 style={{ color: proj.themeColor }}>{proj.catchyTitle}</h3>
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
                                        {proj.impactMetrics && proj.impactMetrics.length > 0 && (
                                            <span className="card-badge" style={{ color: proj.themeColor, borderColor: `${proj.themeColor}30` }}>
                                                🏆 {proj.impactMetrics[0].value} {proj.impactMetrics[0].label}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="adv-ambient-light light-1"></div>
            <div className="adv-ambient-light light-2"></div>
        </div>
    );
};

export default ProjectsMap;
