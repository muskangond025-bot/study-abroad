import { Outlet, useLocation } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function Root() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis buttery smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Buttery smooth exponential easeOut
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle route change: reset scroll position immediately and re-evaluate dimensions
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      // We schedule a resize shortly after navigation, giving react elements time to layout.
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-white" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}