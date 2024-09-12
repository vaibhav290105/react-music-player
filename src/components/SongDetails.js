import React from 'react';

const SongDetails = ({ song }) => {
  return (
    <div className="song-container">
      <img src={song.cover} alt={song.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
      <h2>{song.name}</h2>
      <h3>{song.artists}</h3>
    </div>
  );
};

export default SongDetails;
