import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AboutMe from './AboutMe';
import Vision from './Vision';
import Skills from './Skills';
import Journey from './Journey';
import ProjectDetails from './ProjectDetails';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
