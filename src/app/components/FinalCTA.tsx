import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Compass as CompassIcon, GraduationCap, Globe, Send } from 'lucide-react';

// Sub-component for floating light particles
function FloatingParticle({ index }: { index: number }) {
  // Generate random trajectories and sizes for high-fidelity randomness
  const size = Math.random() * 4 + 2;
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  const duration = Math.random() * 20 + 20;
  const delay = Math.random() * -20;

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-tr from-[#D4A755]/40 to-[#FAF8F5]/30 pointer-events-none blur-[0.5px]"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        y: [0, -120, 0],
        x: [0, Math.random() * 80 - 40, 0],
        opacity: [0.1, 0.7, 0.1],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        !window.matchMedia('(hover: hover)').matches
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse coordinate motion values relative to the card's center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, organic spring physics parameters
  const springConfig = { stiffness: 90, damping: 20, mass: 1.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotations for the main glass container (Card)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  // Dynamic light reflection coordinates on the glass surface
  const shineX = useTransform(smoothMouseX, [-0.5, 0.5], ['20%', '80%']);
  const shineY = useTransform(smoothMouseY, [-0.5, 0.5], ['20%', '80%']);

  // Parallax offsets for floating items
  const parallaxGlobeX = useTransform(smoothMouseX, [-0.5, 0.5], [-45, 45]);
  const parallaxGlobeY = useTransform(smoothMouseY, [-0.5, 0.5], [-45, 45]);

  const parallaxCapX = useTransform(smoothMouseX, [-0.5, 0.5], [50, -50]);
  const parallaxCapY = useTransform(smoothMouseY, [-0.5, 0.5], [50, -50]);

  const parallaxCompassX = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const parallaxCompassY = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35]);

  const parallaxPlaneX = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const parallaxPlaneY = useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]);

  // Handle real-time mouse movement
  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMobile) return;
    
    // Normalized coordinates from -0.5 to 0.5 based on viewport
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset coordinates on mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="py-36 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFF1E6] to-[#F1DEA8] w-full"
      style={{ perspective: '1500px' }}
    >
      {/* Visual boundary overlay to bridge light FAQ and dark CTA */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAF8F5] to-transparent pointer-events-none z-10" />

      {/* Atmospheric Glowing Spheres for 3D Depth */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-[#FFEBD6]/60 blur-[100px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-[#D4A755]/12 blur-[100px] pointer-events-none" />

      {/* Floating Sparkles & Light Particles */}
      {Array.from({ length: 22 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}

      {/* Decorative Gold Circular Astrolabe Path behind the card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#D4A755]/10 rounded-full pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] border border-[#D4A755]/5 border-dashed rounded-full animate-spin-clockwise" />
        <div className="absolute w-[500px] h-[500px] border border-[#D4A755]/5 rounded-full animate-spin-counter-clockwise" />
      </div>

      <div className="max-w-5xl mx-auto px-8 relative z-10 flex items-center justify-center min-h-[500px]">

        {/* ---------------- 3D LAYER 1: FLOATING GLOBE (TOP-LEFT) ---------------- */}
        <motion.div
          className="absolute top-4 left-4 md:top-8 md:left-12 z-20 pointer-events-none hidden sm:block"
          style={{
            x: parallaxGlobeX,
            y: parallaxGlobeY,
            rotate: useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]),
          }}
          animate={{
            y: [0, -14, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative group/globe select-none">
            {/* Ambient gold glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4A755]/30 to-transparent rounded-full blur-md opacity-75 group-hover/globe:opacity-100 transition-opacity duration-500" />
            <div className="w-24 h-24 rounded-full bg-white/50 border border-white/70 backdrop-blur-xl flex items-center justify-center shadow-[0_15px_35px_rgba(159,105,32,0.1),inset_0_2px_5px_rgba(255,255,255,0.7)] overflow-hidden">
              {/* Globe grid vector */}
              <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-90 text-[#9F6920]">
                <defs>
                  <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D4A755" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#9F6920" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#globeGlow)" stroke="#9F6920" strokeWidth="1.8" strokeDasharray="3 3" />
                <path d="M50,5 A45,45 0 0,0 50,95 A45,45 0 0,0 50,5" fill="none" stroke="#9F6920" strokeWidth="1.2" />
                <path d="M5,50 A45,45 0 0,0 95,50" fill="none" stroke="#9F6920" strokeWidth="1.2" />
                <path d="M15,25 Q50,40 85,25" fill="none" stroke="#9F6920" strokeWidth="1" opacity="0.75" />
                <path d="M15,75 Q50,60 85,75" fill="none" stroke="#9F6920" strokeWidth="1" opacity="0.75" />
                <path d="M25,15 Q40,50 25,85" fill="none" stroke="#9F6920" strokeWidth="1" opacity="0.75" />
                <path d="M75,15 Q60,50 75,85" fill="none" stroke="#9F6920" strokeWidth="1" opacity="0.75" />
              </svg>
              <Globe className="absolute w-7 h-7 text-[#462506] drop-shadow-[0_2px_4px_rgba(212,167,85,0.3)]" strokeWidth={2.0} />
            </div>
          </div>
        </motion.div>

        {/* ---------------- 3D LAYER 2: FLOATING GRADUATION CAP (TOP-RIGHT) ---------------- */}
        <motion.div
          className="absolute top-2 right-4 md:-top-6 md:right-16 z-20 pointer-events-none hidden sm:block"
          style={{
            x: parallaxCapX,
            y: parallaxCapY,
            rotate: useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]),
          }}
          animate={{
            y: [0, -18, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <div className="relative group/cap select-none">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#9F6920]/30 to-transparent rounded-full blur-md opacity-75 group-hover/cap:opacity-100 transition-opacity duration-500" />
            <div className="w-24 h-24 rounded-full bg-white/50 border border-white/70 backdrop-blur-xl flex items-center justify-center shadow-[0_15px_35px_rgba(159,105,32,0.1),inset_0_2px_5px_rgba(255,255,255,0.7)] overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#9F6920] opacity-95">
                <defs>
                  <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4A755" />
                    <stop offset="100%" stopColor="#9F6920" />
                  </linearGradient>
                </defs>
                {/* 3D Mortarboard Top diamond */}
                <path d="M50,15 L85,32 L50,49 L15,32 Z" fill="url(#capGrad)" stroke="#9F6920" strokeWidth="1.2" />
                <path d="M50,18 L80,32 L50,46 L20,32 Z" fill="#462506" opacity="0.65" />
                {/* Cap Base */}
                <path d="M30,42 L30,55 C30,62 70,62 70,55 L70,42" fill="none" stroke="#462506" strokeWidth="1.8" />
                <path d="M30,42 Q50,48 70,42" fill="none" stroke="#9F6920" strokeWidth="1.2" />
                {/* Tassel */}
                <path d="M50,32 Q72,36 78,54 L78,64" fill="none" stroke="#9F6920" strokeWidth="1.2" />
                <circle cx="78" cy="65" r="3.5" fill="#462506" />
              </svg>
              <GraduationCap className="absolute w-7 h-7 text-[#462506] drop-shadow-[0_2px_4px_rgba(212,167,85,0.3)]" strokeWidth={2.0} />
            </div>
          </div>
        </motion.div>

        {/* ---------------- 3D LAYER 3: LUXURY COMPASS (BOTTOM-LEFT) ---------------- */}
        <motion.div
          className="absolute bottom-6 left-4 md:bottom-8 md:left-14 z-20 pointer-events-none hidden sm:block"
          style={{
            x: parallaxCompassX,
            y: parallaxCompassY,
            rotate: useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]),
          }}
          animate={{
            y: [0, -16, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        >
          <div className="relative group/compass select-none">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4A755]/30 to-transparent rounded-full blur-md opacity-75" />
            <div className="w-24 h-24 rounded-full bg-white/50 border border-white/70 backdrop-blur-xl flex items-center justify-center shadow-[0_15px_35px_rgba(159,105,32,0.1),inset_0_2px_5px_rgba(255,255,255,0.7)] overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#9F6920]">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#9F6920" strokeWidth="1.8" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="#9F6920" strokeWidth="0.8" strokeDasharray="2 2" />
                {/* Dial Directions */}
                <text x="47" y="24" className="text-[9px] font-bold fill-[#462506]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>N</text>
                <text x="47" y="85" className="text-[9px] font-bold fill-[#462506]/70" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>S</text>
                <text x="77" y="53" className="text-[9px] font-bold fill-[#462506]/70" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>E</text>
                <text x="17" y="53" className="text-[9px] font-bold fill-[#462506]/70" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>W</text>
                {/* Rotating needle */}
                <motion.g 
                  style={{ originX: '50px', originY: '50px' }}
                  animate={{ rotate: isHovered ? [0, 360] : 0 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                >
                  <polygon points="50,18 54,50 50,56" fill="#9F6920" stroke="#462506" strokeWidth="0.5" />
                  <polygon points="50,82 54,50 50,44" fill="#FAF8F5" stroke="#9F6920" strokeWidth="0.5" opacity="0.8" />
                  <circle cx="50" cy="50" r="3.5" fill="#462506" stroke="#D4A755" strokeWidth="1" />
                </motion.g>
              </svg>
              <CompassIcon className="absolute w-7 h-7 text-[#462506] drop-shadow-[0_2px_4px_rgba(212,167,85,0.3)]" strokeWidth={2.0} />
            </div>
          </div>
        </motion.div>

        {/* ---------------- 3D LAYER 4: origami GOLD PLANE (BOTTOM-RIGHT) ---------------- */}
        <motion.div
          className="absolute bottom-4 right-4 md:bottom-2 md:right-16 z-20 pointer-events-none hidden sm:block"
          style={{
            x: parallaxPlaneX,
            y: parallaxPlaneY,
            rotate: useTransform(smoothMouseX, [-0.5, 0.5], [25, -25]),
          }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.7,
          }}
        >
          <div className="relative group/plane select-none">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#9F6920]/30 to-transparent rounded-full blur-md opacity-75" />
            <div className="w-24 h-24 rounded-full bg-white/50 border border-white/70 backdrop-blur-xl flex items-center justify-center shadow-[0_15px_35px_rgba(159,105,32,0.1),inset_0_2px_5px_rgba(255,255,255,0.7)] overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#9F6920]">
                <defs>
                  <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4A755" />
                    <stop offset="100%" stopColor="#9F6920" />
                  </linearGradient>
                </defs>
                {/* Origami flight paths */}
                <polygon points="15,45 85,20 45,60" fill="url(#planeGrad)" stroke="#9F6920" strokeWidth="1.2" />
                <polygon points="45,60 85,20 60,65" fill="#9F6920" stroke="#462506" strokeWidth="0.8" opacity="0.95" />
                <polygon points="45,60 40,75 52,68" fill="#462506" stroke="#462506" strokeWidth="0.8" />
                <path d="M15,45 Q5,55 0,70" fill="none" stroke="#9F6920" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.75" />
              </svg>
              <Send className="absolute w-6 h-6 text-[#462506] drop-shadow-[0_2px_4px_rgba(212,167,85,0.3)]" strokeWidth={2.0} />
            </div>
          </div>
        </motion.div>

        {/* ---------------- MAIN TACTILE 3D CARD CONTAINER ---------------- */}
        <motion.div
          ref={cardRef}
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="w-full relative bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 p-12 md:p-20 text-center shadow-[0_50px_100px_rgba(159,105,32,0.06),inset_0_1px_2px_rgba(255,255,255,0.65)] hover:border-white/80 transition-colors duration-500 overflow-hidden group select-none"
        >
          {/* Crystalline Glass Specular Shine Effect that tracks the cursor */}
          <motion.div
            className="absolute -inset-1/2 bg-[radial-gradient(circle_at_var(--shine-x)_var(--shine-y),rgba(255,255,255,0.4)_0%,transparent_60%)] pointer-events-none z-0 mix-blend-overlay"
            style={{
              // @ts-expect-error Custom CSS variable binding
              '--shine-x': shineX,
              '--shine-y': shineY,
            }}
          />

          {/* Premium Gold Sparkle Line Layer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#D4A755]/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Glass Inner Card Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
            
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9F6920]/5 border border-[#9F6920]/15 mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              style={{ transform: 'translateZ(10px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9F6920] animate-ping" />
              <span className="text-[12px] uppercase tracking-wider text-[#9F6920] font-semibold" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Consultations Open
              </span>
            </motion.div>

            {/* Header with Hover Text-Roll Effect */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl mb-6 text-[#462506] font-bold leading-tight font-serif select-none"
              style={{ fontFamily: 'Lora, serif', transform: 'translateZ(20px)' }}
            >
              Ready to Begin <br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] bg-[size:200%_auto] hover:animate-pulse"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Your Journey?
              </span>
            </motion.h2>

            {/* Premium Description text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#462506]/85 mb-12 max-w-2xl mx-auto font-light leading-relaxed select-none"
              style={{ fontFamily: 'Source Sans 3, sans-serif', transform: 'translateZ(10px)' }}
            >
              Schedule a free consultation with our expert advisors and take the first step towards your international education. Discover elite pathways curated exclusively for you.
            </motion.p>

            {/* ---------------- PHYSICAL 3D GOLDEN BUTTON ---------------- */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transform: 'translateZ(30px)' }}
            >
              <Link to="/contact" className="block relative group/btn">
                
                {/* 3D Button Extrusion Depth Layer (Shadow backing) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#704915] to-[#51350F] rounded-2xl transform translate-y-[6px] shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover/btn:translate-y-[8px] group-active/btn:translate-y-[2px]" />

                {/* Top Button Face Layer */}
                <motion.div
                  className="px-14 py-6 bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] text-white rounded-2xl text-lg font-semibold relative overflow-hidden transition-all duration-300 group-hover/btn:-translate-y-[2px] group-active/btn:translate-y-[4px] border-t border-white/30 flex items-center justify-center gap-3"
                  style={{ 
                    fontFamily: 'Source Sans 3, sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 0 0 1px rgba(0,0,0,0.1)' 
                  }}
                >
                  {/* Specular White Shimmer Swipe on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_ease-in-out_infinite]" 
                    style={{ transform: 'skewX(-25deg)' }}
                  />

                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </motion.div>

              </Link>
            </motion.div>

          </div>
        </motion.div>

      </div>

      {/* Smooth transitional fade into Footer's warm yellowish/buttermilk background */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F1DEA8] via-[#F1DEA8]/85 to-transparent pointer-events-none z-10" />
    </section>
  );
}