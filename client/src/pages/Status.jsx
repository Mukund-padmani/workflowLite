import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Server, Database, Brain, RefreshCcw, Activity } from 'lucide-react';

const Status = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkStatus = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/status');
            setStatus(res.data);
        } catch (err) {
            setStatus({
                backend: 'Error (Offline)',
                database: 'Unknown',
                llm: 'Unknown'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const getStatusColor = (val) => {
        if (!val) return 'gray';
        if (val.toLowerCase().includes('healthy') || val.toLowerCase().includes('connected')) return '#10b981';
        if (val.toLowerCase().includes('error') || val.toLowerCase().includes('offline')) return '#ef4444';
        return '#f59e0b';
    };

    return (
        <div className="container" style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>System Health</h2>
                <button onClick={checkStatus} className="btn btn-secondary">
                    <RefreshCcw size={18} className={loading ? 'spin' : ''} /> Refresh
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {/* Backend Status */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'rgba(59, 130, 246, 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Server size={32} color="#3b82f6" />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Backend API</h4>
                        <span style={{
                            color: getStatusColor(status?.backend),
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}>
                            {status?.backend || 'Checking...'}
                        </span>
                    </div>
                </div>

                {/* Database Status */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Database size={32} color="#10b981" />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Database</h4>
                        <span style={{
                            color: getStatusColor(status?.database),
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}>
                            {status?.database || 'Checking...'}
                        </span>
                    </div>
                </div>

                {/* LLM Status */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'rgba(236, 72, 153, 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Brain size={32} color="#ec4899" />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>LLM Service</h4>
                        <span style={{
                            color: getStatusColor(status?.llm),
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}>
                            {status?.llm || 'Checking...'}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Last Updated: {status?.timestamp ? new Date(status.timestamp).toLocaleTimeString() : '-'}
            </div>

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default Status;
