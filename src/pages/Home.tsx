import React from 'react';
import { Card } from '../components/Card';
import { CountdownTimer } from '../components/CountdownTimer';
import { StateRules } from '../components/StateRules';
import { VotingPlanBuilder } from '../components/VotingPlanBuilder';
import './Home.css';

const steps = [
  {
    id: 1,
    title: 'Registration',
    description: 'Ensure you are registered to vote before the deadline. Check your local state requirements for ID and residency. If you moved recently, update your voter registration. You can usually check your registration status online.',
    icon: '📝'
  },
  {
    id: 2,
    title: 'Research Candidates & Measures',
    description: 'Learn about the candidates and ballot measures. Look beyond the top of the ticket. Local elections for city council or school board often have a more direct impact on your daily life. Make informed decisions based on what matters to you.',
    icon: '🔍'
  },
  {
    id: 3,
    title: 'Choose How to Vote',
    description: 'Decide if you will vote in-person on Election Day, vote early in-person, or vote by mail. If voting by mail, request your ballot early and follow all instructions carefully, especially signature requirements.',
    icon: '📫'
  },
  {
    id: 4,
    title: 'Find Polling Station or Drop Box',
    description: 'Locate your designated polling station or an official ballot drop box. Check the opening and closing hours to plan your visit. Your polling place might have changed since the last election.',
    icon: '📍'
  },
  {
    id: 5,
    title: 'Vote!',
    description: 'Go to your polling station on election day, or mail/drop off your ballot. Remember to bring any required ID. If you are in line when polls close, stay in line—you have the right to vote.',
    icon: '🗳️'
  }
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header text-center mb-8">
        <h1>Welcome to the Election Guide</h1>
        <p className="subtitle">Your step-by-step guide to participating in democracy.</p>
      </header>
      
      <CountdownTimer />
      
      <div className="steps-timeline">
        {steps.map((step) => (
          <Card key={step.id} className="step-card">
            <div className="step-icon" aria-hidden="true">{step.icon}</div>
            <div className="step-content">
              <h3>Step {step.id}: {step.title}</h3>
              <p>{step.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <StateRules />
      <VotingPlanBuilder />
    </div>
  );
};

export default Home;
