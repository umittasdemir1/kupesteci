import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useReadContent } from '../hooks/useContent';
import { ArrowLeft, Maximize2, X } from 'lucide-react';

const ServiceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const content = useReadContent();
    const service = content.services.find(s => s.id === id);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col bg-walnut text-cream">
                <Header />
                <main className="flex-grow flex items-center justify-center pt-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-serif mb-6">Hizmet Bulunamadı</h1>
                        <Link to="/" className="text-gold hover:underline">Anasayfaya Dön</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-cream font-sans selection:bg-gold selection:text-white">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px]">
                    {service.image.toLowerCase().endsWith('.mp4') || service.image.toLowerCase().endsWith('.mov') ? (
                        <video
                            src={service.image}
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={service.image}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-walnut/60" />
                    <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                        <div className="max-w-4xl pt-20">
                            <Link to="/#services" className="inline-flex items-center space-x-2 text-gold mb-8 hover:text-cream transition-colors uppercase tracking-[.2em] text-xs font-bold">
                                <ArrowLeft size={16} />
                                <span>Hizmetlere Dön</span>
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-lg md:text-xl text-cream/80 font-light max-w-2xl mx-auto leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6 md:px-12">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {(() => {
                                const elements: React.ReactNode[] = [];
                                const items = [...(service.items || [])].filter(item =>
                                    !item.value.toLowerCase().includes('catalog') &&
                                    !item.value.toLowerCase().includes('katalog')
                                );

                                for (let i = 0; i < items.length; i++) {
                                    const item = items[i];

                                    if (item.type === 'image') {
                                        const nextItem = items[i + 1];
                                        const hasCaption = nextItem && nextItem.type === 'text';

                                        elements.push(
                                            <div key={item.id} className="flex flex-col space-y-4">
                                                <div
                                                    className="group relative aspect-square overflow-hidden bg-walnut cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 rounded-sm"
                                                    onClick={() => setSelectedImage(item.value)}
                                                >
                                                    {item.value.toLowerCase().endsWith('.mp4') || item.value.toLowerCase().endsWith('.mov') ? (
                                                        <video
                                                            src={item.value}
                                                            className="w-full h-full object-cover transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                                                            muted
                                                            loop
                                                            autoPlay
                                                            playsInline
                                                        />
                                                    ) : (
                                                        <img
                                                            src={item.value}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-walnut/10 group-hover:bg-transparent transition-all duration-500" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                        <div className="bg-gold text-walnut p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                            <Maximize2 size={24} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {hasCaption && (
                                                    <div className="bg-white p-5 border-l-2 border-gold shadow-sm">
                                                        <p className="text-base text-walnut/90 leading-relaxed font-semibold italic">
                                                            {nextItem.value}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );

                                        if (hasCaption) i++;
                                    } else {
                                        elements.push(
                                            <div key={item.id} className="flex items-center justify-center bg-white p-8 border-t-2 border-gold shadow-sm text-center aspect-square">
                                                <p className="text-lg text-walnut/90 leading-relaxed font-semibold italic">
                                                    "{item.value}"
                                                </p>
                                            </div>
                                        );
                                    }
                                }

                                return elements.length > 0 ? elements : (
                                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                        <p className="text-gray-400 font-light">Bu hizmet için henüz detaylı içerik eklenmemiş.</p>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </section>
            </main>

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

            <Footer />
        </div>
    );
};

export default ServiceDetailPage;
