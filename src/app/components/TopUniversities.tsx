import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Globe, 
  Database, 
  LineChart, 
  PieChart,
  LucideIcon 
} from 'lucide-react';

interface University {
  name: string;
  location: string;
  ranking: string;
  icon: LucideIcon;
}

const universities: University[] = [
  { name: 'Harvard University', location: 'United States', ranking: '#1 Globally', icon: Award },
  { name: 'University of Oxford', location: 'United Kingdom', ranking: '#2 Globally', icon: TrendingUp },
  { name: 'Stanford University', location: 'United States', ranking: '#3 Globally', icon: BarChart3 },
  { name: 'MIT', location: 'United States', ranking: '#5 Globally', icon: Activity },
  { name: 'University of Cambridge', location: 'United Kingdom', ranking: '#4 Globally', icon: Globe },
  { name: 'ETH Zurich', location: 'Switzerland', ranking: '#6 Globally', icon: Database },
  { name: 'University of Toronto', location: 'Canada', ranking: '#18 Globally', icon: LineChart },
  { name: 'National University of Singapore', location: 'Singapore', ranking: '#11 Globally', icon: PieChart }
];

function UniversityCard({ university, index, rotation, isContainerHovered }: { university: University; index: number; rotation: number; isContainerHovered: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: rotation }}
      animate={
        isInView 
          ? { 
              opacity: 1, 
              y: 0, 
              rotate: isContainerHovered ? 0 : rotation,
              marginLeft: isContainerHovered ? '10px' : '-45px',
              marginRight: isContainerHovered ? '10px' : '-45px',
              marginBottom: isContainerHovered ? '16px' : '0px'
            } 
          : { opacity: 0, y: 30, rotate: rotation }
      }
      transition={{ 
        opacity: { duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] },
        y: { duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] },
        rotate: { 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          mass: 0.8
        },
        marginLeft: { 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          mass: 0.8
        },
        marginRight: { 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          mass: 0.8
        },
        marginBottom: { 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          mass: 0.8
        }
      }}
      className="glass-card relative w-[220px] h-[280px] rounded-xl cursor-pointer flex flex-col justify-center items-center p-6"
      style={{
        background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2))',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 20px 40px rgba(159, 105, 32, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(159,105,32,0.06)] border border-[#D4A755]/20">
          {(() => {
            const IconComponent = university.icon;
            return <IconComponent className="w-8 h-8 text-[#9F6920]" />;
          })()}
        </div>
        <div className="flex-1">
          <p className="text-xs text-[#462506] mb-2 font-bold uppercase tracking-wider" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            {university.location}
          </p>
          <span className="inline-block px-3 py-1 bg-[#9F6920] text-white text-xs font-bold rounded-full shadow-[0_2px_6px_rgba(159,105,32,0.15)] border border-[#9F6920]/20" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            {university.ranking}
          </span>
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center rounded-b-xl px-2"
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          borderTop: '1px solid rgba(255, 255, 255, 0.9)'
        }}
      >
        <span className="text-[#462506] text-xs md:text-sm text-center font-extrabold px-1 leading-tight" style={{ fontFamily: 'Lora, serif' }}>
          {university.name}
        </span>
      </div>
    </motion.div>
  );
}

export function TopUniversities() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  
  // Rotation angles for each card to create the fanned effect (reduced for smoother animation)
  const rotations = [-14, -8, -3, 2, 7, 12, 17, 22];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-[#FFF1E6] to-[#FAF8F5] relative overflow-hidden">
      {/* Dynamic luxury circular background lines for astrolabe depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,167,85,0.03)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#D4A755]/5 rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl mb-3 text-center text-[#462506] font-bold"
          style={{ fontFamily: 'Lora, serif' }}
        >
          Top University Partners
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-[#462506]/85 mb-10 text-center max-w-2xl mx-auto font-light"
          style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
        >
          We partner with the world's most prestigious institutions to bring you exceptional education opportunities
        </motion.p>

        <div 
          className="glass-container flex justify-center items-center flex-wrap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {universities.map((university, index) => (
            <UniversityCard 
              key={university.name} 
              university={university} 
              index={index} 
              rotation={rotations[index]}
              isContainerHovered={isHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}