import { Instagram, Youtube, Facebook, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

interface FooterLinkProps {
  to?: string;
  href?: string;
  children: string;
}

function FooterLink({ to, href, children }: FooterLinkProps) {
  const content = (
    <div className="relative overflow-hidden group flex items-center py-1 cursor-pointer">
      {/* Sliding Arrow Icon on the left */}
      <span className="w-0 opacity-0 -translate-x-2 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[400ms] ease-[0.25,1,0.5,1] text-[#D4A755] flex-shrink-0 flex items-center">
        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>

      {/* Rolling Text Container */}
      <div className="relative overflow-hidden pl-0 group-hover:pl-1.5 transition-all duration-[400ms] ease-[0.25,1,0.5,1]">
        {/* Default Text: white/60, slides up on hover */}
        <span className="block text-[18px] text-white/60 transition-all duration-[400ms] ease-[0.25,1,0.5,1] group-hover:-translate-y-full group-hover:opacity-0" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          {children}
        </span>
        {/* Roll Text: gold (#D4A755), slides in from bottom on hover */}
        <span className="absolute inset-0 text-[18px] text-[#D4A755] transition-all duration-[400ms] ease-[0.25,1,0.5,1] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          {children}
        </span>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }
  return <a href={href || "#"} className="block">{content}</a>;
}

function WaveShape() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 h-[280px] top-0 w-[1280px] max-w-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 280">
        <defs>
          <pattern id="studentsPattern" patternUnits="objectBoundingBox" width="1" height="1">
            <image 
              href="https://images.unsplash.com/photo-1759684546919-5124743bc31f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGFicm9hZCUyMGludGVybmF0aW9uYWwlMjBzdHVkZW50cyUyMGNhbXB1c3xlbnwxfHx8fDE3NzI2OTgwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              width="1280" 
              height="280" 
              preserveAspectRatio="xMidYMid slice"
              opacity="1"
            />
            <rect width="1280" height="280" fill="#000000" opacity="0.3" />
          </pattern>
        </defs>
        <path 
          d="M1280 240C1280 262.091 1262.09 280 1240 280H764.096C742.724 280 725.95 262.298 715.757 243.515C701.368 217.001 673.287 199 641 199C608.713 199 580.632 217.001 566.243 243.515C556.05 262.298 539.276 280 517.904 280H40C17.9086 280 0 262.091 0 240V40C0 17.9086 17.9086 0 40 0H1240C1262.09 0 1280 17.9086 1280 40V240Z" 
          fill="url(#studentsPattern)" 
        />
      </svg>
    </div>
  );
}

function BottomWaveShape() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 h-[334px] top-[296px] w-[1280px] max-w-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 334">
        <path 
          d="M1280 294C1280 316.091 1262.09 334 1240 334H40C17.9086 334 0 316.091 0 294V40C0 17.9086 17.9086 0 40 0H535.101C554.332 0 569.985 14.7018 581.567 30.0541C594.781 47.5694 615.767 58.8915 639.398 58.8916H644.602C668.233 58.8915 689.219 47.5694 702.433 30.0541C714.015 14.7018 729.668 0 748.899 0H1240C1262.09 0 1280 17.9086 1280 40V294Z" 
          fill="#000000" 
        />
      </svg>
    </div>
  );
}

function ContactBadge() {
  return (
    <Link 
      to="/contact" 
      className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-37px)] z-20 group cursor-pointer transition-transform duration-300 hover:scale-110"
    >
      <div className="relative size-[138px] animate-spin" style={{ animationDuration: '20s' }}>
        {/* Circular Text */}
        <svg viewBox="0 0 138 138" className="size-full mx-[0px] my-[-69px]">
          <defs>
            <path
              id="circlePath"
              d="M 69, 69 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            />
          </defs>
          <text className="text-[14px] fill-[#000000]" style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, letterSpacing: '0.15em' }}>
            <textPath href="#circlePath" startOffset="0%" textAnchor="start" spacing="auto">
              CONTACT US • REACH OUT • CONNECT • 
            </textPath>
          </text>
        </svg>
        
        {/* Center Arrow Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#9F6920] rounded-full size-[48px] flex items-center justify-center group-hover:bg-[#D4A755] transition-colors duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-45">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#F1DEA8] relative min-h-[700px] overflow-hidden mt-20">
      <div className="relative h-[630px] pt-24">
        <WaveShape />
        <BottomWaveShape />
        
        {/* Contact Badge */}
        <ContactBadge />
        
        {/* Top Section - Logo & Newsletter */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-start justify-between top-[60px] w-[1160px] max-w-[calc(100%-120px)] z-10">
          {/* Left - Brand Info */}
          <div className="flex flex-col h-[160px] items-start justify-between shrink-0 w-full max-w-[500px]">
            <div className="flex gap-[20px] items-center">
              <div className="bg-[#9F6920] overflow-hidden rounded-[12px] shrink-0 size-[46px] flex items-center justify-center">
                <span className="text-white text-2xl" style={{ fontFamily: 'Lora, serif', fontWeight: 600 }}>EP</span>
              </div>
              <h2 className="text-[32px] text-white" style={{ fontFamily: 'Lora, serif', fontWeight: 600 }}>
                Elite Pathways
              </h2>
            </div>
            <p className="text-[#f7f7f7] text-[18px] w-full max-w-[380px]" style={{ fontFamily: 'Source Sans 3, sans-serif', lineHeight: '1.6' }}>
              Expert guidance to the world's top universities. Your journey to academic excellence starts here.
            </p>
          </div>
          
          {/* Right - Newsletter */}
          <div className="flex flex-col gap-[12px] items-start w-full max-w-[373px]">
            <div className="bg-transparent border border-[#D4A755] rounded-[100px] px-[16px] py-[8px]">
              <p className="text-[#D4A755] text-[14px]" style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 500 }}>
                Connect
              </p>
            </div>
            <div className="flex flex-col gap-[16px] items-start w-full">
              <h3 className="text-[32px] text-white w-full" style={{ fontFamily: 'Lora, serif', fontWeight: 600 }}>
                Start Your Journey
              </h3>
              <div className="relative rounded-[80px] w-full">
                <div className="overflow-hidden rounded-[inherit] h-[54px] border border-[rgba(255,255,255,0.12)]">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="absolute inset-0 bg-transparent text-white placeholder:text-[rgba(255,255,255,0.6)] text-[16px] px-[24px] py-[16px] outline-none w-full"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  />
                  <button className="absolute bg-[#9F6920] right-[4px] top-[4px] px-[24px] py-[12px] rounded-[40px] text-white text-[16px] transition-all duration-300 hover:bg-[#D4A755]" style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 500 }}>
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Links */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-start justify-between top-[336px] w-[1160px] max-w-[calc(100%-120px)] z-10">
          {/* Left Group */}
          <div className="flex gap-[100px] items-start">
            {/* Company */}
            <div className="flex flex-col gap-[16px] items-start w-[107px]">
              <h4 className="text-white text-[18px]" style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600 }}>
                Company
              </h4>
              <div className="flex flex-col gap-[6px] items-start text-[18px] w-full" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/about">About</FooterLink>
                <FooterLink to="/services">Services</FooterLink>
                <FooterLink to="/destinations">Destinations</FooterLink>
                <FooterLink to="/universities">Universities</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </div>
            </div>
            
            {/* Explore */}
            <div className="flex flex-col gap-[16px] items-start w-[160px]">
              <h4 className="text-white text-[18px]" style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600 }}>
                Explore
              </h4>
              <div className="flex flex-col gap-[6px] items-start text-[18px] w-full" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <FooterLink href="#">Our Services</FooterLink>
                <FooterLink href="#">Success Stories</FooterLink>
                <FooterLink href="#">Blog & Insights</FooterLink>
                <FooterLink href="#">Resources</FooterLink>
                <FooterLink href="#">FAQs</FooterLink>
              </div>
            </div>
          </div>
          
          {/* Right Group */}
          <div className="flex gap-[100px] items-start">
            {/* Legal Links */}
            <div className="flex flex-col gap-[16px] items-start w-[120px]">
              <h4 className="text-white text-[18px]" style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600 }}>
                Legal Links
              </h4>
              <div className="flex flex-col gap-[6px] items-start text-[18px] w-full" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Cookie Policy</FooterLink>
                <FooterLink href="#">Disclaimer</FooterLink>
                <FooterLink href="#">Copyright</FooterLink>
              </div>
            </div>
            
            {/* Social */}
            <div className="flex flex-col gap-[16px] items-start">
              <h4 className="text-white text-[18px]" style={{ fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600 }}>
                Social
              </h4>
              <div className="flex flex-col gap-[8px] items-start">
                <p className="text-[18px] text-[rgba(255,255,255,0.6)]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  info@elitepathways.com
                </p>
                <p className="text-[18px] text-[rgba(255,255,255,0.6)]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                  +1 (555) 123-4567
                </p>
                <div className="flex gap-[16px] items-center mt-2">
                  <a href="#" className="bg-[#333] p-[12px] rounded-[32px] hover:bg-[#9F6920] transition-all duration-300">
                    <Instagram className="size-[24px] text-white" />
                  </a>
                  <a href="#" className="bg-[#333] p-[12px] rounded-[32px] hover:bg-[#9F6920] transition-all duration-300">
                    <Youtube className="size-[24px] text-white" />
                  </a>
                  <a href="#" className="bg-[#333] p-[12px] rounded-[32px] hover:bg-[#9F6920] transition-all duration-300">
                    <Facebook className="size-[24px] text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <p className="absolute left-1/2 -translate-x-1/2 text-center text-[18px] text-white top-[584px] z-10" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
          © Elite Pathways Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}