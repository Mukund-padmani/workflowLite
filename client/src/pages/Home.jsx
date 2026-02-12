
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Layers, BarChart } from 'lucide-react';

const Home = () => {
    return (
        <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>
                Automate Your Text <br />
                <span style={{ color: '#3b82f6' }}>In Seconds</span>
            </h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Workflow Builder Lite allows you to chain powerful text processing steps
                into a simple automation pipeline. Clean, summarize, and extract insights instantly.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
                <Link to="/builder" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    Start Building <ArrowRight size={20} />
                </Link>
                <Link to="/history" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    View History
                </Link>
            </div>

            <div className="features-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                textAlign: 'left'
            }}>
                <div className="card">
                    <div style={{ background: 'rgba(59, 130, 246, 0.2)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Zap size={24} color="#60a5fa" />
                    </div>
                    <h3>Design Workflows</h3>
                    <p>Select from modular steps like "Clean Text", "Summarize", and "Tagging" to build your custom pipeline.</p>
                </div>
                <div className="card">
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Layers size={24} color="#34d399" />
                    </div>
                    <h3>Step-by-Step Execution</h3>
                    <p>Watch your data transform in real-time. Inspect the output of every single step in the process.</p>
                </div>
                <div className="card">
                    <div style={{ background: 'rgba(244, 63, 94, 0.2)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <BarChart size={24} color="#fb7185" />
                    </div>
                    <h3>Track & Analyze</h3>
                    <p>Keep a history of your last 5 runs. Monitor backend and connection status effortlessly.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
