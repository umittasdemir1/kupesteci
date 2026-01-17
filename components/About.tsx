import React from 'react';
import { useReadContent } from '../hooks/useContent';

const About: React.FC = () => {
  const content = useReadContent();
  const about = content.about;

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Görsel */}
          <div className="relative order-2 lg:order-1 flex-shrink-0">
            <div className="max-w-sm aspect-[2/3] overflow-hidden rounded-sm shadow-2xl">
              <img
                src={about.image}
                alt="Geleneksel Ahşap Ustalığı"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          <div className="space-y-8 order-1 lg:order-2 flex-1">
            <div className="space-y-4">
              <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase">{about.badge}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-walnut leading-tight">
                {about.title}
              </h2>
            </div>

            {about.paragraphs.map((para, index) => (
              <p key={index} className="text-walnut/80 leading-relaxed font-light text-lg">
                {para}
              </p>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-walnut/10">
              {about.features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-3 text-gold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-bold text-walnut uppercase tracking-widest text-xs">{feature.title}</span>
                  </div>
                  <p className="text-sm text-walnut/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
