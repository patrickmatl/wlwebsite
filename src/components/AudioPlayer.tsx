'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface AudioPlayerProps {
  audioUrl: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const AudioPlayer = ({ audioUrl, onPlayStateChange }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';
    audioRef.current.src = audioUrl;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;

    const handleEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsLoading(true);
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayStateChange?.(!isPlaying);
      setError(null);
    } catch (err) {
      console.error('Playback error:', err);
      setError('Error playing audio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const renderPlayButton = (size: 'large' | 'small') => {
    const isLarge = size === 'large';
    const buttonClass = isLarge
      ? "relative group flex flex-col items-center"
      : "w-10 h-10 flex items-center justify-center bg-gold-500/10 rounded-full hover:bg-gold-500/20 transition-colors";
    
    const iconContainerClass = isLarge
      ? `relative w-16 h-16 flex items-center justify-center bg-gold-500/10 rounded-full backdrop-blur-sm transform transition-all duration-500 ${isLoading ? 'opacity-50' : 'group-hover:scale-110'} animate-pulse-gold`
      : "";

    const iconClass = isLarge
      ? "w-6 h-6 text-gold-500 ml-2"
      : "w-4 h-4 text-gold-500 ml-1";

    const spinnerClass = isLarge
      ? "w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"
      : "w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin";

    return (
      <button
        onClick={togglePlayPause}
        className={buttonClass}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        disabled={isLoading}
      >
        {isLarge ? (
          <div className={iconContainerClass}>
            {isLoading ? (
              <div className={spinnerClass} />
            ) : (
              <FaPlay className={iconClass} />
            )}
          </div>
        ) : (
          isLoading ? (
            <div className={spinnerClass} />
          ) : (
            isPlaying ? <FaPause className={iconClass} /> : <FaPlay className={iconClass} />
          )
        )}
        {isLarge && (
          <>
            {/* Glowing rings */}
            <div className="absolute -inset-4 rounded-full bg-gold-500/20 blur-lg animate-pulse-slow" />
            <div className="absolute -inset-8 rounded-full bg-gold-500/10 blur-xl animate-pulse-slower" />
          </>
        )}
      </button>
    );
  };

  if (!isPlaying) {
    return renderPlayButton('large');
  }

  return (
    <div className="space-y-4 max-w-md backdrop-blur-sm bg-black/20 p-4 rounded-lg">
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      <div className="flex items-center space-x-4">
        {renderPlayButton('small')}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleToggleMute}
            className="text-gold-500 hover:text-gold-400"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-gold-500"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
