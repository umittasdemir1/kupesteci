import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '../components/Footer';
import { useReadContent } from '../hooks/useContent';

const ServicesPage: React.FC = () => {
    const content = useReadContent();
    const seo = content.seo;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-gold selection:text-white">
            <Helmet>
                <title>{seo.pages.services.title}</title>
                <meta name="description" content={seo.pages.services.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={seo.pages.services.title} />
                <meta property="og:description" content={seo.pages.services.description} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <Header />
            <main className="flex-grow pt-20">
                <Services />
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;
