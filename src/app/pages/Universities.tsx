import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { GraduationCap, Search, Filter, Info, Lightbulb, MessageCircle, CheckCircle, X, ArrowLeft, ArrowRight, Globe, Award, Coins, Briefcase, Eye } from 'lucide-react';
import { Link } from 'react-router';

export const universities = [
  {
    name: 'Harvard University',
    country: 'United States',
    ranking: '#1',
    programs: 'All Majors',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
    description: 'A preeminent Ivy League research university in Cambridge, Massachusetts, Harvard is renowned globally for its academic influence, historical legacy, and elite alumni network.',
    popularCities: ['Cambridge', 'Boston'],
    topPrograms: ['Engineering', 'Business', 'Computer Science', 'Medicine'],
    averageCost: '$55,000 - $80,000/year'
  },
  {
    name: 'University of Oxford',
    country: 'United Kingdom',
    ranking: '#2',
    programs: 'Law, Medicine, PPE',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=80',
    description: 'As the oldest university in the English-speaking world, Oxford offers unparalleled academic tradition, unique tutorial teaching methods, and outstanding global recognition.',
    popularCities: ['Oxford', 'London'],
    topPrograms: ['Law', 'Finance', 'Medicine', 'Philosophy'],
    averageCost: '£25,000 - £45,000/year'
  },
  {
    name: 'Stanford University',
    country: 'United States',
    ranking: '#3',
    programs: 'Engineering, Business',
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&q=80',
    description: 'Located in the heart of Silicon Valley, Stanford is famous for its entrepreneurial spirit, cutting-edge technology research, and close ties to the global tech industry.',
    popularCities: ['Stanford', 'Palo Alto', 'San Jose'],
    topPrograms: ['Artificial Intelligence', 'Data Science', 'MBA', 'Electrical Eng.'],
    averageCost: '$57,000 - $82,000/year'
  },
  {
    name: 'University of Cambridge',
    country: 'United Kingdom',
    ranking: '#4',
    programs: 'Sciences, Mathematics',
    image: 'https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=1200&q=80',
    description: 'With rich academic history, Cambridge is world-famous for science, mathematics, and its historic collegiate system that fosters close-knit intellectual communities.',
    popularCities: ['Cambridge', 'London'],
    topPrograms: ['Mathematics', 'Physics', 'Biochemistry', 'Computer Science'],
    averageCost: '£28,000 - £48,000/year'
  },
  {
    name: 'MIT',
    country: 'United States',
    ranking: '#5',
    programs: 'STEM',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=80',
    description: 'The Massachusetts Institute of Technology is a global leader in STEM education, pioneering scientific breakthroughs, robotics, and computational innovation.',
    popularCities: ['Cambridge', 'Boston'],
    topPrograms: ['Robotics', 'Aerospace', 'Quantum Physics', 'Bio-engineering'],
    averageCost: '$58,000 - $78,000/year'
  },
  {
    name: 'ETH Zurich',
    country: 'Switzerland',
    ranking: '#6',
    programs: 'Engineering, Sciences',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    description: 'A premier European institution, ETH Zurich stands at the forefront of engineering and physical sciences, offering low tuition fees and high research output.',
    popularCities: ['Zurich'],
    topPrograms: ['Mechanical Eng.', 'Physics', 'Earth Sciences', 'Architecture'],
    averageCost: 'CHF 1,500/year (Nominal public tuition)'
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    ranking: '#18',
    programs: 'Medicine, Engineering',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=1200&q=80',
    description: 'Canada\'s leading research university, U of T is known for its diverse student body, historic campus architecture, and pioneering discoveries in medicine and engineering.',
    popularCities: ['Toronto'],
    topPrograms: ['Machine Learning', 'Medicine', 'Civil Engineering', 'Finance'],
    averageCost: 'CAD 35,000 - 60,000/year'
  },
  {
    name: 'National University of Singapore',
    country: 'Singapore',
    ranking: '#11',
    programs: 'Business, Technology',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
    description: 'As a top-ranked Asian hub, NUS offers dynamic global education, top-tier business programs, and innovative research initiatives in Singapore.',
    popularCities: ['Singapore City'],
    topPrograms: ['Business Analytics', 'Fintech', 'Civil Eng.', 'Global Studies'],
    averageCost: 'SGD 30,000 - 55,000/year'
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    ranking: '#14',
    programs: 'Arts, Medicine',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    description: 'Australia\'s leading university, Melbourne offers a distinctive curriculum, outstanding research facilities, and a vibrant cultural experience in a global city.',
    popularCities: ['Melbourne'],
    topPrograms: ['Medicine', 'Fine Arts', 'Environmental Science', 'Law'],
    averageCost: 'AUD 35,000 - 55,000/year'
  },
  {
    name: 'Imperial College London',
    country: 'United Kingdom',
    ranking: '#7',
    programs: 'Medicine, Engineering',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80',
    description: 'Imperial College focuses exclusively on science, engineering, medicine, and business, delivering a highly technical and career-focused curriculum in central London.',
    popularCities: ['London'],
    topPrograms: ['Data Science', 'Material Sciences', 'Medicine', 'MBA'],
    averageCost: '£30,000 - £50,000/year'
  },
  {
    name: 'Yale University',
    country: 'United States',
    ranking: '#9',
    programs: 'Law, Liberal Arts',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
    description: 'Known for its beautiful Gothic campus, Yale offers exceptional undergraduate liberal arts programs, a legendary law school, and a rich cultural heritage.',
    popularCities: ['New Haven', 'New York'],
    topPrograms: ['Law', 'History', 'Fine Arts', 'Economics'],
    averageCost: '$56,000 - $80,000/year'
  },
  {
    name: 'Technical University of Munich',
    country: 'Germany',
    ranking: '#49',
    programs: 'Engineering, Technology',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    description: 'One of Europe\'s outstanding technical schools, TUM offers state-of-the-art engineering courses, tuition-free options, and strong links with German industrial giants.',
    popularCities: ['Munich'],
    topPrograms: ['Mechanical Eng.', 'Automotive Eng.', 'Informatics', 'Physics'],
    averageCost: '€0 - €4,000/year (Nominal public fees)'
  }
];

const countries = ['All', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Singapore', 'Switzerland'];

const bannerSlides = [
  { image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=80', title: 'University of Oxford', location: 'United Kingdom', rank: '#2 QS Global' },
  { image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80', title: 'Stanford University', location: 'United States', rank: '#3 QS Global' },
  { image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80', title: 'University of Cambridge', location: 'United Kingdom', rank: '#4 QS Global' },
  { image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80', title: 'Harvard University', location: 'United States', rank: '#1 QS Global' },
  { image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80', title: 'National University of Singapore', location: 'Singapore', rank: '#11 QS Global' }
];

function ExpandableBanner() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setExpandedIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % bannerSlides.length;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="flex justify-center items-center gap-4 mt-12 mb-2 w-full max-w-7xl mx-auto h-[55vh] lg:h-[65vh]"
    >
      {bannerSlides.map((slide, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <motion.div
            key={index}
            onMouseEnter={() => setExpandedIndex(index)}
            onClick={() => setExpandedIndex(isExpanded ? null : index)}
            layout
            animate={{
              width: isExpanded ? '52%' : '12%',
            }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="h-full cursor-pointer rounded-3xl relative overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-white/10 hover:shadow-[0_20px_45px_rgba(159,105,32,0.15)] transition-shadow duration-500"
          >
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 opacity-70 group-hover:opacity-85 pointer-events-none transition-opacity duration-500" />

            {/* Inner Gold border highlights */}
            <div className="absolute inset-0 rounded-3xl border border-[#D4A755]/10 group-hover:border-[#D4A755]/30 transition-colors duration-500 pointer-events-none" />

            {/* Overlay Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white select-none pointer-events-none">
              {/* Unexpanded title (vertical/rotated text on small cards) */}
              {!isExpanded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full pb-4"
                >
                  <span className="text-sm font-semibold tracking-[0.2em] text-[#F1DEA8] uppercase [writing-mode:vertical-lr] rotate-180" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {slide.title}
                  </span>
                </motion.div>
              )}

              {/* Expanded details (rich text) */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.15 }}
                  className="max-w-md relative z-10"
                >
                  <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-[#D4A755]/30 to-[#9F6920]/30 border border-[#D4A755]/40 rounded-full">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F1DEA8]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      {slide.rank}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl mb-2 font-normal" style={{ fontFamily: 'Lora, serif', color: '#FAF8F5' }}>
                    {slide.title}
                  </h3>
                  <p className="text-white/80 text-sm font-light uppercase tracking-widest" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {slide.location}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

interface UniversityCardProps {
  uni: typeof universities[number];
  index: number;
  onClick: () => void;
}

function UniversityCard({ uni, index, onClick }: UniversityCardProps) {
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

  const innerCardBg = index % 2 === 0
    ? 'bg-gradient-to-br from-white/95 via-white/80 to-[#FAF8F5]/50 border border-[#D4A755]/20 shadow-[0_15px_45px_rgba(159,105,32,0.04)]'
    : 'bg-gradient-to-br from-[#FAF6EE]/95 via-white/80 to-white/40 border border-[#9F6920]/15 shadow-[0_15px_45px_rgba(159,105,32,0.03)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
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
      className={`university-card group relative rounded-2xl overflow-hidden cursor-pointer min-h-[360px] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_30px_70px_rgba(159,105,32,0.12)] ${innerCardBg}`}
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

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.005)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* Image Container with crop */}
      <div className="relative h-48 w-full overflow-hidden border-b border-[#D4A755]/10 animate-fade-in" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 pointer-events-none" />
        
        {/* Ranking Badge with SVG Concentric Spinner */}
        <div className="absolute top-4 right-4 flex items-center justify-center" style={{ transformStyle: "preserve-3d", z: 30 }}>
          {/* Orbital SVG Spinner */}
          <div className="absolute w-14 h-14 pointer-events-none select-none z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="43"
                fill="none"
                stroke={`url(#uniGoldGrad-${index})`}
                strokeWidth="2"
                strokeDasharray="40 180"
                className="animate-spin-counter-clockwise origin-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <defs>
                <linearGradient id={`uniGoldGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A755" />
                  <stop offset="100%" stopColor="#9F6920" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span 
            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#9F6920] to-[#D4A755] text-white text-[11px] font-bold shadow-[0_2px_8px_rgba(159,105,32,0.3)] border border-white/20"
            style={{ fontFamily: 'Lora, serif' }}
          >
            {uni.ranking}
          </span>
        </div>
      </div>

      {/* Content details */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-10" style={{ transformStyle: "preserve-3d", z: 20 }}>
        <div>
          <h3 
            className="text-lg font-normal text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 mb-2 font-serif line-clamp-2 min-h-[56px]"
            style={{ fontFamily: 'Lora, serif' }}
          >
            {uni.name}
          </h3>
          <p className="text-black/55 text-xs tracking-wider uppercase font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            {uni.country}
          </p>
        </div>

        {/* Info callout */}
        <div className="mt-4 pt-4 border-t border-[#D4A755]/10 flex justify-between items-center text-xs font-semibold text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          <span>{uni.programs}</span>
          <span className="text-[#D4A755] group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.div>
  );
}

interface FloatingButterflyProps {
  delay?: number;
  scale?: number;
  duration?: number;
  pathX?: string[];
  pathY?: string[];
}

function FloatingButterfly({ 
  delay = 0, 
  scale = 1, 
  duration = 14, 
  pathX = ["-10%", "30%", "65%", "110%"], 
  pathY = ["60%", "20%", "45%", "10%"] 
}: FloatingButterflyProps) {
  return (
    <motion.div
      initial={{ x: pathX[0], y: pathY[0], opacity: 0 }}
      animate={{
        x: pathX,
        y: pathY,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none select-none z-0"
      style={{ scale }}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          animate={{ rotateY: [0, 75, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: 1 }}
          className="absolute right-1/2 w-4 h-6 bg-gradient-to-l from-[#D4A755]/50 to-[#9F6920]/20 rounded-l-full shadow-[0_2px_8px_rgba(212,167,85,0.2)] border-l border-white/10"
        />
        {/* Right Wing */}
        <motion.div
          animate={{ rotateY: [0, -75, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="absolute left-1/2 w-4 h-6 bg-gradient-to-r from-[#D4A755]/50 to-[#9F6920]/20 rounded-r-full shadow-[0_2px_8px_rgba(212,167,85,0.2)] border-r border-white/10"
        />
        {/* Body */}
        <div className="absolute w-1 h-5 bg-[#462506] rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.3)]" />
      </div>
    </motion.div>
  );
}

interface TipCardProps {
  num: number;
  title: string;
  desc: string;
  index: number;
  icon: React.ComponentType<any>;
}

function TipCard({ num, title, desc, index, icon: Icon }: TipCardProps) {
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
              stroke={`url(#tipUniGoldGradient1-${index})`}
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
              stroke={`url(#tipUniGoldGradient2-${index})`}
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-spin-clockwise origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
            <defs>
              <linearGradient id={`tipUniGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id={`tipUniGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#D4A755" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Active ripple wave glow on hover */}
        <div className="absolute inset-0 rounded-full border border-[#D4A755]/20 group-hover:animate-ping pointer-events-none opacity-0 group-hover:opacity-20 transition-all duration-700 z-0" />

        {/* Main Icon/Emoji Node */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-[0_4px_12px_rgba(159,105,32,0.15)] border border-[#D4A755]/30 group-hover:border-[#9F6920]/60 transition-colors duration-300 bg-[#FAF8F5]"
          style={{ z: 50 }}
          whileHover={{ scale: 1.05 }}
        >
          <Icon className="w-5 h-5 text-[#9F6920] group-hover:text-[#D4A755] group-hover:scale-110 transition-all duration-300" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col" style={{ transformStyle: "preserve-3d", z: 30 }}>
        <h3 className="text-2xl mb-3 text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 font-semibold font-serif" style={{ fontFamily: 'Lora, serif' }}>
          {title}
        </h3>
        <div className="w-10 h-[1.5px] bg-[#D4A755]/30 mb-3 group-hover:w-20 group-hover:bg-gradient-to-r group-hover:from-[#9F6920] group-hover:to-[#D4A755] transition-all duration-500" />
        <p className="text-black/80 text-[14.5px] leading-relaxed font-normal transition-colors group-hover:text-black/95" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export function Universities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedUniversity, setSelectedUniversity] = useState<typeof universities[0] | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isInsightsHovered, setIsInsightsHovered] = useState(false);
  
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.programs.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || uni.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const openUniversityDetail = (university: typeof universities[0]) => {
    setSelectedUniversity(university);
    setIsDetailView(true);
    document.body.style.overflow = 'hidden';
  };

  const closeUniversityDetail = () => {
    setIsDetailView(false);
    setTimeout(() => {
      setSelectedUniversity(null);
      document.body.style.overflow = 'unset';
    }, 400);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="relative pt-16 bg-[#FAF8F5]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Ambient warm glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-[#F1DEA8]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-b from-[#D4A755]/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-12 pb-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
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
                Elite Pathways
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl mb-6 font-normal text-[#462506]" style={{ fontFamily: 'Lora, serif' }}>
              World's Top University Partners
            </h1>

            {/* Gold separator */}
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6" />

            <p className="text-xl text-black/70 font-light max-w-2xl mx-auto" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
              We partner with over 500 prestigious institutions globally to bring you the best education opportunities.
            </p>
          </motion.div>
          
          {/* Expandable Banner */}
          <ExpandableBanner />
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/70 backdrop-blur-md border-y border-[#D4A755]/15 relative z-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col gap-8">
            {/* Search Input Box */}
            <div className="relative max-w-3xl mx-auto w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9F6920]" />
              <input
                type="text"
                placeholder="Search universities or programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-[#D4A755]/20 rounded-xl focus:outline-none focus:border-[#9F6920] focus:ring-1 focus:ring-[#9F6920]/30 transition-all bg-white shadow-[0_8px_30px_rgba(159,105,32,0.02)]"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              />
            </div>

            {/* Country Pills Filter */}
            <div className="flex flex-wrap items-center gap-2.5 justify-center">
              {countries.map(country => {
                const isActive = selectedCountry === country;
                return (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer relative group transition-all duration-300 focus:outline-none ${
                      isActive
                        ? 'border-transparent shadow-[0_4px_15px_rgba(159,105,32,0.18)] scale-103'
                        : 'bg-white border-[#D4A755]/25 text-[#462506]/75 hover:bg-[#D4A755]/5 hover:border-[#9F6920]/50 hover:shadow-[0_4px_12px_rgba(159,105,32,0.04)]'
                    }`}
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  >
                    {/* Sliding Golden Active Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCountryBackground"
                        className="absolute inset-0 bg-gradient-to-r from-[#9F6920] to-[#D4A755] rounded-full z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 26 }}
                      />
                    )}
                    
                    {/* Tab Text */}
                    <span className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-white font-bold' : 'text-[#462506]/85 group-hover:text-[#9F6920]'
                    }`}>
                      {country}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(159,105,32,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-normal text-[#462506]" style={{ fontFamily: 'Lora, serif' }}>
              Browse Our University Partners
            </h2>

            {/* Gold separator */}
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

            <p className="text-lg text-black/70 max-w-3xl mx-auto font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
              Explore top institutions from around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUniversities.map((university, index) => (
              <UniversityCard
                key={index}
                uni={university}
                index={index}
                onClick={() => openUniversityDetail(university)}
              />
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-black/60 font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                No universities found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Important Information Section */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-[#FAF8F5] via-[#FAF6EE] to-[#FAF8F5] relative overflow-hidden border-y border-[#D4A755]/10 z-10">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div 
          onMouseEnter={() => setIsInsightsHovered(true)}
          onMouseLeave={() => setIsInsightsHovered(false)}
          className="max-w-5xl mx-auto px-8 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsInsightsOpen(!isInsightsOpen)}
            className="flex items-center gap-4 mb-8 cursor-pointer group w-fit select-none"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9F6920] to-[#D4A755] flex items-center justify-center flex-shrink-0 shadow-[0_4px_15px_rgba(159,105,32,0.25)] border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(159,105,32,0.35)] group-active:scale-95">
              <Info className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 flex items-center gap-4" style={{ fontFamily: 'Lora, serif' }}>
              Partner University Insights
              <motion.span
                animate={{ rotate: (isInsightsOpen || isInsightsHovered) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#9F6920] text-xl inline-block"
              >
                ▼
              </motion.span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: (isInsightsOpen || isInsightsHovered) ? 'auto' : 0, 
              opacity: (isInsightsOpen || isInsightsHovered) ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(159,105,32,0.04)] border border-[#D4A755]/20">
              <div className="space-y-8 font-light text-black/75 text-base" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-[#9F6920] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl mb-2 text-[#462506] font-medium" style={{ fontFamily: 'Lora, serif' }}>Verified Partnerships</h3>
                    <p>
                      All universities listed on our platform are official partners with verified admission pathways. We maintain direct relationships with admissions offices to ensure accurate and up-to-date information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-[#9F6920] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl mb-2 text-[#462506] font-medium" style={{ fontFamily: 'Lora, serif' }}>Dynamic Rankings</h3>
                    <p>
                      University rankings are updated annually based on global education indices including QS World Rankings, Times Higher Education, and Academic Ranking of World Universities (ARWU). Rankings may vary by subject and methodology.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-[#9F6920] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl mb-2 text-[#462506] font-medium" style={{ fontFamily: 'Lora, serif' }}>Admission Requirements</h3>
                    <p>
                      Each university has unique admission criteria including GPA requirements, standardized test scores, language proficiency, and specific prerequisites. Contact our advisors for detailed requirements tailored to your academic profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-[#9F6920] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl mb-2 text-[#462506] font-medium" style={{ fontFamily: 'Lora, serif' }}>Scholarship Opportunities</h3>
                    <p>
                      Many partner universities offer merit-based and need-based scholarships for international students. Scholarship availability and amounts vary by institution, program, and application timing. We'll help you identify and apply for relevant funding opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="pt-12 pb-16 bg-[#FAF8F5] relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(159,105,32,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Floating Butterflies Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingButterfly delay={0} scale={0.75} duration={16} pathX={["-5%", "35%", "70%", "105%"]} pathY={["75%", "30%", "55%", "15%"]} />
          <FloatingButterfly delay={4} scale={1.0} duration={13} pathX={["-5%", "40%", "75%", "105%"]} pathY={["40%", "65%", "35%", "55%"]} />
          <FloatingButterfly delay={8} scale={0.85} duration={15} pathX={["-5%", "30%", "65%", "105%"]} pathY={["85%", "45%", "70%", "30%"]} />
          <FloatingButterfly delay={2} scale={0.6} duration={18} pathX={["-5%", "50%", "30%", "105%"]} pathY={["20%", "45%", "25%", "10%"]} />
          <FloatingButterfly delay={6} scale={0.9} duration={14} pathX={["-5%", "60%", "40%", "105%"]} pathY={["60%", "25%", "65%", "40%"]} />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-4 py-1.5 bg-white border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(159,105,32,0.02)]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9F6920]">PLANNING</span>
            </div>

            <h2 
              className="text-4xl md:text-5xl mb-4 font-normal bg-gradient-to-r from-[#462506] via-[#9F6920] to-[#D4A755] bg-clip-text text-transparent inline-block tracking-wide" 
              style={{ fontFamily: 'Lora, serif' }}
            >
              Tips for University Research
            </h2>

            {/* Gold separator */}
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

            <p className="text-xl text-black/70 max-w-3xl mx-auto font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
              Navigate your university search with confidence using our expert guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Consider Location & Culture',
                description: 'Research the city climate, cost of living, cultural diversity, and student community. Consider proximity to industry hubs for internships and career opportunities.',
                icon: Globe
              },
              {
                title: 'Evaluate Program Strength',
                description: 'Look beyond overall rankings. Focus on department rankings, faculty expertise, research opportunities, and alumni success in your field of interest.',
                icon: GraduationCap
              },
              {
                title: 'Check Accreditation',
                description: 'Ensure programs are properly accredited by recognized bodies. This affects degree recognition, transfer credits, and professional licensing eligibility.',
                icon: Award
              },
              {
                title: 'Calculate Total Costs',
                description: 'Consider tuition, housing, health insurance, meals, books, travel, and personal expenses. Factor in currency exchange rates and potential scholarship opportunities.',
                icon: Coins
              },
              {
                title: 'Explore Career Services',
                description: 'Investigate internship programs, career counseling, job placement rates, alumni networks, and partnerships with employers in your target industry.',
                icon: Briefcase
              },
              {
                title: 'Visit Virtually or In-Person',
                description: 'Attend virtual open days, campus tours, and information sessions. If possible, visit campuses to experience the environment and speak with current students.',
                icon: Eye
              }
            ].map((tip, index) => (
              <TipCard
                key={index}
                num={index + 1}
                title={tip.title}
                desc={tip.description}
                index={index}
                icon={tip.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="pt-14 pb-20 bg-gradient-to-b from-[#2E1803] to-[#462506] relative overflow-hidden border-y border-[#D4A755]/10">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* Ambient warm spotlights */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#D4A755]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#9F6920]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
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
            Need Help Finding the Right University?
          </motion.h2>

          {/* Gold separator */}
          <motion.div 
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-8 w-32"
            initial={{ width: 0 }}
            whileInView={{ width: '128px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            Our expert advisors are here to guide you through the entire university selection process. From matching your profile to top programs, to navigating applications and securing admissions—we're with you every step of the way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-y border-white/10 py-10 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-medium mb-1 text-[#E9C579]" style={{ fontFamily: 'Lora, serif' }}>500+</div>
              <p className="text-white/60 text-xs tracking-wider uppercase font-semibold" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>Partner Universities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-medium mb-1 text-[#E9C579]" style={{ fontFamily: 'Lora, serif' }}>95%</div>
              <p className="text-white/60 text-xs tracking-wider uppercase font-semibold" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-medium mb-1 text-[#E9C579]" style={{ fontFamily: 'Lora, serif' }}>10,000+</div>
              <p className="text-white/60 text-xs tracking-wider uppercase font-semibold" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>Students Placed</p>
            </div>
          </div>

          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#D4A755] to-[#9F6920] text-white px-8 py-4 rounded-full text-lg shadow-[0_10px_30px_rgba(159,105,32,0.2)] hover:shadow-[0_20px_45px_rgba(159,105,32,0.35)] transition-all duration-300 overflow-hidden hover:scale-103 hover:-translate-y-0.5"
            style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600 }}
          >
            {/* Sweep-shine overlay */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="relative z-10 flex items-center gap-3">
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* Split Screen Detail View Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDetailView ? 1 : 0,
          visibility: isDetailView ? 'visible' : 'hidden'
        }}
        transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
        className="fixed inset-0 bg-black z-[200] flex flex-col lg:flex-row"
        style={{ top: 0 }}
      >
        {isDetailView && selectedUniversity && (
          <>
            {/* Left Side - Large Image */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
              className="relative w-full lg:w-1/2 h-1/2 lg:h-full bg-black flex items-center justify-center overflow-hidden"
            >
              {/* Background Image with blur */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${selectedUniversity.image})`,
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)'
                }}
              />
              <div className="absolute inset-0 bg-black/60" />
              
              {/* Main Image */}
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                src={selectedUniversity.image}
                alt={selectedUniversity.name}
                className="relative z-10 w-4/5 h-3/4 max-h-[480px] object-cover rounded-2xl shadow-2xl border border-white/10"
              />

              {/* Close Button (Desktop) */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={closeUniversityDetail}
                className="absolute top-8 left-8 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/15 hover:border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group z-20 cursor-pointer"
                type="button"
                aria-label="Back to browse"
              >
                <ArrowLeft className="w-5 h-5 text-white group-hover:scale-115 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Right Side - Details in Luxury Walnut Theme */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
              className="relative w-full lg:w-1/2 h-1/2 lg:h-full bg-gradient-to-br from-[#2E1803] via-[#3A1E04] to-[#1C0E03] flex items-center justify-center overflow-y-auto text-white"
            >
              {/* Grid Background in Detail View */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              <div className="p-8 lg:p-16 max-w-2xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {/* Ranking Badge */}
                  <div className="inline-block px-4 py-1.5 bg-[#D4A755]/10 border border-[#D4A755]/20 text-[#E9C579] rounded-full text-xs font-semibold tracking-wider uppercase mb-6" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {selectedUniversity.ranking} World Ranking
                  </div>

                  {/* University Name */}
                  <h1 className="text-4xl lg:text-5xl font-normal leading-tight mb-4" style={{ fontFamily: 'Lora, serif' }}>
                    {selectedUniversity.name}
                  </h1>

                  {/* Country */}
                  <p className="text-lg text-[#F1DEA8]/80 font-light mb-8" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {selectedUniversity.country}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/10 mb-8" />

                  {/* Popular Cities */}
                  <div className="mb-6">
                    <span className="text-xs text-[#D4A755]/85 font-semibold tracking-wider uppercase block mb-2" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      Popular Cities
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedUniversity.popularCities.map((city: string, idx: number) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-white/5 border border-white/10 text-white/95 rounded-full text-xs font-light hover:border-[#D4A755]/30 transition-colors"
                          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Programs */}
                  <div className="mb-6">
                    <span className="text-xs text-[#D4A755]/85 font-semibold tracking-wider uppercase block mb-2" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      Top Programs
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedUniversity.topPrograms.map((prog: string, idx: number) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-[#D4A755]/10 border border-[#D4A755]/20 text-[#F1DEA8] rounded-full text-xs font-normal"
                          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tuition Estimate */}
                  <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/5 max-w-sm">
                    <span className="text-[10px] text-white/55 font-semibold tracking-wider uppercase block mb-1">
                      Estimated Tuition Cost
                    </span>
                    <span className="text-base lg:text-lg text-[#E9C579] font-medium block" style={{ fontFamily: 'Lora, serif' }}>
                      {selectedUniversity.averageCost}
                    </span>
                  </div>

                  <p className="text-base text-white/80 font-light leading-relaxed mb-8" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {selectedUniversity.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to="/contact"
                    className="group relative inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-[#D4A755] to-[#9F6920] text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-102"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Sweep-shine overlay */}
                    <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">
                      Apply Now with Expert Guidance
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>

                  {/* Back button for mobile */}
                  <button
                    onClick={closeUniversityDetail}
                    className="lg:hidden mt-4 w-full py-4 border border-white/10 hover:border-white/25 rounded-xl text-white/70 font-semibold transition-all duration-300 cursor-pointer"
                    type="button"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  >
                    Back to Browse
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}