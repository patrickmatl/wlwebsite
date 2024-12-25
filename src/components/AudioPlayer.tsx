'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

// Initialize without creating the audio instance
let audioInstance: HTMLAudioElement | null = null;

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showTime, setShowTime] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  // Function to initialize audio
  const initializeAudio = useCallback(() => {
    if (!hasInteracted.current && typeof window !== 'undefined') {
      audioInstance = new Audio('/audio/Website-Intro.mp3');
      audioRef.current = audioInstance;
      hasInteracted.current = true;
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Add mousemove listener
    const handleMouseMove = () => {
      if (!hasInteracted.current) {
        initializeAudio();
        // Remove listener after first interaction
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [initializeAudio]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const updateTimeRemaining = useCallback(() => {
    if (!audioRef.current) return;
    const timeLeft = audioRef.current.duration - audioRef.current.currentTime;
    setTimeRemaining(formatTime(timeLeft));
  }, []);

  const togglePlay = () => {
    if (!isLoaded) {
      initializeAudio();
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      // Dispatch custom event for audio state change
      window.dispatchEvent(new CustomEvent('audioStateChange', { 
        detail: { isPlaying: false }
      }));
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      // Dispatch custom event for audio state change
      window.dispatchEvent(new CustomEvent('audioStateChange', { 
        detail: { isPlaying: true }
      }));
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      updateTimeRemaining();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // Dispatch custom event for audio state change
      window.dispatchEvent(new CustomEvent('audioStateChange', { 
        detail: { isPlaying: false }
      }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [updateTimeRemaining]);

  return (
    <div 
      className="fixed bottom-8 right-8 z-50"
    >
      <div className="flex items-center gap-4">
        {/* Text Label */}
        <span className="text-sm text-gold-light/80 tracking-wider">
          Our Short Story
        </span>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full border-2 border-gold-light/30 bg-black/80 backdrop-blur-sm flex items-center justify-center hover:border-gold-light/50 transition-all duration-300 group"
            aria-label={isPlaying ? 'Pause Story' : 'Play Story'}
          >
            {isPlaying ? (
              <FaPause className="text-gold-light/80 group-hover:text-gold-light text-sm" />
            ) : (
              <FaPlay className="text-gold-light/80 group-hover:text-gold-light text-sm ml-0.5" />
            )}
          </button>

          {/* Time Display */}
          {showTime && (
            <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gold-light/20">
              <span className="text-xs text-gold-light/80 font-medium tracking-wider">
                {timeRemaining}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
