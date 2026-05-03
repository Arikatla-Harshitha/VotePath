import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export const Navigation: React.FC = () => {
  return (
    <nav className="navigation" aria-label="Main Navigation">
      <div className="nav-brand">
        <NavLink to="/">Election Guide</NavLink>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Steps</NavLink></li>
        <li><NavLink to="/quiz" className={({ isActive }) => isActive ? 'active' : ''}>Quiz</NavLink></li>
        <li><NavLink to="/glossary" className={({ isActive }) => isActive ? 'active' : ''}>Glossary</NavLink></li>
        <li><NavLink to="/chat" className={({ isActive }) => isActive ? 'active' : ''}>AI Chat</NavLink></li>
        <li><NavLink to="/polling" className={({ isActive }) => isActive ? 'active' : ''}>Polling Stations</NavLink></li>
      </ul>
    </nav>
  );
};
