import React from 'react';
import { useReadContent } from '../hooks/useContent';

const Gallery: React.FC = () => {
  const content = useReadContent();
  const projects = content.projects;

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-walnut leading-tight">Galeri</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/5] bg-walnut mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-walnut/20 group-hover:bg-transparent transition-all duration-500" />
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

        <div className="mt-20 text-center">
          <button className="bg-walnut text-cream px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl">
            Tüm Galeriyi Görüntüle
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
