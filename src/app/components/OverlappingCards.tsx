import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

// Import images
import campusLobby from '../../assets/eduglobal_campus_lobby.png';
import campusEntrance from '../../assets/eduglobal_campus_entrance.png';
import campusStudying from '../../assets/eduglobal_campus_studying.png';
import heroBg from '../../assets/eduglobal_hero_bg.png';

const cards = [
  {
    number: '500',
    suffix: '+',
    title: 'Partner Universities',
    description: 'Access to an extensive global network of prestigious institutions across every major academic discipline. From Ivy League schools to top European universities, we connect you with the world\'s finest educational opportunities tailored to your ambitions.',
    bgImage: campusLobby
  },
  {
    number: '15000',
    suffix: '+',
    title: 'Students Placed',
    description: 'Successfully guided thousands of aspiring scholars to their dream universities worldwide. Our proven methodology and personalized approach have helped students secure admissions to top-tier institutions, turning their academic aspirations into reality with comprehensive support every step of the way.',
    bgImage: campusStudying
  },
  {
    number: '35',
    suffix: '+',
    title: 'Countries',
    description: 'Study destinations spanning every continent, from North America and Europe to Asia-Pacific and beyond. We offer expert guidance for universities in the USA, UK, Canada, Australia, Germany, Singapore, and many more countries, ensuring you find the perfect fit for your educational journey.',
    bgImage: heroBg
  },
  {
    number: '98',
    suffix: '%',
    title: 'Visa Success Rate',
    description: 'Industry-leading track record in visa approvals with meticulous documentation support and interview preparation. Our experienced team ensures complete compliance with immigration requirements, maximizing your chances of success with thorough guidance through every stage of the visa application process.',
    bgImage: campusEntrance
  }
];

interface InteractiveCardProps {
  card: typeof cards[0];
  index: number;
  activeIndex: number;
}

function InteractiveCard({ card, index, activeIndex }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Mouse hover 3D tilt tracking (only active for the top active card)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const transformedY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const transformedX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useSpring(transformedY, { stiffness: 120, damping: 15 });
  const rotateY = useSpring(transformedX, { stiffness: 120, damping: 15 });

  const isActive = index === activeIndex;
  const isPeeled = index < activeIndex;
  const offset = index - activeIndex;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(normX);
    mouseY.set(normY);
    
    const pctX = ((e.clientX - rect.left) / width) * 100;
    const pctY = ((e.clientY - rect.top) / height) * 100;
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--x', `${pctX}%`);
      spotlightRef.current.style.setProperty('--y', `${pctY}%`);
    }
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!isActive) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [isActive]);

  // Animation variants for auto peeling effect
  const cardVariants = {
    peeled: {
      y: [0, -30, 800],
      x: [0, 20, index % 2 === 0 ? -220 : 220],
      rotate: [0, -8, index % 2 === 0 ? -32 : 32],
      scale: [1, 1.04, 0.9],
      opacity: [1, 0.95, 0],
      transition: {
        duration: 0.85,
        ease: ["easeOut", "backIn"],
        times: [0, 0.15, 1]
      }
    },
    active: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.34, 1.3, 0.64, 1] }
    },
    stacked: (off: number) => ({
      x: 0,
      y: off * 15,
      rotate: 0,
      scale: 1 - off * 0.04,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <motion.div
      className="absolute w-[90vw] max-w-[600px] h-[450px]"
      style={{
        zIndex: isActive ? 20 : isPeeled ? 30 : 10 - index
      }}
      variants={cardVariants}
      animate={isPeeled ? "peeled" : isActive ? "active" : "stacked"}
      custom={offset}
    >
      {/* 3D Tilt Card Wrapper */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(159,105,32,0.08)] flex flex-col justify-center items-center p-12 cursor-default border border-[#D4A755]/15 transition-all duration-300 hover:border-[#9F6920]/40 hover:shadow-[0_35px_80px_rgba(159,105,32,0.15)] overflow-hidden"
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        {/* Background Image Layer (Ken Burns & Glassmorphic Blur) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={card.bgImage} 
            alt="" 
            className="w-full h-full object-cover scale-105 transition-transform duration-[6000ms] ease-out group-hover:scale-115 pointer-events-none select-none"
            style={{ opacity: isActive ? 0.15 : 0.08 }}
          />
          {/* Light Glass Base */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
          {/* Gold Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A755]/5 via-transparent to-[#9F6920]/5" />
        </div>

        {/* Outer Glow Outline Accent */}
        <div 
          className="absolute inset-0 rounded-2xl border border-[#D4A755]/10 pointer-events-none z-10"
          style={{ transform: 'translateZ(10px)' }}
        />

        {/* Dynamic Light Spotlight Effect */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 220px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.6) 0%, rgba(255,243,212,0.3) 45%, rgba(212,167,85,0.05) 80%, transparent 100%)`,
            transform: 'translateZ(15px)'
          }}
        />

        {/* Volumetric shadow layer */}
        <div 
          className="absolute inset-0 rounded-2xl bg-[#9F6920]/5 pointer-events-none blur-md z-0"
          style={{ transform: 'translateZ(-15px)' }}
        />

        {/* Card Content */}
        <div 
          className={`relative z-20 flex flex-col items-center select-none w-full h-full justify-between py-4 transition-opacity duration-500 ${
            index <= activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
        >
          {/* Main 3D Number */}
          <div 
            className="text-[#462506] text-center font-bold tracking-tight font-serif"
            style={{ 
              fontFamily: 'Lora, serif', 
              fontSize: 88,
              textShadow: '0 0 20px rgba(212,167,85,0.15), 1px 1px 0px #fff, 2px 2px 0px rgba(212, 167, 85, 0.25), 3px 3px 0px rgba(159, 105, 32, 0.15)'
            }}
          >
            {card.number}{card.suffix}
          </div>
          
          <div className="flex flex-col items-center">
            {/* Card Title */}
            <h3
              className="text-3xl mb-4 text-center text-[#462506] font-normal font-serif"
              style={{ 
                fontFamily: 'Lora, serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {card.title}
            </h3>
            
            {/* Description Paragraph */}
            <p
              className="text-center text-base text-black/65 leading-relaxed font-light max-w-md"
              style={{ 
                fontFamily: 'Source Sans 3, sans-serif'
              }}
            >
              {card.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function OverlappingCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress [0, 1] to card index
    let index = 0;
    if (latest < 0.15) {
      index = 0;
    } else if (latest < 0.45) {
      index = 1;
    } else if (latest < 0.75) {
      index = 2;
    } else {
      index = 3;
    }
    setActiveIndex(index);
  });

  const handlePillClick = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollContainerHeight = rect.height;
    
    // Map index to scroll fractions: Card 0 -> 0.05, Card 1 -> 0.3, Card 2 -> 0.6, Card 3 -> 0.9
    const fractions = [0.05, 0.3, 0.6, 0.9];
    const targetFraction = fractions[index];
    
    // Calculate target scroll position relative to current viewport scroll
    const targetScrollY = window.scrollY + rect.top + (targetFraction * (scrollContainerHeight - window.innerHeight));
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative h-[300vh] border-t border-[#D4A755]/10">
      <div 
        className="sticky top-0 h-screen bg-gradient-to-b from-white via-[#FAF8F5] to-white flex flex-col justify-between overflow-hidden py-16"
      >
        {/* Luxury gold micro-dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(#D4A755 1.5px, transparent 1.5px)', 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Floating glassmorphic backdrop spheres for depth and glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4A755]/3 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#9F6920]/2 blur-[130px] pointer-events-none" />

        {/* Title Section */}
        <div className="text-center mb-16 z-10 pointer-events-none">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9F6920] font-semibold mb-3 block">
            Our Global Footprint
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-[#462506] tracking-tight font-serif" style={{ fontFamily: 'Lora, serif' }}>
            EduGlobal By The Numbers
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4A755]/40 to-transparent mx-auto mt-4" />
        </div>

        {/* Auto Stacking Area */}
        <div className="relative w-full max-w-4xl px-8 h-[480px] flex items-center justify-center mx-auto mt-8 mb-16">
          {cards.map((card, index) => (
            <InteractiveCard key={index} card={card} index={index} activeIndex={activeIndex} />
          ))}
        </div>

        {/* Stacking indicator pills */}
        <div className="flex justify-center items-center gap-3 z-20 pb-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePillClick(index)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                index === activeIndex 
                  ? 'w-10 bg-[#D4A755] shadow-[0_0_12px_rgba(212,167,85,0.4)]' 
                  : 'w-2 bg-black/10 hover:bg-black/25'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}