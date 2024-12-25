'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Initialize without creating the audio instance
let audioInstance: HTMLAudioElement | null = null;

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showTime, setShowTime] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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

  const togglePlay = useCallback(() => {
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
  }, [isPlaying, isLoaded, initializeAudio]);

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

  if (!isMounted) return null;

  return (
    <div 
      className="fixed bottom-8 right-8 z-50"
    >
      <div className="flex items-center gap-4">
        {/* Text Label */}
        <span className="text-[#FFD700] text-base sm:text-lg font-syne">Our Short Story</span>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="group flex items-center space-x-3"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#FFD700] rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="w-10 h-10 text-[#FFD700] group-hover:scale-105 transition-transform">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                  </svg>
                )}
              </div>
            </div>
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
