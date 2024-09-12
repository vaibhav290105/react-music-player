import React from 'react';

const PlayerControls = ({ isPlaying, playSong, skipForward, skipBackward }) => {
  return (
    <div className="player-container">
      <button className="skip-back" onClick={skipBackward}>⏮</button>
      <button className="play" onClick={playSong}>
        {isPlaying ? '⏸' : '▶'}
      </button>
      <button className="skip-forward" onClick={skipForward}>⏭</button>
    </div>
  );
};

export default PlayerControls;
