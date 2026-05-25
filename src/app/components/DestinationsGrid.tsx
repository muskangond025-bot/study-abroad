import { motion, useInView, useMotionValue, useTransform, type MotionValue } from 'motion/react';
import { useRef, useState } from 'react';
import { Coins, Clock, BookOpen, Briefcase, Check } from 'lucide-react';

interface Destination {
  name: string;
  image: string;
  universities: string;
  tag: string;
  avgSalary: string;
  studyCost: string;
  pathway: string;
  popularSectors: string;
}

const destinations: Destination[] = [
  {
    name: 'United States',
    image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=800&q=80',
    universities: '200+ Universities',
    tag: 'STEM & Tech Leader',
    avgSalary: '$95,000 / yr',
    studyCost: '$25,000 / yr',
    pathway: 'Up to 3-Yr OPT',
    popularSectors: 'CS, AI, Finance, Biotech'
  },
  {
    name: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    universities: '150+ Universities',
    tag: 'Fast-Track Masters',
    avgSalary: '£48,000 / yr',
    studyCost: '£18,000 / yr',
    pathway: '2-Yr Graduate Visa',
    popularSectors: 'Business, Tech, MBA, Health'
  },
  {
    name: 'Canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80',
    universities: '100+ Universities',
    tag: 'Easiest PR Route',
    avgSalary: 'C$78,000 / yr',
    studyCost: 'C$22,000 / yr',
    pathway: '3-Yr PGWP Permit',
    popularSectors: 'Engineering, Data, Tech'
  },
  {
    name: 'Australia',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80',
    universities: '80+ Universities',
    tag: 'High Salary & Sun',
    avgSalary: 'A$82,000 / yr',
    studyCost: 'A$26,000 / yr',
    pathway: 'Post-Study Stream',
    popularSectors: 'IT, Nursing, Engineering'
  },
  {
    name: 'Germany',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    universities: '120+ Universities',
    tag: 'Zero Tuition Fees',
    avgSalary: '€56,000 / yr',
    studyCost: 'Free / Sem. Fee',
    pathway: '18-Mo Job Seeker',
    popularSectors: 'Automotive, STEM, Robotics'
  },
  {
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    universities: '40+ Universities',
    tag: 'Global Tech & Finance',
    avgSalary: 'S$74,000 / yr',
    studyCost: 'S$30,000 / yr',
    pathway: '1-Yr Work Pass',
    popularSectors: 'Finance, CS, Logistics'
  }
];

function DestinationCard({ 
  destination, 
  index
}: { 
  destination: Destination; 
  index: number; 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-full h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        className={`relative h-[320px] sm:h-[340px] md:h-[350px] lg:h-[360px] rounded-2xl overflow-hidden cursor-pointer group border transition-all duration-300 ${
          isClicked 
            ? 'border-[#D4A755] shadow-[0_12px_36px_rgba(212,167,85,0.25)]' 
            : 'border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
      {/* Background Image */}
      <motion.img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-70'}`} />

      {/* Premium Glass Tag on Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black/50 backdrop-blur-md border border-[#D4A755]/30 rounded-full px-3 py-1 shadow-lg">
          <span className="text-[10px] tracking-wider font-bold text-[#F1DEA8] uppercase block">
            {destination.tag}
          </span>
        </div>
      </div>

      {/* Bottom text & stats glassmorphism panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 m-4 p-4 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md z-10 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
        style={{
          boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.05)',
        }}
        animate={{
          height: isHovered ? '192px' : '72px',
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'Lora, serif' }}>
              {destination.name}
            </h3>
            <p className="text-[#E9C579] text-xs font-semibold tracking-wider mt-0.5" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              {destination.universities}
            </p>
          </div>
          
          {/* Arrow / Plus micro-icon indicator */}
          <motion.div
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white"
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </motion.div>
        </div>

        {/* Stats Grid - appears on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, delay: isHovered ? 0.08 : 0 }}
          className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-white/15 text-white/95"
          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
        >
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#D4A755] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider leading-none">Avg. Salary</p>
              <p className="text-xs font-bold mt-0.5">{destination.avgSalary}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4A755] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider leading-none">Stay Back</p>
              <p className="text-xs font-bold mt-0.5">{destination.pathway}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D4A755] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider leading-none">Study Cost</p>
              <p className="text-xs font-bold mt-0.5">{destination.studyCost}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#D4A755] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider leading-none">Top Sectors</p>
              <p className="text-xs font-bold mt-0.5 truncate max-w-[110px]" title={destination.popularSectors}>{destination.popularSectors}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {/* Selected State Premium Glass Overlay */}
      <motion.div
        className="absolute inset-0 bg-[#462506]/85 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClicked ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
          animate={{ scale: isClicked ? 1 : 0.5, rotate: isClicked ? 0 : -20, opacity: isClicked ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.05 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E9C579] to-[#D4A755] flex items-center justify-center shadow-lg border border-[#F1DEA8]/50 mb-3"
        >
          <Check className="w-8 h-8 text-[#462506]" strokeWidth={3} />
        </motion.div>
        
        <motion.h4
          className="text-[#F1DEA8] text-lg font-bold tracking-wide uppercase mb-1"
          style={{ fontFamily: 'Lora, serif' }}
        >
          Destination Selected
        </motion.h4>
        
        <motion.p 
          className="text-white/80 text-xs max-w-[220px]"
          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
        >
          Click again to deselect and view full details
        </motion.p>
      </motion.div>
      </motion.div>
      </div>
  );
}

export function DestinationsGrid({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-white via-[#FAF8F5] to-white overflow-hidden min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="text-center mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold tracking-widest text-[#9F6920] uppercase bg-[#F1DEA8]/30 px-3 py-1 rounded-full border border-[#D4A755]/20 inline-block mb-3"
            style={{ fontFamily: 'Source Sans 3, sans-serif' }}
          >
            Global Opportunities
          </motion.span>
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl text-[#462506] font-bold"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Popular Study Destinations
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={titleInView ? { width: "60px", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-[#D4A755] mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard 
              key={destination.name} 
              destination={destination} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}