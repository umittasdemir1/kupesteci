import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReadContent } from '../hooks/useContent';
import { X, Maximize2 } from 'lucide-react';

interface GalleryProps {
  limit?: number;
}

const Gallery: React.FC<GalleryProps> = ({ limit }) => {
  const content = useReadContent();
  const allProjects = content.projects;
  const section = content.gallerySection;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = limit ? allProjects.slice(0, limit) : allProjects;

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-walnut leading-tight">{section.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedImage(project.image)}>
              <div className="relative overflow-hidden aspect-[4/5] bg-walnut mb-6 shadow-lg rounded-sm">
                {project.image.toLowerCase().endsWith('.mp4') || project.image.toLowerCase().endsWith('.mov') ? (
                  <video
                    src={project.image}
                    className="w-full h-full object-cover transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-walnut/20 group-hover:bg-transparent transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-gold text-walnut p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-gold text-[10px] font-bold uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-walnut group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {limit && allProjects.length > limit && (
          <div className="mt-20 text-center">
            <Link
              to="/galeri"
              className="inline-block bg-walnut text-cream px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl"
            >
              {section.button}
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-walnut/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-cream hover:text-gold transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedImage.toLowerCase().endsWith('.mp4') || selectedImage.toLowerCase().endsWith('.mov') ? (
              <video
                src={selectedImage}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                controls
                autoPlay
              />
            ) : (
              <img
                src={selectedImage}
                alt="Büyük Görünüm"
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
