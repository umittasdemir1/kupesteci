import React, { useState, useEffect } from 'react';
import { useReadContent } from '../hooks/useContent';

const HeroSlider: React.FC = () => {
  const content = useReadContent();
  const slides = content.hero;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum kaydırma mesafesi (pixel)
  const minSwipeDistance = 50;

  // Preload first image
  useEffect(() => {
    if (slides.length > 0 && slides[0].image) {
      const img = new Image();
      img.src = slides[0].image;
      img.onload = () => setIsLoaded(true);
    }
  }, [slides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Sola kaydırma -> Sonraki slide
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (isRightSwipe) {
      // Sağa kaydırma -> Önceki slide
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-walnut"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-walnut flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {slide.image.toLowerCase().endsWith('.mp4') || slide.image.toLowerCase().endsWith('.mov') ? (
            <video
              src={slide.image}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              onLoad={index === 0 ? () => setIsLoaded(true) : undefined}
            />
          )}
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
