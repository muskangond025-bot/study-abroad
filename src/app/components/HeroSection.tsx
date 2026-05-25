import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import gsap from 'gsap';
import heroBg from '@/assets/eduglobal_hero_bg.png';
import entranceBg from '@/assets/eduglobal_campus_entrance.png';
import lobbyBg from '@/assets/eduglobal_campus_lobby.png';
import studyingBg from '@/assets/eduglobal_campus_studying.png';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);

  // Motion values for tracking mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth, organic movement
  const springX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22 });

  // Map coordinates to 3D rotation and translation effects
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isLoaded) return;
    
    // Trigger smoke effect every 15 seconds
    const interval = setInterval(() => {
      setIsSmoking(true);
      
      // Let it stay dissolved for 4.5 seconds, then reform
      const reformTimeout = setTimeout(() => {
        setIsSmoking(false);
      }, 4500);
      
      return () => clearTimeout(reformTimeout);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [isLoaded]);
  
  const headline = "Your Global Future Awaits";
  const words = headline.split(' ');
  
  const headlineWords = [
    { word: "Your", letters: ["Y", "o", "u", "r"] },
    { word: "Global", letters: ["G", "l", { type: "globe" }, "b", "a", "l"] },
    { word: "Future", letters: ["F", "u", "t", "u", "r", "e"] },
    { word: "Awaits", letters: ["A", "w", "a", "i", "t", "s"] }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const loadingLetters = container.querySelectorAll('.elite__letter');
    const box = container.querySelector('.elite-loader__box');
    const growingImage = container.querySelector('.elite__growing-image');
    const headingStart = container.querySelector('.elite__h1-start');
    const headingEnd = container.querySelector('.elite__h1-end');
    const coverImageExtra = container.querySelectorAll('.elite__cover-image-extra');
    const heroContent = container.querySelector('.elite-hero__content');
    const loader = container.querySelector('.elite-loader');

    // Remove hidden class
    container.classList.remove('is--hidden');

    // GSAP Timeline
    const tl = gsap.timeline({
      defaults: {
        ease: 'expo.inOut',
      },
      onComplete: () => {
        setIsLoaded(true);
        if (loader) {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              (loader as HTMLElement).style.display = 'none';
            }
          });
        }
        if (heroContent) {
          heroContent.classList.add('is--visible');
        }
      }
    });

    // Animate loading letters (ELI + TE PATHWAYS)
    if (loadingLetters.length) {
      tl.from(loadingLetters, {
        yPercent: 100,
        stagger: 0.025,
        duration: 1.25
      });
    }

    // Expand the box
    if (box) {
      tl.fromTo(box, 
        { width: '0em' },
        { width: '1em', duration: 1.25 },
        '< 1.25'
      );
    }

    // Grow the image container
    if (growingImage) {
      tl.fromTo(growingImage,
        { width: '0%' },
        { width: '100%', duration: 1.25 },
        '<'
      );
    }

    // Push letters apart
    if (headingStart) {
      tl.fromTo(headingStart,
        { x: '0em' },
        { x: '-0.05em', duration: 1.25 },
        '<'
      );
    }

    if (headingEnd) {
      tl.fromTo(headingEnd,
        { x: '0em' },
        { x: '0.05em', duration: 1.25 },
        '<'
      );
    }

    // Fade out extra images
    if (coverImageExtra.length) {
      tl.fromTo(coverImageExtra,
        { opacity: 1 },
        { opacity: 0, duration: 0.05, ease: 'none', stagger: 0.5 },
        '-=0.05'
      );
    }

    // Expand to full screen
    if (growingImage) {
      tl.to(growingImage, {
        width: '100vw',
        height: '100vh',
        duration: 2
      }, '< 1.25');
    }

    if (box) {
      tl.to(box, {
        width: '110vw',
        duration: 2
      }, '<');
    }

  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className={`elite-hero ${!isLoaded ? 'is--loading' : ''} relative w-full overflow-hidden`}>
        {/* Loader Overlay */}
        <div ref={loaderRef} className="elite-loader">
          <div className="elite__h1">
            {/* EDU */}
            <div className="elite__h1-start">
              <span className="elite__letter">E</span>
              <span className="elite__letter">D</span>
              <span className="elite__letter">U</span>
            </div>

            {/* Growing Image Box */}
            <div className="elite-loader__box">
              <div className="elite-loader__box-inner">
                <div className="elite__growing-image">
                  <div className="elite__growing-image-wrap">
                    {/* Multiple Images that fade in sequence */}
                    <img 
                      className="elite__cover-image-extra is--1" 
                      src={entranceBg}
                      alt="Entering Campus"
                      loading="eager"
                    />
                    <img 
                      className="elite__cover-image-extra is--2" 
                      src={lobbyBg}
                      alt="Lobby Interaction"
                      loading="eager"
                    />
                    <img 
                      className="elite__cover-image-extra is--3" 
                      src={studyingBg}
                      alt="Studying Campus"
                      loading="eager"
                    />
                    {/* Main background video */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={heroBg}
                      className="elite__cover-image"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    >
                      <source src="/study-abroad/video2.mp4" type="video/mp4" />
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-campus-45357-large.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>

            {/* GLOBAL */}
            <div className="elite__h1-end">
              <span className="elite__letter" style={{ marginLeft: '0.15em' }}>G</span>
              <span className="elite__letter">L</span>
              <span className="elite__letter" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="rotating-globe" style={{ fontSize: '0.82em', transform: 'none' }}></span>
              </span>
              <span className="elite__letter">B</span>
              <span className="elite__letter">A</span>
              <span className="elite__letter">L</span>
            </div>
          </div>
        </div>

        {/* Main Hero Content (shows after loading) */}
        <div className="elite-hero__content">
          {/* 3D Perspective Parallax Wrapper */}
          <div className="absolute inset-0 overflow-hidden z-0" style={{ perspective: '1200px' }}>
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                scale: 1.1,
                rotateX: rotateX,
                rotateY: rotateY,
                x: translateX,
                y: translateY,
                transformStyle: 'preserve-3d',
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={heroBg}
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{ filter: 'saturate(0.95)' }}
              >
                <source src="/study-abroad/video2.mp4" type="video/mp4" />
                <source src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-campus-45357-large.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>

          {/* Welcome & CTA Panel */}
          <div className="relative z-20 max-w-6xl w-full mx-auto px-4 pb-0 mb-0 text-center flex flex-col justify-center items-center">
            {/* Headline - Word by Word Reveal */}
            <h1 className="text-5xl md:text-7xl mb-6 text-white font-bold premium-3d-text flex flex-wrap justify-center items-center gap-x-4 gap-y-2 w-full">
              {(() => {
                let globalCharCount = 0;
                return headlineWords.map((wordData, wordIdx) => (
                  <motion.span
                    key={wordIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{
                      duration: 0.5,
                      delay: wordIdx * 0.15,
                      ease: [0.25, 0.4, 0.25, 1]
                    }}
                    className="inline-flex items-center"
                  >
                    {wordData.letters.map((letter, letterIdx) => {
                      const currentIndex = globalCharCount++;
                      const delayStr = `${currentIndex * 0.03}s`;
                      
                      if (typeof letter === 'object' && letter.type === 'globe') {
                        return (
                          <span
                            key={letterIdx}
                            className={`smoke-letter ${isSmoking ? 'is-smoking' : ''}`}
                            style={{ transitionDelay: delayStr, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <span className="rotating-globe"></span>
                          </span>
                        );
                      } else {
                        return (
                          <span
                            key={letterIdx}
                            className={`smoke-letter ${isSmoking ? 'is-smoking' : ''}`}
                            style={{ transitionDelay: delayStr }}
                          >
                            {letter as string}
                          </span>
                        );
                      }
                    })}
                  </motion.span>
                ));
              })()}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: words.length * 0.15 + 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl text-center self-center"
              style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.6', textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
            >
              Expert guidance to the world's top universities. Your journey to academic excellence starts here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: words.length * 0.15 + 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto self-center"
            >
              <button
                className="px-8 py-4 bg-[#9F6920] text-white rounded-xl transition-all duration-300 hover:bg-[#D4A755] hover:shadow-lg hover:-translate-y-1"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                Start Your Journey
              </button>
              <button
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:-translate-y-1"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                Explore Programs
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}