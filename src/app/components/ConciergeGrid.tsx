import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface GridItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const gridItems: GridItem[] = [
  { 
    id: 1, 
    title: 'University Selection', 
    description: 'We perform deep academic analysis, profile evaluation, and course comparisons to align you with elite institutions.',
    image: 'https://images.unsplash.com/photo-1769905226788-1bf5ba8f50d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHMlMjB3YWxraW5nfGVufDF8fHx8MTc3MzcyOTY3OXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 2, 
    title: 'Visa Assistance', 
    description: 'End-to-end documentation coordination, mock embassy interviews, and strategic guidelines for complete compliance.',
    image: 'https://images.unsplash.com/photo-1767216427262-ce74ba565c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXNhJTIwZG9jdW1lbnQlMjBwYXNzcG9ydHxlbnwxfHx8fDE3NzM4MzcwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 3, 
    title: 'Accommodation', 
    description: 'Sourcing secure, premium student housing near campus and coordinating lease evaluations and roommate matching.',
    image: 'https://images.unsplash.com/photo-1680919838857-d54e011093d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXBhcnRtZW50JTIwYWNjb21tb2RhdGlvbnxlbnwxfHx8fDE3NzM4MzcwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 4, 
    title: 'Travel Support', 
    description: 'Pre-departure checklists, airport pickups, flight arrangements, and initial local landing orientation services.',
    image: 'https://images.unsplash.com/photo-1668822452548-7d1bf939f437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwZGVwYXJ0dXJlJTIwZmxpZ2h0fGVufDF8fHx8MTc3MzgzNzAzNHww&ixlib=rb-4.1.0&q=80&w=1080' 
  }
];

interface ConciergeCardProps {
  item: GridItem;
  index: number;
}

function ConciergeCard({ item, index }: ConciergeCardProps) {
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
    ? 'bg-gradient-to-br from-white/95 via-white/80 to-[#FAF8F5]/50 border border-[#D4A755]/20'
    : 'bg-gradient-to-br from-[#FAF6EE]/95 via-white/80 to-white/40 border border-[#9F6920]/15';

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
      className={`group relative rounded-3xl overflow-hidden cursor-pointer min-h-[380px] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_30px_70px_rgba(159,105,32,0.12)] ${innerCardBg}`}
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#D4A755] blur-[0.5px] animate-luxury-sparkle-1" />
        <div className="absolute top-[75%] left-[80%] w-1 h-1 rounded-full bg-[#9F6920] blur-[0.2px] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.005)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* Image Container with crop */}
      <div className="relative h-48 w-full overflow-hidden border-b border-[#D4A755]/10" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 pointer-events-none" />
        
        {/* Number Badge with SVG Concentric Spinner */}
        <div className="absolute top-4 right-4 flex items-center justify-center" style={{ transformStyle: "preserve-3d", z: 30 }}>
          {/* Orbital SVG Spinner */}
          <div className="absolute w-14 h-14 pointer-events-none select-none z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="43"
                fill="none"
                stroke={`url(#conciergeGoldGrad-${index})`}
                strokeWidth="2"
                strokeDasharray="40 180"
                className="animate-spin-counter-clockwise origin-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <defs>
                <linearGradient id={`conciergeGoldGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A755" />
                  <stop offset="100%" stopColor="#9F6920" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span 
            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#9F6920] to-[#D4A755] text-white text-xs font-bold shadow-[0_2px_8px_rgba(159,105,32,0.3)] border border-white/20"
            style={{ fontFamily: 'Lora, serif' }}
          >
            {String(item.id).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Content details */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-10" style={{ transformStyle: "preserve-3d", z: 20 }}>
        <div>
          <h3 
            className="text-2xl font-normal text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 mb-3 font-serif"
            style={{ fontFamily: 'Lora, serif' }}
          >
            {item.title}
          </h3>
          <p className="text-black/60 text-sm leading-relaxed font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
            {item.description}
          </p>
        </div>

        {/* Bottom indicator */}
        <div className="mt-6 pt-4 border-t border-[#D4A755]/10 flex justify-between items-center text-xs font-semibold text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          <span>READ MORE</span>
          <span className="text-[#D4A755] group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export function ConciergeGrid() {
  return (
    <section className="relative bg-[#FAF8F5] py-24 border-b border-[#D4A755]/10 overflow-hidden">
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
          <div className="inline-block mb-3 px-4 py-1.5 bg-white border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(159,105,32,0.02)]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9F6920]">ESSENTIALS</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-normal text-[#462506] mb-4"
            style={{ fontFamily: 'Lora, serif' }}
          >
            What Concierge Support Covers
          </h2>

          {/* Gold separator */}
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

          <p
            className="text-lg text-black/70 max-w-3xl mx-auto font-light"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            Comprehensive end-to-end guidance throughout your international education journey
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridItems.map((item, index) => (
            <ConciergeCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}