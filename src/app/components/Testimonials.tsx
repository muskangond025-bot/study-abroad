import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Heart, Compass, Award } from 'lucide-react';
import graduationImg from 'figma:asset/c493f60d94df41d796f518b6a5cad60e92484bf0.png';

const approaches = [
  {
    icon: Heart,
    title: 'Personalized Guidance',
    text: 'Every student journey is unique. We craft tailored strategies that align with your goals, strengths, and aspirations for a truly customized experience.'
  },
  {
    icon: Compass,
    title: 'Holistic Planning',
    text: 'From university selection to visa processing, we guide you through every step with comprehensive support, expert insights, and dedicated care.'
  },
  {
    icon: Award,
    title: 'Proven Results',
    text: 'Our track record speaks for itself—hundreds of students placed in their dream universities across the globe with exceptional outcomes.'
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Background size: starts at 250%, zooms out as you scroll
  const backgroundSize = useTransform(scrollYProgress, [0, 1], [250, 100]);
  
  // Blur effect: increases as you scroll
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  
  // Opacity: fades out as you scroll
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0.3]);

  return (
    <div ref={containerRef} style={{ minHeight: '150vh', position: 'relative' }}>
      {/* Sticky Background with Parallax Zoom Effect */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: opacity
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${graduationImg})`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: useTransform(backgroundSize, (value) => `${value}%`),
              filter: useTransform(blur, (value) => `blur(${value}px)`),
              boxShadow: '0 -50px 20px -20px #232323 inset'
            }}
          />
        </motion.div>
      </div>

      {/* Content Section */}
      <section className="relative z-10 min-h-screen flex items-center py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-4 text-center text-white"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Our Approach
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90 mb-16 text-center max-w-2xl mx-auto"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            We combine personalized attention with industry expertise to turn your study abroad dreams into reality
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approaches.map((approach, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: "-100px" });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                  className="relative bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-white/10"
                >
                  <approach.icon className="w-12 h-12 text-[#D4A755] mb-6" />
                  <p className="text-white text-lg mb-6" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
                    "{approach.text}"
                  </p>
                  <div>
                    <div className="text-white mb-1" style={{ fontFamily: 'Lora, serif' }}>
                      {approach.title}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}