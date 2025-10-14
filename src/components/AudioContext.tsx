'use client';

import { createContext, useContext, useState } from 'react';

type AudioPlaybackContextValue = {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
};

const AudioPlaybackContext = createContext<AudioPlaybackContextValue | undefined>(undefined);

export function AudioPlaybackProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <AudioPlaybackContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </AudioPlaybackContext.Provider>
  );
}

export function useAudioPlayback() {
  const ctx = useContext(AudioPlaybackContext);
  if (!ctx) {
    throw new Error('useAudioPlayback must be used within an AudioPlaybackProvider');
  }
  return ctx;
}