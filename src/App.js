import React, { useState, useRef, useEffect } from 'react';
import SongDetails from './components/SongDetails';
import PlayerControls from './components/PlayerControls';
import ProgressBar from './components/ProgressBar';
import './components/styles.css'; // Include CSS for styling

const App = () => {
  const songs = [
    {
      name: 'Beaver Creek',
      artists: 'Aso, Middle School, Aviino',
      cover: 'https://cdn.shoplightspeed.com/shops/641342/files/52324823/image.jpg',
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=10075',
    },
    {
      name: 'Daylight',
      artists: 'Aiguille',
      cover: 'https://cdn.prod.website-files.com/600764b039279f159ae570ef/6439e3e24aaeb7a8f72dd3cd_David%20Kushner%20Daylight%20Sheesh%20Media.jpeg',
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=9283',
    },
    {
      name: 'Reflection',
      artists: 'Swørn',
      cover: 'https://i.scdn.co/image/ab67616d0000b27342b43a6acbb2120313596524',
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=9228',
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song index
  const [currentSong, setCurrentSong] = useState(songs[0]); // Current song info
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Track the current time of the song
  const [duration, setDuration] = useState(0); // Track the total duration of the song
  const [isLocal, setIsLocal] = useState(false); // Track whether it's a local file
  const audioRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const audioURL = e.target.result;
        setCurrentSong({
          name: file.name, // Set file name as song name
          artists: 'Local File',
          cover: 'https://via.placeholder.com/150', // Default cover image for local files
          audio: audioURL,
        });

        setIsLocal(true); // Mark as a local file
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = audioURL;
          audioRef.current.load();
          audioRef.current.addEventListener('loadeddata', () => {
            audioRef.current.play();
            setIsPlaying(true);
          });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Play or pause the song
  const playSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Skip forward to the next song in the predefined list
  const skipForward = () => {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsLocal(false); // Switching back to predefined songs
    setCurrentSong(songs[nextIndex]);
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].audio;
      audioRef.current.load();
      audioRef.current.addEventListener('loadeddata', () => {
        audioRef.current.play();
        setIsPlaying(true);
      });
    }
  };

  // Skip backward to the previous song in the predefined list
  const skipBackward = () => {
    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsLocal(false); // Switching back to predefined songs
    setCurrentSong(songs[prevIndex]);
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].audio;
      audioRef.current.load();
      audioRef.current.addEventListener('loadeddata', () => {
        audioRef.current.play();
        setIsPlaying(true);
      });
    }
  };

  // Update current time and duration
  const onTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setCurrentTime(current);
    setDuration(total);
  };

  // Ensure the time updates as the song plays
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', onTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', onTimeUpdate);
      };
    }
  }, []);

  return (
    <div className="App">
      <h1>React Music Player</h1>
      <SongDetails song={currentSong} />
      <PlayerControls
        isPlaying={isPlaying}
        playSong={playSong}
        skipForward={skipForward}
        skipBackward={skipBackward}
      />
      <ProgressBar
        currentTime={currentTime} 
        duration={duration} 
        onTimeUpdate={onTimeUpdate}
      />

      {/* File input for browsing local files */}
      <div className="file-input">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />
      </div>

      <audio ref={audioRef} src={isLocal ? currentSong.audio : currentSong.audio}></audio>
    </div>
  );
};

export default App;
