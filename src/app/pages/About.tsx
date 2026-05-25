import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Award, Users, Globe, Target, Heart, TrendingUp, X, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, HeartHandshake, Scale, BookOpen, UserCheck, Hourglass, Receipt } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import entranceImg from '@/assets/eduglobal_campus_entrance.png';
import lobbyImg from '@/assets/eduglobal_campus_lobby.png';
import studyingImg from '@/assets/eduglobal_campus_studying.png';
import aboutHeroJourney from '@/assets/about_hero_journey.png';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '15,000+', label: 'Students Placed' },
  { value: '35+', label: 'Countries' },
  { value: '500+', label: 'University Partners' }
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to the highest standards in education consulting.'
  },
  {
    icon: Heart,
    title: 'Student-Centric',
    description: 'Every decision we make prioritizes student success and wellbeing.'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Strong partnerships with leading universities worldwide.'
  },
  {
    icon: Target,
    title: 'Result-Oriented',
    description: '98% visa success rate and consistent student satisfaction.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced counselors with deep knowledge of international education.'
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Leveraging technology to streamline the study abroad process.'
  }
];

const teamMembers = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    bio: `<p>With over 15 years of experience in international education, Dr. Sarah Mitchell brings unparalleled expertise to EduGlobal. She holds a PhD in Educational Leadership from Oxford University and has helped thousands of students achieve their academic dreams.</p><p>Before founding EduGlobal, Sarah served as an international admissions consultant for several Ivy League universities, giving her unique insights into what top institutions look for in candidates. Her holistic approach combines academic excellence with personal development.</p><p>Sarah is passionate about making international education accessible to students from all backgrounds and is a frequent speaker at education conferences worldwide.</p>`,
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    name: 'James Anderson',
    role: 'Head of Admissions',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    bio: `<p>James brings a wealth of insider knowledge from his decade-long career as an admissions officer at Stanford University and MIT. His deep understanding of the admissions process from the university perspective is invaluable to our students.</p><p>He specializes in guiding students through competitive STEM program applications and has a proven track record of helping students gain admission to top-tier engineering and science programs worldwide.</p><p>James holds a Master's in Higher Education Administration and is known for his honest, straightforward approach to college counseling.</p>`,
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Counselor',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    bio: `<p>As our Lead Counselor specializing in UK and European universities, Priya has guided hundreds of students to prestigious institutions including Oxford, Cambridge, LSE, and top universities across the continent.</p><p>With a background in psychology and counseling, Priya excels at understanding each student's unique strengths and helping them present their best selves in applications. Her empathetic approach makes the often-stressful application process manageable and even enjoyable.</p><p>Priya is multilingual and has lived in five different countries, giving her a truly global perspective on international education.</p>`,
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Michael Chen',
    role: 'Visa Consultant',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    bio: `<p>Michael's expertise in visa and immigration procedures has resulted in an impressive 98% visa success rate across 35+ countries. His meticulous attention to detail and up-to-date knowledge of ever-changing immigration regulations make him an invaluable part of our team.</p><p>Before joining EduGlobal, Michael worked for immigration law firms in three different countries, giving him comprehensive knowledge of various visa systems and procedures. He handles everything from student visa applications to post-study work permits.</p><p>Michael is known for his calm, reassuring demeanor during what can be a stressful process, and his ability to navigate complex bureaucratic requirements with ease.</p>`,
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  }
];

const contactItems = [
  { icon: Mail, title: 'Email', value: 'info@eduglobal.com' },
  { icon: Phone, title: 'Phone', value: '+1 800 555 1234' },
  { icon: MapPin, title: 'Address', value: '123 Main St, Anytown, USA' }
];

// StatItem upgraded to a premium 3D Card
function StatCard({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const sheenBg = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const xPct = ((xVal as number) + 0.5) * 100;
      const yPct = ((yVal as number) + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.25) 0%, rgba(212, 167, 85, 0.05) 40%, transparent 70%)`;
    }
  );

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
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="group relative bg-gradient-to-br from-white/90 via-white/50 to-white/30 backdrop-blur-md rounded-2xl p-8 border border-[#D4A755]/15 hover:border-[#9F6920]/45 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(159,105,32,0.08)] flex flex-col items-center justify-center cursor-pointer text-center overflow-hidden"
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[20%] left-[20%] w-1 h-1 rounded-full bg-[#D4A755] animate-luxury-sparkle-1" />
        <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#9F6920] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      <div className="relative z-10" style={{ transformStyle: "preserve-3d", z: 30 }}>
        <motion.div 
          className="text-4xl md:text-5xl mb-2 font-normal text-[#9F6920] group-hover:text-[#462506] transition-colors duration-300" 
          style={{ fontFamily: 'Lora, serif' }}
          whileHover={{ scale: 1.05 }}
        >
          {stat.value}
        </motion.div>
        <div className="text-black/60 group-hover:text-black/80 transition-colors duration-300 text-sm font-medium tracking-wide" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          {stat.label}
        </div>
      </div>
      
      {/* Bottom Accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] z-20"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

// StoryImageStack provides parallax 3D image stack for story section
function StoryImageStack() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const backgroundTranslateX = useTransform(springX, [-0.5, 0.5], [25, 5]);
  const backgroundTranslateY = useTransform(springY, [-0.5, 0.5], [25, 5]);

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
    <div 
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Floating background gold sheet */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#9F6920] to-[#D4A755] opacity-20 rounded-2xl -z-10 border border-[#D4A755]/20"
        style={{
          x: backgroundTranslateX,
          y: backgroundTranslateY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />

      {/* Main Image Card with Z-depth */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-[480px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 z-10"
      >
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
          alt="Team collaboration"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ambient champagne sheen overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: useTransform(
              [springX, springY],
              ([xVal, yVal]) => {
                const xPct = ((xVal as number) + 0.5) * 100;
                const yPct = ((yVal as number) + 0.5) * 100;
                return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.25) 0%, rgba(212, 167, 85, 0.04) 40%, transparent 75%)`;
              }
            )
          }}
        />
      </motion.div>
    </div>
  );
}

// MissionSection premium dark layout with 3D glass card and rotating concentric spinner rings
function MissionSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const sheenBg = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const xPct = ((xVal as number) + 0.5) * 100;
      const yPct = ((yVal as number) + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.12) 0%, rgba(212, 167, 85, 0.04) 45%, transparent 75%)`;
    }
  );

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
    <section className="py-32 bg-[#1C0E03] relative overflow-hidden">
      {/* Background concentric spinning rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10 pointer-events-none select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#D4A755"
            strokeWidth="0.5"
            strokeDasharray="80 100"
            className="animate-spin-clockwise origin-center"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#9F6920"
            strokeWidth="0.3"
            strokeDasharray="40 140"
            className="animate-spin-counter-clockwise origin-center"
          />
        </svg>
      </div>

      {/* Background Engineering Grid (Dark variant) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Ambient lighting spots */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-[#9F6920]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 rounded-full bg-[#D4A755]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 1200
          }}
          className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-12 lg:p-20 max-w-4xl mx-auto overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] cursor-pointer"
        >
          {/* Floating Sparkles inside card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700 z-0">
            <div className="absolute top-[20%] left-[10%] w-1 h-1 rounded-full bg-[#D4A755] animate-luxury-sparkle-1" />
            <div className="absolute bottom-[20%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#9F6920] animate-luxury-sparkle-2" />
          </div>

          {/* Dynamic Light Sheen Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{ background: sheenBg }}
          />

          <div className="relative z-10 text-center" style={{ transformStyle: "preserve-3d", z: 40 }}>
            {/* Tag */}
            <motion.div
              className="inline-block mb-6 px-5 py-1.5 bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Our Purpose
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl mb-8 text-white font-normal" style={{ fontFamily: 'Lora, serif' }}>
              Our Mission
            </h2>

            {/* Underline Divider */}
            <motion.div 
              className="h-[1px] bg-gradient-to-r from-transparent via-[#D4A755]/50 to-transparent mx-auto mb-10"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.8' }}>
              To empower every student with the knowledge, guidance, and confidence to pursue their academic dreams abroad, while maintaining the highest standards of integrity and personalized care.
            </p>
            <p className="text-base lg:text-lg text-white/70 leading-relaxed font-light" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.8' }}>
              We believe that international education opens doors to endless possibilities. Our mission is to ensure that every student we serve receives expert guidance tailored to their unique aspirations, removing barriers and creating pathways to global success.
            </p>
          </div>

          {/* Border glowing outline */}
          <div className="absolute inset-0 border border-[#D4A755]/0 group-hover:border-[#D4A755]/30 rounded-3xl transition-colors duration-500 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

// ValueCard provides premium 3D tilt cards with SVG orbital icon spinners
interface ValueCardProps {
  value: {
    icon: any;
    title: string;
    description: string;
  };
  index: number;
}

const backFaceDetails: Record<string, { motto: string; desc: string }> = {
  'Excellence': {
    motto: 'UNCOMPROMISING QUALITY',
    desc: 'We maintain 100% precision in profile building, application reviews, and university matching, ensuring your candidacy stands out globally.'
  },
  'Student-Centric': {
    motto: 'YOUR VISION, OUR GUIDANCE',
    desc: 'We do not fit you into pre-made templates. Your career goals, budget, and personal preferences guide every single recommendation.'
  },
  'Global Network': {
    motto: 'DIRECT ADMISSIONS ACCESS',
    desc: 'Leverage our direct partnerships with 500+ top institutions globally to secure fast-tracked admission decisions and scholarship options.'
  },
  'Result-Oriented': {
    motto: 'PROVEN SUCCESS RATE',
    desc: 'Backed by a near-perfect visa success rate and an elite track record of placements in Ivy League, Russell Group, and top global colleges.'
  },
  'Expert Team': {
    motto: 'ELITE MENTORSHIP',
    desc: 'Learn directly from certified international counselors, former admissions officers, and alumni mentors who know the admissions codes.'
  },
  'Innovation': {
    motto: 'SMART APPLICATION HUB',
    desc: 'Navigate your entire application journey with custom dashboard trackers, direct portal messaging, and real-time status alerts.'
  }
};

function ValueCard({ value, index }: ValueCardProps) {
  const Icon = value.icon;
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

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
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const details = backFaceDetails[value.title] || { motto: 'PREMIUM QUALITY', desc: value.description };
  const { motto, desc } = details;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <div 
        className="w-full h-[280px] cursor-pointer group"
        style={{ perspective: 1200 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateY: isHovered ? 180 : 0
          }}
          transition={{ type: "spring", stiffness: 85, damping: 16 }}
        >
          {/* FRONT FACE */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/90 via-white/50 to-white/30 backdrop-blur-md rounded-2xl p-8 border border-[#D4A755]/15 hover:border-[#9F6920]/45 transition-colors duration-500 shadow-[0_15px_35px_rgba(159,105,32,0.05)] flex flex-col justify-center items-start overflow-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as React.CSSProperties}
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

            {/* Icon Circle Container with SVG orbital spinner */}
            <div className="relative mb-6" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
              {/* Orbital SVG Spinner */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none select-none z-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="43"
                    fill="none"
                    stroke={`url(#valueGoldGradient1-${index})`}
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
                    stroke={`url(#valueGoldGradient2-${index})`}
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    className="animate-spin-clockwise origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <defs>
                    <linearGradient id={`valueGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                      <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id={`valueGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="transparent" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Active ripple wave glow on hover */}
              <div className="absolute inset-0 rounded-full border border-[#D4A755]/20 group-hover:animate-ping pointer-events-none opacity-0 group-hover:opacity-20 transition-all duration-700 z-0" />

              {/* Main Icon Node */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-[0_6px_15px_rgba(0,0,0,0.03)] border border-[#D4A755]/30 group-hover:border-[#9F6920]/60 transition-colors duration-300 bg-gradient-to-br from-[#9F6920] to-[#D4A755]"
                style={{ z: 50 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center relative z-10 shadow-inner">
                  <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full" style={{ transformStyle: "preserve-3d", z: 30 }}>
              <h3 className="text-2xl mb-3 text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 font-normal" style={{ fontFamily: 'Lora, serif' }}>
                {value.title}
              </h3>
              
              {/* Decorative divider */}
              <div className="w-10 h-[1px] bg-gray-200 group-hover:bg-[#D4A755]/40 transition-colors duration-300" />
            </div>

            {/* Bottom Accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] z-20"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1C0E03] via-[#2A1608] to-[#1C0E03] rounded-2xl p-8 border border-[#D4A755]/30 shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            } as React.CSSProperties}
          >
            {/* Subtle back face glow spheres */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#D4A755]/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#9F6920]/10 blur-2xl pointer-events-none" />

            {/* Large faded watermarked background icon */}
            <div className="absolute right-4 bottom-4 opacity-[0.07] pointer-events-none">
              <Icon className="w-36 h-36 text-[#D4A755]" strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A755]/15 flex items-center justify-center border border-[#D4A755]/30">
                  <Icon className="w-5 h-5 text-[#D4A755]" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-xl text-[#F1DEA8] font-serif" style={{ fontFamily: 'Lora, serif' }}>
                    {value.title}
                  </h3>
                  <div className="text-[9px] font-bold text-[#D4A755] tracking-widest uppercase mt-0.5" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {motto}
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-[#D4A755]/30 to-transparent mb-4" />

              <p className="text-white/80 text-xs leading-relaxed font-light font-sans" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.6' }}>
                {desc}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                EduGlobal Trust
              </span>
              <div className="w-2 h-2 rounded-full bg-[#D4A755] animate-pulse" />
            </div>

            {/* Bottom Accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] z-20" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// DontDoCard provides 3D tilt interaction for What We Don't Do sections
interface DontDoCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

function DontDoCard({ children, className = '', index }: DontDoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const sheenBg = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const xPct = ((xVal as number) + 0.5) * 100;
      const yPct = ((yVal as number) + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.3) 0%, rgba(212, 167, 85, 0.08) 35%, transparent 65%)`;
    }
  );

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

  // Define entrance animation directions dynamically based on position (index)
  const initialAnim = 
    index === 0 ? { opacity: 0, x: -80, y: 0 } :
    index === 1 ? { opacity: 0, x: 0, y: -60 } :
    index === 5 ? { opacity: 0, x: 80, y: 0 } :
    { opacity: 0, x: 0, y: 60 };

  return (
    <motion.div
      initial={initialAnim}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        stiffness: 70, 
        damping: 15, 
        delay: index * 0.05 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden transition-shadow duration-500 rounded-2xl ${className}`}
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[25%] left-[20%] w-1.5 h-1.5 rounded-full bg-white/40 blur-[0.5px] animate-luxury-sparkle-1" />
        <div className="absolute bottom-[25%] right-[20%] w-1 h-1 rounded-full bg-white/30 blur-[0.2px] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {children}

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

// TeamCard provides premium 3D hover effects to team members listing
interface TeamCardProps {
  member: any;
  index: number;
  isSelected: boolean;
  selectedPersonIndex: number | null;
  selectPerson: (index: number) => void;
  personRef: any;
}

function TeamCard({ member, index, isSelected, selectedPersonIndex, selectPerson, personRef }: TeamCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const sheenBg = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const xPct = ((xVal as number) + 0.5) * 100;
      const yPct = ((yVal as number) + 0.5) * 100;
      return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 255, 255, 0.3) 0%, rgba(212, 167, 85, 0.08) 35%, transparent 65%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSelected) return;
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
      ref={personRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      animate={{
        opacity: isSelected && selectedPersonIndex !== index ? 0 : 1,
        pointerEvents: isSelected && selectedPersonIndex !== index ? 'none' : 'auto'
      }}
      onClick={() => selectPerson(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isSelected ? 0 : rotateX,
        rotateY: isSelected ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={isSelected ? {} : { y: -8, transition: { duration: 0.3 } }}
      className="cursor-pointer transition-all duration-300 relative group bg-gradient-to-br from-white/90 via-white/50 to-white/30 backdrop-blur-md border border-[#D4A755]/15 hover:border-[#9F6920]/45 p-4 rounded-2xl hover:shadow-[0_30px_60px_rgba(159,105,32,0.1)] overflow-hidden"
    >
      {/* Floating Luxury Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#D4A755] blur-[0.5px] animate-luxury-sparkle-1" />
        <div className="absolute top-[65%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#9F6920] blur-[0.2px] animate-luxury-sparkle-2" />
      </div>

      {/* Dynamic Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: sheenBg }}
      />

      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-gray-100 z-10" style={{ transformStyle: "preserve-3d" }}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Golden overlay on select */}
        <motion.div
          initial={false}
          animate={{
            height: selectedPersonIndex === index && isSelected ? '100%' : '0%'
          }}
          transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
          className="absolute bottom-0 left-0 w-full bg-[#F1DEA8]/80 backdrop-blur-sm"
        />
        
        {/* Expand icon overlay */}
        <motion.div
          initial={false}
          animate={{
            opacity: selectedPersonIndex === index && isSelected ? 1 : 0,
            scale: selectedPersonIndex === index && isSelected ? 1 : 0.8
          }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-[#462506] pointer-events-none"
        >
          <Users className="w-12 h-12" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Details */}
      <motion.div
        initial={false}
        animate={{
          marginTop: selectedPersonIndex === index && isSelected ? '-40px' : '0px',
          opacity: selectedPersonIndex === index && isSelected ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        className="px-2 relative z-20"
      >
        <h3 className="text-xl md:text-2xl mb-1 text-[#462506] group-hover:text-[#9F6920] transition-colors" style={{ fontFamily: 'Lora, serif' }}>
          {member.name}
        </h3>
        <p 
          className="text-xs uppercase tracking-wider text-black/40 font-semibold"
          style={{ fontFamily: 'Source Sans 3, sans-serif', letterSpacing: '2px' }}
        >
          {member.role}
        </p>
      </motion.div>

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

// ContactCard provides 3D contact nodes with spinners
interface ContactCardProps {
  item: {
    icon: any;
    title: string;
    value: string;
  };
  index: number;
}

function ContactCard({ item, index }: ContactCardProps) {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

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
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getContactMotto = (title: string) => {
    switch (title) {
      case 'Email':
        return 'DIRECT CORRESPONDENCE';
      case 'Phone':
        return 'IMMEDIATE HOTLINE';
      case 'Address':
        return 'GLOBAL HEADQUARTERS';
      default:
        return 'CONTACT CHANNEL';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <div 
        className="w-full h-[280px] cursor-pointer group"
        style={{ perspective: 1200 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateY: isHovered ? 180 : 0
          }}
          transition={{ type: "spring", stiffness: 85, damping: 16 }}
        >
          {/* FRONT FACE */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/90 via-white/50 to-white/30 backdrop-blur-md rounded-2xl p-8 border border-[#D4A755]/15 hover:border-[#9F6920]/45 transition-colors duration-500 shadow-[0_15px_35px_rgba(159,105,32,0.05)] flex flex-col justify-center items-center text-center overflow-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as React.CSSProperties}
          >
            {/* Floating Luxury Sparkles inside Card */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
              <div className="absolute top-[20%] left-[20%] w-1 h-1 rounded-full bg-[#D4A755] animate-luxury-sparkle-1" />
              <div className="absolute top-[70%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#9F6920] animate-luxury-sparkle-3" />
            </div>

            {/* Dynamic Light Sheen Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              style={{ background: sheenBg }}
            />

            {/* Icon Circle Container with SVG orbital spinner */}
            <div className="relative mb-6" style={{ transformStyle: "preserve-3d", zIndex: 10 }}>
              {/* Orbital SVG Spinner */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none select-none z-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="43"
                    fill="none"
                    stroke={`url(#contactGoldGradient1-${index})`}
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
                    stroke={`url(#contactGoldGradient2-${index})`}
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    className="animate-spin-clockwise origin-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <defs>
                    <linearGradient id={`contactGoldGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4A755" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                      <stop offset="100%" stopColor="#9F6920" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id={`contactGoldGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9F6920" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="transparent" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#9F6920" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Active ripple wave glow on hover */}
              <div className="absolute inset-0 rounded-full border border-[#D4A755]/20 group-hover:animate-ping pointer-events-none opacity-0 group-hover:opacity-20 transition-all duration-700 z-0" />

              {/* Main Icon Node */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-[0_6px_15px_rgba(0,0,0,0.03)] border border-[#D4A755]/30 group-hover:border-[#9F6920]/60 transition-colors duration-300 bg-gradient-to-br from-[#9F6920] to-[#D4A755]"
                style={{ z: 50 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-white/10 to-black/10 flex items-center justify-center relative z-10 shadow-inner">
                  <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full" style={{ transformStyle: "preserve-3d", z: 30 }}>
              <h3 className="text-2xl mb-3 text-[#462506] group-hover:text-[#9F6920] transition-colors duration-300 font-normal" style={{ fontFamily: 'Lora, serif' }}>
                {item.title}
              </h3>
              
              {/* Decorative divider */}
              <div className="w-10 h-[1px] bg-gray-200 mb-3 mx-auto group-hover:bg-[#D4A755]/40 transition-colors duration-300" />
            </div>

            {/* Bottom Accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] z-20"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1C0E03] via-[#2A1608] to-[#1C0E03] rounded-2xl p-8 border border-[#D4A755]/30 shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            } as React.CSSProperties}
          >
            {/* Subtle back face glow spheres */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#D4A755]/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#9F6920]/10 blur-2xl pointer-events-none" />

            {/* Large faded watermarked background icon */}
            <div className="absolute right-4 bottom-4 opacity-[0.07] pointer-events-none">
              <Icon className="w-36 h-36 text-[#D4A755]" strokeWidth={1} />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center text-center">
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A755]/15 flex items-center justify-center border border-[#D4A755]/30">
                  <Icon className="w-5 h-5 text-[#D4A755]" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-xl text-[#F1DEA8] font-serif" style={{ fontFamily: 'Lora, serif' }}>
                    {item.title}
                  </h3>
                  <div className="text-[9px] font-bold text-[#D4A755] tracking-widest uppercase mt-0.5" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {getContactMotto(item.title)}
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4A755]/40 to-transparent mb-4" />

              <p 
                className="text-white text-base md:text-lg leading-relaxed font-normal tracking-wide px-2 break-all"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                {item.value}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between w-full mt-auto">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Secure Channel
              </span>
              <div className="w-2 h-2 rounded-full bg-[#D4A755] animate-pulse" />
            </div>

            {/* Bottom Accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#9F6920] via-[#D4A755] to-[#9F6920] z-20" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Interactive Team Section Component
function TeamSection() {
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const personRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectPerson = (index: number) => {
    if (!isOk) {
      setSelectedPersonIndex(index);
      setIsSelected(true);
      setSelectedPerson(teamMembers[index]);
      
      // Lock scroll
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        setIsReady(true);
        setIsOk(true);
      }, 420);
    } else {
      reset();
    }
  };

  const reset = () => {
    setIsReady(false);
    setTimeout(() => {
      setIsSelected(false);
      setIsOk(false);
      setSelectedPerson(null);
      setSelectedPersonIndex(null);
      
      // Unlock scroll
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
    <section className="py-28 bg-gradient-to-b from-white via-[#FAF8F5] to-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{
            maxHeight: isSelected ? 0 : '200px',
            opacity: isSelected ? 0 : 1,
            marginBottom: isSelected ? 0 : 64
          }}
          transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1], delay: 0.05 }}
          className="overflow-hidden text-center"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              Our Experts
            </span>
          </motion.div>

          <h2 
            className="text-4xl md:text-5xl mb-4 text-[#462506]"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Our Team
          </h2>

          {/* Underline Divider */}
          <motion.div 
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <p
            className="text-lg text-black/70 max-w-3xl mx-auto"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            Meet the experts behind your success
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          initial={false}
          animate={{
            height: isReady ? 0 : 'auto',
            overflow: isReady ? 'hidden' : 'visible'
          }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              index={index}
              isSelected={isSelected}
              selectedPersonIndex={selectedPersonIndex}
              selectPerson={selectPerson}
              personRef={(el: any) => (personRefs.current[index] = el)}
            />
          ))}
        </motion.div>
      </div>

      {/* Detail View Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isReady ? 1 : 0,
          visibility: isReady ? 'visible' : 'hidden',
          x: isReady ? 0 : 100
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1], delay: isReady ? 0.3 : 0 }}
        className="fixed inset-0 bg-[#1C0E03] z-[100] overflow-y-auto"
        style={{ top: 0, paddingTop: '80px' }}
      >
        {isOk && selectedPerson && (
          <div className="h-full flex flex-col lg:flex-row">
            {/* Left side - Large Photo */}
            <div
              className="relative w-full lg:w-[650px] min-h-[300px] lg:min-h-full bg-cover bg-top flex items-center justify-center border-r border-[#D4A755]/10"
              style={{ backgroundImage: `url(${selectedPerson.image})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/75" />
              
              {/* Gradient Overlay - horizontal on desktop, vertical on mobile */}
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-[#1C0E03] opacity-0 lg:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0E03] opacity-100 lg:opacity-0" />
              
              {/* Photo */}
              <div className="relative z-10 text-center px-4 lg:px-8 py-8">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  className="w-3/4 max-w-sm mx-auto shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-2xl border border-[#D4A755]/30"
                />
              </div>

              {/* Back button (vertical bar on left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                onClick={reset}
                className="absolute left-0 top-0 w-[60px] lg:w-[100px] h-full bg-[#9F6920]/80 backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center hover:bg-[#D4A755] transition-all duration-300 group border-r border-[#D4A755]/20"
              >
                <Users className="w-8 h-8 lg:w-10 lg:h-10 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <span className="text-xs mt-4 text-white font-medium tracking-[0.2em] hidden lg:block" style={{ fontFamily: 'Source Sans 3, sans-serif', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                  BACK TO TEAM
                </span>
              </motion.div>
            </div>

            {/* Right side - Bio */}
            <div className="flex-1 flex items-start lg:items-center px-6 lg:px-20 py-8 lg:py-16 overflow-y-auto bg-[#1C0E03] text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="w-full max-w-3xl"
              >
                <div className="mb-8 text-center lg:text-left">
                  {/* Profile Badge */}
                  <div className="inline-block mb-3 px-4 py-1 bg-[#D4A755]/10 border border-[#D4A755]/20 rounded-full">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      Team Member Profile
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-5xl mb-3 text-white" style={{ fontFamily: 'Lora, serif' }}>
                    {selectedPerson.name}
                  </h2>
                  <p 
                    className="text-xs lg:text-sm uppercase tracking-wider text-[#D4A755] mb-6 font-medium"
                    style={{ fontFamily: 'Source Sans 3, sans-serif', letterSpacing: '3px' }}
                  >
                    {selectedPerson.role}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex gap-4 justify-center lg:justify-start">
                    <motion.a 
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedPerson.social.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#D4A755] hover:text-white transition-colors duration-300"
                    >
                      <Facebook className="w-5 h-5 lg:w-6 lg:h-6" />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedPerson.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#D4A755] hover:text-white transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5 lg:w-6 lg:h-6" />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedPerson.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#D4A755] hover:text-white transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />
                    </motion.a>
                  </div>
                </div>

                {/* Bio Content */}
                <div
                  className="text-white/80 bio-content-premium max-w-3xl border-t border-white/10 pt-6"
                  style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.8' }}
                  dangerouslySetInnerHTML={{ __html: selectedPerson.bio }}
                />

                {/* Close button for mobile */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={reset}
                  className="lg:hidden mt-8 w-full py-4 bg-gradient-to-r from-[#9F6920] to-[#D4A755] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Back to Team
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Styles for bio paragraphs */}
      <style>{`
        .bio-content-premium p {
          margin-bottom: 16px;
          line-height: 1.8;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
        }
        .bio-content-premium p:last-child {
          margin-bottom: 0;
        }
        @media (min-width: 1024px) {
          .bio-content-premium p {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </section>
  );
}

const GoldOrnateDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/50 to-[#D4A755]" />
    <svg className="w-12 h-6 text-[#D4A755]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 15 C 25 5, 30 25, 50 15 C 70 5, 75 25, 90 15" strokeLinecap="round" />
      <circle cx="50" cy="15" r="3" fill="#9F6920" />
      <path d="M30 15 C 35 10, 45 10, 50 15" />
      <path d="M70 15 C 65 10, 55 10, 50 15" />
    </svg>
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-[#D4A755]/50 to-[#D4A755]" />
  </div>
);

const hotspots = [
  {
    id: 'oxford',
    name: 'Radcliffe Camera (Oxford)',
    sub: 'UK',
    desc: 'Elite admissions into Oxford and top UK Russell Group universities.',
    x: '16%',
    y: '73%',
    delay: 0.7,
    tooltipClass: "left-0 -translate-x-[15%] transform origin-bottom-left",
  },
  {
    id: 'harvard',
    name: 'Harvard Hall (USA)',
    sub: 'USA',
    desc: 'Pathways to Harvard, Stanford, and Ivy League institutions.',
    x: '23%',
    y: '60%',
    delay: 1.1,
    tooltipClass: "left-0 -translate-x-[25%] transform origin-bottom-left",
  },
  {
    id: 'europe',
    name: 'Classical Hall (Europe)',
    sub: 'Europe',
    desc: 'Connecting ambitious minds to European centers of academic excellence.',
    x: '28%',
    y: '72%',
    delay: 1.5,
    tooltipClass: "left-1/2 -translate-x-1/2 transform origin-bottom",
  },
  {
    id: 'japan',
    name: 'Torii Gate (Japan)',
    sub: 'Asia-Pacific',
    desc: 'Opening global career and academic horizons in Japan and Asia-Pacific.',
    x: '50%',
    y: '74%',
    delay: 2.1,
    tooltipClass: "left-1/2 -translate-x-1/2 transform origin-bottom",
  },
  {
    id: 'canada',
    name: 'Gothic Hall (Canada)',
    sub: 'Canada',
    desc: 'Securing admission and study permits in premier Canadian research colleges.',
    x: '61%',
    y: '72%',
    delay: 2.5,
    tooltipClass: "left-1/2 -translate-x-1/2 transform origin-bottom",
  },
  {
    id: 'global',
    name: 'Global Curriculum',
    sub: 'World',
    desc: 'Tailoring international study pathways for diverse profiles and goals.',
    x: '72%',
    y: '71%',
    delay: 2.9,
    tooltipClass: "left-1/2 -translate-x-1/2 transform origin-bottom",
  },
  {
    id: 'placements',
    name: 'Placements (World)',
    sub: 'Global Placements',
    desc: 'Celebrating final enrollment, visa issuance, and campus entry worldwide.',
    x: '87%',
    y: '45%',
    delay: 3.4,
    tooltipClass: "right-0 translate-x-[15%] left-auto transform origin-bottom-right",
  }
];

const journeyStats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '15,000+', label: 'Students Placed' },
  { value: '35+', label: 'Countries Covered' },
  { value: '500+', label: 'Partner Universities' },
  { value: '98%', label: 'Visa Success Rate' },
  { value: '120+', label: 'Destination Cities' },
  { value: '85%', label: 'Placement Ratio' }
];

function AboutHeroImage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

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
    <div 
      className="relative group cursor-pointer w-full mt-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1500 }}
    >
      {/* 3D image frame */}
      <motion.div
        className="w-full relative z-10 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Zoomed & Cropped Map Canvas Container (wood table cropping) */}
        <div className="w-[122%] max-w-none relative -translate-x-[9%] h-auto">
          <img
            src={aboutHeroJourney}
            alt="Our Journey map showing global placements and milestones"
            className="w-full h-auto object-cover select-none transition-transform duration-700 group-hover:scale-[1.01]"
          />

          {/* Ambient champagne sheen overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

          {/* Top and Bottom soft page-blend gradient masks */}
          <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-[#FAF8F5] to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />

          {/* Mask patch to cover the baked-in background stats cards in the image */}
          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#FAF6F0] z-16 pointer-events-none" />
          <div className="absolute bottom-[15%] left-0 right-0 h-[5%] bg-gradient-to-t from-[#FAF6F0] to-transparent z-16 pointer-events-none" />

          {/* Drawing path route layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-15"
            viewBox="0 0 1024 436"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 50,340 C 100,340 130,330 163.84,318.28 C 190,300 210,270 235.52,261.6 C 255,255 270,290 286.72,313.92 C 350,390 450,350 512,322.64 C 560,300 590,305 624.64,313.92 C 660,325 700,325 737.28,309.56 C 780,290 840,240 890.88,196.2 C 920,170 950,165 980,160"
              stroke="url(#goldGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="8 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 50,340 C 100,340 130,330 163.84,318.28 C 190,300 210,270 235.52,261.6 C 255,255 270,290 286.72,313.92 C 350,390 450,350 512,322.64 C 560,300 590,305 624.64,313.92 C 660,325 700,325 737.28,309.56 C 780,290 840,240 890.88,196.2 C 920,170 950,165 980,160"
              stroke="#FAF0D9"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              className="opacity-75"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9F6920" />
                <stop offset="50%" stopColor="#D4A755" />
                <stop offset="100%" stopColor="#FAF0D9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hotspots layer */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ left: spot.x, top: spot.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/spot"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 12, delay: spot.delay }}
                className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
              >
                {/* Repeating Pulsing Ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-[#D4A755]/40"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Secondary Inner Pulse */}
                <motion.div 
                  className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#9F6920]/30"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Central Gold Node */}
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#D4A755] to-[#9F6920] border border-white sm:border-2 shadow-[0_0_8px_rgba(212,167,85,0.8)] z-10 transition-transform duration-300 group-hover/spot:scale-125" />
                
                {/* Floating Mini Name Label */}
                <div className="absolute top-7 px-2 py-0.5 whitespace-nowrap bg-[#FAF8F5]/90 border border-[#D4A755]/20 rounded-md shadow-[0_2px_8px_rgba(159,105,32,0.08)] backdrop-blur-sm scale-75 sm:scale-90 group-hover/spot:scale-95 group-hover/spot:border-[#D4A755]/50 transition-all duration-300">
                  <span className="text-[9px] sm:text-[10px] font-medium text-[#462506] tracking-wide">{spot.sub}</span>
                </div>

                {/* Detailed Premium Glassmorphic Tooltip Card */}
                <div className={`absolute bottom-9 p-3 sm:p-4 bg-white/95 border border-[#D4A755]/30 rounded-xl shadow-[0_10px_30px_rgba(70,37,6,0.15)] backdrop-blur-md opacity-0 scale-95 pointer-events-none group-hover/spot:opacity-100 group-hover/spot:scale-100 transition-all duration-300 ease-out z-30 flex flex-col gap-1 w-56 sm:w-64 ${spot.tooltipClass || 'left-1/2 -translate-x-1/2 transform origin-bottom'}`}>
                  <div className="flex items-center gap-1.5 border-b border-[#D4A755]/10 pb-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4A755] animate-ping" />
                    <h4 className="text-[10px] sm:text-xs font-semibold text-[#462506] tracking-wider uppercase">{spot.name}</h4>
                  </div>
                  <p className="text-[10px] sm:text-[11px] leading-relaxed text-black/75 font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    {spot.desc}
                  </p>
                  <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-[#D4A755]/10 text-[8px] sm:text-[9px] text-[#9F6920] font-semibold tracking-wider uppercase">
                    <span>EduGlobal Pathway</span>
                    <span className="text-black/40">Active</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Real HTML/CSS glassmorphic stats cards overlay (centered in page layout bounds) */}
        <div className="hidden sm:block absolute bottom-[6%] left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-7 gap-[1.5%] pointer-events-auto">
            {journeyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 90, 
                  damping: 14, 
                  delay: 3.5 + index * 0.12 
                }}
                className="group/stat flex flex-col justify-center items-center py-2 px-1 lg:py-2.5 lg:px-2 bg-white/70 border border-white/80 rounded-2xl shadow-[0_8px_20px_rgba(159,105,32,0.06)] backdrop-blur-md transition-all duration-300 hover:bg-white/95 hover:border-[#D4A755]/50 hover:shadow-[0_12px_24px_rgba(212,167,85,0.18)] hover:-translate-y-1 text-center cursor-default"
              >
                <span className="text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#9F6920] to-[#603E0E] bg-clip-text text-transparent group-hover/stat:scale-105 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-[8px] lg:text-[9px] uppercase tracking-wider text-[#462506]/75 mt-0.5 leading-tight font-medium" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function About() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <div className="relative pt-20 overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="pt-8 pb-20 bg-gradient-to-b from-[#FAF8F5] via-white to-white relative overflow-hidden">
        {/* Background Engineering Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient gold light spots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-amber-50/15 via-[#F1DEA8]/5 to-transparent blur-[120px] pointer-events-none" />

        {/* Interactive Full-Screen Journey Map */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full relative z-10"
        >
          <AboutHeroImage />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gradient-to-b from-white via-[#FAF8F5] to-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 bg-gradient-to-b from-white via-[#FAF8F5] to-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient Gold/Peach Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4A755]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FAF0D9]/30 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-100/60 to-[#F1DEA8]/45 border border-[#D4A755]/30 rounded-full shadow-[0_4px_12px_rgba(212,167,85,0.08)]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-[#9F6920] to-[#603E0E] bg-clip-text text-transparent" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  About EduGlobal
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl mb-6 font-normal tracking-tight bg-gradient-to-r from-[#462506] via-[#7D4F1E] to-[#9F6920] bg-clip-text text-transparent"
                style={{ fontFamily: 'Lora, serif' }}
              >
                Our Story
              </motion.h2>

              {/* Underline Divider */}
              <motion.div 
                className="h-[3px] bg-gradient-to-r from-[#D4A755] via-[#9F6920] to-transparent mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: '160px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 text-[#3A332E] font-light leading-relaxed"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                <p className="text-xl text-[#5C3A21] font-normal leading-relaxed">
                  <span className="font-serif text-3xl font-semibold mr-1 text-[#9F6920] inline-block">F</span>ounded in 2011, EduGlobal began with a simple mission: to make world-class education accessible to ambitious students everywhere. What started as a small team of passionate educators has grown into a leading international education consultancy.
                </p>
                <p className="text-base text-black/75">
                  Today, we partner with over <strong className="font-medium text-[#9F6920]">500 prestigious universities</strong> across <strong className="font-medium text-[#9F6920]">35 countries</strong>, helping students navigate the complex journey of studying abroad. Our success is measured not in numbers, but in the transformed lives of the students we serve.
                </p>
                <p className="text-base text-black/75">
                  Every member of our team brings deep expertise in international education, combined with a genuine commitment to student success. We don't just process applications—we build <strong className="font-medium text-[#9F6920]">lasting relationships</strong> and provide support every step of the way.
                </p>
              </motion.div>
            </div>
            
            {/* Story parallax 3D image stack */}
            <StoryImageStack />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <MissionSection />

      {/* Values */}
      <section className="py-28 bg-gradient-to-b from-[#FAF8F5] via-white to-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Our Core Principles
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-4 text-[#462506] font-normal"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Our Values
            </motion.h2>

            {/* Underline Divider */}
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-black/70 max-w-3xl mx-auto font-light"
              style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="py-28 bg-gradient-to-b from-white via-[#FAF8F5] to-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Transparency
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-4 text-[#462506] font-normal"
              style={{ fontFamily: 'Lora, serif' }}
            >
              What We Don't Do
            </motion.h2>

            {/* Underline Divider */}
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-black/70 max-w-3xl mx-auto font-light"
              style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
            >
              Transparency and integrity are at the core of our operations
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.6fr_1.2fr] lg:grid-rows-[auto_1fr] gap-6">
            {/* LEFT CARD */}
            <DontDoCard index={0} className="lg:row-span-2 lg:h-full relative rounded-2xl p-0 flex flex-col justify-end min-h-[400px] lg:min-h-[480px] border border-[#D4A755]/15 overflow-hidden group">
              <img 
                src={entranceImg} 
                alt="Campus Entrance" 
                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
              />
              
              {/* Floating glassmorphic card (Visible only on Hover) */}
              <div className="m-4 p-6 rounded-xl bg-[#1C0E03]/90 backdrop-blur-md border border-[#D4A755]/25 relative z-10 shadow-[0_15px_30px_rgba(0,0,0,0.45)] opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.25,1,0.5,1]">
                {/* Floating icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4A755]/10 flex items-center justify-center border border-[#D4A755]/30">
                    <HeartHandshake className="w-6 h-6 text-[#D4A755]" strokeWidth={1.8} />
                  </div>
                </div>
                
                <h4 className="text-2xl mb-1 text-white font-serif" style={{ fontFamily: 'Lora, serif' }}>
                  No False Promises
                </h4>
                <p className="text-white/80 text-sm mb-4" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  We never guarantee admissions
                </p>
                <div className="font-semibold text-[#D4A755] text-xs tracking-wider uppercase" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Integrity First
                </div>
              </div>
            </DontDoCard>

            {/* CENTER TOP */}
            <DontDoCard index={1} className="lg:col-start-2 lg:row-start-1 lg:h-full rounded-2xl min-h-[140px] border border-[#D4A755]/20 relative overflow-hidden group flex items-center p-0">
              <img 
                src={lobbyImg} 
                alt="Campus Lobby" 
                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
              />
              
              {/* Floating horizontal glass bar (Visible only on Hover) */}
              <div className="m-3 p-4 rounded-xl bg-[#1C0E03]/90 backdrop-blur-md border border-[#D4A755]/25 relative z-10 flex items-center justify-between w-full shadow-[0_10px_25px_rgba(0,0,0,0.4)] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.25,1,0.5,1]">
                <div>
                  <h4 className="text-xl mb-1 text-white font-serif" style={{ fontFamily: 'Lora, serif' }}>
                    We Don't Cut Corners
                  </h4>
                  <p className="text-white/70 text-xs font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    Transparency and integrity come first
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-2 justify-between flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#D4A755]/15 flex items-center justify-center border border-[#D4A755]/30">
                    <Scale className="w-5 h-5 text-[#D4A755]" strokeWidth={1.8} />
                  </div>
                </div>
              </div>
            </DontDoCard>

            {/* CENTER BOTTOM - 3 SMALL CARDS */}
            <div className="lg:col-start-2 lg:row-start-2 lg:h-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <DontDoCard index={2} className="bg-white rounded-xl p-5 border border-[#D4A755]/10 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[170px] h-full">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#9F6920]/5 flex items-center justify-center border border-[#9F6920]/15 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-5 h-5 text-[#9F6920]" strokeWidth={1.8} />
                  </div>
                  <h5 className="text-base mb-2 text-[#462506] font-medium" style={{ fontFamily: 'Lora, serif' }}>
                    No Essay Writing
                  </h5>
                  <p className="text-black/60 text-xs leading-relaxed font-light font-sans" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    Students must apply themselves
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#9F6920] mt-4" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Ethical Practice
                </div>
              </DontDoCard>

              <DontDoCard index={3} className="bg-white rounded-xl p-5 border border-[#D4A755]/10 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[170px] h-full">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#9F6920]/5 flex items-center justify-center border border-[#9F6920]/15 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="w-5 h-5 text-[#9F6920]" strokeWidth={1.8} />
                  </div>
                  <h5 className="text-base mb-2 text-[#462506] font-medium" style={{ fontFamily: 'Lora, serif' }}>
                    No Commission Bias
                  </h5>
                  <p className="text-black/60 text-xs leading-relaxed font-light font-sans" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    We don't recommend for profit
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#9F6920] mt-4" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Student First
                </div>
              </DontDoCard>

              <DontDoCard index={4} className="bg-white rounded-xl p-5 border border-[#D4A755]/10 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[170px] h-full">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#9F6920]/5 flex items-center justify-center border border-[#9F6920]/15 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Hourglass className="w-5 h-5 text-[#9F6920]" strokeWidth={1.8} />
                  </div>
                  <h5 className="text-base mb-2 text-[#462506] font-medium" style={{ fontFamily: 'Lora, serif' }}>
                    No Rushed Decisions
                  </h5>
                  <p className="text-black/60 text-xs leading-relaxed font-light font-sans" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    We guide with proper consultation
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#9F6920] mt-4" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Thoughtful Guidance
                </div>
              </DontDoCard>
            </div>

            {/* RIGHT CARD */}
            <DontDoCard index={5} className="lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:h-full relative rounded-2xl p-0 flex flex-col justify-end min-h-[400px] lg:min-h-[480px] border border-[#D4A755]/15 overflow-hidden group">
              <img 
                src={studyingImg} 
                alt="Students Studying" 
                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
              />
              
              {/* Floating glassmorphic card (Visible only on Hover) */}
              <div className="m-4 p-6 rounded-xl bg-[#1C0E03]/90 backdrop-blur-md border border-[#D4A755]/25 relative z-10 shadow-[0_15px_30px_rgba(0,0,0,0.45)] opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.25,1,0.5,1]">
                {/* Floating icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4A755]/10 flex items-center justify-center border border-[#D4A755]/30">
                    <Receipt className="w-6 h-6 text-[#D4A755]" strokeWidth={1.8} />
                  </div>
                </div>
                
                <h4 className="text-2xl mb-1 text-white font-serif" style={{ fontFamily: 'Lora, serif' }}>
                  No Hidden Charges
                </h4>
                <p className="text-white/80 text-sm mb-4" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Clear and honest pricing always
                </p>
                <div className="font-semibold text-[#D4A755] text-xs tracking-wider uppercase" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Full Transparency
                </div>
              </div>
            </DontDoCard>
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Contact */}
      <section className="py-28 bg-gradient-to-b from-[#FAF8F5] via-white to-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(159,105,32,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(159,105,32,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-50 to-[#F1DEA8]/30 border border-[#D4A755]/20 rounded-full"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9F6920]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Connect
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-4 text-[#462506] font-normal"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Contact Us
            </motion.h2>

            {/* Underline Divider */}
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mt-4 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-black/70 max-w-3xl mx-auto font-light"
              style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
            >
              Get in touch with our team
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactItems.map((item, index) => (
              <ContactCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}