import { motion, useInView, useMotionValue, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Expert Counselors',
    description: 'Certified advisors with 10+ years of experience in international education'
  },
  {
    icon: Users,
    title: 'Personalized Guidance',
    description: 'One-on-one sessions tailored to your academic goals and aspirations'
  },
  {
    icon: TrendingUp,
    title: 'Proven Track Record',
    description: '98% visa success rate and thousands of successful placements worldwide'
  },
  {
    icon: Shield,
    title: 'End-to-End Support',
    description: 'From application to arrival - comprehensive support at every step'
  }
];

export function WhyChooseUs({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  
  // Detect if the section is visible in the viewport to trigger animations
  const sectionInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 bg-white overflow-hidden min-h-[90vh]" style={{ position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Webflow Style Heading */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold tracking-widest text-[#9F6920] uppercase bg-[#F1DEA8]/30 px-3 py-1 rounded-full border border-[#D4A755]/20 inline-block mb-3"
            style={{ fontFamily: 'Source Sans 3, sans-serif' }}
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl text-[#462506] font-bold"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={sectionInView ? { width: "60px", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-[#D4A755] mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Featured Image with Webflow Zoom-in & Slide Entrance */}
          <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-black/5">
            <motion.img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Students collaborating"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1, x: -30 }}
              animate={sectionInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 1.1, x: -30 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            />
          </div>

          {/* Features List with Staggered Webflow Entrance */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 60, scale: 0.95 }}
                  animate={sectionInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.95 }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.16, 1, 0.3, 1], // Webflow signature easeOutExpo
                    delay: index * 0.12 
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 12px 24px rgba(70, 37, 6, 0.08)"
                  }}
                  className="flex gap-5 p-5 rounded-r-xl border-l-4 border-[#D4A755] hover:border-[#9F6920] bg-gradient-to-r from-[#FAF8F5] to-white shadow-[0_4px_12px_rgba(70,37,6,0.03)] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#F1DEA8] flex items-center justify-center shadow-[0_2px_8px_rgba(212,167,85,0.2)]">
                      <Icon className="w-6 h-6 text-[#9F6920]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-1.5 font-bold text-[#462506]" style={{ fontFamily: 'Lora, serif' }}>
                      {feature.title}
                    </h3>
                    <p className="text-black/75 leading-relaxed text-sm md:text-base" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}