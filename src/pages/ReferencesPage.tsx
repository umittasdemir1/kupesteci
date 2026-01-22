import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useReadContent } from '../hooks/useContent';
import { Building2, MapPin } from 'lucide-react';

const ReferencesPage: React.FC = () => {
    const content = useReadContent();
    const { references, navigation } = content;
    const seo = content.seo;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-cream font-sans selection:bg-gold selection:text-white">
            <Helmet>
                <title>{seo.pages.references.title}</title>
                <meta name="description" content={seo.pages.references.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={seo.pages.references.title} />
                <meta property="og:description" content={seo.pages.references.description} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-gold text-xs font-bold uppercase tracking-[.3em] mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">Güven ve Tecrübe</span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-walnut mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            {navigation.references}
                        </h1>
                        <div className="w-20 h-1 bg-gold mx-auto animate-in fade-in scale-in-x-0 duration-700 delay-200"></div>
                    </div>

                    {/* Grid */}
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {references.map((ref, index) => (
                            <div
                                key={ref.id || index}
                                className="group bg-white p-6 shadow-sm border border-walnut/5 hover:border-gold/30 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="bg-walnut/5 p-3 rounded-sm group-hover:bg-gold/10 transition-colors">
                                        <Building2 size={20} className="text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-serif font-bold text-walnut mb-1 group-hover:text-gold transition-colors">
                                            {ref.name}
                                        </h3>
                                        {ref.location && (
                                            <div className="flex items-center text-xs text-walnut/50 font-light">
                                                <MapPin size={12} className="mr-1" />
                                                <span>{ref.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {references.length === 0 && (
                        <div className="text-center py-20 bg-white/50 rounded-xl border-2 border-dashed border-walnut/10">
                            <p className="text-walnut/40 font-light">Henüz referans eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ReferencesPage;
