import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, GraduationCap } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Countries', path: '/destinations' },
    { name: 'Universities', path: '/universities' },
    { name: 'Concierge', path: '/concierge' },
    { name: 'Compare', path: '/compare' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#9F6920] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D4A755]">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl transition-colors duration-300 group-hover:text-[#9F6920]" style={{ fontFamily: 'Lora, serif' }}>
              EduGlobal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base transition-colors duration-300 relative ${
                  location.pathname === link.path
                    ? 'text-[#9F6920]'
                    : 'text-black hover:text-[#9F6920]'
                }`}
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#9F6920]"
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#9F6920] text-white rounded-lg transition-all duration-300 hover:bg-[#D4A755] hover:-translate-y-0.5"
              style={{ fontFamily: 'Source Sans 3, sans-serif' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-black hover:text-[#9F6920] transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 text-base transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#9F6920]'
                    : 'text-black hover:text-[#9F6920]'
                }`}
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block w-full px-6 py-3 bg-[#9F6920] text-white text-center rounded-lg transition-colors duration-300 hover:bg-[#D4A755]"
              style={{ fontFamily: 'Source Sans 3, sans-serif' }}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}