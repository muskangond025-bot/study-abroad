import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Briefcase, TrendingUp, Users, LucideIcon } from 'lucide-react';

const audiences = [
  {
    icon: GraduationCap,
    title: 'High School Students',
    description: 'Planning your undergraduate journey abroad with expert guidance from application to enrollment.',
    color: '#9F6920'
  },
  {
    icon: Briefcase,
    title: 'Working Professionals',
    description: 'Advance your career with MBA programs, executive education, and specialized master\'s degrees.',
    color: '#D4A755'
  },
  {
    icon: TrendingUp,
    title: 'Career Changers',
    description: 'Transition to new fields with programs designed for professionals seeking new opportunities.',
    color: '#9F6920'
  },
  {
    icon: Users,
    title: 'Parents & Families',
    description: 'Supporting your child\'s educational dreams with comprehensive planning and financial guidance.',
    color: '#D4A755'
  }
];

interface AudienceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  color: string;
  scrollYProgress: MotionValue<number>;
}

function AudienceCard({ icon: Icon, title, description, index, color, scrollYProgress }: AudienceCardProps) {
  // mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for buttery-smooth movements
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const isLeft = index % 2 === 0;

  // Custom scroll ranges for staggering each card's entry
  const scrollStart = 0.05 + index * 0.03;
  const scrollEnd = 0.25 + index * 0.03;

  // Transform scroll progress to card horizontal offset
  const rawCardX = useTransform(
    scrollYProgress,
    [0, scrollStart, scrollEnd, 1],
    [isLeft ? -250 : 250, isLeft ? -250 : 250, 0, 0]
  );
  
  // Transform scroll progress to card opacity
  const rawCardOpacity = useTransform(
    scrollYProgress,
    [0, scrollStart, scrollEnd, 1],
    [0, 0, 1, 1]
  );

  // Apply spring physics so even fast scroll jerks are smoothed out beautifully!
  const springCardX = useSpring(rawCardX, { damping: 26, stiffness: 60 });
  const springCardOpacity = useSpring(rawCardOpacity, { damping: 20, stiffness: 80 });

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  // Dynamic Champagne-gold light sheen reflection
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        x: springCardX,
        opacity: springCardOpacity,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white/25 hover:border-white/35 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,167,85,0.08)] flex flex-col md:flex-row items-center md:items-start gap-8 cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.02)]"
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#D4A755] blur-[0.5px] animate-luxury-sparkle-1" />
        <div className="absolute top-[70%] left-[85%] w-1 h-1 rounded-full bg-[#9F6920] blur-[0.2px] animate-luxury-sparkle-2" />
        <div className="absolute top-[45%] right-[15%] w-2 h-2 rounded-full bg-[#D4A755] blur-[1px] animate-luxury-sparkle-3" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {/* Icon Circle Container with SVG orbital spinner */}
      <div className="relative mb-0 md:mt-2 flex-shrink-0" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
        {/* Orbital SVG Spinner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Ambient gold glow sweep ring (Counter-Clockwise) */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={`url(#audienceGoldGradient1-${index})`}
              strokeWidth="1.5"
              strokeDasharray="40 180"
              strokeLinecap="round"
              className="animate-spin-counter-clockwise origin-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* Dashed outer ring (Clockwise) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={`url(#audienceGoldGradient2-${index})`}
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-spin-clockwise origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
            <defs>
              <linearGradient id={`audienceGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id={`audienceGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          className="w-20 h-20 rounded-full flex items-center justify-center relative shadow-[0_6px_15px_rgba(0,0,0,0.03)] border border-[#D4A755]/30 group-hover:border-[#9F6920]/60 transition-colors duration-300"
          style={{ backgroundColor: color, z: 50 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Inner glossy reflection wrapper */}
          <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center relative z-10 shadow-inner">
            <Icon className="w-9 h-9 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full text-center md:text-left flex-1" style={{ transformStyle: "preserve-3d", z: 30 }}>
        <h3 className="text-2xl md:text-3xl mb-3 text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 font-medium font-serif" style={{ fontFamily: 'Lora, serif' }}>
          {title}
        </h3>
        <p className="text-base md:text-lg text-black/65 leading-relaxed font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
          {description}
        </p>
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

export function WhoIsThisFor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] overflow-hidden">
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Radial lighting / glow spot */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-50/10 via-transparent to-transparent pointer-events-none" />

      {/* Background Gradient Accent */}
      <motion.div 
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F1DEA8]/15 to-transparent pointer-events-none"
        style={{ y }}
      />

      {/* Glowing luxury gold waves/curves for high fidelity */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-[#D4A755]/10 to-transparent blur-[100px] pointer-events-none rotate-12" />
      <div className="absolute bottom-1/4 right-10 w-[700px] h-[350px] rounded-full bg-gradient-to-l from-[#9F6920]/8 to-transparent blur-[120px] pointer-events-none -rotate-12" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/40 border border-[#D4A755]/20 rounded-full"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              For Everyone
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl mb-6 text-[#462506] font-normal" style={{ fontFamily: 'Lora, serif' }}>
            Who Is This Platform For?
          </h2>

          {/* Underline drawing animation */}
          <motion.div 
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: '140px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <p className="text-xl text-black/60 max-w-3xl mx-auto mt-8 leading-relaxed font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            Whether you're a student, professional, or parent, our tailored guidance helps you navigate the path to global education success.
          </p>
        </motion.div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <AudienceCard
              key={index}
              icon={audience.icon}
              title={audience.title}
              description={audience.description}
              index={index}
              color={audience.color}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-black/60 mb-6 font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            Not sure where you fit? Let's talk.
          </p>
          
          <motion.button
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 15px 35px rgba(159, 105, 32, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 relative overflow-hidden bg-gradient-to-r from-[#9F6920] to-[#D4A755] text-white rounded-xl font-medium transition-all duration-300 shadow-md group border border-[#D4A755]/20"
            style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '18px' }}
          >
            {/* Elegant Framer Motion shine overlay */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] pointer-events-none"
              initial={{ left: '-50%' }}
              whileHover={{ left: '150%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <span className="relative z-10">Get Personalized Guidance</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
