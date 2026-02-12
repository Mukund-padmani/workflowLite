import React, { useState } from 'react';
import api from '../api/api';
import { Plus, Trash, Play, CheckCircle, ArrowRight } from 'lucide-react';

const STEP_OPTIONS = [
    { value: 'clean text', label: 'Clean Text', desc: 'Remove special characters & extra spaces' },
    { value: 'summarize', label: 'Summarize', desc: 'Condense to first 2 sentences' },
    { value: 'extract key points', label: 'Extract Key Points', desc: 'Identify capitalized keywords' },
    { value: 'tag category', label: 'Tag Category', desc: 'Auto-categorize content' },
];

const Builder = () => {
    const [workflowSteps, setWorkflowSteps] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const addStep = (value) => {
        if (workflowSteps.length >= 4) {
            setError('Max 4 steps allowed in Lite version.');
            return;
        }
        setWorkflowSteps([...workflowSteps, value]);
        setError('');
    };

    const removeStep = (index) => {
        const newSteps = [...workflowSteps];
        newSteps.splice(index, 1);
        setWorkflowSteps(newSteps);
    };

    const runWorkflow = async () => {
        if (workflowSteps.length === 0) {
            setError('Please add at least one step.');
            return;
        }
        if (!inputText.trim()) {
            setError('Please enter input text to process.');
            return;
        }

        setIsRunning(true);
        setResults(null);
        setError('');

        try {
            const resp = await api.post('/api/workflow/run', {
                steps: workflowSteps,
                input: inputText
            });
            setResults(resp.data);
            // Optionally refetch history after a successful run
            // fetchHistory();
        } catch (err) {
            console.error(err);
            setError('Workflow execution failed. Check backend connection.');
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Workflow Builder</h2>

            <div className="workflow-builder">
                {/* Left Column: Builder */}
                <div className="card">
                    <h3>1. Define Workflow</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        Add up to 4 sequential steps.
                    </p>

                    <div className="step-list" style={{ minHeight: '150px' }}>
                        {workflowSteps.length === 0 && (
                            <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                                No steps added yet.
                            </div>
                        )}
                        {workflowSteps.map((step, idx) => (
                            <div key={idx} className="step-item">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="step-number">{idx + 1}</div>
                                    <span style={{ fontWeight: 600 }}>
                                        {STEP_OPTIONS.find(o => o.value === step)?.label || step}
                                    </span>
                                </div>
                                <button onClick={() => removeStep(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                    <Trash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {STEP_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => addStep(opt.value)}
                                className="btn btn-secondary"
                                style={{ justifyContent: 'flex-start', fontSize: '0.85rem' }}
                                disabled={workflowSteps.length >= 4}
                            >
                                <Plus size={16} /> {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Input & Run */}
                <div className="run-section">
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3>2. Input Data</h3>
                        <textarea
                            rows="6"
                            placeholder="Enter text to process..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            style={{ marginBottom: '1rem', resize: 'vertical' }}
                        />
                        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={runWorkflow}
                            disabled={isRunning}
                        >
                            {isRunning ? 'Processing...' : (
                                <>Run Workflow <Play size={18} fill="white" /></>
                            )}
                        </button>
                    </div>


                </div>
            </div>

            {/* Results Section - Full Width */}
            {results && (
                <div className="card" style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={24} /> Execution Complete
                        </h3>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Run ID: {results.id}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Original Input</h4>
                            <p style={{ margin: 0, color: 'var(--text-primary)' }}>{results.originalInput}</p>
                        </div>

                        {results.results.map((res, idx) => (
                            <div key={idx} style={{ position: 'relative', paddingLeft: '2rem' }}>
                                {/* Connector Line */}
                                {idx < results.results.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '11px',
                                        top: '30px',
                                        bottom: '-20px',
                                        width: '2px',
                                        background: 'linear-gradient(to bottom, var(--accent-color), rgba(59, 130, 246, 0.2))',
                                        boxShadow: '0 0 8px var(--accent-color)'
                                    }} />
                                )}

                                <div style={{
                                    position: 'absolute',
                                    left: '0',
                                    top: '4px',
                                    width: '24px',
                                    height: '24px',
                                    background: 'var(--accent-color)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    zIndex: 1
                                }}>{idx + 1}</div>

                                <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>
                                    {STEP_OPTIONS.find(o => o.value === res.step)?.label || res.step}
                                </h4>
                                <div style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    {res.output}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Builder;
