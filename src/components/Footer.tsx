import React from 'react';
import { Link } from 'react-router-dom';
import { useReadContent } from '../hooks/useContent';

const Footer: React.FC = () => {
  const content = useReadContent();
  const footer = content.footer;
  const branding = content.branding;
  const footerSection = content.footerSection;
  const nav = content.navigation;

  const corporateLinks = [
    { label: nav.about, path: '/hakkimizda' },
    { label: nav.services, path: '/hizmetler' },
    { label: nav.references, path: '/referanslar' },
  ];

  return (
    <footer id="contact" className="bg-walnut pt-20 pb-8 text-cream border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        {/* Ana Footer Content: Merkezi yerleşim ve iyice yaklaştırılmış kolonlar */}
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-16 mb-16">

          {/* Kolon 1: Logo ve Açıklama */}
          <div className="flex flex-col space-y-6 md:max-w-[300px]">
            <div className="flex flex-col items-start">
              <span className="text-2xl font-serif font-bold tracking-tight uppercase leading-none">{branding.logo}</span>
              <span className="text-[10px] tracking-[0.3em] text-gold font-semibold uppercase mt-2">{branding.tagline}</span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed font-light">
              {footer.slogan}
            </p>
          </div>

          {/* Kolon 2: Kurumsal */}
          <div className="flex flex-col">
            <h4 className="text-gold font-bold uppercase tracking-widest text-[11px] mb-6 leading-none">{footerSection.corporateTitle}</h4>
            <ul className="space-y-3 text-sm font-light text-cream/70">
              {corporateLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="hover:text-gold transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolon 3: İletişim */}
          <div className="flex flex-col">
            <h4 className="text-gold font-bold uppercase tracking-widest text-[11px] mb-6 leading-none">{footerSection.contactTitle}</h4>
            <ul className="space-y-4 text-sm font-light text-cream/70">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('28Q6+73 Bodrum, Muğla')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: footer.address.replace('\n', '<br />') }}
                />
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${footer.phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{footer.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${footer.email}`} className="hover:text-gold transition-colors">{footer.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
