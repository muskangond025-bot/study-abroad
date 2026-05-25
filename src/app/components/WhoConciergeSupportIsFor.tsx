import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface SupportCard {
  category: string;
  title: string;
  description: string;
  image: string;
}

const supportCards: SupportCard[] = [
  {
    category: 'Undergraduate',
    title: 'First-Time Applicants',
    description: 'Students seeking guidance through their first international education journey with comprehensive support.',
    image: 'https://images.unsplash.com/photo-1721702754494-fdd7189f946c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyYWR1YXRlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NzM4MzcxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    category: 'Graduate',
    title: 'Advanced Degree Seekers',
    description: 'Graduate students requiring specialized assistance for research programs and advanced studies abroad.',
    image: 'https://images.unsplash.com/photo-1663128637417-d0213df51462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0ZSUyMHN0dWRlbnQlMjByZXNlYXJjaGVyfGVufDF8fHx8MTc3MzgzNzEwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    category: 'Professional',
    title: 'Career Changers',
    description: 'Professionals pursuing international education for career advancement and global opportunities.',
    image: 'https://images.unsplash.com/photo-1758876019673-704b039d405c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXJlZXIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzM4MzA1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

function SupportCardItem({ card, index }: { card: SupportCard; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const sheenBg = useTransform(() => {
    const xPct = (springX.get() + 0.5) * 100;
    const yPct = (springY.get() + 0.5) * 100;
    return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(212, 167, 85, 0.25) 0%, rgba(159, 105, 32, 0.05) 40%, transparent 70%)`;
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[420px] flex flex-col justify-end p-8 transition-all duration-500 border border-[#D4A755]/20 bg-[#12100E] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#D4A755]/50 hover:shadow-[0_30px_70px_rgba(212, 167, 85, 0.15)]"
    >
      {/* Background Image with Ken Burns Zoom & opacity */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:opacity-45 transition-all duration-700 select-none pointer-events-none"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/70 to-transparent pointer-events-none" />
      </div>

      {/* Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: sheenBg }}
      />

      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-10" />

      {/* Floating Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-700 z-10">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-[#D4A755] blur-[0.2px] animate-luxury-sparkle-1" />
        <div className="absolute top-[60%] left-[75%] w-1.5 h-1.5 rounded-full bg-[#9F6920] blur-[0.5px] animate-luxury-sparkle-2" />
      </div>

      {/* Concentric SVG Spinner in the Top-Right Corner */}
      <div className="absolute top-6 right-6 w-12 h-12 pointer-events-none select-none z-20 animate-spin-clockwise opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#cardGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="40 180"
          />
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke="url(#cardGoldGrad)"
            strokeWidth="1.5"
            strokeDasharray="15 60"
            className="animate-spin-counter-clockwise origin-center"
          />
        </svg>
      </div>

      {/* Content Details */}
      <div className="relative z-20 flex flex-col gap-3" style={{ transformStyle: 'preserve-3d', z: 30 }}>
        <span 
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A755]"
          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
        >
          {card.category}
        </span>
        <h3 
          className="text-2xl md:text-3xl font-normal text-white font-serif"
          style={{ fontFamily: 'Lora, serif' }}
        >
          {card.title}
        </h3>
        <p 
          className="text-white/70 text-sm md:text-base leading-relaxed font-light" 
          style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.6' }}
        >
          {card.description}
        </p>

        {/* Action arrow indicator */}
        <div 
          className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-semibold text-[#D4A755]" 
          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
        >
          <span>EXPLORE OPTIONS</span>
          <span className="text-white group-hover:translate-x-1.5 transition-transform">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export function WhoConciergeSupportIsFor() {
  return (
    <section className="relative bg-[#0B0A08] py-24 border-b border-[#D4A755]/10 overflow-hidden">
      {/* SVG definitions for reuse across cards */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="cardGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A755" />
            <stop offset="100%" stopColor="#9F6920" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Ambient glowing highlights */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4A755]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#9F6920]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/5 border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(212,167,85,0.05)]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A755]">TARGET DEMOGRAPHICS</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Who Concierge Support Is For
          </h2>

          {/* Gold separator */}
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

          <p
            className="text-lg text-white/70 max-w-3xl mx-auto font-light"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            Our concierge services are designed for students at every stage of their academic journey
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {supportCards.map((card, index) => (
            <SupportCardItem
              key={index}
              card={card}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}