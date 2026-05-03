import React, { useState } from 'react';
import { Card } from './Card';
import './VotingPlanBuilder.css';

export const VotingPlanBuilder: React.FC = () => {
  const [method, setMethod] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const isComplete = method !== '' && time !== '' && location.trim() !== '';

  return (
    <Card className="voting-plan-card">
      <h2 className="mb-4">My Voting Plan</h2>
      <p className="mb-8 text-muted">Voters who make a specific plan are significantly more likely to cast their ballot. Build your plan below.</p>

      <div className="plan-form">
        <div className="plan-step">
          <label htmlFor="method" className="plan-label">1. How will you vote?</label>
          <select 
            id="method" 
            className="plan-select"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="" disabled>Select a method...</option>
            <option value="in person on Election Day">In person on Election Day</option>
            <option value="early in person">Early in person</option>
            <option value="by mail">By mail</option>
            <option value="via drop box">Via secure drop box</option>
          </select>
        </div>

        <div className="plan-step">
          <label htmlFor="time" className="plan-label">2. When will you vote?</label>
          <select 
            id="time" 
            className="plan-select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="" disabled>Select a time...</option>
            <option value="in the morning before work">Morning (before work)</option>
            <option value="during my lunch break">Lunch break</option>
            <option value="in the afternoon">Afternoon</option>
            <option value="in the evening after work">Evening (after work)</option>
            <option value="on my day off">On my day off</option>
          </select>
        </div>

        <div className="plan-step">
          <label htmlFor="location" className="plan-label">3. Where are you voting / dropping your ballot?</label>
          <input 
            type="text" 
            id="location"
            className="plan-input" 
            placeholder="e.g., Local Library, Main Post Office..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {isComplete && (
        <div className="plan-summary animate-fade-in">
          <h3>Your Commitment</h3>
          <p className="plan-summary-text">
            I am committed to voting <span className="highlight">{method}</span>. 
            I will cast my ballot <span className="highlight">{time}</span> at <span className="highlight">{location}</span>.
          </p>
        </div>
      )}
    </Card>
  );
};
