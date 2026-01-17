import React from 'react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import Services from '../components/Services';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-gold selection:text-white">
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
                    <Services />
                </section>

                <section id="gallery">
                    <Gallery />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
