import React, { useState, useEffect } from 'react';

const QuizTimer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Add warning colors as time gets low
  const getTimerColor = () => {
    if (timeLeft < 60) return 'text-red-600'; // Less than 1 minute
    if (timeLeft < 300) return 'text-orange-500'; // Less than 5 minutes
    return 'text-gray-700';
  };
  
  return (
    <div className={`font-mono text-xl font-bold ${getTimerColor()}`}>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default QuizTimer;