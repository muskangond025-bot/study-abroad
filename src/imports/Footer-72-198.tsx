import svgPaths from "./svg-eknxrk0vfe";
import { imgGroup, imgGroup1 } from "./svg-8gwm9";

function Group1() {
  return (
    <div className="absolute inset-[-7.5%_-16.99%_-34.54%_-35.51%] mask-position-[8.981px_1.898px,_8.979px_1.898px]" data-name="Group" style={{ maskImage: `url('${imgGroup}'), url('${imgGroup1}')` }}>
      <div className="absolute inset-[-28.16%_-26.23%_-18.62%_-17.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.4481 52.7496">
          <g id="Group">
            <path d={svgPaths.p305a4700} fill="var(--fill-0, white)" id="Vector" />
            <path d={svgPaths.p305a4700} fill="var(--fill-0, white)" id="Vector_2" />
            <g filter="url(#filter0_f_72_258)" id="Group_2">
              <path d={svgPaths.p20f49340} fill="var(--fill-0, white)" id="Vector_3" />
              <path d={svgPaths.p179b3400} fill="var(--fill-0, white)" id="Vector_4" />
              <path d={svgPaths.p66d9100} fill="var(--fill-0, white)" id="Vector_5" />
              <path d={svgPaths.p33860a80} fill="var(--fill-0, white)" id="Vector_6" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52.7496" id="filter0_f_72_258" width="55.4481" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_72_258" stdDeviation="5.06" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[0_0.02%_0.06%_-0.02%]" data-name="Mask group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_0.02%_0.06%_-0.02%]" data-name="Group">
      <MaskGroup />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_0.01%_0_-0.01%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[0_0.01%_0_-0.01%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[25.3px_25.285px] mix-blend-overlay" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.3 25.3">
        <g id="Group" style={{ mixBlendMode: "overlay" }}>
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents inset-[0_0.01%_0.06%_-0.01%]" data-name="Mask group">
      <Group2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute left-[10.35px] overflow-clip size-[25.3px] top-[10.35px]" data-name="Frame">
      <ClipPathGroup />
      <MaskGroup1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#3452ff] overflow-clip relative rounded-[9.2px] shrink-0 size-[46px]">
      <Frame />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <Frame5 />
      <p className="font-['General_Sans:Semibold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-white">Triloe</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col h-[160px] items-start justify-between relative shrink-0">
      <Frame20 />
      <p className="font-['General_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#f7f7f7] text-[18px] w-[249px] whitespace-pre-wrap">These tools are for personal finance management, not for legal advice.</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative rounded-[100px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <p className="font-['General_Sans:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ffe6a1] text-[14px]">Demo</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-[#3452ff] content-stretch flex items-center justify-center left-[232px] overflow-clip px-[24px] py-[12px] rounded-[40px] top-[4px]">
      <p className="font-['General_Sans:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white">Get Started</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[54px] relative rounded-[80px] shrink-0 w-full">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['General_Sans:Regular',sans-serif] leading-[normal] left-[24px] not-italic text-[16px] text-[rgba(255,255,255,0.6)] top-[16px]">Enter your email</p>
        <Frame6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[80px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame3 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['General_Sans:Semibold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-white w-full whitespace-pre-wrap">Request a Demo</p>
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[373px]">
      <Frame4 />
      <Frame8 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[60px] top-[60px] w-[1160px]">
      <Frame21 />
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-[rgba(255,255,255,0.6)] w-full">
      <p className="relative shrink-0 w-full">Home</p>
      <p className="relative shrink-0 w-full">About</p>
      <p className="relative shrink-0 w-full">Service</p>
      <p className="relative shrink-0 w-full">Testimonials</p>
      <p className="relative shrink-0 w-full">Pricing</p>
      <p className="relative shrink-0 w-full">Career</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[107px]">
      <p className="font-['General_Sans:Semibold',sans-serif] relative shrink-0 text-white w-full">Company</p>
      <Frame10 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-[rgba(255,255,255,0.6)] w-full">
      <p className="relative shrink-0 w-full">What We Offer</p>
      <p className="relative shrink-0 w-full">Case Studies</p>
      <p className="relative shrink-0 w-full">{`Blog & Insights`}</p>
      <p className="relative shrink-0 w-full">Resources</p>
      <p className="relative shrink-0 w-full">FAQs</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[128px]">
      <p className="font-['General_Sans:Semibold',sans-serif] relative shrink-0 text-white w-full">Explore</p>
      <Frame13 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[100px] items-start leading-[normal] not-italic relative shrink-0 text-[18px] whitespace-pre-wrap">
      <Frame12 />
      <Frame11 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans:Regular',sans-serif] gap-[8px] items-start relative shrink-0 text-[rgba(255,255,255,0.6)] w-full">
      <p className="relative shrink-0 w-full">Privacy Policy</p>
      <p className="relative shrink-0 w-full">Cookie Policy</p>
      <p className="relative shrink-0 w-full">Disclaimer</p>
      <p className="relative shrink-0 w-full">Copyright</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-[18px] w-[109px] whitespace-pre-wrap">
      <p className="font-['General_Sans:Semibold',sans-serif] relative shrink-0 text-white w-full">Legal Links</p>
      <Frame15 />
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="instagram">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="instagram">
          <path d={svgPaths.p38020380} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InstagramIconContainer() {
  return (
    <div className="bg-[#333] content-stretch flex items-center p-[12px] relative rounded-[32px] shrink-0" data-name="Instagram Icon Container">
      <Instagram />
    </div>
  );
}

function VuesaxBoldYoutube() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/youtube">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="youtube">
          <g id="BG 165" opacity="0.58" />
          <path d={svgPaths.p31756800} fill="var(--fill-0, white)" id="Vector" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function YouTubeIconContainer() {
  return (
    <div className="bg-[#333] content-stretch flex items-center p-[12px] relative rounded-[32px] shrink-0" data-name="YouTube Icon Container">
      <div className="relative shrink-0 size-[24px]" data-name="YouTube Icon">
        <VuesaxBoldYoutube />
      </div>
    </div>
  );
}

function VuesaxBoldFacebook() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/facebook">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="facebook">
          <g id="BG 111" opacity="0.58" />
          <path d={svgPaths.p388ecb00} fill="var(--fill-0, white)" id="Vector" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function FacebookIconContainer() {
  return (
    <div className="bg-[#333] content-stretch flex items-center p-[12px] relative rounded-[32px] shrink-0" data-name="Facebook Icon Container">
      <div className="relative shrink-0 size-[24px]" data-name="Facebook Icon">
        <VuesaxBoldFacebook />
      </div>
    </div>
  );
}

function SocialMediaIcons() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Social Media Icons">
      <InstagramIconContainer />
      <YouTubeIconContainer />
      <FacebookIconContainer />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <p className="font-['General_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.6)]">support@triloe.com</p>
      <p className="font-['General_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.6)]">+102 372 274 2444</p>
      <SocialMediaIcons />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <p className="font-['General_Sans:Semibold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-white w-[53px] whitespace-pre-wrap">Social</p>
      <Frame22 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[100px] items-start relative shrink-0">
      <Frame14 />
      <Frame16 />
    </div>
  );
}

function LinksContainer() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[60px] top-[336px] w-[1160px]" data-name="Links Container">
      <Frame18 />
      <Frame19 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[138px]">
      <p className="absolute font-['General_Sans:Medium',sans-serif] h-[5.244px] leading-[normal] left-[61.61px] not-italic text-[#131313] text-[16px] top-0 w-[3.933px] whitespace-pre-wrap">C</p>
      <div className="absolute flex h-[5.977px] items-center justify-center left-[77.95px] top-[0.42px] w-[4.627px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[13.85deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[3.459px] whitespace-pre-wrap">O</p>
        </div>
      </div>
      <div className="absolute flex h-[6.089px] items-center justify-center left-[92.84px] top-[4.82px] w-[5.119px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[27.69deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">N</p>
        </div>
      </div>
      <div className="absolute flex h-[5.804px] items-center justify-center left-[106.36px] top-[12.94px] w-[5.588px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[41.54deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.767px] whitespace-pre-wrap">T</p>
        </div>
      </div>
      <div className="absolute flex h-[5.48px] items-center justify-center left-[117.71px] top-[24.31px] w-[6.067px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[55.38deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">A</p>
        </div>
      </div>
      <div className="absolute flex h-[4.683px] items-center justify-center left-[126.24px] top-[38.27px] w-[6.022px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[69.23deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">C</p>
        </div>
      </div>
      <div className="absolute flex h-[3.386px] items-center justify-center left-[131.45px] top-[54.01px] w-[5.598px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[83.08deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.767px] whitespace-pre-wrap">T</p>
        </div>
      </div>
      <div className="absolute flex h-[0.639px] items-center justify-center left-[133.04px] top-[69.96px] w-[5.265px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[96.92deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-0 whitespace-pre-wrap">{` `}</p>
        </div>
      </div>
      <div className="absolute flex h-[4.683px] items-center justify-center left-[129.85px] top-[85.22px] w-[6.022px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[110.77deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">U</p>
        </div>
      </div>
      <div className="absolute flex h-[4.91px] items-center justify-center left-[123.9px] top-[99.53px] w-[5.674px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[124.62deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.306px] whitespace-pre-wrap">S</p>
        </div>
      </div>
      <div className="absolute flex h-[3.97px] items-center justify-center left-[116.24px] top-[112.05px] w-[3.517px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[138.46deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-0 whitespace-pre-wrap">{` `}</p>
        </div>
      </div>
      <div className="absolute flex h-[5.339px] items-center justify-center left-[103.3px] top-[122.06px] w-[3.69px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[152.31deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[1.383px] whitespace-pre-wrap">.</p>
        </div>
      </div>
      <div className="absolute flex h-[5.149px] items-center justify-center left-[90.77px] top-[128.98px] w-[1.269px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[166.15deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-0 whitespace-pre-wrap">{` `}</p>
        </div>
      </div>
      <div className="absolute flex h-[5.244px] items-center justify-center left-[73.41px] top-[132.4px] w-[2.622px]">
        <div className="flex-none rotate-180">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.244px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.622px] whitespace-pre-wrap">C</p>
        </div>
      </div>
      <div className="absolute flex h-[5.977px] items-center justify-center left-[55.72px] top-[131.32px] w-[4.627px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-166.15deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[3.459px] whitespace-pre-wrap">O</p>
        </div>
      </div>
      <div className="absolute flex h-[6.089px] items-center justify-center left-[40.34px] top-[126.81px] w-[5.119px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-152.31deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">N</p>
        </div>
      </div>
      <div className="absolute flex h-[5.804px] items-center justify-center left-[26.36px] top-[118.97px] w-[5.588px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-138.46deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.767px] whitespace-pre-wrap">T</p>
        </div>
      </div>
      <div className="absolute flex h-[5.48px] items-center justify-center left-[14.53px] top-[107.93px] w-[6.067px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-124.62deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">A</p>
        </div>
      </div>
      <div className="absolute flex h-[4.683px] items-center justify-center left-[6.04px] top-[94.76px] w-[6.022px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-110.77deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">C</p>
        </div>
      </div>
      <div className="absolute flex h-[3.386px] items-center justify-center left-[1.26px] top-[80.32px] w-[5.598px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-96.92deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.767px] whitespace-pre-wrap">T</p>
        </div>
      </div>
      <div className="absolute flex h-[0.639px] items-center justify-center left-0 top-[67.11px] w-[5.265px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-83.08deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-0 whitespace-pre-wrap">{` `}</p>
        </div>
      </div>
      <div className="absolute flex h-[4.683px] items-center justify-center left-[2.43px] top-[47.81px] w-[6.022px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-69.23deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.998px] whitespace-pre-wrap">U</p>
        </div>
      </div>
      <div className="absolute flex h-[4.91px] items-center justify-center left-[8.73px] top-[33.28px] w-[5.674px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-55.38deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[2.306px] whitespace-pre-wrap">S</p>
        </div>
      </div>
      <div className="absolute flex h-[3.97px] items-center justify-center left-[18.55px] top-[21.7px] w-[3.517px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-41.54deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-0 whitespace-pre-wrap">{` `}</p>
        </div>
      </div>
      <div className="absolute flex h-[5.339px] items-center justify-center left-[31.31px] top-[10.31px] w-[3.69px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-27.69deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-[1.383px] whitespace-pre-wrap">.</p>
        </div>
      </div>
      <div className="absolute flex h-[5.149px] items-center justify-center left-[46.26px] top-[3.58px] w-[1.269px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-13.85deg]">
          <p className="font-['General_Sans:Medium',sans-serif] h-[5.303px] leading-[normal] not-italic relative text-[#131313] text-[16px] w-0 whitespace-pre-wrap">{` `}</p>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.18px)] overflow-clip size-[32px] top-[calc(50%-0.17px)]" data-name="arrow top right">
        <div className="absolute flex inset-[20.83%] items-center justify-center">
          <div className="-rotate-90 -scale-y-100 flex-none size-[18.353px]">
            <div className="relative size-full" data-name="stroke">
              <div className="absolute inset-[-5.36%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6667 20.6667">
                  <path d="M1 19.6667L19.6667 1" id="stroke" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex inset-[20.83%_20.83%_29.17%_29.17%] items-center justify-center">
          <div className="-rotate-90 -scale-y-100 flex-none size-[15.731px]">
            <div className="relative size-full" data-name="stroke">
              <div className="absolute inset-[-6.25%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d="M17 17V1H1" id="stroke" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center left-[calc(50%+3px)] p-[8px] rounded-[100px] top-[calc(50%-37px)]">
      <Frame2 />
    </div>
  );
}

function Component() {
  return (
    <div className="-translate-x-1/2 absolute h-[630px] left-1/2 top-[70px] w-[1280px]" data-name="1">
      <div className="-translate-x-1/2 absolute h-[334px] left-1/2 top-[296px] w-[1280px]" data-name="Subtract">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 334">
          <path d={svgPaths.p25225b00} fill="var(--fill-0, #131313)" id="Subtract" />
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute h-[280px] left-1/2 top-0 w-[1280px]" data-name="Subtract">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 280">
          <path d={svgPaths.p4c04d80} fill="var(--fill-0, #131313)" id="Subtract" />
        </svg>
      </div>
      <Frame17 />
      <LinksContainer />
      <p className="absolute font-['General_Sans:Regular',sans-serif] leading-[normal] left-[calc(50%-130px)] not-italic text-[18px] text-white top-[584px]">© Triloe Inc. All Rights Reserved.</p>
      <Frame1 />
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="Footer">
      <Component />
    </div>
  );
}