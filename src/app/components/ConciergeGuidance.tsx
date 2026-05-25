import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';

export function ConciergeGuidance() {
  const whatWeDo = [
    'Strategic guidance on university selection & course alignment',
    'Personalized roadmap planning with clear timelines',
    'Step-by-step documentation review & visa preparation guidance',
    'Ongoing support & local onboarding orientation checklists'
  ];

  const whatWeDont = [
    'Guarantee admission to any specific university',
    'Make academic decisions or choose programs for you',
    'Submit applications without your review and final approval',
    'Take away your responsibility to meet deadlines'
  ];

  return (
    <div className="relative bg-[#FAF8F5]">
      {/* Inline styles for custom sweep-shine & loop animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep-guidance {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}} />

      {/* SECTION 1: EXPECTATIONS & BOUNDARIES */}
      <section className="relative py-32 bg-[#FAF8F5] overflow-hidden border-b border-[#D4A755]/10">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(159,105,32,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
            {/* Vertical Divider Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4A755]/10 via-[#D4A755]/30 to-[#D4A755]/10 -translate-x-1/2" />

            {/* Left Side: What We Do */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block mb-4 px-4 py-1 bg-[#9F6920]/5 border border-[#9F6920]/20 rounded-full">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9F6920]">OUR SCOPE</span>
                </div>
                <h3
                  className="text-3xl md:text-4xl mb-12 font-normal text-[#462506]"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  What We Do
                </h3>
              </motion.div>

              <div className="space-y-6">
                {whatWeDo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.2 } }}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-white/95 via-white/80 to-[#FAF8F5]/30 border border-[#D4A755]/20 shadow-[0_10px_30px_rgba(159,105,32,0.02)] hover:border-[#D4A755]/50 hover:shadow-[0_15px_35px_rgba(159,105,32,0.06)] transition-all duration-300 cursor-default"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#9F6920] to-[#D4A755] flex items-center justify-center shadow-[0_2px_8px_rgba(159,105,32,0.2)]">
                      <Check size={16} className="text-white" strokeWidth={3} />
                    </div>
                    <p
                      className="text-base md:text-lg text-[#462506]/90 font-light leading-relaxed pt-0.5"
                      style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                    >
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: What We Don't Do */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block mb-4 px-4 py-1 bg-[#462506]/5 border border-[#462506]/20 rounded-full">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#462506]">BOUNDARIES</span>
                </div>
                <h3
                  className="text-3xl md:text-4xl mb-12 font-normal text-[#462506]"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  What We Don't Do
                </h3>
              </motion.div>

              <div className="space-y-6">
                {whatWeDont.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.2 } }}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-[#FAF6EE]/90 via-[#F3EFE7]/80 to-white/40 border border-[#462506]/10 shadow-[0_10px_30px_rgba(70,37,6,0.02)] hover:border-[#462506]/25 hover:shadow-[0_15px_35px_rgba(70,37,6,0.05)] transition-all duration-300 cursor-default"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#462506] flex items-center justify-center shadow-[0_2px_8px_rgba(70,37,6,0.2)]">
                      <X size={16} className="text-white" strokeWidth={3} />
                    </div>
                    <p
                      className="text-base md:text-lg text-[#462506]/80 font-light leading-relaxed pt-0.5"
                      style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                    >
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR APPROACH TO GUIDANCE (CURVED PARALLAX RIBBONS) */}
      <section
        className="relative py-48 bg-[#FAF8F5] overflow-hidden border-b border-[#D4A755]/10"
        style={{
          background: 'radial-gradient(circle at center, rgba(241, 222, 168, 0.25) 0%, rgba(250, 248, 245, 1) 80%)'
        }}
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4A755]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-full flex flex-col gap-6 text-center select-none pointer-events-none overflow-visible">
          {/* Top Scrolling Ribbon: Scrolls Left */}
          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 1400 150"
              className="w-full h-auto overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path
                  id="curveLeft"
                  d="M 0,90 C 300,50 500,50 700,90 C 900,130 1100,130 1400,90"
                  fill="none"
                />
              </defs>
              <text
                fontFamily="Lora, serif"
                fontSize="42"
                fontWeight="500"
                fill="#462506"
                letterSpacing="-0.01em"
              >
                <textPath href="#curveLeft" startOffset="0">
                  We guide, not push. We simplify, not overwhelm. • We guide, not push. We simplify, not overwhelm. • We guide, not push.
                  <animate
                    attributeName="startOffset"
                    dur="25s"
                    from="0%"
                    to="-100%"
                    repeatCount="indefinite"
                  />
                </textPath>
              </text>
            </svg>
          </div>

          {/* Bottom Scrolling Ribbon: Scrolls Right */}
          <div className="w-full overflow-hidden -mt-8 sm:-mt-16">
            <svg
              viewBox="0 0 1400 150"
              className="w-full h-auto overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path
                  id="curveRight"
                  d="M 0,60 C 300,100 500,100 700,60 C 900,20 1100,20 1400,60"
                  fill="none"
                />
              </defs>
              <text
                fontFamily="Lora, serif"
                fontSize="32"
                fontWeight="500"
                fill="#D4A755"
                letterSpacing="0.05em"
              >
                <textPath href="#curveRight" startOffset="-100%">
                  EXPERT ADVISORY • CLARITY & STRUCTURE • FLAWLESS APPLICATION • EXPERT ADVISORY • CLARITY & STRUCTURE •
                  <animate
                    attributeName="startOffset"
                    dur="20s"
                    from="-100%"
                    to="0%"
                    repeatCount="indefinite"
                  />
                </textPath>
              </text>
            </svg>
          </div>

          {/* Subtext description below ribbons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto px-8 pointer-events-auto mt-8 relative z-10"
          >
            <p
              className="text-xl md:text-2xl text-[#9F6920] font-light leading-relaxed"
              style={{ fontFamily: 'Source Sans 3, sans-serif' }}
            >
              Every decision stays yours — we bring clarity, structure, and expert insight to make your journey stress-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: FINAL CALL TO ACTION */}
      <section className="relative py-40 bg-black overflow-hidden">
        {/* Background Engineering Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* Ambient warm highlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4A755]/5 blur-[140px] pointer-events-none" />

        {/* Orbital SVG spinners background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none select-none z-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#D4A755"
              strokeWidth="0.5"
              strokeDasharray="40 180"
              className="animate-spin-counter-clockwise origin-center"
            />
            <circle
              cx="50"
              cy="50"
              r="41"
              fill="none"
              stroke="#9F6920"
              strokeWidth="0.3"
              strokeDasharray="10 30"
              className="animate-spin-clockwise origin-center"
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Ready for structured <br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#EEDCB5] to-[#D4A755]"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                guidance?
              </span>
            </h2>

            {/* Gold line */}
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D4A755] to-transparent mx-auto mb-8" />

            <p
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
              style={{ fontFamily: 'Source Sans 3, sans-serif' }}
            >
              Start your study abroad journey with complete clarity, elite structure, and personal expert support.
            </p>

            <div className="flex justify-center">
              <button
                className="relative overflow-hidden group/btn bg-gradient-to-r from-[#D4A755] to-[#E9C579] hover:from-[#9F6920] hover:to-[#D4A755] text-black font-semibold text-base py-5 px-16 rounded-full transition-all duration-300 shadow-[0_10px_35px_rgba(212,167,85,0.35)] hover:shadow-[0_15px_45px_rgba(212,167,85,0.6)] hover:scale-[1.05] cursor-pointer"
                style={{ fontFamily: 'Source Sans 3, sans-serif', letterSpacing: '0.08em' }}
                onClick={() => {
                  document.getElementById('name')?.focus();
                }}
              >
                <span className="relative z-10">GET CONCIERGE SUPPORT</span>
                {/* Sweep shine effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[sweep-guidance_1.5s_ease-in-out_infinite] pointer-events-none" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}