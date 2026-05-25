import { motion } from 'motion/react';

export function ConciergeAnimatedBanner() {
  return (
    <div 
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Ambient warm highlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4A755]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#9F6920]/5 blur-[120px] pointer-events-none" />

      {/* Dual Concentric SVG Spinners behind Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[650px] max-h-[650px] pointer-events-none select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="url(#heroGoldGrad1)"
            strokeWidth="0.8"
            strokeDasharray="40 180"
            strokeLinecap="round"
            className="animate-spin-counter-clockwise origin-center opacity-30"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#heroGoldGrad2)"
            strokeWidth="0.5"
            strokeDasharray="10 30"
            className="animate-spin-clockwise origin-center opacity-40"
          />
          <defs>
            <linearGradient id="heroGoldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
              <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="heroGoldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#D4A755" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center flex flex-col items-center">
        {/* Planning pill tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-white/5 to-[#D4A755]/10 border border-[#D4A755]/20 rounded-full"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            Exclusive Services
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 text-white font-normal uppercase leading-tight tracking-tight"
          style={{ fontFamily: 'Lora, serif' }}
        >
          Concierge-Style <br />
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#EEDCB5] to-[#D4A755]"
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Guidance
          </span>{' '}
          for Global Planning
        </motion.h1>

        {/* Separator line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '140px' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl text-white/70 font-light max-w-3xl leading-relaxed"
          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
        >
          An elite end-to-end advisory service designed for students who seek academic distinction, absolute clarity, and flawless execution.
        </motion.p>
      </div>

      {/* Scroll indicator pointing down */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          Scroll to explore
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-3 rounded-full bg-[#D4A755]"
        />
      </motion.div>
    </div>
  );
}
