import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import './CountdownTimer.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  // Target date: Next major US Election - Nov 3, 2026
  const targetDate = new Date('2026-11-03T00:00:00');

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const padWithZero = (num: number) => {
    return String(num).padStart(2, '0');
  };

  return (
    <Card className="countdown-card text-center">
      <h2 className="countdown-title">Countdown to Election Day</h2>
      <div className="countdown-grid">
        <div className="time-box">
          <span className="time-value">{padWithZero(timeLeft.days)}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-box">
          <span className="time-value">{padWithZero(timeLeft.hours)}</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-box">
          <span className="time-value">{padWithZero(timeLeft.minutes)}</span>
          <span className="time-label">Mins</span>
        </div>
        <div className="time-box">
          <span className="time-value">{padWithZero(timeLeft.seconds)}</span>
          <span className="time-label">Secs</span>
        </div>
      </div>
    </Card>
  );
};
