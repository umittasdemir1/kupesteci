import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { useReadContent } from '../hooks/useContent';

const GalleryPage: React.FC = () => {
    const content = useReadContent();
    const seo = content.seo;

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-gold selection:text-white">
            <Helmet>
                <title>{seo.pages.gallery.title}</title>
                <meta name="description" content={seo.pages.gallery.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={seo.pages.gallery.title} />
                <meta property="og:description" content={seo.pages.gallery.description} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <Header />
            <main className="flex-grow pt-20">
                <Gallery />
            </main>
            <Footer />
        </div>
    );
};

export default GalleryPage;
