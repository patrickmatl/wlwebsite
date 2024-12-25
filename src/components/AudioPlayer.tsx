'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showTime, setShowTime] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/Website-Intro.mp3');
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const updateTimeRemaining = useCallback(() => {
    if (!audioRef.current) return;
    const remaining = audioRef.current.duration - audioRef.current.currentTime;
    setTimeRemaining(formatTime(remaining));
  }, [audioRef]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setShowTime(false);
    } else {
      audioRef.current.play();
      setShowTime(true);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    const handleEnded = () => {
      setIsPlaying(false);
      setShowTime(false);
    };

    const handleTimeUpdate = () => {
      updateTimeRemaining();
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [updateTimeRemaining]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-end gap-2">
        {/* Text Label */}
        <span className="text-xs text-gold-light/80 tracking-wider">
          Our Short Story
        </span>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={toggleAudio}
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
