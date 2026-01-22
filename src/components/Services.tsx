import React from 'react';
import { Link } from 'react-router-dom';
import { useReadContent } from '../hooks/useContent';

interface ServicesProps {
  limit?: number;
}

const Services: React.FC<ServicesProps> = ({ limit }) => {
  const content = useReadContent();
  const allServices = content.services;
  const section = content.servicesSection;

  const services = limit ? allServices.slice(0, limit) : allServices;

  return (
    <section className="py-24 bg-walnut text-cream overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase block mb-4">{section.badge}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">{section.title}</h2>
          <p className="mt-6 text-cream/60 font-light leading-relaxed">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={`/hizmet/${service.id}`}
              className={`group relative bg-walnut-light p-8 border border-white/5 hover:border-gold/30 transition-all duration-500 transform hover:-translate-y-2 ${!limit && index === services.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500" />
              <div className="mb-6 h-48 overflow-hidden rounded-sm">
                {service.image.toLowerCase().endsWith('.mp4') || service.image.toLowerCase().endsWith('.mov') ? (
                  <video
                    src={service.image}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                )}
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-sm text-cream/50 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center space-x-2 text-gold text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span>İncele</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {limit && allServices.length > limit && (
          <div className="mt-16 text-center">
            <Link
              to="/hizmetler"
              className="inline-block bg-gold text-walnut px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-cream transition-all shadow-xl"
            >
              Tüm Hizmetleri Gör
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
