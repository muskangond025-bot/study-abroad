import { motion, useScroll, useTransform, MotionValue, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Search, FileText, Send, CheckCircle, LucideIcon } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Consultation',
    description: 'Initial assessment of your goals and academic background'
  },
  {
    icon: FileText,
    title: 'University Selection',
    description: 'Curated list of universities matching your profile'
  },
  {
    icon: Send,
    title: 'Application',
    description: 'Complete application support and document preparation'
  },
  {
    icon: CheckCircle,
    title: 'Visa & Departure',
    description: 'Visa assistance and pre-departure orientation'
  }
];

interface DesktopTimelineStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  progress: MotionValue<number>;
}

function DesktopTimelineStep({ icon: Icon, title, description, index, progress }: DesktopTimelineStepProps) {
  // Entrance animations based on scroll progress
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 0.5, 1]);
  const entryY = useTransform(progress, [0, 1], [40, 0]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.95, 0.98, 1]);
  
  // Node animations
  const ringScale = useTransform(progress, [0, 1], [0.8, 1]);
  const ringOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.5, 1]);
  const glowOpacity = useTransform(progress, [0, 0.6, 1], [0, 0.3, 0.8]);
  const badgeScale = useTransform(progress, [0, 0.7, 1], [0.5, 0.8, 1]);
  
  // Card-specific transformations based on scroll progress
  const borderColor = useTransform(
    progress,
    [0, 0.7, 1],
    ["rgba(159, 105, 32, 0.08)", "rgba(159, 105, 32, 0.2)", "rgba(159, 105, 32, 0.35)"]
  );
  const cardBg = useTransform(
    progress,
    [0, 0.7, 1],
    ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.55)", "rgba(255, 254, 250, 0.85)"]
  );
  const shadowColor = useTransform(
    progress,
    [0, 0.7, 1],
    ["rgba(0, 0, 0, 0.02)", "rgba(159, 105, 32, 0.04)", "rgba(159, 105, 32, 0.12)"]
  );

  // 3D Tilt values driven by cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for buttery-smooth movements
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  // Dynamic light sheen center positions with a gold champagne core glow
  const sheenBg = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const xPct = ((xVal as number) + 0.5) * 100;
      const yPct = ((yVal as number) + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.3) 0%, rgba(212, 167, 85, 0.08) 35%, transparent 65%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = e.clientX - rect.left - width / 2;
    const yVal = e.clientY - rect.top - height / 2;
    
    mouseX.set(xVal / width);
    mouseY.set(yVal / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {/* Circle Node Container */}
      <div className="relative flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Premium SVG Orbital Spinner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 pointer-events-none select-none" style={{ z: -10 }}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Ambient gold glow sweep ring (Counter-Clockwise) */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={`url(#desktopGoldGradient1-${index})`}
              strokeWidth="1.5"
              strokeDasharray="40 180"
              strokeLinecap="round"
              className="animate-spin-counter-clockwise origin-center"
              style={{
                opacity: useTransform(progress, [0, 0.5, 1], [0.1, 0.4, 0.9])
              }}
            />
            {/* Dashed outer ring (Clockwise) */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={`url(#desktopGoldGradient2-${index})`}
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-spin-clockwise origin-center"
              style={{
                opacity: useTransform(progress, [0, 0.5, 1], [0.2, 0.6, 1])
              }}
            />
            {/* Orbital glow particle */}
            <motion.circle
              cx="50"
              cy="10"
              r="3.5"
              fill="#FFFFFF"
              stroke="#D4A755"
              strokeWidth="1.5"
              className="animate-spin-clockwise origin-center"
              style={{
                opacity: useTransform(progress, [0, 0.5, 1], [0, 0.5, 1]),
                filter: "drop-shadow(0 0 4px rgba(212, 167, 85, 0.8))"
              }}
            />
            <defs>
              <linearGradient id={`desktopGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id={`desktopGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#D4A755" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Active ripple wave glow */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#D4A755]/30 pointer-events-none"
          style={{ 
            scale: useTransform(progress, [0, 0.5, 1], [0.95, 1.05, 1.15]),
            opacity: useTransform(progress, [0, 0.5, 1], [0, 0.3, 0]),
            z: -2
          }}
        />

        {/* Ambient Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9F6920]/15 to-[#D4A755]/15 blur-lg pointer-events-none"
          style={{ opacity: glowOpacity, z: -5 }}
        />

        {/* Main Circle Node with gold outer bezel */}
        <motion.div
          className="w-32 h-32 flex-shrink-0 aspect-square rounded-full bg-white flex items-center justify-center mb-6 relative shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-[#D4A755]/20 group-hover:border-[#9F6920]/50 transition-colors duration-300"
          style={{ scale: ringScale, z: 50, transformStyle: "preserve-3d" }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          {/* Inner circle wrapper with premium gold highlight and shadow */}
          <div className="w-[84%] h-[84%] rounded-full bg-gradient-to-b from-white via-amber-50/10 to-gray-50 flex items-center justify-center relative shadow-inner border border-white group-hover:shadow-[inset_0_2px_8px_rgba(212,167,85,0.15)] transition-all duration-300">
            <Icon className="w-10 h-10 text-[#462506] transition-all duration-300 group-hover:text-[#9F6920] group-hover:scale-110" />
          </div>

          {/* Premium Metallic Number Badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-tr from-[#9F6920] via-[#F3E5AB] to-[#D4A755] text-[#462506] flex items-center justify-center text-sm font-bold shadow-[0_4px_12px_rgba(159,105,32,0.4)] border border-white"
            style={{ scale: badgeScale, z: 70 }}
          >
            {index + 1}
          </motion.div>
        </motion.div>
      </div>

      {/* Connection Dash between Node and Card */}
      <motion.div
        className="w-[2px] h-4 bg-gradient-to-b from-[#D4A755]/40 to-[#D4A755]/10 mb-2"
        style={{ 
          opacity: useTransform(progress, [0, 0.5], [0.2, 1]),
          z: 10
        }}
      />

      {/* Step Card */}
      <motion.div
        className="w-full p-6 rounded-2xl border text-center transition-all duration-500 backdrop-blur-md flex flex-col items-center h-full relative overflow-hidden"
        style={{
          opacity,
          y: entryY,
          scale,
          borderColor,
          backgroundColor: cardBg,
          boxShadow: useTransform(shadowColor, (c) => `0 10px 30px ${c}`),
          z: 20,
          transformStyle: "preserve-3d"
        }}
        whileHover={{
          borderColor: "rgba(159, 105, 32, 0.45)",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          boxShadow: "0 25px 50px rgba(159, 105, 32, 0.16)"
        }}
      >
        {/* Floating Luxury Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
          <div className="absolute top-[25%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#D4A755] blur-[0.5px] animate-luxury-sparkle-1" />
          <div className="absolute top-[70%] left-[80%] w-1 h-1 rounded-full bg-[#9F6920] blur-[0.2px] animate-luxury-sparkle-2" />
          <div className="absolute top-[45%] right-[20%] w-2 h-2 rounded-full bg-[#D4A755] blur-[1px] animate-luxury-sparkle-3" />
        </div>

        {/* Dynamic Light Sheen Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: sheenBg
          }}
        />

        {/* Animated Card Accent Line */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent z-10"
          style={{ 
            width: useTransform(progress, [0.3, 1], ["0%", "80%"])
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <h3 className="text-lg font-medium text-[#462506] mb-3 transition-colors duration-300 group-hover:text-[#9F6920]" style={{ fontFamily: 'Lora, serif' }}>
            {title}
          </h3>
          
          {/* Sub-divider */}
          <div className="w-8 h-[1px] bg-gray-200 mb-3 group-hover:bg-[#D4A755]/30 transition-colors duration-300" />

          <p className="text-sm text-black/60 leading-relaxed font-light font-sans" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface MobileTimelineStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  progress: MotionValue<number>;
}

function MobileTimelineStep({ icon: Icon, title, description, index, progress }: MobileTimelineStepProps) {
  const opacity = useTransform(progress, [0, 0.4, 1], [0, 0.6, 1]);
  const x = useTransform(progress, [0, 1], [-30, 0]);
  const scale = useTransform(progress, [0, 1], [0.95, 1]);
  
  // Icon node styling transforms
  const ringOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.4, 1]);
  const badgeScale = useTransform(progress, [0, 0.6, 1], [0.6, 0.8, 1]);

  return (
    <motion.div
      className="flex gap-6 relative z-10 group"
      style={{ opacity, x, scale }}
    >
      {/* Node circle on left */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center relative shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-[#D4A755]/20 group-hover:border-[#9F6920]/40 transition-colors duration-300 flex-shrink-0 aspect-square">
          
          {/* Mobile Orbital Spinner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none select-none" style={{ z: -5 }}>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Ambient gold glow sweep ring (Counter-Clockwise) */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={`url(#mobileGoldGradient1-${index})`}
                strokeWidth="1.5"
                strokeDasharray="40 180"
                strokeLinecap="round"
                className="animate-spin-counter-clockwise origin-center"
                style={{ opacity: useTransform(progress, [0, 0.5, 1], [0.1, 0.4, 0.9]) }}
              />
              {/* Dashed outer ring (Clockwise) */}
              <motion.circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke={`url(#mobileGoldGradient2-${index})`}
                strokeWidth="1"
                strokeDasharray="4 6"
                className="animate-spin-clockwise origin-center"
                style={{ opacity: useTransform(progress, [0, 0.5, 1], [0.2, 0.6, 1]) }}
              />
              <defs>
                <linearGradient id={`mobileGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                  <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id={`mobileGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#D4A755" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Inner circle wrapper */}
          <div className="w-[84%] h-[84%] rounded-full bg-gradient-to-b from-white to-gray-50 flex items-center justify-center relative z-10 shadow-inner border border-gray-50 group-hover:border-[#9F6920]/20 transition-all duration-300">
            <Icon className="w-6 h-6 text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300" />
          </div>

          {/* Active border ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-[#9F6920] z-0"
            style={{ opacity: ringOpacity }}
          />

          {/* Number badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-[#9F6920] via-[#F3E5AB] to-[#D4A755] text-[#462506] flex items-center justify-center text-xs font-bold shadow-md border border-white z-20"
            style={{ scale: badgeScale }}
          >
            {index + 1}
          </motion.div>
        </div>
      </div>

      {/* Content card on right */}
      <div className="flex-1 bg-white/65 backdrop-blur-md border border-[#9F6920]/15 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:border-[#9F6920]/40 group-hover:shadow-[0_12px_30px_rgba(159,105,32,0.13)] transition-all duration-300 relative overflow-hidden">
        {/* Floating Luxury Sparkles for Mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-[20%] left-[10%] w-1 h-1 rounded-full bg-[#D4A755] blur-[0.2px] animate-luxury-sparkle-1" />
          <div className="absolute bottom-[20%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#9F6920] blur-[0.5px] animate-luxury-sparkle-2" />
        </div>
        
        {/* Premium accent line on card side */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-[#9F6920]/45 to-transparent" />
        
        <h3 className="text-lg font-medium text-[#462506] mb-2" style={{ fontFamily: 'Lora, serif' }}>
          {title}
        </h3>
        <p className="text-sm text-black/60 leading-relaxed font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Progress for the horizontal line (0 to 100%)
  const lineProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // Pre-calculate all step progress values
  const step0Progress = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const step1Progress = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const step2Progress = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const step3Progress = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  
  const stepProgressValues = [step0Progress, step1Progress, step2Progress, step3Progress];

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] overflow-hidden">
        {/* Subtle grid engineering pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Ambient lighting/glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent pointer-events-none" />

        <section className="w-full py-24 overflow-hidden relative z-10">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-center mb-20 relative z-10"
            >
              {/* Gold subtitle */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-[#9F6920] text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              >
                Methodology
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-normal text-[#462506] mb-4"
                style={{ fontFamily: 'Lora, serif' }}
              >
                How It Works
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-base md:text-lg text-black/60 max-w-2xl mx-auto"
                style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
              >
                A refined, step-by-step process designed to transition you seamlessly into your global education journey
              </motion.p>
            </motion.div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block relative mt-8">
              {/* Horizontal Line Track Background */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-[#462506]/5 rounded-full" />

              {/* Progress Filling Line */}
              <div className="absolute top-16 left-0 right-0 h-1 rounded-full overflow-hidden pointer-events-none">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920]"
                  style={{ 
                    width: useTransform(lineProgress, (v) => `${v * 100}%`),
                    transformOrigin: 'left center'
                  }}
                />
              </div>
              
              {/* Traveling Glow Particle for Desktop */}
              <motion.div
                className="absolute top-16 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-[#D4A755] shadow-[0_0_15px_rgba(212,167,85,1)] z-20 pointer-events-none"
                style={{
                  left: useTransform(lineProgress, (v) => `calc(${v * 100}% - 10px)`),
                  opacity: useTransform(lineProgress, [0, 0.02], [0, 1])
                }}
              />

              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <DesktopTimelineStep
                    key={index}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    index={index}
                    progress={stepProgressValues[index]}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden relative space-y-12 max-w-md mx-auto pt-4">
              {/* Track background */}
              <div className="absolute left-8 top-8 bottom-8 w-[3px] bg-black/5 rounded-full" />
              
              {/* Progress filling line */}
              <div className="absolute left-8 top-8 bottom-8 w-[3px] rounded-full overflow-hidden pointer-events-none">
                <motion.div
                  className="w-full h-full bg-gradient-to-b from-[#9F6920] via-[#D4A755] to-[#9F6920]"
                  style={{ 
                    scaleY: lineProgress,
                    transformOrigin: 'top center'
                  }}
                />
              </div>
              
              {/* Traveling glow particle for mobile */}
              <motion.div
                className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-[#D4A755] shadow-[0_0_12px_rgba(212,167,85,1)] z-20 pointer-events-none"
                style={{
                  top: useTransform(lineProgress, (v) => `calc(32px + ${v} * (100% - 64px))`),
                  y: '-50%',
                  opacity: useTransform(lineProgress, [0, 0.02], [0, 1])
                }}
              />

              {steps.map((step, index) => (
                <MobileTimelineStep
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  index={index}
                  progress={stepProgressValues[index]}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}