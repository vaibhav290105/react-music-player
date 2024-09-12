import React from 'react';

const ProgressBar = ({ currentTime, duration, onTimeUpdate }) => {
  return (
    <div className="progress-bar">
      <span className="current-duration">{currentTime}</span>
      <input
        type="range"
        className="progress"
        min="0"
        max={duration}
        value={currentTime}
        onChange={onTimeUpdate}
      />
      <span className="total-duration">{duration}</span>
    </div>
  );
};

export default ProgressBar;
