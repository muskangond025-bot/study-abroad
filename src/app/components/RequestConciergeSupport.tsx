import { useState } from 'react';
import { motion } from 'motion/react';

export function RequestConciergeSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      className="relative py-32 bg-black overflow-hidden border-b border-[#D4A755]/10"
    >
      {/* Inline styles for custom sweep-shine keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}} />

      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Ambient warm highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#D4A755]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-4 py-1.5 bg-white/5 border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(212,167,85,0.05)]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A755]">GET IN TOUCH</span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-normal text-white mb-4"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Request Concierge Support
            </h2>

            {/* Gold separator */}
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

            <p
              className="text-lg text-white/70 max-w-3xl mx-auto font-light"
              style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
            >
              Share your details and our dedicated team will contact you within 24 hours to discuss your personalized study abroad journey
            </p>
          </motion.div>

          {/* Glassmorphic Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Concentric spinning rings behind form content */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] translate-x-1/4 -translate-y-1/4 pointer-events-none select-none z-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#D4A755" strokeWidth="0.8" strokeDasharray="30 150" className="animate-spin-counter-clockwise origin-center" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#9F6920" strokeWidth="0.5" strokeDasharray="10 40" className="animate-spin-clockwise origin-center" />
              </svg>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Name Field */}
              <div className="form-field flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D4A755]"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Alexander Mercer"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                />
              </div>

              {/* Email Field */}
              <div className="form-field flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D4A755]"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                />
              </div>

              {/* Phone Field */}
              <div className="form-field flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D4A755]"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g. +1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                />
              </div>

              {/* Program Interest Field */}
              <div className="form-field flex flex-col gap-2">
                <label
                  htmlFor="program"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D4A755]"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Program Interest
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 bg-[#111] border border-white/10 rounded-xl focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300 cursor-pointer ${
                    formData.program ? 'text-white' : 'text-white/30'
                  }`}
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  <option value="" disabled className="bg-black text-white/30">Select program type</option>
                  <option value="undergraduate" className="bg-[#111] text-white">Undergraduate</option>
                  <option value="graduate" className="bg-[#111] text-white">Graduate</option>
                  <option value="phd" className="bg-[#111] text-white">PhD / Doctorate</option>
                  <option value="professional" className="bg-[#111] text-white">Professional Programs</option>
                </select>
              </div>

              {/* Message Field - Full Width */}
              <div className="form-field md:col-span-2 flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D4A755]"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Tell Us About Your Goals
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Share your academic background, target countries, preferred fields of study, and any specific requirements..."
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300 resize-none"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                />
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  className="relative overflow-hidden group/btn bg-gradient-to-r from-[#D4A755] to-[#E9C579] hover:from-[#9F6920] hover:to-[#D4A755] text-black font-semibold text-sm py-5 px-16 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(212,167,85,0.2)] hover:shadow-[0_15px_40px_rgba(212,167,85,0.4)] hover:scale-[1.02] cursor-pointer"
                  style={{ fontFamily: 'Source Sans 3, sans-serif', letterSpacing: '0.1em' }}
                >
                  <span className="relative z-10">SUBMIT REQUEST</span>
                  {/* Sweep shine effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}