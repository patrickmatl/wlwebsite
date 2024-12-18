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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = audioSource.mp3;
    audioRef.current = audio;

    const handleCanPlayThrough = () => {
      console.log('Audio can play through');
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      console.log('Audio loading started');
      setIsLoading(true);
    };

    const handleError = (e: ErrorEvent) => {
      console.error('Audio error:', e);
      setError('Error loading audio');
      setIsLoading(false);
    };

    const handleEnded = () => {
      console.log('Audio playback ended');
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    // Start loading the audio
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [audioSource.mp3, onPlayStateChange]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
      onPlayStateChange?.(!isPlaying);
    } catch (error) {
      console.error('Playback error:', error);
      setError('Failed to play audio');
    }
  }, [isPlaying, onPlayStateChange]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div 
      onClick={togglePlay} 
      className="cursor-pointer z-50 relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePlay();
        }
      }}
    >
      {customButton || (
        <button
          className="flex items-center gap-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#FFD700] border-t-transparent" />
          ) : (
            isPlaying ? <FaPause /> : <FaPlay />
          )}
          <span className="text-sm">
            {isLoading ? 'Loading...' : 'Play Audio'}
          </span>
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
