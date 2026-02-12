
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { History as HistoryIcon, Clock, AlertTriangle } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get('/api/workflow/history');
                setHistory(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch history. Ensure backend is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return (
        <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p>Loading run history...</p>
        </div>
    );

    if (error) return (
        <div className="container" style={{ textAlign: 'center', marginTop: '4rem', color: '#ef4444' }}>
            <AlertTriangle size={48} style={{ marginBottom: '1rem' }} />
            <p>{error}</p>
        </div>
    );

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <HistoryIcon size={32} /> Recent Runs
            </h2>

            {history.length === 0 ? (
                <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No runs recorded yet. Start a workflow in the Builder!
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {history.map((run) => (
                        <div key={run.id} className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'var(--accent-color)',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem'
                                    }}>
                                        ID: {run.id.slice(-6)}
                                    </span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Clock size={14} /> {new Date(run.date).toLocaleString()}
                                    </span>
                                </div>
                                <span style={{
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    color: '#34d399',
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontWeight: '600'
                                }}>
                                    Success
                                </span>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                    INPUT:
                                </strong>
                                <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>"{run.originalInput}"</p>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {run.results.map((res, i) => (
                                    <span key={i} style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        border: '1px solid var(--glass-border)'
                                    }}>
                                        {i + 1}. {res.step}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
