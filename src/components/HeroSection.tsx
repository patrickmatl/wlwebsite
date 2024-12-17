import { memo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import Image from 'next/image';
import RotatingText from './RotatingText';

interface HeroSectionProps {
  itemScope?: boolean;
  itemType?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const HeroSection = ({ 
  itemScope,
  itemType,
  seoTitle = 'Design',
  seoDescription = 'Creating digital experiences that push boundaries and define trends'
}: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/audio/Website Intro.mp3') : null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [_mounted, setMounted] = useState(false);

  // Array of hero images with correct .webp extension
  const heroImages = Array.from({ length: 13 }, (_, i) => `/images/hero/hero${i + 1}.webp`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        audio.currentTime = 0;
      });

      audio.volume = volume;
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('timeupdate', () => {});
        audio.removeEventListener('ended', () => {});
      }
    };
  }, [audio, volume]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audio && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const newTime = (percentage / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress(percentage);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audio) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        audio.volume = 0;
        setVolume(0);
      } else {
        audio.volume = 0.5;
        setVolume(0.5);
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center bg-gradient-to-br from-black to-neutral-900"
      {...(itemScope ? { itemScope: true } : {})}
      {...(itemType ? { itemType } : {})}
    >
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
        
        {/* Pulsing rings around the center orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[150, 200, 250].map((size, index) => (
            <div
              key={size}
              className="pulse-ring"
              style={{
                width: size,
                height: size,
                animationDelay: `${index * 1.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Hero background ${index + 1}`}
            fill
            sizes="100vw"
            className={`
              object-cover object-center transition-opacity duration-1000
              hero-image-animate ${currentImageIndex === index ? 'opacity-95 active' : 'opacity-0'}
            `}
            priority={index === 0}
            quality={90}
          />
        ))}
      </div>

      {/* Polka dot overlay */}
      <div className="absolute inset-0 bg-polka mix-blend-multiply" />

      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Decorative corner frames */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-500 opacity-50" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-gold-500 opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start space-y-8">
          {/* Location tag */}
          <div className="flex items-center space-x-4 text-gold-500">
            <div className="w-8 h-px bg-gold-500" />
            <span className="font-space-grotesk uppercase tracking-[0.2em] text-sm">Pretoria, SA</span>
            <div className="w-8 h-px bg-gold-500" />
          </div>

          {/* Main headline */}
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-syne font-black text-white leading-none" itemProp="name">
              {seoTitle}
              <br />
              <RotatingText />
            </h1>
            <p className="font-space-grotesk text-lg md:text-xl text-neutral-200 max-w-xl leading-relaxed" itemProp="description">
              {seoDescription}
            </p>
          </div>

          {/* Audio Player */}
          <div className="mt-2">
            {!isPlaying ? (
              <button
                onClick={togglePlay}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group flex flex-col items-center"
              >
                {/* Main play button */}
                <div className={`
                  relative w-16 h-16 flex items-center justify-center
                  bg-gold-500/10 rounded-full backdrop-blur-sm
                  transform transition-all duration-500
                  ${isHovered ? 'scale-110' : 'scale-100'}
                  animate-pulse-gold
                `}>
                  <FaPlay className={`
                    w-6 h-6 text-gold-500 ml-2
                    transform transition-all duration-500
                    ${isHovered ? 'scale-110' : 'scale-100'}
                  `} />
                </div>

                {/* Radiating circles */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 rounded-full bg-white/5 animate-radiate" style={{ animationDelay: '0s' }} />
                  <div className="absolute inset-0 rounded-full bg-white/5 animate-radiate" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-0 rounded-full bg-white/5 animate-radiate" style={{ animationDelay: '1s' }} />
                </div>

                {/* Label */}
                <div className={`
                  mt-4 font-space-grotesk text-sm
                  transform transition-all duration-500
                  ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-1'}
                `}>
                  <span className="text-gold-500">Listen to Our Story</span>
                  <div className={`
                    h-px bg-gold-500/30 mt-1 transition-all duration-500
                    ${isHovered ? 'w-full' : 'w-0'}
                  `} />
                </div>
              </button>
            ) : (
              <div className="space-y-4 max-w-md backdrop-blur-sm bg-black/20 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={togglePlay}
                    className="w-10 h-10 flex items-center justify-center bg-gold-500/10 rounded-full hover:bg-gold-500/20 transition-colors"
                  >
                    <FaPause className="w-4 h-4 text-gold-500" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button onClick={toggleMute} className="text-gold-500 hover:text-gold-400">
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-gold-500"
                    />
                  </div>
                </div>

                <div 
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="h-1 bg-white/10 rounded-full cursor-pointer"
                >
                  <div 
                    className="h-full bg-gold-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-white text-sm font-medium">
                  {formatTime(duration - currentTime)}
                </span>
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link 
              href="/packages" 
              className="px-8 py-3 bg-gold-500 text-black font-syne font-bold transform -skew-x-12 hover:skew-x-0 transition-all duration-300"
            >
              View Pricing
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border border-gold-500/50 text-gold-500 font-syne font-bold transform -skew-x-12 hover:skew-x-0 transition-all duration-300 hover:border-gold-500 relative group"
            >
              <span className="relative z-10">Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 rounded-full
              ${isPlaying ? 'animate-float-fast' : 'animate-float'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: isPlaying ? 'rgba(255,255,255,0.3)' : 'rgba(255,215,0,0.3)',
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(HeroSection);
