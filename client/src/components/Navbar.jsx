
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Play, List, Home, Server } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar container">
            <Link to="/" className="nav-brand">
                <Activity size={28} color="#3b82f6" />
                <span>WorkflowLite</span>
            </Link>
            <div className="nav-links">
                <Link to="/" className={`nav-link ${isActive('/')}`}>
                    <Home size={18} /> Home
                </Link>
                <Link to="/builder" className={`nav-link ${isActive('/builder')}`}>
                    <Play size={18} /> Build & Run
                </Link>
                <Link to="/history" className={`nav-link ${isActive('/history')}`}>
                    <List size={18} /> History
                </Link>
                <Link to="/status" className={`nav-link ${isActive('/status')}`}>
                    <Server size={18} /> Status
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
