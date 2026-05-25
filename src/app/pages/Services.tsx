import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Search, FileCheck, GraduationCap, Plane, BookOpen, Award, CreditCard, Home, Clock, CheckCircle, AlertCircle, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Search,
    title: 'Career Counseling',
    description: 'In-depth assessment of your academic background, career goals, and preferences to identify the best study path',
    features: ['One-on-one counseling sessions', 'Career aptitude assessment', 'Course and country selection', 'University shortlisting'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&q=80'
  },
  {
    icon: FileCheck,
    title: 'Application Assistance',
    description: 'Complete support in preparing and submitting strong applications to your chosen universities',
    features: ['Document preparation', 'Application review', 'Statement of Purpose guidance', 'Letter of recommendation support'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&q=80'
  },
  {
    icon: BookOpen,
    title: 'Test Preparation',
    description: 'Expert coaching for standardized tests required for international admissions',
    features: ['IELTS/TOEFL preparation', 'GRE/GMAT coaching', 'Practice tests and materials', 'Score improvement strategies'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&q=80'
  },
  {
    icon: Award,
    title: 'Scholarship Guidance',
    description: 'Maximize your financial aid opportunities with our scholarship search and application support',
    features: ['Scholarship identification', 'Application strategy', 'Financial planning', 'Funding alternatives'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&q=80'
  },
  {
    icon: Plane,
    title: 'Visa Assistance',
    description: 'Comprehensive visa support to ensure a smooth approval process',
    features: ['Visa documentation', 'Interview preparation', 'Embassy liaison', 'Application tracking'],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&q=80'
  },
  {
    icon: CreditCard,
    title: 'Financial Planning',
    description: 'Guidance on managing costs and exploring education loan options',
    features: ['Budget planning', 'Education loan assistance', 'Currency exchange guidance', 'Cost estimation'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&q=80'
  },
  {
    icon: Home,
    title: 'Accommodation Support',
    description: 'Help finding safe and convenient housing near your university',
    features: ['On-campus housing options', 'Off-campus alternatives', 'Roommate matching', 'Lease review assistance'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=80'
  },
  {
    icon: GraduationCap,
    title: 'Pre-Departure Orientation',
    description: 'Prepare for life abroad with comprehensive pre-departure sessions',
    features: ['Cultural orientation', 'Travel checklist', 'Health insurance guidance', 'Airport pickup coordination'],
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1000&q=80'
  }
];

const timingScenarios = [
  {
    title: '12-18 Months Before',
    description: 'Ideal time to start planning, especially for competitive programs and scholarship applications',
    scenarios: ['Beginning your study abroad journey', 'Researching universities and programs', 'Planning test preparation']
  },
  {
    title: '6-12 Months Before',
    description: 'Critical period for application preparation and submission',
    scenarios: ['Finalizing university selections', 'Preparing application documents', 'Taking standardized tests']
  },
  {
    title: '3-6 Months Before',
    description: 'Focus on visa processing and pre-departure preparations',
    scenarios: ['Visa applications', 'Financial arrangements', 'Accommodation planning']
  },
  {
    title: 'After Admission',
    description: 'Final preparations and support for your transition abroad',
    scenarios: ['Pre-departure orientation', 'Travel arrangements', 'Initial settling support']
  }
];

const considerations = [
  {
    icon: Clock,
    title: 'Application Deadlines',
    description: 'Different universities have varying deadlines. Early applications often have better scholarship opportunities.'
  },
  {
    icon: Award,
    title: 'Budget & Funding',
    description: 'Consider tuition fees, living expenses, and available scholarships or financial aid options.'
  },
  {
    icon: CheckCircle,
    title: 'Academic Requirements',
    description: 'Ensure you meet the academic prerequisites including GPA, test scores, and prerequisite courses.'
  },
  {
    icon: Search,
    title: 'Program Fit',
    description: 'Choose programs that align with your career goals, interests, and long-term aspirations.'
  },
  {
    icon: Plane,
    title: 'Visa Requirements',
    description: 'Understand visa processing times and requirements for your chosen destination country.'
  },
  {
    icon: AlertCircle,
    title: 'Documentation',
    description: 'Gather transcripts, recommendations, test scores, and other required documents well in advance.'
  }
];

// ServiceCard with 3D tilt tracking, sheens, luxury sparkles, and concentric spinners
interface ServiceCardProps {
  service: typeof services[number];
  index: number;
  onClick: () => void;
}

function ServiceCard({ service, index, onClick }: ServiceCardProps) {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const sheenBg = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const xPct = ((xVal as number) + 0.5) * 100;
      const yPct = ((yVal as number) + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.35) 0%, rgba(212, 167, 85, 0.08) 35%, transparent 65%)`;
    }
  );

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
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-gradient-to-br from-[#1C0E03]/95 via-[#120902]/85 to-[#000000]/95 backdrop-blur-md rounded-2xl p-6 border border-[#D4A755]/15 hover:border-[#D4A755]/45 transition-all duration-500 hover:shadow-[0_30px_70px_rgba(159,105,32,0.25)] flex flex-col items-start cursor-pointer overflow-hidden min-h-[500px]"
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#D4A755] blur-[0.5px] animate-luxury-sparkle-1" />
        <div className="absolute top-[75%] left-[80%] w-1 h-1 rounded-full bg-[#D4A755] blur-[0.2px] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {/* Card Image Header according to data */}
      <div className="w-full h-44 rounded-xl overflow-hidden relative mb-6 border border-[#D4A755]/15 group-hover:border-[#D4A755]/30 transition-colors duration-300 z-10">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 select-none pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0E03]/40 to-transparent pointer-events-none" />
      </div>

      {/* Icon Circle Container overlapping the image bottom-left */}
      <div className="relative mt-[-40px] ml-4 mb-5" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
        {/* Orbital SVG Spinner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke={`url(#serviceGoldGradient1-${index})`}
              strokeWidth="1.5"
              strokeDasharray="40 180"
              strokeLinecap="round"
              className="animate-spin-counter-clockwise origin-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            />
            <circle
              cx="50"
              cy="50"
              r="37"
              fill="none"
              stroke={`url(#serviceGoldGradient2-${index})`}
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-spin-clockwise origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
            <defs>
              <linearGradient id={`serviceGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id={`serviceGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-[0_6px_15px_rgba(0,0,0,0.03)] border border-[#D4A755]/30 group-hover:border-[#D4A755]/60 transition-colors duration-300 bg-gradient-to-br from-[#9F6920] to-[#D4A755]"
          style={{ z: 50 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center relative z-10 shadow-inner">
            <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col" style={{ transformStyle: "preserve-3d", z: 30 }}>
        <h3 className="text-xl mb-2 text-white group-hover:text-[#D4A755] transition-colors duration-300 font-normal" style={{ fontFamily: 'Lora, serif' }}>
          {service.title}
        </h3>
        
        {/* Decorative divider */}
        <div className="w-10 h-[1px] bg-white/10 mb-3 group-hover:bg-[#D4A755]/40 transition-colors duration-300" />

        <p className="text-white/70 text-sm leading-relaxed font-light mb-6 flex-grow" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
          {service.description}
        </p>

        <ul className="space-y-2 mt-auto">
          {service.features.slice(0, 2).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-white/60 text-xs" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              <span className="text-[#D4A755] mt-0.5">•</span>
              <span>{feature}</span>
            </li>
          ))}
          {service.features.length > 2 && (
            <li className="text-[11px] text-[#D4A755] font-semibold pt-1 uppercase tracking-wider group-hover:underline">
              + {service.features.length - 2} more features
            </li>
          )}
        </ul>
      </div>

      {/* Bottom Accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] z-20"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

// TimingScenarioCard with spring-physics, sheens, sparkles, and expanding gold brackets
function TimingScenarioCard({ scenario, index }: { scenario: typeof timingScenarios[number]; index: number }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  
  const [hovered, setHovered] = useState(false);

  const sheenBg = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const xPct = ((xVal as number) + 0.5) * 100;
      const yPct = ((yVal as number) + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.35) 0%, rgba(212, 167, 85, 0.08) 35%, transparent 65%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 60, damping: 15, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-gradient-to-br from-[#1E1106]/95 via-[#100904]/95 to-[#000000]/95 hover:from-[#2A180B] hover:via-[#190E06] hover:to-[#050301] backdrop-blur-lg rounded-2xl p-8 border border-[#D4A755]/20 hover:border-[#D4A755]/50 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_70px_rgba(159,105,32,0.2)] cursor-pointer overflow-hidden min-h-[340px] flex flex-col justify-between"
    >
      {/* Brackets Expanding Effect */}
      <div 
        className="absolute top-4 right-4 border-t-2 border-r-2 border-[#D4A755]/20 opacity-25 group-hover:opacity-70 transition-all duration-700 ease-out pointer-events-none"
        style={{
          width: hovered ? 'calc(100% - 2rem)' : '1rem',
          height: hovered ? 'calc(100% - 2rem)' : '1rem',
        }}
      />
      <div 
        className="absolute bottom-4 left-4 border-b-2 border-l-2 border-[#D4A755]/20 opacity-25 group-hover:opacity-70 transition-all duration-700 ease-out pointer-events-none"
        style={{
          width: hovered ? 'calc(100% - 2rem)' : '1rem',
          height: hovered ? 'calc(100% - 2rem)' : '1rem',
        }}
      />

      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[20%] left-[20%] w-1 h-1 rounded-full bg-[#D4A755] animate-luxury-sparkle-1" />
        <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#9F6920] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {/* Specular Sweep-Shine light overlay */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none z-0" />

      <div className="relative z-10 w-full flex flex-col flex-1 justify-between" style={{ transformStyle: "preserve-3d", z: 30 }}>
        <div>
          {/* Stage step counter */}
          <div className="text-[11px] text-[#D4A755] uppercase tracking-[0.25em] font-semibold mb-3 block" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            Stage 0{index + 1}
          </div>

          <h3 className="text-xl mb-3 text-white group-hover:text-[#D4A755] transition-colors duration-300 font-normal leading-tight" style={{ fontFamily: 'Lora, serif' }}>
            {scenario.title}
          </h3>
          
          <p className="text-white/70 mb-5 font-light text-xs leading-relaxed" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            {scenario.description}
          </p>
        </div>

        <div>
          {/* Separator line */}
          <div className="w-10 h-[1px] bg-white/10 mb-4 group-hover:bg-[#D4A755]/40 transition-colors duration-300" />

          <ul className="space-y-2">
            {scenario.scenarios.map((scen, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/60 text-xs" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <span className="text-[#D4A755] mt-0.5">•</span>
                <span>{scen}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] z-20"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

const videoSources = [
  { src: '/study-abroad/video1.mp4', label: 'Global Campus' },
  { src: '/study-abroad/video.mp4', label: 'Student Life' },
  { src: '/study-abroad/video2.mp4', label: 'Academic Journey' }
];

function CapabilitiesVideoPlayer() {
  const [activeSourceIdx, setActiveSourceIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
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
    setActiveSourceIdx((prevIdx) => (prevIdx + 1) % videoSources.length);
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
  }, [activeSourceIdx]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Glass Wrapper */}
      <div
        className="w-full relative group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="w-full relative z-10 bg-gradient-to-br from-white/80 via-white/50 to-white/30 backdrop-blur-md p-4 rounded-3xl border border-[#D4A755]/15 hover:border-[#9F6920]/45 transition-all duration-500 shadow-[0_20px_50px_rgba(159,105,32,0.1)] group-hover:shadow-[0_30px_70px_rgba(159,105,32,0.2)]"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Video Frame */}
          <div 
            onClick={togglePlay}
            className="w-full aspect-video rounded-2xl overflow-hidden relative border border-[#D4A755]/20 bg-black cursor-pointer shadow-inner"
          >
            <video
              ref={videoRef}
              src={videoSources[activeSourceIdx].src}
              autoPlay
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover select-none"
            />

            {/* Specular White sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            {/* Play/Pause Pulsing Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 transition-opacity duration-300">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D4A755] to-[#9F6920] border-2 border-white shadow-lg animate-pulse">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white translate-x-[2px]" />
                </div>
              </div>
            )}

            {/* Audio Mute/Unmute glass button (bottom right) */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 scale-90 sm:scale-100"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 h-5 text-white" />
              )}
            </button>

            {/* Custom Time Progress Line overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9F6920] to-[#D4A755]"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>

            {/* Floating Premium Label badge (top left) */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/30 border border-white/20 rounded-full backdrop-blur-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A755] animate-ping" />
              <span className="text-[10px] text-white/95 uppercase tracking-widest font-semibold" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                {videoSources[activeSourceIdx].label}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Selector controls */}
      <div className="flex gap-2.5 justify-center mt-5 w-full relative z-20">
        {videoSources.map((src, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveSourceIdx(idx);
              setIsPlaying(true);
            }}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-sm border ${
              activeSourceIdx === idx
                ? 'bg-[#9F6920] text-white border-[#9F6920] shadow-[0_5px_15px_rgba(159,105,32,0.25)] scale-105'
                : 'bg-white/50 text-[#462506]/85 border-[#D4A755]/20 hover:bg-white/80 hover:border-[#D4A755]/40 hover:text-[#9F6920]'
            }`}
            style={{ fontFamily: 'Source Sans 3, sans-serif' }}
          >
            {src.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isOk, setIsOk] = useState(false);
  
  // Ref for considerations panels
  const considerationsPanelsRef = useRef(null);

  const openServiceDetail = (service: any) => {
    setSelectedService(service);
    setIsDetailView(true);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      setIsReady(true);
      setIsOk(true);
    }, 420);
  };

  const closeServiceDetail = () => {
    setIsReady(false);
    setTimeout(() => {
      setIsDetailView(false);
      setIsOk(false);
      setSelectedService(null);
      document.body.style.overflow = 'unset';
    }, 400);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // GSAP scroll-stacking effect for considerations panels
  useEffect(() => {
    const panelsContainer = considerationsPanelsRef.current;
    if (!panelsContainer) return;

    const panels = Array.from(panelsContainer.querySelectorAll('.consideration-panel')) as HTMLElement[];
    
    if (panels.length === 0) return;

    // Remove the last panel from animations
    const panelsToAnimate = panels.slice(0, -1);
    
    // Store ScrollTrigger instances for cleanup
    const scrollTriggers: ScrollTrigger[] = [];
    
    panelsToAnimate.forEach((panel, index) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "bottom bottom",
          pinSpacing: false,
          pin: true,
          scrub: true,
          onRefresh: () =>
            gsap.set(panel, {
              transformOrigin:
                "center " + (panel.offsetHeight - window.innerHeight / 2) + "px"
            })
        }
      });
      
      // Store the ScrollTrigger instance
      if (tl.scrollTrigger) {
        scrollTriggers.push(tl.scrollTrigger);
      }
      
      tl.fromTo(
        panel,
        { y: 0, rotate: 0, scale: 1, opacity: 1 },
        { y: 0, rotateX: 0, scale: 0.5, opacity: 0.5 },
        0
      ).to(panel, 0.1, { opacity: 0 });
    });

    return () => {
      // Kill all stored ScrollTriggers safely
      scrollTriggers.forEach(st => {
        try {
          st.kill(true);
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
      
      // Clear any remaining GSAP inline styles
      panels.forEach(panel => {
        if (panel && panel.style) {
          gsap.set(panel, { clearProps: "all" });
        }
      });
    };
  }, []);

  return (
    <div className="relative pt-20 overflow-hidden bg-white">
      {/* Hero / Intro Section */}
      <section className="py-32 bg-gradient-to-b from-[#FAF8F5] via-white to-white relative overflow-hidden">
        {/* Background Engineering Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient gold light spots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-amber-50/20 via-[#F1DEA8]/5 to-transparent blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Typography */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start text-left"
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Our Capabilities
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-[#462506] font-normal font-serif leading-tight" style={{ fontFamily: 'Lora, serif' }}>
                Comprehensive Support for Your Study Abroad Journey
              </h1>

              {/* Elegant Divider */}
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-[#D4A755] to-transparent w-[180px] mt-4 mb-8"
                initial={{ width: 0 }}
                animate={{ width: '180px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.8' }}>
                From initial counseling to post-arrival support, we're with you every step of the way. Our structured support ensures a seamless, successful university matching and admission experience.
              </p>
            </motion.div>

            {/* Right Column: 3D Video Player */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full flex justify-center"
            >
              <CapabilitiesVideoPlayer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Service Providers */}
      <section className="py-24 bg-gradient-to-b from-white via-[#FAF8F5] to-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Tailored Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-4 text-[#462506] font-normal font-serif"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Available Service Providers
            </motion.h2>

            {/* Underline Divider */}
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-black/70 max-w-3xl mx-auto font-light leading-relaxed"
              style={{ fontFamily: 'Source Sans 3, sans-serif' }}
            >
              Explore our comprehensive range of services designed to support you at every stage
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                onClick={() => openServiceDetail(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* When You'll Need This */}
      <section className="py-24 bg-gradient-to-b from-[#1C0E03] via-[#120902] to-[#0A0501] relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient floating sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 15 }).map((_, i) => {
            const randomTop = [15, 30, 45, 60, 75, 85, 20, 35, 50, 65, 70, 80, 25, 40, 55][i % 15];
            const randomLeft = [10, 80, 25, 75, 40, 60, 90, 15, 35, 55, 85, 20, 70, 30, 50][i % 15];
            const randomDuration = [5, 7, 6, 8, 5, 9, 6, 7, 8, 5, 6, 9, 7, 8, 6][i % 15];
            const randomDelay = [0, 1, 0.5, 1.5, 0.2, 0.8, 1.2, 0.3, 0.7, 1.1, 0.4, 0.9, 1.3, 0.1, 0.6][i % 15];
            const randomSize = [1.5, 2.5, 2, 1.8, 2.2, 1.2, 2.8, 1.6, 2.4, 2, 1.4, 2.6, 1.9, 2.3, 1.7][i % 15];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  y: [-30, -70, -30],
                  x: [0, 15, 0]
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: randomDelay
                }}
                className="absolute rounded-full bg-gradient-to-tr from-[#FAF8F5] to-[#D4A755]"
                style={{
                  top: `${randomTop}%`,
                  left: `${randomLeft}%`,
                  width: `${randomSize}px`,
                  height: `${randomSize}px`,
                  filter: 'blur(0.5px)'
                }}
              />
            );
          })}
        </div>

        {/* Ambient gold light spots */}
        <div className="absolute -left-48 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D4A755]/8 blur-[130px] pointer-events-none" />
        <div className="absolute -right-48 bottom-1/4 w-[600px] h-[600px] rounded-full bg-[#9F6920]/6 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-6 py-2 bg-[#D4A755]/10 border border-[#D4A755]/20 rounded-full"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Timeline Plan
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-4 text-white font-normal font-serif"
              style={{ fontFamily: 'Lora, serif' }}
            >
              When You'll Need This
            </motion.h2>

            {/* Underline Divider */}
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/75 max-w-3xl mx-auto font-light leading-relaxed"
              style={{ fontFamily: 'Source Sans 3, sans-serif' }}
            >
              Plan your study abroad journey effectively with these timing guidelines
            </motion.p>
          </div>

          {/* Horizontal Wave Timeline Container */}
          <div className="relative mt-24 max-w-7xl mx-auto px-4 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-16">
            
            {/* Desktop Horizontal Wavy Line Behind Cards */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-44 hidden lg:block pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                {/* Wavy line base shadow */}
                <path
                  d="M0,100 C125,-20 250,220 375,100 C500,-20 625,220 750,100 C875,-20 1000,100 1000,100"
                  fill="none"
                  stroke="#D4A755"
                  strokeWidth="8"
                  strokeOpacity="0.03"
                  strokeLinecap="round"
                />
                {/* Wavy line base gold */}
                <path
                  d="M0,100 C125,-20 250,220 375,100 C500,-20 625,220 750,100 C875,-20 1000,100 1000,100"
                  fill="none"
                  stroke="#D4A755"
                  strokeWidth="2"
                  strokeOpacity="0.15"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
                {/* Self-drawing active gold line */}
                <motion.path
                  d="M0,100 C125,-20 250,220 375,100 C500,-20 625,220 750,100 C875,-20 1000,100 1000,100"
                  fill="none"
                  stroke="url(#horizontalTimelineGoldGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#timelineNeonGlow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
                
                <defs>
                  <linearGradient id="horizontalTimelineGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9F6920" />
                    <stop offset="50%" stopColor="#D4A755" />
                    <stop offset="100%" stopColor="#9F6920" />
                  </linearGradient>
                  <filter id="timelineNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComponentTransfer in="blur" result="glow">
                      <feFuncA type="linear" slope="0.75" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Mobile/Tablet Horizontal Wavy Line Behind Cards */}
            <div className="absolute left-0 w-[1200px] top-1/2 -translate-y-1/2 h-40 block lg:hidden pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                <path
                  d="M0,100 C125,-20 250,220 375,100 C500,-20 625,220 750,100 C875,-20 1000,100 1000,100"
                  fill="none"
                  stroke="#D4A755"
                  strokeWidth="6"
                  strokeOpacity="0.03"
                />
                <path
                  d="M0,100 C125,-20 250,220 375,100 C500,-20 625,220 750,100 C875,-20 1000,100 1000,100"
                  fill="none"
                  stroke="#D4A755"
                  strokeWidth="1.5"
                  strokeOpacity="0.15"
                  strokeDasharray="4 4"
                />
                <motion.path
                  d="M0,100 C125,-20 250,220 375,100 C500,-20 625,220 750,100 C875,-20 1000,100 1000,100"
                  fill="none"
                  stroke="url(#horizontalTimelineGoldGradientMobile)"
                  strokeWidth="2.5"
                  filter="url(#timelineNeonGlowMobile)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="horizontalTimelineGoldGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9F6920" />
                    <stop offset="50%" stopColor="#D4A755" />
                    <stop offset="100%" stopColor="#9F6920" />
                  </linearGradient>
                  <filter id="timelineNeonGlowMobile" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComponentTransfer in="blur" result="glow">
                      <feFuncA type="linear" slope="0.7" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Cards Grid wrapper */}
            <div className="flex min-w-[1100px] lg:min-w-0 lg:w-full lg:grid lg:grid-cols-4 gap-8 relative z-10 py-8 px-4 lg:px-0">
              {timingScenarios.map((scenario, index) => {
                const isHigh = index % 2 === 0;
                
                return (
                  <div 
                    key={index} 
                    className={`flex-1 w-[260px] sm:w-[290px] lg:w-auto relative flex flex-col items-center transition-all duration-500 ${
                      isHigh ? 'lg:pt-20' : 'lg:pb-20'
                    }`}
                  >
                    
                    {/* Vertical Dotted Leader Connector Line (Desktop only) */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 w-[1px] hidden lg:block pointer-events-none z-0 ${
                        isHigh ? 'top-10 h-16' : 'bottom-10 h-16'
                      }`}
                      style={{ borderLeft: '1px dashed rgba(212, 167, 85, 0.4)' }}
                    />

                    {/* Timeline Node sitting directly on the curve (Desktop only) */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex items-center justify-center ${
                        isHigh ? 'top-10' : 'bottom-10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#120902] border border-[#D4A755]/40 flex items-center justify-center relative shadow-[0_0_15px_rgba(212,167,85,0.25)]">
                        <div className="absolute inset-0 rounded-full bg-[#D4A755]/15 animate-ping opacity-60 pointer-events-none" />
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9F6920] to-[#D4A755] flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node sitting directly on the curve (Mobile/Tablet Swipeable Track) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 lg:hidden z-20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#120902] border border-[#D4A755]/40 flex items-center justify-center relative shadow-[0_0_15px_rgba(212,167,85,0.25)]">
                        <div className="absolute inset-0 rounded-full bg-[#D4A755]/15 animate-ping opacity-60 pointer-events-none" />
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9F6920] to-[#D4A755] flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Scenario Card */}
                    <div className="w-full mt-16 lg:mt-0 relative z-10">
                      <TimingScenarioCard scenario={scenario} index={index} />
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* What to Consider */}
      <section className="py-24 bg-[#1C0E03] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10 mb-16 text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-6 py-2 bg-[#D4A755]/10 border border-[#D4A755]/20 rounded-full"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              Strategic Factors
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-4 text-white font-normal font-serif"
            style={{ fontFamily: 'Lora, serif' }}
          >
            What to Consider
          </motion.h2>

          {/* Underline Divider */}
          <motion.div 
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/75 max-w-3xl mx-auto font-light leading-relaxed"
            style={{ fontFamily: 'Source Sans 3, sans-serif' }}
          >
            Important factors to keep in mind when planning your study abroad journey
          </motion.p>
        </div>

        {/* Panels Container */}
        <div className="relative" ref={considerationsPanelsRef}>
          {considerations.map((consideration, index) => {
            const Icon = consideration.icon;
            return (
              <section
                key={index}
                className="consideration-panel w-full min-h-screen flex items-center justify-center relative overflow-hidden"
                style={{
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, #1C0E03 0%, #000000 100%)' 
                    : 'linear-gradient(135deg, #2D1A0C 0%, #120902 100%)'
                }}
              >
                {/* Background concentric spinning rings for first/odd panels to break up monotony */}
                {index % 2 === 0 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.07] pointer-events-none select-none z-0">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="#D4A755"
                        strokeWidth="0.5"
                        strokeDasharray="80 100"
                        className="animate-spin-clockwise origin-center"
                      />
                    </svg>
                  </div>
                )}

                {/* Dark engineering grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

                {/* Ambient gold glow spotlights */}
                <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#9F6920]/8 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D4A755]/8 blur-[100px] pointer-events-none" />

                {/* Panel Content Box - Glassmorphic Plate */}
                <div className="max-w-4xl mx-auto px-8 py-16 text-center relative z-10 bg-[#120902]/85 backdrop-blur-lg border border-[#D4A755]/20 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] mx-4 md:mx-auto">
                  
                  {/* Large Number */}
                  <div 
                    className="text-[120px] lg:text-[180px] leading-none tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#D4A755]/20 to-[#9F6920]/0 mb-4 select-none" 
                    style={{ fontFamily: 'Lora, serif', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Icon container with ripple and gold gradient */}
                  <div className="relative w-24 h-24 mb-8 mx-auto z-10">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9F6920] to-[#D4A755] opacity-20 blur-md animate-pulse" />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9F6920] to-[#D4A755] flex items-center justify-center relative border border-[#D4A755]/40 shadow-2xl">
                      <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center shadow-inner">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-3xl lg:text-4xl mb-6 text-white uppercase tracking-wider font-light" 
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    {consideration.title}
                  </h3>

                  {/* Underline divider */}
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mb-6" />

                  {/* Description */}
                  <p 
                    className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed" 
                    style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.8' }}
                  >
                    {consideration.description}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-[#FAF8F5] relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient Warm Spotlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#F1DEA8]/20 to-[#D4A755]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <motion.div
            className="waterflow-card relative w-full text-center px-8 py-16 md:py-20 rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-white/95 via-[#FAF8F5]/98 to-[#FFF1E6]/95 shadow-[0_30px_60px_rgba(159,105,32,0.05),inset_0_1px_2px_rgba(255,255,255,0.8)] overflow-hidden group"
            whileHover={{
              scale: 1.015,
              boxShadow: "0 40px 80px rgba(159,105,32,0.12), inset 0 1px 2px rgba(255,255,255,0.9)",
              borderColor: "rgba(212, 167, 85, 0.3)"
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Custom style injection for perfect 3D text and ultra-responsive waterflow morphing */}
            <style>{`
              .premium-3d-text {
                color: #462506 !important;
                display: inline-block;
                text-shadow: 
                  0 1px 0 #ebd8bc, 
                  0 2px 0 #dec29b, 
                  0 3px 0 #d1ab7a, 
                  0 4px 0 #c4945a, 
                  0 5px 6px rgba(70, 37, 6, 0.15),
                  0 10px 15px rgba(70, 37, 6, 0.1) !important;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
              }
              .premium-3d-text:hover {
                transform: translateY(-3px) scale(1.02);
                text-shadow: 
                  0 1px 0 #ebd8bc, 
                  0 2px 0 #dec29b, 
                  0 3px 0 #d1ab7a, 
                  0 4px 0 #c4945a, 
                  0 5px 0 #b7834a,
                  0 6px 0 #a9723c,
                  0 8px 12px rgba(70, 37, 6, 0.25),
                  0 15px 25px rgba(70, 37, 6, 0.15) !important;
              }
              .waterflow-card {
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
              }
              .waterflow-blob {
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
              }
            `}</style>

            {/* Liquid Waterflow Background Blob 1 */}
            <div className="waterflow-blob absolute top-[-30%] left-[-20%] w-[60%] h-[90%] rounded-[40%_60%_70%_30%_/_40%_55%_45%_60%] bg-gradient-to-tr from-[#F1DEA8]/35 to-[#FAF8F5]/50 blur-2xl pointer-events-none group-hover:scale-130 group-hover:translate-x-[20%] group-hover:translate-y-[15%] group-hover:opacity-90" />
            
            {/* Liquid Waterflow Background Blob 2 */}
            <div className="waterflow-blob absolute bottom-[-30%] right-[-20%] w-[60%] h-[90%] rounded-[50%_40%_30%_60%_/_50%_60%_40%_50%] bg-gradient-to-br from-[#D4A755]/15 to-[#FFF1E6]/75 blur-2xl pointer-events-none group-hover:scale-130 group-hover:translate-x-[-20%] group-hover:translate-y-[-15%] group-hover:opacity-90" />

            {/* Ambient Water Highlight Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-[#D4A755]/40 to-transparent opacity-60 group-hover:opacity-100 waterflow-blob" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Begin Today
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="premium-3d-text text-4xl md:text-5xl lg:text-6xl mb-6 font-normal font-serif cursor-default"
                style={{ fontFamily: 'Lora, serif' }}
              >
                Ready to Get Started?
              </motion.h2>

              {/* Underline Divider */}
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: '120px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-black/70 mb-10 font-light max-w-2xl"
                style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
              >
                Schedule a free consultation with our expert advisors today
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-12 py-5 bg-gradient-to-r from-[#9F6920] to-[#D4A755] text-white rounded-xl text-lg font-medium shadow-[0_10px_30px_rgba(159,105,32,0.15)] hover:shadow-[0_20px_45px_rgba(159,105,32,0.3)] transition-all duration-300 overflow-hidden"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                {/* Sweep-shine light overlay */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">Book Free Consultation</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Detail View Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isReady ? 1 : 0,
          visibility: isReady ? 'visible' : 'hidden',
          x: isReady ? 0 : 100
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1], delay: isReady ? 0.3 : 0 }}
        className="fixed inset-0 bg-[#1C0E03] z-[100] overflow-y-auto"
        style={{ top: 0, paddingTop: '80px' }}
      >
        {isOk && selectedService && (
          <div className="h-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row">
            {/* Left side - Large Service Image */}
            <div
              className="relative w-full lg:w-[650px] min-h-[350px] lg:min-h-full bg-cover bg-center flex items-center justify-center border-r border-[#D4A755]/10"
              style={{ backgroundImage: `url(${selectedService.image})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/75" />
              
              {/* Gradient Overlay - horizontal on desktop, vertical on mobile */}
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-[#1C0E03] opacity-0 lg:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0E03] opacity-100 lg:opacity-0" />
              
              {/* Image Frame */}
              <div className="relative z-10 text-center px-4 lg:px-8 py-8 w-full max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-[#D4A755]/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                >
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </motion.div>
              </div>

              {/* Back button (vertical bar on left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                onClick={closeServiceDetail}
                className="absolute left-0 top-0 w-[60px] lg:w-[100px] h-full bg-[#9F6920]/80 backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center hover:bg-[#D4A755] transition-all duration-300 group border-r border-[#D4A755]/20"
              >
                <X className="w-8 h-8 lg:w-10 lg:h-10 text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={1.5} />
                <span className="text-xs mt-4 text-white font-medium tracking-[0.2em] hidden lg:block" style={{ fontFamily: 'Source Sans 3, sans-serif', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                  BACK TO SERVICES
                </span>
              </motion.div>
            </div>

            {/* Right side - Service Content */}
            <div className="flex-1 flex items-start lg:items-center px-6 lg:px-20 py-12 lg:py-20 overflow-y-auto bg-[#1C0E03] text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="w-full max-w-3xl"
              >
                <div className="mb-8 text-center lg:text-left font-sans">
                  {/* Badge */}
                  <div className="inline-block mb-4 px-4 py-1.5 bg-[#D4A755]/10 border border-[#D4A755]/20 rounded-full">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      Core Consulting Service
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-5xl mb-4 text-white font-normal font-serif" style={{ fontFamily: 'Lora, serif' }}>
                    {selectedService.title}
                  </h2>
                  <div className="h-[1px] bg-gradient-to-r from-transparent lg:from-white/10 via-[#D4A755]/30 to-transparent lg:to-transparent w-full lg:w-48 my-6 mx-auto lg:mx-0" />
                  <p 
                    className="text-lg text-white/80 leading-relaxed font-light"
                    style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.8' }}
                  >
                    {selectedService.description}
                  </p>
                </div>

                {/* Features Included */}
                <div className="space-y-6 pt-6 border-t border-white/10">
                  <h3 className="text-2xl text-[#D4A755] font-light font-serif" style={{ fontFamily: 'Lora, serif' }}>
                    What's Included
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.features.map((feature: string, idx: number) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + idx * 0.08 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#D4A755]/20 transition-all duration-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#D4A755] mt-2.5 flex-shrink-0" />
                        <span className="text-white/85 text-base" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.6' }}>
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Booking / CTA Button */}
                <div className="mt-12">
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full lg:w-auto px-12 py-5 bg-gradient-to-r from-[#9F6920] to-[#D4A755] text-white rounded-xl text-lg font-medium shadow-lg hover:shadow-[0_15px_35px_rgba(159,105,32,0.25)] transition-all duration-300 overflow-hidden" 
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  >
                    {/* Sweep-shine overlay */}
                    <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />
                    <span className="relative z-10">Book This Service</span>
                  </motion.button>
                </div>

                {/* Mobile Back Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  onClick={closeServiceDetail}
                  className="lg:hidden mt-8 w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-all duration-300"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Back to Services
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}