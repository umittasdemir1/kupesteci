import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useReadContent } from '../hooks/useContent';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
    const content = useReadContent();
    const { footer } = content;
    const seo = content.seo;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-cream font-sans selection:bg-gold selection:text-white">
            <Helmet>
                <title>{seo.pages.contact.title}</title>
                <meta name="description" content={seo.pages.contact.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={seo.pages.contact.title} />
                <meta property="og:description" content={seo.pages.contact.description} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-walnut text-cream pt-32 pb-20">
                    <div className="absolute inset-0 bg-[url('/assets/staircase1.png')] bg-cover bg-center opacity-10"></div>
                    <div className="container mx-auto px-6 md:px-12 relative">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="text-gold text-xs font-bold uppercase tracking-[.3em] mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                                Bize Ulaşın
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                                İletişim
                            </h1>
                            <div className="w-20 h-1 bg-gold mx-auto animate-in fade-in scale-in-x-0 duration-700 delay-200"></div>
                            <p className="mt-8 text-cream/70 max-w-xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                                Projeleriniz için teklif almak, iş birliği yapmak veya sorularınızı sormak için bize ulaşın.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Info + Map Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Contact Details */}
                            <div className="space-y-8">
                                <div className="bg-white p-8 shadow-xl border border-walnut/5 rounded-sm">
                                    <h2 className="text-2xl font-serif font-bold text-walnut mb-8">İletişim Bilgileri</h2>

                                    <div className="space-y-6">
                                        {/* Phone */}
                                        <a
                                            href={`tel:${footer.phone.replace(/\s/g, '')}`}
                                            className="flex items-start gap-4 group hover:bg-walnut/5 p-4 -m-4 rounded-lg transition-colors"
                                        >
                                            <div className="bg-gold/10 p-3 rounded-sm group-hover:bg-gold/20 transition-colors">
                                                <Phone className="text-gold" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-walnut/60 uppercase tracking-wider mb-1">Telefon</h3>
                                                <p className="text-lg text-walnut font-medium group-hover:text-gold transition-colors">{footer.phone}</p>
                                            </div>
                                        </a>

                                        {/* Email */}
                                        <a
                                            href={`mailto:${footer.email}`}
                                            className="flex items-start gap-4 group hover:bg-walnut/5 p-4 -m-4 rounded-lg transition-colors"
                                        >
                                            <div className="bg-gold/10 p-3 rounded-sm group-hover:bg-gold/20 transition-colors">
                                                <Mail className="text-gold" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-walnut/60 uppercase tracking-wider mb-1">E-posta</h3>
                                                <p className="text-lg text-walnut font-medium group-hover:text-gold transition-colors break-all">{footer.email}</p>
                                            </div>
                                        </a>

                                        {/* Address */}
                                        <div className="flex items-start gap-4 p-4 -m-4">
                                            <div className="bg-gold/10 p-3 rounded-sm">
                                                <MapPin className="text-gold" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-walnut/60 uppercase tracking-wider mb-1">Adres</h3>
                                                <p className="text-lg text-walnut font-medium leading-relaxed">{footer.address}</p>
                                            </div>
                                        </div>

                                        {/* Working Hours */}
                                        <div className="flex items-start gap-4 p-4 -m-4">
                                            <div className="bg-gold/10 p-3 rounded-sm">
                                                <Clock className="text-gold" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-walnut/60 uppercase tracking-wider mb-1">Çalışma Saatleri</h3>
                                                <p className="text-lg text-walnut font-medium">Pazartesi - Cumartesi: 08:00 - 20:00</p>
                                                <p className="text-sm text-walnut/60 mt-1">Pazar: Kapalı</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="bg-walnut text-cream p-8 rounded-sm shadow-xl">
                                    <h3 className="text-xl font-serif font-bold mb-4 text-gold">Hemen Teklif Alın</h3>
                                    <p className="text-cream/70 text-sm leading-relaxed mb-6">
                                        Projeniz için ücretsiz keşif ve fiyat teklifi almak için bizi arayın veya WhatsApp'tan yazın.
                                    </p>
                                    <a
                                        href={`https://wa.me/${content.whatsapp.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wider transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp ile Yazın
                                    </a>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="bg-white shadow-xl border border-walnut/5 rounded-sm overflow-hidden">
                                <div className="p-4 bg-walnut/5 border-b border-walnut/10">
                                    <h2 className="text-lg font-serif font-bold text-walnut flex items-center gap-2">
                                        <MapPin className="text-gold" size={20} />
                                        Konumumuz
                                    </h2>
                                </div>
                                <div className="aspect-[4/3] lg:aspect-auto lg:h-[500px]">
                                    <iframe
                                        src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&q=place_id:ChIJtRf7qZBtvhQRX2k-B-qEGvc&zoom=17`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Küpeşteci Merdiven Konum"
                                    ></iframe>
                                </div>
                                <div className="p-4 bg-walnut/5 border-t border-walnut/10">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=37.0382411,27.3101655&destination_place_id=ChIJtRf7qZBtvhQRX2k-B-qEGvc`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-gold hover:text-walnut font-bold text-sm uppercase tracking-wider transition-colors"
                                    >
                                        <MapPin size={16} />
                                        Yol Tarifi Al
                                    </a>
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

export default ContactPage;
