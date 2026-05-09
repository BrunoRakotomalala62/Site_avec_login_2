import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Accueil', href: '#home' },
  { label: 'Cours', href: '#courses' },
  { label: 'Ressources', href: '#resources' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Chatbot', href: '#chatbot' },
  { label: 'À propos', href: '#about' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    setActiveItem(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-dark py-3'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EM</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">
              Éducation Malagasy
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 relative ${
                  activeItem === item.href.replace('#', '')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeItem === item.href.replace('#', '') && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden md:block btn-premium text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed top-16 left-0 right-0 glass-dark z-30 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ display: mobileMenuOpen ? 'block' : 'none' }}
      >
        <div className="container py-4 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="px-4 py-2 rounded-lg text-white/70 hover:text-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            className="btn-premium w-full mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: navItems.length * 0.05 }}
          >
            Commencer
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
