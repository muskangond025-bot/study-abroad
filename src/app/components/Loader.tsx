import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { GraduationCap } from 'lucide-react';

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [animationStage, setAnimationStage] = useState(0);
  const onCompleteRef = useRef(onComplete);
  
  // Premium easing curve
  const ease = [0.22, 1, 0.36, 1];
  
  // Keep the ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  useEffect(() => {
    // Stage timings
    const stage1 = setTimeout(() => setAnimationStage(1), 700);   // 0.7s
    const stage2 = setTimeout(() => setAnimationStage(2), 1600);  // 1.6s
    const stage3 = setTimeout(() => setAnimationStage(3), 2300);  // 2.3s
    const complete = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2600); // 2.6s
    
    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(complete);
    };
  }, []); // Empty dependency array - only run once
  
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ backgroundColor: '#000000' }}
      animate={{ 
        backgroundColor: animationStage >= 2 ? '#FAF8F5' : '#000000',
        y: animationStage >= 3 ? '-100%' : 0
      }}
      transition={{ 
        backgroundColor: { duration: 0.7, ease },
        y: { duration: 0.3, ease }
      }}
    >
      {/* Centered / Left-Aligned Text Container for "EDU" and "GLOBAL" */}
      <motion.div
        className="absolute flex flex-col justify-center"
        initial={{ 
          opacity: 0,
          scale: 1.02,
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%'
        }}
        animate={{ 
          opacity: 1,
          scale: 1,
          top: '50%',
          left: animationStage >= 1 ? '15%' : '50%',
          x: animationStage >= 1 ? '0%' : '-50%',
          y: '-50%'
        }}
        transition={{ 
          opacity: { duration: 0.5, ease },
          scale: { duration: 0.5, ease },
          left: { duration: 0.9, ease },
          x: { duration: 0.9, ease }
        }}
        style={{
          width: 'auto',
          alignItems: animationStage >= 1 ? 'flex-start' : 'center',
          textAlign: animationStage >= 1 ? 'left' : 'center'
        }}
      >
        {/* "EDU" Text */}
        <motion.span
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(90px, 12vw, 200px)',
            fontWeight: 700,
            color: animationStage >= 2 ? '#462506' : '#FFFFFF',
            lineHeight: 0.9,
            display: 'block'
          }}
          animate={{
            color: animationStage >= 2 ? '#462506' : '#FFFFFF'
          }}
          transition={{ duration: 0.7, ease }}
        >
          EDU
        </motion.span>

        {/* "GLOBAL" Text */}
        <motion.span
          className="mt-1 md:mt-2"
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(90px, 12vw, 200px)',
            fontWeight: 700,
            color: animationStage >= 2 ? '#462506' : '#FFFFFF',
            lineHeight: 0.9,
            display: 'block'
          }}
          animate={{
            color: animationStage >= 2 ? '#462506' : '#FFFFFF'
          }}
          transition={{ duration: 0.7, ease }}
        >
          GLOBAL
        </motion.span>

        {/* Subtitle that appears below "GLOBAL" inside the same flex container in stage 2 */}
        <motion.div
          className="mt-6 md:mt-8 origin-left"
          initial={{ opacity: 0, y: 15 }}
          animate={{ 
            opacity: animationStage >= 2 ? 1 : 0,
            y: animationStage >= 2 ? 0 : 15
          }}
          transition={{ duration: 0.6, ease, delay: animationStage >= 2 ? 0.2 : 0 }}
        >
          <span
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 22px)',
              fontWeight: 500,
              color: '#9F6920',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block'
            }}
          >
            Premium Study Abroad Consultancy
          </span>
        </motion.div>
      </motion.div>
      
      {/* Brand logo image representation on the right */}
      <motion.div
        className="absolute flex items-center justify-center"
        initial={{ 
          opacity: 0,
          scale: 0.9,
          top: '50%',
          right: '12%',
          y: '-50%'
        }}
        animate={{ 
          opacity: 1,
          scale: 1,
          top: animationStage >= 2 ? '12%' : '50%',
          right: '12%',
          y: animationStage >= 2 ? '0%' : '-50%'
        }}
        transition={{ 
          opacity: { duration: 0.5, ease, delay: 0.2 },
          scale: { duration: 0.5, ease, delay: 0.2 },
          top: { duration: 0.9, ease },
          right: { duration: 0.9, ease },
          y: { duration: 0.9, ease }
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Orbital SVG Spinner Rings (rotating luxury gold rings) */}
          <div className="absolute w-[140%] h-[140%] pointer-events-none select-none z-0">
            <svg className="w-full h-full animate-spin-clockwise" viewBox="0 0 100 100" style={{ animationDuration: '24s' }}>
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#logoGoldGradient)"
                strokeWidth="1.5"
                strokeDasharray="40 100"
                strokeLinecap="round"
                opacity={animationStage >= 2 ? 0.7 : 0.4}
              />
              <defs>
                <linearGradient id="logoGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A755" />
                  <stop offset="100%" stopColor="#9F6920" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute w-[125%] h-[125%] pointer-events-none select-none z-0">
            <svg className="w-full h-full animate-spin-counter-clockwise" viewBox="0 0 100 100" style={{ animationDuration: '16s' }}>
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#logoGoldGradient2)"
                strokeWidth="1"
                strokeDasharray="15 50"
                opacity={animationStage >= 2 ? 0.8 : 0.5}
              />
              <defs>
                <linearGradient id="logoGoldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9F6920" />
                  <stop offset="100%" stopColor="#D4A755" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Main Circle Logo */}
          <motion.div
            className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center relative shadow-[0_10px_30px_rgba(159,105,32,0.25)] border border-[#D4A755]/30 bg-gradient-to-br from-[#9F6920] to-[#D4A755] z-10"
            animate={{
              scale: animationStage >= 2 ? 0.75 : 1,
            }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center shadow-inner">
              <GraduationCap className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* "Scroll" label at bottom-left */}
      <motion.div
        className="absolute bottom-12 left-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 2 ? 0.6 : 0.3 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Vertical line */}
        <motion.div
          style={{
            width: '1px',
            height: '60px',
            backgroundColor: animationStage >= 2 ? '#462506' : '#FFFFFF'
          }}
          animate={{
            backgroundColor: animationStage >= 2 ? '#462506' : '#FFFFFF'
          }}
          transition={{ duration: 0.7, ease }}
        />
        
        {/* Vertical text */}
        <motion.span
          style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: animationStage >= 2 ? '#462506' : '#FFFFFF',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
          animate={{
            color: animationStage >= 2 ? '#462506' : '#FFFFFF'
          }}
          transition={{ duration: 0.7, ease }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </motion.div>
  );
}