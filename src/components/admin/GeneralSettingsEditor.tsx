import React from 'react';
import { Settings, Type, Plus, Trash2 } from 'lucide-react';
import { BrandingContent, NavigationContent, ServicesSectionContent, GallerySectionContent, FooterSectionContent } from '../../types';

interface GeneralSettingsEditorProps {
    branding: BrandingContent;
    navigation: NavigationContent;
    servicesSection: ServicesSectionContent;
    gallerySection: GallerySectionContent;
    footerSection: FooterSectionContent;
    onBrandingChange: (branding: BrandingContent) => void;
    onNavigationChange: (navigation: NavigationContent) => void;
    onServicesSectionChange: (servicesSection: ServicesSectionContent) => void;
    onGallerySectionChange: (gallerySection: GallerySectionContent) => void;
    onFooterSectionChange: (footerSection: FooterSectionContent) => void;
}

const GeneralSettingsEditor: React.FC<GeneralSettingsEditorProps> = ({ 
    branding, 
    navigation, 
    servicesSection, 
    gallerySection, 
    footerSection, 
    onBrandingChange, 
    onNavigationChange, 
    onServicesSectionChange, 
    onGallerySectionChange, 
    onFooterSectionChange 
}) => {

    return (
        <div className="space-y-6 md:space-y-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3">
                <Settings className="text-amber-500" />
                Genel Ayarlar
            </h2>

            {/* Branding */}
            <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400 flex items-center gap-2">
                    <Type size={18} /> Marka & Logo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Logo Metni</label>
                        <input type="text" value={branding.logo} onChange={(e) => onBrandingChange({ ...branding, logo: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white text-lg md:text-xl font-serif uppercase outline-none focus:border-amber-500" />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Alt Yazı</label>
                        <input type="text" value={branding.tagline} onChange={(e) => onBrandingChange({ ...branding, tagline: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-gold text-xs md:text-sm tracking-widest uppercase outline-none focus:border-amber-500" />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Menü Linkleri</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4">
                    {Object.entries(navigation).map(([key, value]) => (
                        <div key={key}>
                            <label className="block text-xs text-gray-400 mb-1 capitalize">
                                {key === 'home' ? 'Anasayfa' :
                                    key === 'about' ? 'Hakkımızda' :
                                        key === 'services' ? 'Hizmetler' :
                                            key === 'gallery' ? 'Galeri' :
                                                key === 'references' ? 'Referanslar' :
                                                    key === 'contact' ? 'İletişim' : key}
                            </label>
                            <input type="text" value={value} onChange={(e) => onNavigationChange({ ...navigation, [key]: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-2 md:px-4 py-2 text-white text-sm outline-none focus:border-amber-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Services Section */}
            <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Hizmetler Bölümü</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Üst Etiket</label>
                        <input type="text" value={servicesSection.badge} onChange={(e) => onServicesSectionChange({ ...servicesSection, badge: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-gold outline-none focus:border-amber-500" />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Ana Başlık</label>
                        <input type="text" value={servicesSection.title} onChange={(e) => onServicesSectionChange({ ...servicesSection, title: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Açıklama</label>
                        <textarea value={servicesSection.description} onChange={(e) => onServicesSectionChange({ ...servicesSection, description: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white resize-none outline-none focus:border-amber-500" rows={2} />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Buton Metni</label>
                        <input type="text" value={servicesSection.cta} onChange={(e) => onServicesSectionChange({ ...servicesSection, cta: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-gold outline-none focus:border-amber-500" />
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Galeri Bölümü</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Başlık</label>
                        <input type="text" value={gallerySection.title} onChange={(e) => onGallerySectionChange({ ...gallerySection, title: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">Buton Metni</label>
                        <input type="text" value={gallerySection.button} onChange={(e) => onGallerySectionChange({ ...gallerySection, button: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" />
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Footer Başlıkları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">"Kurumsal" Başlığı</label>
                        <input type="text" value={footerSection.corporateTitle} onChange={(e) => onFooterSectionChange({ ...footerSection, corporateTitle: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-gold outline-none focus:border-amber-500" />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-400 mb-2">"İletişim" Başlığı</label>
                        <input type="text" value={footerSection.contactTitle} onChange={(e) => onFooterSectionChange({ ...footerSection, contactTitle: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-gold outline-none focus:border-amber-500" />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-xs md:text-sm font-bold text-amber-400">Kurumsal Linkler</label>
                        <button
                            onClick={() => onFooterSectionChange({ ...footerSection, corporateLinks: [...footerSection.corporateLinks, 'Yeni Link'] })}
                            className="flex items-center gap-1 px-3 py-1 bg-amber-600 hover:bg-amber-500 rounded text-xs transition-colors"
                        >
                            <Plus size={14} /> Ekle
                        </button>
                    </div>
                    <div className="space-y-2">
                        {footerSection.corporateLinks.map((link, idx) => (
                            <div key={idx} className="group relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => {
                                        const updated = [...footerSection.corporateLinks];
                                        updated[idx] = e.target.value;
                                        onFooterSectionChange({ ...footerSection, corporateLinks: updated });
                                    }}
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                                />
                                <button
                                    onClick={() => {
                                        const updated = footerSection.corporateLinks.filter((_, i) => i !== idx);
                                        onFooterSectionChange({ ...footerSection, corporateLinks: updated });
                                    }}
                                    className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    title="Sil"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettingsEditor;
