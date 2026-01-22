import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import Services from '../components/Services';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { useReadContent } from '../hooks/useContent';

const HomePage: React.FC = () => {
    const content = useReadContent();
    const seo = content.seo;

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-gold selection:text-white">
            <Helmet>
                <title>{seo.pages.home.title}</title>
                <meta name="description" content={seo.pages.home.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={seo.pages.home.title} />
                <meta property="og:description" content={seo.pages.home.description} />
                <meta property="og:image" content={seo.ogImage} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <Header />
            <main className="flex-grow">
                {/* Görselli Hero Slider - Tekrar ilk sırada */}
                <section id="home">
                    <HeroSlider />
                </section>

                <section id="about">
                    <About />
                </section>

                <section id="services">
                    <Services limit={3} />
                </section>

                <section id="gallery">
                    <Gallery limit={6} />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
