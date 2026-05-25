import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is the typical timeline for studying abroad?',
    answer: 'The timeline varies by country and intake, but typically ranges from 6-12 months. We recommend starting the process at least 9 months before your intended start date to allow time for applications, visa processing, and preparation.'
  },
  {
    question: 'How much does it cost to study abroad?',
    answer: 'Costs vary significantly based on the destination country and institution. Tuition can range from $10,000 to $60,000+ per year. We help you explore scholarship opportunities and create a comprehensive budget including living expenses.'
  },
  {
    question: 'What are the English language requirements?',
    answer: 'Most universities require IELTS (6.0-7.5) or TOEFL (80-100) scores. Some institutions also accept Duolingo English Test or PTE. We provide guidance on test preparation and alternative pathways if needed.'
  },
  {
    question: 'Can I work while studying abroad?',
    answer: 'Yes, most countries allow international students to work part-time (typically 20 hours per week) during term time and full-time during breaks. Work rights vary by country and visa type.'
  },
  {
    question: 'What support do you provide after admission?',
    answer: 'Our support continues through visa application, pre-departure orientation, accommodation assistance, and post-arrival support. We maintain contact with students throughout their academic journey.'
  }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={`border-b border-[#D4A755]/15 last:border-0 transition-all duration-500 ${
        isOpen 
          ? 'my-4 p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-[0_20px_40px_rgba(159,105,32,0.06)] border border-[#D4A755]/30' 
          : 'px-2 py-1'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left transition-colors duration-300 group"
      >
        <div className="relative overflow-hidden flex-1 py-1 pr-8">
          {/* Default state: slides up and fades out on hover */}
          <span 
            className="block text-xl text-[#462506] font-medium font-serif transition-all duration-500 ease-[0.25,1,0.5,1] group-hover:-translate-y-3 group-hover:opacity-0" 
            style={{ fontFamily: 'Lora, serif' }}
          >
            {faq.question}
          </span>
          {/* Hover state: slides up and fades in from bottom on hover */}
          <span 
            className="absolute inset-0 text-xl text-[#9F6920] font-medium font-serif transition-all duration-500 ease-[0.25,1,0.5,1] translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none" 
            style={{ fontFamily: 'Lora, serif' }}
          >
            {faq.question}
          </span>
        </div>
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen 
                ? 'bg-gradient-to-tr from-[#9F6920] to-[#D4A755] text-white shadow-[0_0_12px_rgba(212,167,85,0.4)]' 
                : 'border border-[#D4A755]/40 text-[#D4A755] group-hover:border-[#9F6920] group-hover:bg-[#D4A755]/10'
            }`}
          >
            {isOpen ? (
              <Minus className="w-5 h-5" strokeWidth={2.5} />
            ) : (
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            )}
          </div>
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-black/75 leading-relaxed font-light text-base md:text-lg" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] relative overflow-hidden">
      {/* Luxury gold micro-dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#D4A755 1.5px, transparent 1.5px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Floating glassmorphic backdrop spheres for depth and glow */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-[#D4A755]/3 blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] rounded-full bg-[#9F6920]/2 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl mb-4 text-[#462506] font-bold"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto font-light"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            Everything you need to know about studying abroad
          </motion.p>
        </div>

        {/* Thick frosted-glass accordion box floating weightlessly */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 15, duration: 1 }}
          className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 shadow-[0_30px_70px_rgba(212,167,85,0.08)] border border-white/30"
          style={{
            boxShadow: 'inset 0 0 24px rgba(255, 255, 255, 0.1), 0 30px 70px rgba(212,167,85,0.08)'
          }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}