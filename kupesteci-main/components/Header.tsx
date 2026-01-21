
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#home', label: 'Anasayfa' },
    { href: '#about', label: 'Hakkımızda' },
    { href: '#services', label: 'Hizmetler' },
    { href: '#gallery', label: 'Galeri' },
    { href: '#contact', label: 'İletişim' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-walnut shadow-xl py-3' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <a href="#home" className="text-3xl md:text-4xl font-serif font-bold text-cream tracking-tight uppercase leading-none">
              KÜPEŞTECİ
            </a>
            <span className="text-[11px] tracking-[0.3em] text-gold font-semibold uppercase mt-1">
              1920'DEN BERİ
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 text-lg font-semibold uppercase tracking-widest text-cream/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-gold transition-colors"
              >
                {link.label}
              </a>
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
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-4xl font-serif font-bold text-cream uppercase tracking-widest hover:text-gold transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${index * 0.1}s`
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Contact Info */}
          <div className="mt-8 text-center">
            <a
              href="tel:+905322149087"
              className="text-gold text-lg font-semibold tracking-wider"
            >
              +90 532 214 90 87
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
