import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  index: number;
}

function ContactCard({ icon, title, details, index }: ContactCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const sheenBg = useTransform(() => {
    const xPct = (springX.get() + 0.5) * 100;
    const yPct = (springY.get() + 0.5) * 100;
    return `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(212, 167, 85, 0.25) 0%, rgba(159, 105, 32, 0.05) 40%, transparent 70%)`;
  });

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl overflow-hidden p-8 transition-all duration-500 border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#D4A755]/40 hover:shadow-[0_20px_50px_rgba(212,167,85,0.15)] flex flex-col justify-between min-h-[260px] cursor-default"
    >
      {/* Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: sheenBg }}
      />

      {/* Floating Sparkles inside Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-700 z-10">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-[#D4A755] blur-[0.2px] animate-luxury-sparkle-1" />
        <div className="absolute top-[65%] left-[75%] w-1.2 h-1.2 rounded-full bg-[#9F6920] blur-[0.5px] animate-luxury-sparkle-2" />
      </div>

      {/* Concentric spinning SVG spinner around icon */}
      <div className="relative w-16 h-16 mb-6 flex items-center justify-center" style={{ transformStyle: 'preserve-3d', zIndex: 20 }}>
        <div className="absolute w-16 h-16 pointer-events-none select-none z-0 animate-spin-clockwise opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="url(#contactCardGoldGrad)"
              strokeWidth="2.5"
              strokeDasharray="40 180"
            />
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="url(#contactCardGoldGrad)"
              strokeWidth="1.5"
              strokeDasharray="15 60"
              className="animate-spin-counter-clockwise origin-center"
            />
          </svg>
        </div>
        <div className="relative z-10 text-[#D4A755] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      {/* Content details */}
      <div className="relative z-20 flex-1 flex flex-col justify-end" style={{ transformStyle: 'preserve-3d', z: 30 }}>
        <h3
          className="text-2xl font-normal text-white mb-3 font-serif"
          style={{ fontFamily: 'Lora, serif' }}
        >
          {title}
        </h3>
        <div className="space-y-1.5 text-white/70 text-sm font-light leading-relaxed" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          {details.map((detail, dIdx) => (
            <p key={dIdx}>{detail}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    program: '',
    message: ''
  });

  const [activeOffice, setActiveOffice] = useState<string>('ny');

  const offices = [
    {
      id: 'ny',
      name: 'New York Office',
      coords: { left: '22%', top: '32%' },
      address: '123 Education Street, New York, NY 10001, USA',
      phone: '+1 (555) 123-4567',
      email: 'ny@eduglobal.com',
      hours: 'Mon-Fri, 9:00 AM - 6:00 PM EST'
    },
    {
      id: 'london',
      name: 'London Office',
      coords: { left: '46%', top: '22%' },
      address: '45 Oxford Court, London, W1D 1AN, UK',
      phone: '+44 20 7946 0192',
      email: 'london@eduglobal.com',
      hours: 'Mon-Fri, 9:00 AM - 5:30 PM GMT'
    },
    {
      id: 'zurich',
      name: 'Zurich Office',
      coords: { left: '50%', top: '26%' },
      address: '8 Rämistrasse, 8001 Zürich, Switzerland',
      phone: '+41 44 268 2810',
      email: 'zurich@eduglobal.com',
      hours: 'Mon-Fri, 8:30 AM - 5:30 PM CET'
    },
    {
      id: 'singapore',
      name: 'Singapore Office',
      coords: { left: '82%', top: '68%' },
      address: '21 Lower Kent Ridge Rd, Singapore 119077',
      phone: '+65 6516 6666',
      email: 'singapore@eduglobal.com',
      hours: 'Mon-Fri, 9:00 AM - 6:00 PM SST'
    }
  ];

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

  const selectedOffice = offices.find(o => o.id === activeOffice) || offices[0];

  return (
    <div className="relative pt-20 bg-black min-h-screen">
      {/* Inline styles for sweep and pulsate animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep-contact {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes hotspot-pulsate {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .animate-hotspot-pulse {
          animation: hotspot-pulsate 2s infinite ease-out;
        }
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        .animate-float-slow {
          animation: float-slow 18s infinite ease-in-out;
        }
        @keyframes float-reverse {
          0% { transform: translateY(0px) rotate(360deg); }
          50% { transform: translateY(25px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-reverse {
          animation: float-reverse 22s infinite ease-in-out;
        }
      `}} />

      {/* SVG definitions for gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="contactCardGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A755" />
            <stop offset="100%" stopColor="#9F6920" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Ambient warm highlights and floating backdrop glassmorphic spheres */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-[#D4A755]/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-[#9F6920]/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-[18%] left-[8%] w-80 h-80 rounded-full bg-gradient-to-br from-[#FFC75F]/35 via-[#FF9671]/20 to-transparent blur-[70px] animate-float-slow pointer-events-none z-0" />
      <div className="absolute top-[48%] right-[4%] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-[#FF9671]/30 via-[#845EC2]/15 to-transparent blur-[80px] animate-float-reverse pointer-events-none z-0" />
      <div className="absolute bottom-[12%] left-[18%] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#FFC75F]/25 via-[#00C9A7]/10 to-transparent blur-[90px] animate-float-slow pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/5 border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(212,167,85,0.05)]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A755]">GET IN TOUCH</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Contact Our Advisors
          </h1>

          {/* Gold separator */}
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

          <p
            className="text-lg text-white/70 max-w-3xl mx-auto font-light"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            Ready to start your study abroad journey? Our global expert advisors are here to help you every step of the way.
          </p>
        </motion.div>

        {/* SECTION 1: CONTACT CARDS & FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24 items-start">
          {/* Contact Info (Cards) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ContactCard
              icon={<MapPin size={28} />}
              title="Visit Us"
              details={['123 Education Street', 'New York, NY 10001', 'United States']}
              index={0}
            />
            <ContactCard
              icon={<Phone size={28} />}
              title="Call Us"
              details={['+1 (555) 123-4567', 'Mon-Fri, 9:00 AM - 6:00 PM EST']}
              index={1}
            />
            <ContactCard
              icon={<Mail size={28} />}
              title="Email Us"
              details={['info@eduglobal.com', 'admissions@eduglobal.com']}
              index={2}
            />
          </div>

          {/* Glassmorphic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)] hover:border-[#D4A755]/30 transition-all duration-500 overflow-hidden"
          >
            {/* Concentric spinner background decoration */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] translate-x-1/4 -translate-y-1/4 pointer-events-none select-none z-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#D4A755" strokeWidth="0.8" strokeDasharray="30 150" className="animate-spin-counter-clockwise origin-center" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#9F6920" strokeWidth="0.5" strokeDasharray="10 40" className="animate-spin-clockwise origin-center" />
              </svg>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <h2
                className="text-3xl font-normal text-white mb-8 font-serif"
                style={{ fontFamily: 'Lora, serif' }}
              >
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alexander Mercer"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. alex@example.com"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 123-4567"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  />
                </div>

                {/* Preferred Country */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                    Preferred Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-[#111] border border-white/10 rounded-xl focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300 cursor-pointer ${
                      formData.country ? 'text-white' : 'text-white/30'
                    }`}
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  >
                    <option value="" disabled className="bg-black text-white/30">Select a country</option>
                    <option value="USA" className="bg-[#111] text-white">United States</option>
                    <option value="UK" className="bg-[#111] text-white">United Kingdom</option>
                    <option value="Canada" className="bg-[#111] text-white">Canada</option>
                    <option value="Australia" className="bg-[#111] text-white">Australia</option>
                    <option value="Germany" className="bg-[#111] text-white">Germany</option>
                    <option value="Singapore" className="bg-[#111] text-white">Singapore</option>
                  </select>
                </div>
              </div>

              {/* Program of Interest */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Program of Interest
                </label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science, MBA, Medicine..."
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Type your message details here..."
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl placeholder-white/30 focus:border-[#D4A755]/60 focus:ring-1 focus:ring-[#D4A755]/30 focus:bg-white/10 outline-none transition-all duration-300 resize-none"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="relative overflow-hidden group/btn bg-gradient-to-r from-[#D4A755] to-[#E9C579] hover:from-[#9F6920] hover:to-[#D4A755] text-black font-semibold text-sm py-5 px-16 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(212,167,85,0.2)] hover:shadow-[0_15px_40px_rgba(212,167,85,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
                  style={{ fontFamily: 'Source Sans 3, sans-serif', letterSpacing: '0.1em' }}
                >
                  <Send size={16} className="relative z-10" />
                  <span className="relative z-10">SEND MESSAGE</span>
                  {/* Sweep shine */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[sweep-contact_1.5s_ease-in-out_infinite] pointer-events-none" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* SECTION 2: INTERACTIVE SVG HOTSPOTS WORLD MAP */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_30px_70px_rgba(0,0,0,0.7)] hover:border-[#D4A755]/30 transition-all duration-500 relative overflow-hidden"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(212,167,85,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative z-10">
              {/* Map Left Side: Interactive Map Visual */}
              <div className="lg:col-span-2 relative min-h-[360px] bg-black/40 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                {/* SVG Coordinate Grid Map */}
                <svg className="w-full h-full max-h-[350px] opacity-20 pointer-events-none" viewBox="0 0 1000 500">
                  {/* Grid Lines */}
                  {Array.from({ length: 19 }).map((_, idx) => (
                    <line
                      key={`v-${idx}`}
                      x1={(idx + 1) * 50}
                      y1="0"
                      x2={(idx + 1) * 50}
                      y2="500"
                      stroke="rgba(212,167,85,0.15)"
                      strokeWidth="0.5"
                    />
                  ))}
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <line
                      key={`h-${idx}`}
                      x1="0"
                      y1={(idx + 1) * 50}
                      x2="1000"
                      y2={(idx + 1) * 50}
                      stroke="rgba(212,167,85,0.15)"
                      strokeWidth="0.5"
                    />
                  ))}

                  {/* Network paths linking offices */}
                  <path
                    d="M 220,160 Q 340,100 460,110 T 500,130 T 820,340"
                    fill="none"
                    stroke="#D4A755"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  <path
                    d="M 460,110 Q 480,120 500,130"
                    fill="none"
                    stroke="#9F6920"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Hotspots layer (Overlay absolute divs) */}
                {offices.map(o => {
                  const isActive = activeOffice === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setActiveOffice(o.id)}
                      onMouseEnter={() => setActiveOffice(o.id)}
                      className="absolute p-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/node"
                      style={{ left: o.coords.left, top: o.coords.top }}
                    >
                      {/* Pulsating background rings */}
                      <span className={`absolute inset-0 rounded-full bg-[#D4A755]/20 animate-hotspot-pulse ${
                        isActive ? 'scale-110' : 'opacity-0 group-hover/node:opacity-100'
                      }`} />
                      {/* Outer Ring */}
                      <span className={`absolute inset-1 rounded-full border border-[#D4A755] transition-all duration-300 ${
                        isActive ? 'scale-100' : 'scale-75 opacity-70 group-hover/node:scale-100 group-hover/node:opacity-100'
                      }`} />
                      {/* Inner Dot */}
                      <span className={`block w-2.5 h-2.5 rounded-full shadow-[0_0_10px_#D4A755] transition-all duration-300 ${
                        isActive ? 'bg-[#FAF8F5]' : 'bg-[#D4A755]'
                      }`} />
                    </button>
                  );
                })}

                {/* Label floating markers */}
                {offices.map(o => (
                  <span
                    key={`lbl-${o.id}`}
                    className={`absolute text-[9px] font-semibold tracking-widest text-[#FAF8F5]/40 select-none uppercase -translate-x-1/2 pointer-events-none transition-colors duration-300 ${
                      activeOffice === o.id ? 'text-[#D4A755]/90' : ''
                    }`}
                    style={{ left: o.coords.left, top: `calc(${o.coords.top} + 22px)` }}
                  >
                    {o.name.split(' ')[0]}
                  </span>
                ))}
              </div>

              {/* Map Right Side: Interactive Tooltip Detail panel */}
              <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Globe className="text-[#D4A755]" size={18} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                      GLOBAL HQ & HUBS
                    </span>
                  </div>

                  {/* Animated Content Detail transition */}
                  <motion.div
                    key={selectedOffice.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-5"
                  >
                    <div>
                      <h4 className="text-2xl font-serif text-white font-normal" style={{ fontFamily: 'Lora, serif' }}>
                        {selectedOffice.name}
                      </h4>
                    </div>

                    <div className="space-y-3.5 pt-4 border-t border-white/10">
                      {/* Address */}
                      <div className="flex gap-3 text-sm font-light text-white/80">
                        <MapPin size={16} className="text-[#D4A755] flex-shrink-0 mt-0.5" />
                        <p style={{ fontFamily: 'Source Sans 3, sans-serif' }}>{selectedOffice.address}</p>
                      </div>
                      {/* Phone */}
                      <div className="flex gap-3 text-sm font-light text-white/80">
                        <Phone size={16} className="text-[#D4A755] flex-shrink-0 mt-0.5" />
                        <p style={{ fontFamily: 'Source Sans 3, sans-serif' }}>{selectedOffice.phone}</p>
                      </div>
                      {/* Email */}
                      <div className="flex gap-3 text-sm font-light text-white/80">
                        <Mail size={16} className="text-[#D4A755] flex-shrink-0 mt-0.5" />
                        <p style={{ fontFamily: 'Source Sans 3, sans-serif' }}>{selectedOffice.email}</p>
                      </div>
                      {/* Hours */}
                      <div className="flex gap-3 text-sm font-light text-white/80">
                        <Clock size={16} className="text-[#D4A755] flex-shrink-0 mt-0.5" />
                        <p style={{ fontFamily: 'Source Sans 3, sans-serif' }}>{selectedOffice.hours}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Office Select tabs row */}
                <div className="flex justify-between gap-1.5 mt-8 border-t border-white/5 pt-4 overflow-x-auto no-scrollbar">
                  {offices.map(o => (
                    <button
                      key={o.id}
                      onClick={() => setActiveOffice(o.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                        activeOffice === o.id
                          ? 'bg-[#D4A755]/20 text-white border border-[#D4A755]/30'
                          : 'bg-white/5 text-white/40 border border-transparent hover:text-white/80'
                      }`}
                    >
                      {o.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}