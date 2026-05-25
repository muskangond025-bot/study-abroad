import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { MapPin, TrendingUp, Globe, Compass, Users, CheckCircle, ArrowRight, Mail, Phone, Target, X, Play, Pause, Volume2, VolumeX, BookOpen, Briefcase, Shield } from 'lucide-react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: 'United States',
    image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=1200&q=80',
    universities: '200+',
    students: '5,000+',
    description: 'Home to world-renowned universities and cutting-edge research facilities, the US offers unparalleled academic opportunities.',
    popularCities: ['New York', 'Boston', 'Los Angeles', 'Chicago', 'San Francisco'],
    topPrograms: ['Engineering', 'Business', 'Computer Science', 'Medicine'],
    averageCost: '$30,000 - $60,000/year'
  },
  {
    name: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
    universities: '150+',
    students: '3,500+',
    description: 'Rich academic tradition combined with modern innovation makes the UK a top choice for international students.',
    popularCities: ['London', 'Oxford', 'Cambridge', 'Edinburgh', 'Manchester'],
    topPrograms: ['Law', 'Finance', 'Arts', 'Architecture'],
    averageCost: '£15,000 - £35,000/year'
  },
  {
    name: 'Canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80',
    universities: '100+',
    students: '2,800+',
    description: 'Known for quality education, safety, and welcoming immigration policies for international students.',
    popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary'],
    topPrograms: ['Data Science', 'Healthcare', 'Environmental Studies', 'Business'],
    averageCost: 'CAD 20,000 - 35,000/year'
  },
  {
    name: 'Australia',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=80',
    universities: '80+',
    students: '2,200+',
    description: 'High quality of life, excellent education standards, and post-study work opportunities attract students worldwide.',
    popularCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    topPrograms: ['Marine Biology', 'Mining Engineering', 'Sports Science', 'Tourism'],
    averageCost: 'AUD 25,000 - 45,000/year'
  },
  {
    name: 'Germany',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80',
    universities: '120+',
    students: '1,800+',
    description: 'Affordable education with many tuition-free public universities and strong engineering programs.',
    popularCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    topPrograms: ['Mechanical Engineering', 'Automotive', 'Chemistry', 'Physics'],
    averageCost: '€500 - €20,000/year'
  },
  {
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80',
    universities: '40+',
    students: '1,200+',
    description: 'Asian education hub with world-class universities and strong focus on technology and business.',
    popularCities: ['Singapore City', 'Jurong', 'Tampines'],
    topPrograms: ['Fintech', 'Biotechnology', 'Urban Planning', 'International Relations'],
    averageCost: 'SGD 30,000 - 50,000/year'
  }
];

// InfoCard with 3D tilt tracking, sheens, luxury sparkles, and concentric spinners
interface InfoCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  index: number;
}

function InfoCard({ icon: Icon, title, description, index }: InfoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const sheenBg = useTransform(() => {
    const xPct = (springX.get() + 0.5) * 100;
    const yPct = (springY.get() + 0.5) * 100;
    return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.35) 0%, rgba(212, 167, 85, 0.08) 35%, transparent 65%)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ 
        y: -14, 
        scale: 1.04,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }}
      className="group relative bg-gradient-to-br from-white/98 via-white/85 to-[#FAF8F5]/50 backdrop-blur-md rounded-2xl p-8 border border-[#D4A755]/20 hover:border-[#9F6920]/60 transition-all duration-500 hover:shadow-[0_40px_85px_rgba(159,105,32,0.18)] flex flex-col items-start cursor-pointer overflow-hidden min-h-[320px]"
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#D4A755] blur-[0.5px] animate-luxury-sparkle-1" />
        <div className="absolute top-[75%] left-[80%] w-1.5 h-1.5 rounded-full bg-[#9F6920] blur-[0.2px] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {/* Icon Circle Container with SVG orbital spinner */}
      <div className="relative mb-6" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
        {/* Orbital SVG Spinner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke={`url(#infoGoldGradient1-${index})`}
              strokeWidth="1.5"
              strokeDasharray="40 180"
              strokeLinecap="round"
              className="animate-spin-counter-clockwise origin-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            />
            <circle
              cx="50"
              cy="50"
              r="39"
              fill="none"
              stroke={`url(#infoGoldGradient2-${index})`}
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-spin-clockwise origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
            <defs>
              <linearGradient id={`infoGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id={`infoGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#D4A755" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Active ripple wave glow on hover */}
        <div className="absolute inset-0 rounded-full border border-[#D4A755]/20 group-hover:animate-ping pointer-events-none opacity-0 group-hover:opacity-20 transition-all duration-700 z-0" />

        {/* Main Icon Node */}
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-[0_6px_15px_rgba(0,0,0,0.03)] border border-[#D4A755]/30 group-hover:border-[#9F6920]/60 transition-colors duration-300 bg-gradient-to-br from-[#9F6920] to-[#D4A755]"
          style={{ z: 50 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center relative z-10 shadow-inner">
            <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col" style={{ transformStyle: "preserve-3d", z: 30 }}>
        <h3 className="text-2xl mb-3 text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 font-semibold font-serif" style={{ fontFamily: 'Lora, serif' }}>
          {title}
        </h3>
        <div className="w-10 h-[1.5px] bg-[#D4A755]/30 mb-3 group-hover:w-20 group-hover:bg-gradient-to-r group-hover:from-[#9F6920] group-hover:to-[#D4A755] transition-all duration-500" />
        <p className="text-black/80 text-[14.5px] leading-relaxed font-normal transition-colors group-hover:text-black/95" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

interface TipCardProps {
  num: number;
  title: string;
  desc: string;
  index: number;
}

function TipCard({ num, title, desc, index }: TipCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const sheenBg = useTransform(() => {
    const xPct = (springX.get() + 0.5) * 100;
    const yPct = (springY.get() + 0.5) * 100;
    return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.35) 0%, rgba(212, 167, 85, 0.08) 35%, transparent 65%)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-gradient-to-br from-white/95 via-white/70 to-white/40 backdrop-blur-md rounded-2xl p-8 border border-[#D4A755]/15 hover:border-[#9F6920]/45 transition-all duration-500 hover:shadow-[0_30px_70px_rgba(159,105,32,0.1)] flex flex-col items-start cursor-pointer overflow-hidden min-h-[320px]"
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#D4A755] blur-[0.5px] animate-luxury-sparkle-1" />
        <div className="absolute top-[75%] left-[80%] w-1.5 h-1.5 rounded-full bg-[#9F6920] blur-[0.2px] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {/* Number Badge Circle with SVG orbital spinner */}
      <div className="relative mb-6" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
        {/* Orbital SVG Spinner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke={`url(#tipGoldGradient1-${index})`}
              strokeWidth="1.5"
              strokeDasharray="40 180"
              strokeLinecap="round"
              className="animate-spin-counter-clockwise origin-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            />
            <circle
              cx="50"
              cy="50"
              r="39"
              fill="none"
              stroke={`url(#tipGoldGradient2-${index})`}
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-spin-clockwise origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
            <defs>
              <linearGradient id={`tipGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id={`tipGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#D4A755" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Active ripple wave glow on hover */}
        <div className="absolute inset-0 rounded-full border border-[#D4A755]/20 group-hover:animate-ping pointer-events-none opacity-0 group-hover:opacity-20 transition-all duration-700 z-0" />

        {/* Main Number Node */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-[0_4px_12px_rgba(159,105,32,0.15)] border border-[#D4A755]/30 group-hover:border-[#9F6920]/60 transition-colors duration-300 bg-gradient-to-br from-[#9F6920] to-[#D4A755]"
          style={{ z: 50 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center relative z-10 shadow-inner">
            <span className="text-white text-base font-semibold group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: 'Lora, serif' }}>
              {num}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col" style={{ transformStyle: "preserve-3d", z: 30 }}>
        <h3 className="text-2xl mb-3 text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 font-normal font-serif" style={{ fontFamily: 'Lora, serif' }}>
          {title}
        </h3>
        <div className="w-10 h-[1px] bg-gray-200 mb-3 group-hover:bg-[#D4A755]/40 transition-colors duration-300" />
        <p className="text-black/60 text-sm leading-relaxed font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}


const guideSteps = [
  {
    step: 'Step 01',
    title: 'Elite Academic Standings',
    desc: 'Investigate global university rankings, program specialities, faculty prestige, and research output to ensure high educational quality.',
    videoSrc: '/video1.mp4',
    icon: Globe,
    tip: 'Tip: Prioritize departments with strong industry citations in your field.'
  },
  {
    step: 'Step 02',
    title: 'Comprehensive Budgeting',
    desc: 'Calculate total costs including tuition fees, living expenses, health insurance, and explore availability of fellowships or scholarships.',
    videoSrc: '/video.mp4',
    icon: BookOpen,
    tip: 'Tip: Consider Germany or Singapore for tuition-free or high-value options.'
  },
  {
    step: 'Step 03',
    title: 'Post-Graduation Career Paths',
    desc: 'Research post-study work visa rights, regional workforce demands, and permanent residency pathways for international graduates.',
    videoSrc: '/video2.mp4',
    icon: Briefcase,
    tip: 'Tip: Canada and Australia offer generous post-graduate work rights.'
  },
  {
    step: 'Step 04',
    title: 'Safety & Cultural Harmony',
    desc: 'Evaluate safety indexes, cultural inclusion, climate comfort, and local campus support networks in your prospective destination.',
    videoSrc: '/video.mp4',
    icon: Shield,
    tip: 'Tip: Establish contact with local student groups during your research.'
  }
];

function DestinationExploreGuide() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleVideoEnded = () => {
    setActiveIdx((prevIdx) => (prevIdx + 1) % guideSteps.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [activeIdx]);

  return (
    <section className="py-24 bg-gradient-to-b from-[#1C0E03] via-[#120902] to-[#0A0501] relative overflow-hidden border-t border-[#D4A755]/15">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Ambient spotlights */}
      <div className="absolute -left-48 top-1/4 w-[500px] h-[500px] rounded-full bg-[#D4A755]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-48 bottom-1/4 w-[500px] h-[500px] rounded-full bg-[#9F6920]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-6 py-2 bg-[#D4A755]/10 border border-[#D4A755]/20 rounded-full"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              Masterclass Tour
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-4 text-white font-normal font-serif animate-pulse"
            style={{ fontFamily: 'Lora, serif' }}
          >
            How to Explore Your Ideal Study Destination
          </motion.h2>

          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6 w-32" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 max-w-3xl mx-auto font-light leading-relaxed"
            style={{ fontFamily: 'Source Sans 3, sans-serif' }}
          >
            Watch our step-by-step interactive video tutorial to discover exactly what strategic factors you must evaluate when researching international destinations.
          </motion.p>
        </div>

        {/* Dynamic Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: 3D Video Player */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div
              className="w-full relative group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="w-full relative z-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md p-4 rounded-3xl border border-[#D4A755]/15 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_rgba(159,105,32,0.15)]"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Video container Frame */}
                <div
                  onClick={togglePlay}
                  className="w-full aspect-video rounded-2xl overflow-hidden relative border border-[#D4A755]/20 bg-black cursor-pointer shadow-inner"
                >
                  <video
                    ref={videoRef}
                    src={guideSteps[activeIdx].videoSrc}
                    autoPlay
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleVideoEnded}
                    className="w-full h-full object-cover select-none"
                  />

                  {/* Specular White sheen sweep */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                  {/* Pulsing Center Play button if paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D4A755] to-[#9F6920] border-2 border-white shadow-lg animate-pulse">
                        <Play className="w-6 h-6 text-white fill-white translate-x-[2px]" />
                      </div>
                    </div>
                  )}

                  {/* Dynamic Tip Text overlay at bottom left */}
                  <div className="absolute bottom-4 left-4 z-20 max-w-[80%] bg-black/40 border border-white/15 backdrop-blur-md px-4 py-2 rounded-xl">
                    <span className="text-[10px] text-[#FAF8F5]/90 tracking-wide font-light block" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      {guideSteps[activeIdx].tip}
                    </span>
                  </div>

                  {/* Audio Mute toggle button (bottom right) */}
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 z-30 p-2.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>

                  {/* Golden timeline progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#9F6920] to-[#D4A755]"
                      style={{
                        width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                      }}
                    />
                  </div>

                  {/* Top-Left Floating Stage Label */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#120902]/60 border border-[#D4A755]/30 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A755] animate-ping" />
                    <span className="text-[9px] text-[#FAF8F5]/95 uppercase tracking-widest font-semibold" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      {guideSteps[activeIdx].step}: {guideSteps[activeIdx].title}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Interactive Glass Steps List */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full">
            {guideSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeIdx === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden backdrop-blur-md ${
                    isActive
                      ? 'bg-gradient-to-br from-[#1E1106]/95 via-[#120902]/85 to-[#000000]/95 border-[#D4A755]/35 shadow-[0_15px_35px_rgba(159,105,32,0.15)] scale-[1.02]'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  {/* Glowing vertical bar on active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGuideBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4A755] to-[#9F6920]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon Node */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#9F6920] to-[#D4A755] text-white border border-[#D4A755]/40 shadow-md'
                      : 'bg-white/5 border border-white/10 text-white/50 group-hover:text-white/80'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>

                  {/* Text details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] uppercase font-bold tracking-widest ${
                        isActive ? 'text-[#D4A755]' : 'text-white/40'
                      }`}>
                        {step.step}
                      </span>
                    </div>

                    <h4 className="text-base text-white font-normal mb-1 font-serif" style={{ fontFamily: 'Lora, serif' }}>
                      {step.title}
                    </h4>

                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-white/70 font-light leading-relaxed mt-2"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

const heroImages = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80', // Beautiful classic ivy-league university campus building
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80', // London Tower Bridge morning light
  'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=80'  // Singapore futuristic Marina Bay Sands
];

export function Countries() {
  const [currentPage, setCurrentPage] = useState(0);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const lastFlipTime = useRef(0);
  const hoverStartX = useRef<number | null>(null);

  const flipPage = (direction: 'next' | 'prev') => {
    const now = Date.now();
    if (now - lastFlipTime.current < 550) return; // Cooldown to let transition finish
    lastFlipTime.current = now;
    if (direction === 'next') {
      setCurrentPage((prev) => Math.min(destinations.length - 1, prev + 1));
    } else {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    }
  };

  const handleContainerMouseEnter = (e: React.MouseEvent) => {
    hoverStartX.current = e.clientX;
  };

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (hoverStartX.current === null) {
      hoverStartX.current = e.clientX;
      return;
    }

    const diffX = e.clientX - hoverStartX.current;
    const threshold = 100; // 100px swipe is natural and premium

    if (diffX < -threshold) {
      flipPage('next');
      hoverStartX.current = e.clientX; // reset to allow continuous swiping
    } else if (diffX > threshold) {
      flipPage('prev');
      hoverStartX.current = e.clientX; // reset
    }
  };

  const handleContainerMouseLeave = () => {
    hoverStartX.current = null;
  };

  // Touch triggers for mobile compatibility
  const handleContainerTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      hoverStartX.current = e.touches[0].clientX;
    }
  };

  const handleContainerTouchMove = (e: React.TouchEvent) => {
    if (hoverStartX.current === null || e.touches.length === 0) return;

    const diffX = e.touches[0].clientX - hoverStartX.current;
    const threshold = 80;

    if (diffX < -threshold) {
      flipPage('next');
      hoverStartX.current = e.touches[0].clientX;
    } else if (diffX > threshold) {
      flipPage('prev');
      hoverStartX.current = e.touches[0].clientX;
    }
  };

  const handleContainerTouchEnd = () => {
    hoverStartX.current = null;
  };

  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 4500); // changes every 4.5 seconds for a premium tempo
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative pt-20 bg-[#FAF8F5]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Ambient warm glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-[#F1DEA8]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-b from-[#D4A755]/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="py-36 relative overflow-hidden bg-[#FAF8F5]">
        {/* Auto-changing premium background slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((imgUrl, idx) => (
            <motion.img
              key={imgUrl}
              src={imgUrl}
              alt="Study abroad scenery background"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: idx === heroImageIdx ? 0.9 : 0, // 0.9 opacity makes the images fully bright, visible, and sharp!
                scale: idx === heroImageIdx ? 1.05 : 1.0 
              }}
              transition={{ 
                duration: 1.5, 
                ease: 'easeInOut' 
              }}
            />
          ))}
          {/* Transparent-to-beige gradient overlay at the very bottom so it blends seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF8F5] z-10 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-20">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(159,105,32,0.02)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Global Horizons
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-6 font-normal flex flex-wrap justify-center gap-x-3 select-none" 
              style={{ fontFamily: 'Lora, serif', color: '#FFFFFF' }}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.035 }}
            >
              {"Explore Global Study Destinations".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((letter, lIdx) => {
                    const randomX = Math.random() * 140 - 70;
                    const randomY = Math.random() * 140 - 70;
                    const randomRotate = Math.random() * 100 - 50;
                    
                    return (
                      <motion.span
                        key={lIdx}
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: randomX,
                            y: randomY,
                            rotate: randomRotate,
                            scale: 0.4,
                            filter: "blur(4px)"
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                            filter: "blur(0px)",
                            color: '#462506',
                            textShadow: '1px 1px 0px #FAF8F5, 2px 2px 0px #F1DEA8, 3px 3px 0px #D4A755, 4px 4px 0px #9F6920, 5px 5px 10px rgba(70,37,6,0.25)',
                            transition: {
                              type: "spring",
                              damping: 15,
                              stiffness: 90
                            }
                          },
                          hover: {
                            x: Math.random() * 16 - 8,
                            y: Math.random() * 16 - 8,
                            rotate: Math.random() * 20 - 10,
                            color: "#D4A755",
                            scale: 1.15,
                            textShadow: '1px 1px 0px #462506, 2px 2px 0px #FAF8F5, 3px 3px 0px #F1DEA8, 4px 4px 0px #9F6920, 5px 5px 15px rgba(70,37,6,0.45)',
                            transition: {
                              type: "spring",
                              damping: 10,
                              stiffness: 200
                            }
                          }
                        }}
                        style={{
                          color: '#462506',
                          textShadow: '1px 1px 0px #FAF8F5, 2px 2px 0px #F1DEA8, 3px 3px 0px #D4A755, 4px 4px 0px #9F6920, 5px 5px 10px rgba(70,37,6,0.25)'
                        }}
                        className="inline-block cursor-pointer origin-center hover:z-30 transition-colors duration-150"
                        whileHover="hover"
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </motion.h1>

            {/* Gold separator */}
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6" />

            <p className="text-lg md:text-xl text-black/70 font-light max-w-2xl mx-auto" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
              Discover the perfect country for your academic journey and career aspirations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Destination Exploration Guide Video Section */}
      <DestinationExploreGuide />

      {/* Important Information Section */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#FAF6EE] to-[#FAF8F5] relative overflow-hidden border-y border-[#D4A755]/10">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-4 py-1.5 bg-white border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(159,105,32,0.02)]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9F6920]">ESSENTIALS</span>
            </div>

            <h2 className="text-4xl md:text-5xl mb-4 font-normal" style={{ fontFamily: 'Lora, serif', color: '#462506' }}>
              Important Information
            </h2>

            {/* Gold separator */}
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

            <p className="text-lg text-[#462506]/85 max-w-3xl mx-auto font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
              Essential details about studying in different countries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              icon={CheckCircle}
              title="Verified Information"
              description="All destination information is verified and updated regularly from official government education websites, embassy resources, and our direct partnerships with immigration consultants in each country."
              index={0}
            />
            <InfoCard
              icon={Globe}
              title="Current Policies"
              description="Immigration policies, visa requirements, and work opportunities are subject to change. We update our information quarterly to reflect the latest regulations and post-study work visa options."
              index={1}
            />
            <InfoCard
              icon={Compass}
              title="Personalized Guidance"
              description="Every student's situation is unique. Schedule a consultation to discuss which destination aligns best with your academic goals, budget, career aspirations, and personal preferences."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Tips for Choosing Destination Section */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(159,105,32,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-4 py-1.5 bg-white border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(159,105,32,0.02)]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9F6920]">PLANNING</span>
            </div>

            <h2 className="text-4xl md:text-5xl mb-4 font-normal" style={{ fontFamily: 'Lora, serif', color: '#462506' }}>
              Tips for Choosing Your Study Destination
            </h2>

            {/* Gold separator */}
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

            <p className="text-lg text-black/70 max-w-3xl mx-auto font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
              Expert guidance to help you select the right country for your education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: 1,
                title: 'Consider Education Quality',
                desc: "Research the country's education system, quality assurance standards, and global recognition. Look for destinations with strong university rankings in your field and established international student support systems."
              },
              {
                num: 2,
                title: 'Evaluate Post-Study Opportunities',
                desc: "Investigate post-study work visa options, pathways to permanent residency, and job market conditions. Countries like Canada and Australia offer generous post-graduation work rights that can significantly impact your career trajectory."
              },
              {
                num: 3,
                title: 'Budget & Living Costs',
                desc: "Calculate total costs including tuition, accommodation, food, transportation, and healthcare. Some countries like Germany offer low-cost or tuition-free education at public universities, while others have higher costs but more part-time work opportunities."
              },
              {
                num: 4,
                title: 'Language & Culture',
                desc: "Consider language requirements and cultural adjustment factors. English-speaking countries may be easier to adapt to, but studying in a non-English speaking country can provide unique language skills and cultural experiences valuable in global careers."
              },
              {
                num: 5,
                title: 'Safety & Well-being',
                desc: "Research crime rates, political stability, healthcare systems, and student support services. Your safety and mental health are paramount to academic success. Look for countries with strong international student communities and support networks."
              },
              {
                num: 6,
                title: 'Get Expert Advice',
                desc: "Consult with experienced education counselors who can provide insights on visa success rates, application timelines, and hidden costs. Their expertise can help you avoid costly mistakes and choose the destination that truly fits your profile."
              }
            ].map((tip, idx) => (
              <TipCard
                key={tip.num}
                num={tip.num}
                title={tip.title}
                desc={tip.desc}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="py-28 bg-gradient-to-b from-[#2E1803] to-[#462506] relative overflow-hidden border-y border-[#D4A755]/10">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* Ambient warm spotlights */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#D4A755]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#9F6920]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-white/5 to-[#D4A755]/10 border border-[#D4A755]/20 rounded-full"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              Support & Guidance
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-6 text-white font-normal"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Need Help Choosing Your Study Destination?
          </motion.h2>

          {/* Gold separator */}
          <motion.div 
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-8 w-32"
            initial={{ width: 0 }}
            whileInView={{ width: '128px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            Our destination specialists can help you compare countries, understand visa requirements, and find the perfect match for your academic and career goals.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#D4A755] to-[#9F6920] text-white px-8 py-4 rounded-full text-lg shadow-[0_10px_30px_rgba(159,105,32,0.2)] hover:shadow-[0_20px_45px_rgba(159,105,32,0.35)] transition-all duration-300 overflow-hidden hover:scale-103 hover:-translate-y-0.5"
              style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600 }}
            >
              {/* Sweep-shine overlay */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="relative z-10 flex items-center gap-3">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <a
              href="tel:+15551234567"
              className="group inline-flex items-center gap-3 bg-white/5 border border-[#D4A755]/30 hover:border-[#D4A755] text-white px-8 py-4 rounded-full text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-103 hover:-translate-y-0.5"
              style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600 }}
            >
              <Phone className="w-5 h-5 text-[#D4A755] group-hover:scale-110 transition-transform" />
              <span>Call Us Now</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:border-[#D4A755]/40 transition-colors duration-300">
                <Users className="w-8 h-8 text-[#D4A755]" />
              </div>
              <h3 className="text-2xl mb-2 text-white font-normal" style={{ fontFamily: 'Lora, serif' }}>
                Destination Experts
              </h3>
              <p className="text-white/70 font-light text-sm leading-relaxed" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Work with counselors who have in-depth knowledge of each country's education system
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:border-[#D4A755]/40 transition-colors duration-300">
                <Target className="w-8 h-8 text-[#D4A755]" />
              </div>
              <h3 className="text-2xl mb-2 text-white font-normal" style={{ fontFamily: 'Lora, serif' }}>
                Comparative Analysis
              </h3>
              <p className="text-white/70 font-light text-sm leading-relaxed" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Get detailed comparisons of costs, visa policies, and career opportunities
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:border-[#D4A755]/40 transition-colors duration-300">
                <Mail className="w-8 h-8 text-[#D4A755]" />
              </div>
              <h3 className="text-2xl mb-2 text-white font-normal" style={{ fontFamily: 'Lora, serif' }}>
                Complete Support
              </h3>
              <p className="text-white/70 font-light text-sm leading-relaxed" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                From country selection to visa lodgment, we guide you through the entire process
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF6EE] relative overflow-hidden border-t border-[#D4A755]/15">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient spotlights */}
        <div className="absolute -left-48 top-1/4 w-[500px] h-[500px] rounded-full bg-[#D4A755]/6 blur-[120px] pointer-events-none" />
        <div className="absolute -right-48 bottom-1/4 w-[500px] h-[500px] rounded-full bg-[#FAF6EE]/50 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-8 relative z-10">
          
          {/* Section Sub-Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-3 px-4 py-1.5 bg-white border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(159,105,32,0.02)]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9F6920]">OUR WORLDWIDE NETWORK</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 font-normal font-serif text-[#462506]" style={{ fontFamily: 'Lora, serif' }}>
              Select Your Dream Destination
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />
          </div>

          {/* 3D Stack Book Component Container */}
          <div className="max-w-5xl mx-auto relative px-4 flex flex-col items-center">
            
            {/* Interactive Book Frame with 3D perspective */}
            <div 
              className="w-full h-[520px] md:h-[420px] relative select-none cursor-ew-resize" 
              style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
              onMouseEnter={handleContainerMouseEnter}
              onMouseMove={handleContainerMouseMove}
              onMouseLeave={handleContainerMouseLeave}
              onTouchStart={handleContainerTouchStart}
              onTouchMove={handleContainerTouchMove}
              onTouchEnd={handleContainerTouchEnd}
            >
              {destinations.map((destination, index) => (
                <DestinationBookCard
                  key={index}
                  destination={destination}
                  index={index}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPageCount={destinations.length}
                />
              ))}
            </div>

            {/* Book Spine Indicators & Controls */}
            <div className="flex items-center gap-6 mt-8 z-20">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="w-12 h-12 rounded-full border border-[#D4A755]/30 bg-white hover:border-[#D4A755] flex items-center justify-center text-[#462506] disabled:opacity-30 disabled:cursor-not-allowed shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                type="button"
                aria-label="Previous Page"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>

              <div className="flex items-center gap-2">
                {destinations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentPage 
                        ? 'w-8 bg-gradient-to-r from-[#9F6920] to-[#D4A755]' 
                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    type="button"
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(destinations.length - 1, prev + 1))}
                disabled={currentPage === destinations.length - 1}
                className="w-12 h-12 rounded-full border border-[#D4A755]/30 bg-white hover:border-[#D4A755] flex items-center justify-center text-[#462506] disabled:opacity-30 disabled:cursor-not-allowed shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                type="button"
                aria-label="Next Page"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Helper Hint */}
            <p className="text-xs text-black/40 mt-3 font-sans">
              * Hover and move mouse Left/Right (or Swipe) to change cards
            </p>

          </div>

        </div>
      </section>
    </div>
  );
}

// Optimized individual destination card styled like a high-end travel guide / open book page with 3D fold turn
function DestinationBookCard({ 
  destination, 
  index,
  currentPage,
  setCurrentPage,
  totalPageCount
}: { 
  destination: {
    name: string;
    image: string;
    universities: string;
    students: string;
    description: string;
    popularCities: string[];
    topPrograms: string[];
    averageCost: string;
  };
  index: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPageCount: number;
}) {
  const isImageLeft = index % 2 === 0;
  
  // Stacking depth calculation relative to active front page
  const depth = index - currentPage;
  const isFlipped = index < currentPage;
  const isActive = index === currentPage;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const sheenBg = useTransform(() => {
    const xPct = (springX.get() + 0.5) * 100;
    const yPct = (springY.get() + 0.5) * 100;
    return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.15) 0%, rgba(212, 167, 85, 0.04) 40%, transparent 70%)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const xVal = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yVal = (e.clientY - rect.top - rect.height / 2) / rect.height;

    if (isActive) {
      mouseX.set(xVal);
      mouseY.set(yVal);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Flip page on card click (loop back to first if on last)
  const handleCardClick = () => {
    if (isActive) {
      setCurrentPage((prev) => (prev + 1) % totalPageCount);
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        zIndex: totalPageCount - index + (isActive ? 20 : 0),
      }}
      animate={{
        // Stacked Card Sliding Deck Animation instead of notebook Y-axis fold!
        x: isFlipped ? '-130%' : '0%',
        rotate: isFlipped ? -6 : 0, // slight rotation for organic look
        opacity: isFlipped ? 0 : (depth > 2 ? 0 : 1),
        // Stacking visual depth offsets for cards in background
        scale: isActive ? 1 : Math.max(0.95, 1 - depth * 0.025),
        y: isActive ? 0 : depth * 12,
        z: isActive ? 0 : -depth * 30
      }}
      transition={{ 
        duration: 0.55, 
        ease: [0.25, 1, 0.5, 1] 
      }}
      className="absolute inset-0 w-full h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className={`w-full h-full flex flex-col ${
          isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        } rounded-[2rem] overflow-hidden border border-[#D4A755]/20 bg-white shadow-[0_15px_35px_rgba(159,105,32,0.06)] hover:shadow-[0_25px_55px_rgba(159,105,32,0.12)] transition-shadow duration-500 relative group`}
      >
        {/* Specular White sheen sweep on hover (active only) */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
        )}

        {/* Dynamic Light Sheen Overlay */}
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{ background: sheenBg }}
          />
        )}

        {/* Left Column: Image (Open Book Left Page) */}
        <div className="w-full md:w-1/2 h-[180px] md:h-auto relative overflow-hidden flex-shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
          />
          {/* Dark Luxury Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0602]/90 via-black/35 to-black/25 z-10 pointer-events-none" />

          {/* Large Decorative Number */}
          <div 
            className="absolute top-6 left-6 text-[52px] md:text-[64px] leading-none font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-white/35 to-white/0 select-none z-20"
            style={{ fontFamily: 'Lora, serif', fontWeight: 900 }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Bottom Text Overlays on Image */}
          <div className="absolute bottom-6 left-6 right-6 z-20 text-white pointer-events-none">
            <span className="text-[9px] tracking-[0.25em] text-[#D4A755] uppercase block mb-0.5 font-semibold font-sans">
              STUDY DESTINATION
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight drop-shadow-md" style={{ fontFamily: 'Lora, serif' }}>
              {destination.name}
            </h3>
          </div>
        </div>

        {/* Right Column: Details (Open Book Right Page) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-white via-white to-[#FAF8F5] relative overflow-hidden flex-grow">
          {/* Background Grid Pattern inside Details */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.003)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-20">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white border border-[#D4A755]/20 text-[#462506] rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm font-sans">
                {destination.universities} Universities
              </span>
              <span className="px-3 py-1 bg-[#FAF6EE] border border-[#9F6920]/25 text-[#9F6920] rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm font-sans">
                {destination.students} Placed
              </span>
            </div>

            {/* Description */}
            <p 
              className="text-xs md:text-sm text-[#462506]/85 mb-4 font-light leading-relaxed line-clamp-2 md:line-clamp-3"
              style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.6' }}
            >
              {destination.description}
            </p>

            {/* Insights Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4 border-t border-[#D4A755]/10 pt-4">
              {/* Popular Cities */}
              <div>
                <h4 className="text-[10px] text-[#9F6920] font-bold tracking-widest uppercase mb-1.5 font-sans">
                  Popular Cities
                </h4>
                <div className="flex flex-wrap gap-1">
                  {destination.popularCities.slice(0, 3).map((city: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-white border border-[#D4A755]/10 text-[#462506]/95 rounded-full text-[10px] font-semibold shadow-sm font-sans"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Programs */}
              <div>
                <h4 className="text-[10px] text-[#9F6920] font-bold tracking-widest uppercase mb-1.5 font-sans">
                  Top Programs
                </h4>
                <div className="flex flex-wrap gap-1">
                  {destination.topPrograms.slice(0, 3).map((prog: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-[#D4A755]/5 border border-[#D4A755]/20 text-[#9F6920] rounded-full text-[10px] font-semibold font-sans"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions & Costs */}
          <div className="relative z-20 flex items-center justify-between gap-4 border-t border-[#D4A755]/10 pt-4 flex-shrink-0">
            <div className="p-2.5 rounded-xl bg-white border border-[#D4A755]/10 shadow-inner flex flex-col justify-center">
              <span className="text-[8px] text-black/55 font-bold tracking-wider uppercase block mb-0.5 font-sans">
                Tuition Cost
              </span>
              <span className="text-sm text-[#9F6920] font-bold block font-serif" style={{ fontFamily: 'Lora, serif' }}>
                {destination.averageCost.split(' ')[0]} {destination.averageCost.split(' ')[1] || ''}
              </span>
            </div>

            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4A755] to-[#9F6920] hover:from-[#9F6920] hover:to-[#784F17] text-white px-5 py-3 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sweep-shine overlay */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="relative z-10 flex items-center gap-1.5">
                Enquire
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}