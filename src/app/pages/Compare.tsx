import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { GitCompare, Search, Plus, Check, Trash2, GraduationCap, MapPin, Award, BookOpen, DollarSign } from 'lucide-react';
import { universities } from './Universities';

interface CompareCardProps {
  uni: typeof universities[number];
  index: number;
  onRemove: () => void;
}

function CompareCard({ uni, index, onRemove }: CompareCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className="group relative rounded-3xl overflow-hidden min-h-[600px] flex flex-col bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#D4A755]/50 transition-all duration-500 min-w-[290px] sm:min-w-[340px] md:min-w-0 md:w-full flex-shrink-0"
    >
      {/* Top Image Crop */}
      <div className="relative h-44 w-full overflow-hidden border-b border-white/10" style={{ transformStyle: 'preserve-3d', zIndex: 10 }}>
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none opacity-60"
        />
        {/* Dark Shadow Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] to-transparent pointer-events-none" />

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/60 border border-white/10 text-white/70 hover:text-red-400 hover:border-red-500/50 hover:bg-red-950/20 transition-all duration-300 cursor-pointer"
        >
          <Trash2 size={16} />
        </button>

        {/* Concentric SVG Spinner behind Rank */}
        <div className="absolute top-4 right-4 flex items-center justify-center" style={{ transformStyle: 'preserve-3d', z: 30 }}>
          <div className="absolute w-14 h-14 pointer-events-none select-none z-0 animate-spin-clockwise opacity-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#compareGoldGrad)"
                strokeWidth="2.5"
                strokeDasharray="40 180"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="url(#compareGoldGrad)"
                strokeWidth="1.5"
                strokeDasharray="15 60"
                className="animate-spin-counter-clockwise origin-center"
              />
            </svg>
          </div>
          <span
            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#9F6920] to-[#D4A755] text-white text-xs font-bold shadow-[0_2px_8px_rgba(159,105,32,0.3)] border border-white/20"
            style={{ fontFamily: 'Lora, serif' }}
          >
            {uni.ranking}
          </span>
        </div>
      </div>

      {/* Light Sheen Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: sheenBg }}
      />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-700 z-10">
        <div className="absolute top-[25%] left-[15%] w-1 h-1 rounded-full bg-[#D4A755] blur-[0.2px] animate-luxury-sparkle-1" />
        <div className="absolute top-[75%] left-[80%] w-1.5 h-1.5 rounded-full bg-[#9F6920] blur-[0.5px] animate-luxury-sparkle-2" />
      </div>

      {/* Details Box */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-20" style={{ transformStyle: 'preserve-3d', z: 20 }}>
        <div className="space-y-6">
          <div>
            <h3
              className="text-2xl font-normal text-white mb-1 font-serif line-clamp-1"
              style={{ fontFamily: 'Lora, serif' }}
            >
              {uni.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-white/50 font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              <MapPin size={12} className="text-[#D4A755]" />
              <span>{uni.country}</span>
            </div>
          </div>

          {/* Metric list */}
          <div className="space-y-4 border-t border-white/10 pt-4">
            {/* Average Tuition Row */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755] flex items-center gap-1" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <DollarSign size={10} /> Average Tuition Fee
              </span>
              <p className="text-white/80 text-sm font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                {uni.averageCost}
              </p>
            </div>

            {/* Popular Programs Row */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755] flex items-center gap-1" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <BookOpen size={10} /> Top Programs
              </span>
              <div className="flex flex-wrap gap-1.5">
                {uni.topPrograms.slice(0, 3).map((prog, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#F1DEA8] text-[10px] font-light"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  >
                    {prog}
                  </span>
                ))}
              </div>
            </div>

            {/* Popular Cities Row */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755] flex items-center gap-1" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <Award size={10} /> Campus Cities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {uni.popularCities.map((city, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/80 text-[10px] font-light"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Brief Description */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755] flex items-center gap-1" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <GraduationCap size={10} /> Academy Overview
              </span>
              <p className="text-white/60 text-xs font-light leading-relaxed line-clamp-3" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.6' }}>
                {uni.description}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-center">
          <button
            className="relative overflow-hidden group/btn w-full bg-gradient-to-r from-[#D4A755] to-[#E9C579] hover:from-[#9F6920] hover:to-[#D4A755] text-black font-semibold text-xs py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(212,167,85,0.15)] hover:shadow-[0_12px_30px_rgba(212,167,85,0.3)] hover:scale-[1.01] cursor-pointer"
            style={{ fontFamily: 'Source Sans 3, sans-serif', letterSpacing: '0.1em' }}
          >
            <span className="relative z-10">REQUEST ADVISORY</span>
            {/* Sweep shine */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Compare() {
  const [selectedUnis, setSelectedUnis] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const toggleSelect = (name: string) => {
    if (selectedUnis.includes(name)) {
      setSelectedUnis(selectedUnis.filter(n => n !== name));
    } else {
      if (selectedUnis.length < 3) {
        setSelectedUnis([...selectedUnis, name]);
      } else {
        alert("You can compare up to 3 universities side-by-side.");
      }
    }
  };

  const setPreset = (names: string[]) => {
    setSelectedUnis(names);
  };

  const filteredUnis = universities.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || u.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const selectedData = selectedUnis.map(name =>
    universities.find(u => u.name === name)
  ).filter((u): u is typeof universities[number] => !!u);

  return (
    <div className="relative pt-20 bg-black min-h-screen">
      {/* Inline styles for buttons shine keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}} />

      {/* SVG definitions for reuse */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="compareGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A755" />
            <stop offset="100%" stopColor="#9F6920" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,167,85,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,167,85,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Ambient warm highlights */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#D4A755]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#9F6920]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/5 border border-[#D4A755]/20 rounded-full shadow-[0_2px_10px_rgba(212,167,85,0.05)]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A755]">ANALYTICAL DASHBOARD</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Compare Universities
          </h1>

          {/* Gold separator */}
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A755]/60 to-transparent mx-auto mt-3 mb-4" />

          <p
            className="text-lg text-white/70 max-w-3xl mx-auto font-light"
            style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.7' }}
          >
            Select and contrast rankings, tuition estimates, top course specializations, and campus criteria side-by-side to make the perfect academic decision
          </p>
        </motion.div>

        {/* SECTION 1: SEARCH & SELECTION INTERFACE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <h2
            className="text-xl font-normal text-white mb-6 font-serif flex items-center gap-2"
            style={{ fontFamily: 'Lora, serif' }}
          >
            <GitCompare className="text-[#D4A755]" size={20} />
            University Selector
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end mb-6">
            {/* Search Input */}
            <div className="flex flex-col gap-2 lg:col-span-2">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Search Institution
              </label>
              <div className="relative">
                <Search className="text-[#D4A755]/50 w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Harvard, Oxford, MIT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#D4A755]/60 transition-all duration-300 placeholder-white/30"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                />
              </div>
            </div>

            {/* Country filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Country Filter
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#111] border border-white/10 rounded-xl text-white outline-none focus:border-[#D4A755]/60 transition-all duration-300 cursor-pointer"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                <option value="All" className="bg-[#111]">All Countries</option>
                <option value="United States" className="bg-[#111]">United States</option>
                <option value="United Kingdom" className="bg-[#111]">United Kingdom</option>
                <option value="Canada" className="bg-[#111]">Canada</option>
                <option value="Australia" className="bg-[#111]">Australia</option>
                <option value="Germany" className="bg-[#111]">Germany</option>
                <option value="Singapore" className="bg-[#111]">Singapore</option>
                <option value="Switzerland" className="bg-[#111]">Switzerland</option>
              </select>
            </div>
          </div>

          {/* Quick Option Pills Container */}
          <div className="max-h-48 overflow-y-auto pr-2 flex flex-wrap gap-2 py-4 border-t border-white/10 no-scrollbar">
            {filteredUnis.length > 0 ? (
              filteredUnis.map(u => {
                const isSelected = selectedUnis.includes(u.name);
                return (
                  <button
                    key={u.name}
                    onClick={() => toggleSelect(u.name)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4A755]/20 border border-[#D4A755] text-white shadow-[0_0_15px_rgba(212,167,85,0.15)] font-semibold'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {isSelected ? <Check size={12} className="text-[#D4A755]" /> : <Plus size={12} />}
                    {u.name}
                  </button>
                );
              })
            ) : (
              <span className="text-white/40 text-sm font-light">No institutions match your search query.</span>
            )}
          </div>

          {/* Selected Count Indicator / Clear All */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10 text-xs text-white/50 font-light" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
            <span>{selectedUnis.length} / 3 selected to compare</span>
            {selectedUnis.length > 0 && (
              <button
                onClick={() => setSelectedUnis([])}
                className="text-[#D4A755] hover:text-white hover:underline transition-colors cursor-pointer"
              >
                Clear Selections
              </button>
            )}
          </div>
        </motion.div>

        {/* SECTION 2: EMPTY STATE WITH QUICK PRESETS */}
        {selectedUnis.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9F6920]/25 to-[#D4A755]/10 border border-[#D4A755]/30 flex items-center justify-center mb-6 mx-auto animate-pulse">
              <GitCompare className="w-8 h-8 text-[#D4A755]" />
            </div>
            <h3 className="text-2xl font-normal text-white mb-3 font-serif" style={{ fontFamily: 'Lora, serif' }}>
              Select Institutions to Compare
            </h3>
            <p className="text-white/50 text-sm font-light max-w-md mx-auto mb-10" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
              Search and add up to 3 universities above, or choose from one of our curated global matchup presets below to start comparing instantly.
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-6">
              {/* Preset 1 */}
              <div
                onClick={() => setPreset(['Harvard University', 'Stanford University'])}
                className="group/p border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:border-[#D4A755]/50 transition-all duration-300 text-left cursor-pointer flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(212,167,85,0.08)]"
              >
                <div>
                  <span className="text-[9px] font-semibold text-[#D4A755] tracking-widest uppercase block mb-1">IVY VS VALLEY</span>
                  <h4 className="text-lg font-serif text-white mb-2" style={{ fontFamily: 'Lora, serif' }}>Ivy League Matchup</h4>
                  <p className="text-white/50 text-xs font-light leading-relaxed">Compare Harvard University and Stanford University side-by-side.</p>
                </div>
                <span className="text-[#D4A755] group-hover/p:translate-x-1.5 transition-transform text-xs font-semibold mt-6 block">LAUNCH PRESET →</span>
              </div>

              {/* Preset 2 */}
              <div
                onClick={() => setPreset(['University of Oxford', 'University of Cambridge'])}
                className="group/p border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:border-[#D4A755]/50 transition-all duration-300 text-left cursor-pointer flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(212,167,85,0.08)]"
              >
                <div>
                  <span className="text-[9px] font-semibold text-[#D4A755] tracking-widest uppercase block mb-1">UK OXBRIDGE</span>
                  <h4 className="text-lg font-serif text-white mb-2" style={{ fontFamily: 'Lora, serif' }}>Academic Giants</h4>
                  <p className="text-white/50 text-xs font-light leading-relaxed">Compare University of Oxford and University of Cambridge side-by-side.</p>
                </div>
                <span className="text-[#D4A755] group-hover/p:translate-x-1.5 transition-transform text-xs font-semibold mt-6 block">LAUNCH PRESET →</span>
              </div>

              {/* Preset 3 */}
              <div
                onClick={() => setPreset(['MIT', 'ETH Zurich'])}
                className="group/p border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:border-[#D4A755]/50 transition-all duration-300 text-left cursor-pointer flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(212,167,85,0.08)]"
              >
                <div>
                  <span className="text-[9px] font-semibold text-[#D4A755] tracking-widest uppercase block mb-1">STEM GLOBAL LEADER</span>
                  <h4 className="text-lg font-serif text-white mb-2" style={{ fontFamily: 'Lora, serif' }}>Tech Pioneers</h4>
                  <p className="text-white/50 text-xs font-light leading-relaxed">Compare Massachusetts Institute of Technology and ETH Zurich side-by-side.</p>
                </div>
                <span className="text-[#D4A755] group-hover/p:translate-x-1.5 transition-transform text-xs font-semibold mt-6 block">LAUNCH PRESET →</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SECTION 3: COMPARISON GRID */
          <div className="flex md:grid overflow-x-auto md:overflow-x-visible gap-6 pb-6 scroll-smooth w-full md:grid-cols-2 lg:grid-cols-3 no-scrollbar">
            {selectedData.map((uni, idx) => (
              <CompareCard
                key={uni.name}
                uni={uni}
                index={idx}
                onRemove={() => toggleSelect(uni.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

