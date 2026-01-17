import React, { useState, useEffect } from 'react';
import { useReadContent } from '../hooks/useContent';

const HeroSlider: React.FC = () => {
  const content = useReadContent();
  const slides = content.hero;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-walnut/90 via-walnut/60 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute'
                  }`}
              >
                {index === currentSlide && (
                  <>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-cream mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-cream/80 font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide
              ? 'w-12 bg-gold'
              : 'w-6 bg-cream/30 hover:bg-cream/50'
              }`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
