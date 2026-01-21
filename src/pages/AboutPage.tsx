import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useReadContent } from '../hooks/useContent';
import { Check } from 'lucide-react';

const AboutPage: React.FC = () => {
    const content = useReadContent();
    const { about } = content;
    const seo = content.seo;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-cream font-sans selection:bg-gold selection:text-white">
            <Helmet>
                <title>{seo.pages.about.title}</title>
                <meta name="description" content={seo.pages.about.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={seo.pages.about.title} />
                <meta property="og:description" content={seo.pages.about.description} />
                <link rel="canonical" href="https://www.kupestecimerdiven.com/hakkimizda" />
            </Helmet>
            <Header />

            <main className="flex-grow">
                {/* Hero section */}
                <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                    <img
                        src={about.image}
                        alt={about.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-walnut/70" />
                    <div className="relative text-center px-6 pt-16">
                        <span className="text-gold text-xs font-bold uppercase tracking-[.4em] mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">Geleneksel Miras</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            {about.title}
                        </h1>
                        <div className="w-24 h-1 bg-gold mx-auto animate-in fade-in scale-in-x-0 duration-700 delay-200"></div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            {/* Left: Content */}
                            <div className="lg:w-2/3 space-y-10">
                                <div className="space-y-6">
                                    {about.paragraphs.map((para, index) => (
                                        <p key={index} className="text-xl text-walnut/80 leading-relaxed font-light first-letter:text-4xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-walnut/10">
                                    {about.features.map((feature, index) => (
                                        <div key={index} className="group p-8 bg-white shadow-sm border border-walnut/5 hover:border-gold/30 hover:shadow-xl transition-all duration-500 rounded-sm">
                                            <div className="flex items-center space-x-4 mb-6 text-gold">
                                                <div className="p-3 bg-walnut/5 rounded-sm group-hover:bg-gold/10 transition-colors">
                                                    <Check size={20} />
                                                </div>
                                                <span className="font-bold text-walnut uppercase tracking-[0.2em] text-xs transition-colors group-hover:text-gold">
                                                    {feature.title}
                                                </span>
                                            </div>
                                            <p className="text-sm text-walnut/60 leading-relaxed font-light">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Side Info/Image */}
                            <div className="lg:w-1/3">
                                <div className="sticky top-32 space-y-8">
                                    <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border-8 border-white">
                                        <img
                                            src={about.image}
                                            alt="Atölyemizden bir kare"
                                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                                        />
                                    </div>
                                    <div className="bg-walnut p-8 text-cream rounded-sm shadow-xl">
                                        <h4 className="text-gold font-serif text-xl mb-4 italic">"Ahşabın doğallığı, ustalığın ruhuyla buluşuyor."</h4>
                                        <p className="text-sm text-cream/70 font-light leading-relaxed">
                                            Bodrum'daki atölyemizde her bir parçayı ilk günkü heyecanımızla ve kuşaktan kuşağa aktarılan tecrübemizle şekillendiriyoruz.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
