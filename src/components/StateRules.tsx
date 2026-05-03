import React, { useState } from 'react';
import { Card } from './Card';
import './StateRules.css';

type StateData = {
  idRequired: string;
  earlyVoting: string;
  mailIn: string;
  registrationDeadline: string;
};

const stateDatabase: Record<string, StateData> = {
  'CA': {
    idRequired: 'No (in most cases)',
    earlyVoting: 'Yes (up to 29 days before)',
    mailIn: 'All voters receive a ballot by mail',
    registrationDeadline: '15 days before election'
  },
  'TX': {
    idRequired: 'Yes (Strict Photo ID)',
    earlyVoting: 'Yes (starts 17 days before)',
    mailIn: 'Requires excuse (e.g., 65+, out of county)',
    registrationDeadline: '30 days before election'
  },
  'NY': {
    idRequired: 'No (unless first-time voter)',
    earlyVoting: 'Yes (starts 10 days before)',
    mailIn: 'Requires excuse (e.g., illness, away)',
    registrationDeadline: '10 days before election'
  },
  'FL': {
    idRequired: 'Yes (Photo ID + Signature)',
    earlyVoting: 'Yes (varies by county)',
    mailIn: 'No excuse required',
    registrationDeadline: '29 days before election'
  }
};

export const StateRules: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');

  const rules = selectedState ? stateDatabase[selectedState] : null;

  return (
    <Card className="state-rules-card">
      <h2 className="mb-4">State-Specific Voting Rules</h2>
      <p className="mb-4 text-muted">Voting rules vary. Select a state below to see key requirements (Demo: CA, TX, NY, FL).</p>
      
      <select 
        className="state-selector"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        aria-label="Select your state"
      >
        <option value="" disabled>Select your state...</option>
        <option value="CA">California</option>
        <option value="FL">Florida</option>
        <option value="NY">New York</option>
        <option value="TX">Texas</option>
      </select>

      {rules && (
        <div className="rules-grid">
          <div className="rule-item">
            <span className="rule-label">Voter ID Required?</span>
            <span className="rule-value">{rules.idRequired}</span>
          </div>
          <div className="rule-item">
            <span className="rule-label">Early Voting</span>
            <span className="rule-value">{rules.earlyVoting}</span>
          </div>
          <div className="rule-item">
            <span className="rule-label">Mail-in Voting</span>
            <span className="rule-value">{rules.mailIn}</span>
          </div>
          <div className="rule-item">
            <span className="rule-label">Reg. Deadline</span>
            <span className="rule-value">{rules.registrationDeadline}</span>
          </div>
        </div>
      )}
    </Card>
  );
};
