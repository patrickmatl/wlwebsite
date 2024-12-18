'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface AudioPlayerProps {
  audioSource: {
    mp3: string;
  };
  onPlayStateChange?: (isPlaying: boolean) => void;
  customButton?: React.ReactNode;
}

const AudioPlayer = ({ audioSource, onPlayStateChange, customButton }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSource.mp3);
    audioRef.current.preload = 'metadata';

    const audio = audioRef.current;

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleError = () => {
      setError('Error loading audio');
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioSource.mp3]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
    onPlayStateChange?.(!isPlaying);
  }, [isPlaying, onPlayStateChange]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading audio...</div>;
  }

  return (
    <div onClick={togglePlay} className="cursor-pointer">
      {customButton || (
        <button
          className="flex items-center gap-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
          <span className="text-sm">Play Audio</span>
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
