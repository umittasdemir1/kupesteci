import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useReadContent } from '../hooks/useContent';

const Header: React.FC = () => {
  const content = useReadContent();
  const branding = content.branding;
  const nav = content.navigation;
  const footer = content.footer;
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: '/', label: nav.home },
    { path: '/hakkimizda', label: nav.about },
    { path: '/hizmetler', label: nav.services },
    { path: '/galeri', label: nav.gallery },
    { path: '/referanslar', label: nav.references },
    { path: '/iletisim', label: nav.contact },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${(isScrolled || location.pathname !== '/') ? 'bg-walnut shadow-xl py-3' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <Link to="/" className="text-3xl md:text-4xl font-serif font-bold text-cream tracking-tight uppercase leading-none">
              {branding.logo}
            </Link>
            <span className="text-[11px] tracking-[0.3em] text-gold font-semibold uppercase mt-1">
              {branding.tagline}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-8 text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-cream/90">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={handleNavClick}
                className="hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
            <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
              }`} />
            <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-walnut z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={handleNavClick}
              className="text-3xl font-serif font-bold text-cream uppercase tracking-widest hover:text-gold transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${index * 0.1}s`
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Contact Info */}
          <div className="mt-8 text-center">
            <a
              href={`tel:${footer.phone.replace(/\s/g, '')}`}
              className="text-gold text-lg font-semibold tracking-wider"
            >
              {footer.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
