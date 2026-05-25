import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

interface MetricProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

function Metric({ value, label, suffix = '', delay }: MetricProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="bg-white rounded-xl p-8 shadow-sm border border-black/5"
    >
      <div className="text-5xl md:text-6xl mb-3" style={{ fontFamily: 'Lora, serif', color: '#9F6920' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-lg text-black/70" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
        {label}
      </div>
    </motion.div>
  );
}

export function OverviewMetrics() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Metric value={500} label="Partner Universities" suffix="+" delay={0} />
          <Metric value={15000} label="Students Placed" suffix="+" delay={0.1} />
          <Metric value={35} label="Countries" suffix="+" delay={0.2} />
          <Metric value={98} label="Visa Success Rate" suffix="%" delay={0.3} />
        </div>
      </div>
    </section>
  );
}