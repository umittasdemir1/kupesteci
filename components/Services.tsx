import React from 'react';
import { useReadContent } from '../hooks/useContent';

const Services: React.FC = () => {
  const content = useReadContent();
  const services = content.services;

  return (
    <section className="py-24 bg-walnut text-cream overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase block mb-4">Neler Yapıyoruz?</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Zanaat ve Dayanıklılık</h2>
          <p className="mt-6 text-cream/60 font-light leading-relaxed">
            Hizmet anlatımlarımız el işçiliği, sağlamlık ve uzun ömür vurgusu taşır. Ahşabı sadece işlemekle kalmıyor, mekanın ruhuyla bütünleştiriyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-walnut-light p-8 border border-white/5 hover:border-gold/30 transition-all duration-500 transform hover:-translate-y-2 ${index === services.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500" />
              <div className="mb-6 h-48 overflow-hidden rounded-sm">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">{service.title}</h3>
              <p className="text-sm text-cream/50 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-8 flex items-center space-x-3 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs font-bold uppercase tracking-widest">Detayları Gör</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
