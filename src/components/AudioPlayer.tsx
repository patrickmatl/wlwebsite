'use client';

import { useState, useEffect, useRef } from 'react';
import { useAudioPlayback } from './AudioContext';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { setIsPlaying: setGlobalPlaying } = useAudioPlayback();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const remaining = audio.duration - audio.currentTime;
      const minutes = Math.floor(remaining / 60);
      const seconds = Math.floor(remaining % 60);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setGlobalPlaying(false);
      if (audio) {
        audio.currentTime = 0;
      }
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setError('Failed to load audio');
    };

    const handleCanPlay = () => {
      setError(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [setGlobalPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setGlobalPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
        setGlobalPlaying(true);
        setError(null);
      }
    } catch (err) {
      console.error('Playback error:', err);
      setError('Failed to play audio');
      setGlobalPlaying(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed right-4 z-[60] bottom-24 md:bottom-4">
      <audio
        ref={audioRef}
        preload="metadata"
        src={'/audio/Website-Intro.mp3'}
        suppressHydrationWarning
      />
      {error ? (
        <div className="text-red-400 text-sm flex items-center space-x-2">
          <span className="material-icons text-sm">error_outline</span>
          <span>{error}</span>
        </div>
      ) : (
        <button
          onClick={togglePlay}
          className="flex items-center space-x-3 text-white/80 group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFD700] text-black transition-all duration-300 hover:scale-110">
            <span className="material-icons text-xl select-none">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </div>
          <div className="flex flex-col items-start group-hover:text-[#FFD700] transition-colors duration-300">
            <span className="text-sm font-medium">Experience Our Story</span>
            {timeRemaining && (
              <span className="text-xs text-white/60 group-hover:text-[#FFD700]/60">{timeRemaining}</span>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
