import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Repeat, CloudUpload, PictureInPicture, Images, Store, BriefcaseBusiness, LayoutGrid, Contact, LogOut, Library, Check, Settings, Type, Menu, X, UserRoundCog, Plus, Trash2, Minus, MessageCircle, Smartphone, ToggleLeft, ToggleRight, Album, Search } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import MediaLibrary from '../components/MediaLibrary';
import MediaPicker from '../components/MediaPicker';
import { Slide, Service, Project, Reference, BrandingContent, NavigationContent, ServicesSectionContent, GallerySectionContent, FooterSectionContent, WhatsAppContent, AboutContent, FooterContent, SiteContent, SEOContent, SEOPageMeta } from '../types';

type TabType = 'genel' | 'hero' | 'about' | 'services' | 'projects' | 'referanslar' | 'whatsapp' | 'footer' | 'medya' | 'seo';

interface PickerConfig {
    isOpen: boolean;
    onSelect: (url: string) => void;
}

const AdminPanel: React.FC = () => {
    const {
        content,
        isSaving,
        lastSaved,
        updateSection,
        saveContent,
        resetToDefault,
        exportContent,
        importContent
    } = useContent();

    const [activeTab, setActiveTab] = useState<TabType>('genel');
    const [notification, setNotification] = useState<string | null>(null);
    const [picker, setPicker] = useState<PickerConfig>({ isOpen: false, onSelect: () => { } });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Fetch user name from Supabase auth
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Try to get name from user_metadata first
                const fullName = user.user_metadata?.full_name ||
                    user.user_metadata?.name ||
                    `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim();

                if (fullName) {
                    setUserName(fullName);
                } else {
                    // Fallback to email prefix
                    const emailName = user.email?.split('@')[0] || 'Admin';
                    setUserName(emailName);
                }
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = () => {
        saveContent();
        showNotification('✅ Değişiklikler kaydedildi!');
    };

    const handleReset = () => {
        if (window.confirm('Tüm değişiklikler silinecek ve varsayılan içerik geri yüklenecek. Emin misiniz?')) {
            resetToDefault();
            showNotification('🔄 Varsayılan içerik geri yüklendi');
        }
    };

    const handleExport = () => {
        exportContent();
        showNotification('📥 JSON dosyası indirildi');
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await importContent(file);
                showNotification('📤 İçerik başarıyla yüklendi');
            } catch (error) {
                showNotification('❌ Dosya yüklenemedi: ' + (error as Error).message);
            }
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openPicker = (setter: (url: string) => void) => {
        setPicker({
            isOpen: true,
            onSelect: (url) => {
                setter(url);
                setPicker(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
        { id: 'genel', label: 'Genel', icon: <Settings size={18} /> },
        { id: 'hero', label: 'Hero', icon: <Images size={18} /> },
        { id: 'about', label: 'Hakkımızda', icon: <Store size={18} /> },
        { id: 'services', label: 'Hizmetler', icon: <BriefcaseBusiness size={18} /> },
        { id: 'projects', label: 'Galeri', icon: <LayoutGrid size={18} /> },
        { id: 'referanslar', label: 'Referanslar', icon: <Album size={18} /> },
        { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={18} /> },
        { id: 'footer', label: 'İletişim', icon: <Contact size={18} /> },
        { id: 'seo', label: 'SEO', icon: <Search size={18} /> },
        { id: 'medya', label: 'Medya', icon: <Library size={18} /> },
    ];

    const handleTabClick = (tabId: TabType) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header - Mobile Responsive */}
            <header className="bg-gray-800 border-b border-gray-700 px-3 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 bg-gray-700 rounded-lg"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {/* User Info with Icon */}
                    <div className="flex items-center gap-2">
                        <UserRoundCog className="text-amber-500" size={20} />
                        <span className="text-sm md:text-base font-semibold">{userName || 'Admin'}</span>
                    </div>

                    {lastSaved && (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-900/50 rounded-full border border-gray-700">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] text-gray-400">
                                {lastSaved.toLocaleTimeString('tr-TR')}
                            </span>
                        </div>
                    )}
                </div>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all">
                        <Upload size={16} /> İçe Aktar
                    </button>
                    <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all">
                        <Download size={16} /> Dışa Aktar
                    </button>
                    <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all hover:text-amber-400">
                        <Repeat size={16} /> Sıfırla
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all disabled:opacity-50">
                        <CloudUpload size={16} /> {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                    <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all">
                        <PictureInPicture size={16} /> Site
                    </a>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all">
                        <LogOut size={16} /> Çıkış
                    </button>
                </div>

                {/* Mobile Actions */}
                <div className="flex lg:hidden items-center gap-2">
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-all disabled:opacity-50">
                        <CloudUpload size={14} /> {isSaving ? '...' : 'Kaydet'}
                    </button>
                    <button onClick={handleLogout} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                        <LogOut size={16} />
                    </button>
                </div>
            </header>

            {/* Notification */}
            {notification && (
                <div className="fixed top-16 md:top-24 right-4 md:right-6 bg-amber-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-2xl z-[150] flex items-center gap-2 md:gap-3 text-sm">
                    <Check size={18} />
                    <span className="font-medium">{notification}</span>
                </div>
            )}

            <div className="flex relative">
                {/* Mobile Sidebar Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar - Mobile Responsive */}
                <aside className={`
                    fixed md:static top-[57px] left-0 h-[calc(100vh-57px)] md:h-auto
                    w-56 md:w-48 bg-gray-800 border-r border-gray-700 z-40
                    transform transition-transform duration-300 md:transform-none
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    md:min-h-[calc(100vh-73px)]
                `}>
                    <nav className="p-3 md:p-4 space-y-1 md:space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-all flex items-center gap-2 md:gap-3 text-sm md:text-base ${activeTab === tab.id
                                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/30'
                                    : 'hover:bg-gray-700 text-gray-400 hover:text-gray-100'
                                    }`}
                            >
                                <span className={activeTab === tab.id ? 'text-white' : 'text-amber-500'}>{tab.icon}</span>
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}

                        {/* Mobile-only additional actions */}
                        <div className="md:hidden pt-4 border-t border-gray-700 space-y-2 mt-4">
                            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg text-sm">
                                <Upload size={16} /> İçe Aktar
                            </button>
                            <button onClick={handleExport} className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg text-sm">
                                <Download size={16} /> Dışa Aktar
                            </button>
                            <button onClick={handleReset} className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-400 hover:text-amber-400 hover:bg-gray-700 rounded-lg text-sm">
                                <Repeat size={16} /> Sıfırla
                            </button>
                            <a href="/" target="_blank" className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg text-sm">
                                <PictureInPicture size={16} /> Siteyi Gör
                            </a>
                        </div>
                    </nav>
                </aside>

                {/* Main Content - Mobile Responsive */}
                <main className="flex-1 p-4 md:p-8 overflow-auto bg-gray-950/20" style={{ minHeight: 'calc(100vh - 57px)' }}>
                    {activeTab === 'genel' && (
                        <GeneralSettingsEditor
                            branding={content.branding}
                            navigation={content.navigation}
                            servicesSection={content.servicesSection}
                            gallerySection={content.gallerySection}
                            footerSection={content.footerSection}
                            onBrandingChange={(branding) => updateSection('branding', branding)}
                            onNavigationChange={(navigation) => updateSection('navigation', navigation)}
                            onServicesSectionChange={(servicesSection) => updateSection('servicesSection', servicesSection)}
                            onGallerySectionChange={(gallerySection) => updateSection('gallerySection', gallerySection)}
                            onFooterSectionChange={(footerSection) => updateSection('footerSection', footerSection)}
                        />
                    )}
                    {activeTab === 'hero' && (
                        <HeroEditor slides={content.hero} onChange={(slides) => updateSection('hero', slides)} onOpenPicker={openPicker} />
                    )}
                    {activeTab === 'about' && (
                        <AboutEditor about={content.about} onChange={(about) => updateSection('about', about)} onOpenPicker={openPicker} />
                    )}
                    {activeTab === 'services' && (
                        <ServicesEditor services={content.services} onChange={(services) => updateSection('services', services)} onOpenPicker={openPicker} />
                    )}
                    {activeTab === 'projects' && (
                        <ProjectsEditor projects={content.projects} onChange={(projects) => updateSection('projects', projects)} onOpenPicker={openPicker} />
                    )}
                    {activeTab === 'referanslar' && (
                        <ReferencesEditor references={content.references} onChange={(references) => updateSection('references', references)} />
                    )}
                    {activeTab === 'whatsapp' && (
                        <WhatsAppEditor settings={content.whatsapp} onChange={(settings) => updateSection('whatsapp', settings)} onOpenPicker={openPicker} />
                    )}
                    {activeTab === 'footer' && (
                        <FooterEditor footer={content.footer} onChange={(footer) => updateSection('footer', footer)} />
                    )}
                    {activeTab === 'seo' && (
                        <SEOEditor seo={content.seo} onChange={(seo) => updateSection('seo', seo)} onOpenPicker={openPicker} />
                    )}
                    {activeTab === 'medya' && <MediaLibrary />}
                </main>
            </div>

            {/* Global Media Picker Modal */}
            <MediaPicker
                isOpen={picker.isOpen}
                onClose={() => setPicker(prev => ({ ...prev, isOpen: false }))}
                onSelect={picker.onSelect}
            />
        </div>
    );
};

// ===== General Settings Editor =====
const GeneralSettingsEditor: React.FC<{
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
}> = ({ branding, navigation, servicesSection, gallerySection, footerSection, onBrandingChange, onNavigationChange, onServicesSectionChange, onGallerySectionChange, onFooterSectionChange }) => {

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

// --- Hero Editor ---
const HeroEditor: React.FC<{ slides: Slide[]; onChange: (slides: Slide[]) => void; onOpenPicker: (setter: (url: string) => void) => void; }> = ({ slides, onChange, onOpenPicker }) => {
    const updateSlide = (index: number, field: keyof Slide, value: string | number) => { const updated = [...slides]; updated[index] = { ...updated[index], [field]: value }; onChange(updated); };
    const addSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            image: '',
            title: 'Yeni Slayt Başlığı',
            subtitle: 'Yeni slayt açıklama metni buraya gelecek.'
        };
        onChange([...slides, newSlide]);
    };
    const removeSlide = (index: number) => {
        if (slides.length <= 1) return alert('En az bir slayt bulunmalıdır.');
        const updated = slides.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3"><Images className="text-amber-500" />Hero Slider</h2>
                <button onClick={addSlide} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95">
                    <Plus size={18} /> Slayt Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="group relative bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700 hover:border-amber-500/50 transition-all">
                        <button
                            onClick={() => removeSlide(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 z-10"
                            title="Slaytı Sil"
                        >
                            <Minus size={20} />
                        </button>
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Slayt {index + 1}</h3>
                        <div className="mb-3 md:mb-4"><ImageUpload label="Görsel" value={slide.image} onChange={(url) => updateSlide(index, 'image', url)} onBrowseLibrary={() => onOpenPicker((url) => updateSlide(index, 'image', url))} /></div>
                        <div className="mb-3 md:mb-4"><label className="block text-xs md:text-sm text-gray-400 mb-2">Başlık</label><input type="text" value={slide.title} onChange={(e) => updateSlide(index, 'title', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                        <div><label className="block text-xs md:text-sm text-gray-400 mb-2">Alt Başlık</label><textarea value={slide.subtitle} onChange={(e) => updateSlide(index, 'subtitle', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded px-3 md:px-4 py-2 text-white resize-none outline-none focus:border-amber-500" rows={2} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- About Editor ---
const AboutEditor: React.FC<{ about: AboutContent; onChange: (about: AboutContent) => void; onOpenPicker: (setter: (url: string) => void) => void; }> = ({ about, onChange, onOpenPicker }) => {
    const updateField = (field: keyof AboutContent, value: any) => { onChange({ ...about, [field]: value }); };
    const updateParagraph = (index: number, value: string) => { const updated = [...about.paragraphs]; updated[index] = value; updateField('paragraphs', updated); };
    const updateFeature = (index: number, field: 'title' | 'description', value: string) => { const updated = [...about.features]; updated[index] = { ...updated[index], [field]: value }; updateField('features', updated); };

    const addParagraph = () => updateField('paragraphs', [...about.paragraphs, 'Yeni paragraf metni buraya gelecek.']);
    const removeParagraph = (index: number) => {
        if (about.paragraphs.length <= 1) return alert('En az bir paragraf bulunmalıdır.');
        updateField('paragraphs', about.paragraphs.filter((_, i) => i !== index));
    };

    const addFeature = () => updateField('features', [...about.features, { title: 'Yeni Özellik', description: 'Özellik açıklama metni.' }]);
    const removeFeature = (index: number) => {
        if (about.features.length <= 1) return alert('En az bir özellik bulunmalıdır.');
        updateField('features', about.features.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3"><Store className="text-amber-500" />Hakkımızda</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-4 md:space-y-6">
                    <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700"><ImageUpload label="Ana Görsel" value={about.image} onChange={(url) => updateField('image', url)} onBrowseLibrary={() => onOpenPicker((url) => updateField('image', url))} /></div>
                    <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Başlıklar</h3>
                        <div className="space-y-3 md:space-y-4">
                            <div><label className="block text-xs md:text-sm text-gray-400 mb-2">Üst Etiket</label><input type="text" value={about.badge} onChange={(e) => updateField('badge', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                            <div><label className="block text-xs md:text-sm text-gray-400 mb-2">Ana Başlık</label><input type="text" value={about.title} onChange={(e) => updateField('title', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                    <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base md:text-lg font-bold text-amber-400">Açıklama Metinleri</h3>
                            <button onClick={addParagraph} className="flex items-center gap-1 px-3 py-1 bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 rounded text-xs transition-all">
                                <Plus size={14} /> Ekle
                            </button>
                        </div>
                        {about.paragraphs.map((para, index) => (
                            <div key={index} className="group relative mb-3 md:mb-4 last:mb-0">
                                <label className="block text-xs md:text-sm text-gray-400 mb-2 flex justify-between items-center">
                                    <span>Paragraf {index + 1}</span>
                                    <button onClick={() => removeParagraph(index)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-500/10 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </label>
                                <textarea value={para} onChange={(e) => updateParagraph(index, e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white resize-none outline-none focus:border-amber-500" rows={3} />
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base md:text-lg font-bold text-amber-400">Özellikler</h3>
                            <button onClick={addFeature} className="flex items-center gap-1 px-3 py-1 bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 rounded text-xs transition-all">
                                <Plus size={14} /> Ekle
                            </button>
                        </div>
                        <div className="space-y-4">
                            {about.features.map((feature, index) => (
                                <div key={index} className="group relative p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-amber-500/30 transition-all">
                                    <button onClick={() => removeFeature(index)} className="absolute -top-2 -right-2 w-7 h-7 bg-red-600/80 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600">
                                        <Minus size={16} />
                                    </button>
                                    <div className="mb-3">
                                        <label className="block text-xs text-gray-400 mb-1">Başlık</label>
                                        <input type="text" value={feature.title} onChange={(e) => updateFeature(index, 'title', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Açıklama</label>
                                        <input type="text" value={feature.description} onChange={(e) => updateFeature(index, 'description', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Services Editor ---
const ServicesEditor: React.FC<{ services: Service[]; onChange: (services: Service[]) => void; onOpenPicker: (setter: (url: string) => void) => void; }> = ({ services, onChange, onOpenPicker }) => {
    const updateService = (index: number, field: keyof Service, value: string) => { const updated = [...services]; updated[index] = { ...updated[index], [field]: value }; onChange(updated); };
    const addService = () => {
        const newService: Service = {
            id: `service-${Date.now()}`,
            title: 'Yeni Hizmet',
            description: 'Hizmet açıklama metni buraya gelecek.',
            image: '',
            items: []
        };
        onChange([...services, newService]);
    };
    const removeService = (index: number) => {
        if (services.length <= 1) return alert('En az bir hizmet kartı bulunmalıdır.');
        onChange(services.filter((_, i) => i !== index));
    };

    const updateServiceItem = (serviceIndex: number, itemIndex: number, value: string) => {
        const updated = [...services];
        const updatedItems = [...(updated[serviceIndex].items || [])];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], value };
        updated[serviceIndex] = { ...updated[serviceIndex], items: updatedItems };
        onChange(updated);
    };

    const addServiceItem = (serviceIndex: number, type: 'image' | 'text') => {
        const updated = [...services];
        const newItems = [...(updated[serviceIndex].items || []), { id: `item-${Date.now()}`, type, value: '' }];
        updated[serviceIndex] = { ...updated[serviceIndex], items: newItems };
        onChange(updated);
    };

    const removeServiceItem = (serviceIndex: number, itemIndex: number) => {
        const updated = [...services];
        const newItems = (updated[serviceIndex].items || []).filter((_, i) => i !== itemIndex);
        updated[serviceIndex] = { ...updated[serviceIndex], items: newItems };
        onChange(updated);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3"><BriefcaseBusiness className="text-amber-500" />Hizmet Kartları</h2>
                <button onClick={addService} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95">
                    <Plus size={18} /> Hizmet Ekle
                </button>
            </div>
            <div className="space-y-8">
                {services.map((service, sIndex) => (
                    <div key={service.id} className="group relative bg-gray-800 rounded-xl md:rounded-2xl p-6 border border-gray-700 hover:border-amber-500/30 transition-all">
                        <button
                            onClick={() => removeService(sIndex)}
                            className="absolute -top-3 -right-3 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 z-10"
                            title="Hizmeti Sil"
                        >
                            <Trash2 size={20} />
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Ana Bilgiler */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                                    <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">{sIndex + 1}</span>
                                    Ana Bilgiler
                                </h3>
                                <div className="mb-3 md:mb-4"><ImageUpload label="Kapak Görseli" value={service.image} onChange={(url) => updateService(sIndex, 'image', url)} onBrowseLibrary={() => onOpenPicker((url) => updateService(sIndex, 'image', url))} /></div>
                                <div className="mb-3 md:mb-4"><label className="block text-xs md:text-sm text-gray-400 mb-2">Hizmet Başlığı</label><input type="text" value={service.title} onChange={(e) => updateService(sIndex, 'title', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                                <div><label className="block text-xs md:text-sm text-gray-400 mb-2">Kısa Açıklama (Kart İçin)</label><textarea value={service.description} onChange={(e) => updateService(sIndex, 'description', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white resize-none outline-none focus:border-amber-500" rows={3} /></div>
                            </div>

                            {/* Alt İçerik Yönetimi (Hiyerarşik) */}
                            <div className="bg-gray-900/40 p-5 rounded-2xl border border-gray-700/50">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Hizmet Detay İçeriği</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => addServiceItem(sIndex, 'text')} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs transition-all border border-blue-600/30">
                                            <Type size={14} /> Metin Ekle
                                        </button>
                                        <button onClick={() => addServiceItem(sIndex, 'image')} className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg text-xs transition-all border border-green-600/30">
                                            <Plus size={14} /> Görsel Ekle
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {service.items && service.items.length > 0 ? (
                                        service.items.map((item, iIndex) => (
                                            <div key={item.id} className="group/item relative bg-gray-800 p-4 rounded-xl border border-gray-700/50 shadow-sm">
                                                <button
                                                    onClick={() => removeServiceItem(sIndex, iIndex)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all hover:bg-red-600 text-[10px]"
                                                >
                                                    <X size={12} />
                                                </button>

                                                {item.type === 'text' ? (
                                                    <div>
                                                        <label className="block text-[10px] text-blue-400 font-bold uppercase mb-2">Detay Metni</label>
                                                        <textarea
                                                            value={item.value}
                                                            onChange={(e) => updateServiceItem(sIndex, iIndex, e.target.value)}
                                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
                                                            rows={3}
                                                            placeholder="Müşterilerinize hizmetin detaylarını anlatın..."
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label className="block text-[10px] text-green-400 font-bold uppercase mb-2">Detay Görseli</label>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                                                                {item.value ? (
                                                                    <img src={item.value} className="w-full h-full object-cover" alt="" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-gray-700"><Images size={20} /></div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <button
                                                                    onClick={() => onOpenPicker((url) => updateServiceItem(sIndex, iIndex, url))}
                                                                    className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-cream rounded-lg text-xs font-medium transition-colors border border-gray-600"
                                                                >
                                                                    Kütüphaneden Seç
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 bg-gray-900/20 rounded-xl border border-dashed border-gray-700">
                                            <p className="text-gray-500 text-xs text-center px-4">Bu hizmet için henüz detaylı içerik eklenmedi. Yukarıdaki butonlarla foto ve metin ekleyebilirsiniz.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Projects Editor ---
const ProjectsEditor: React.FC<{ projects: Project[]; onChange: (projects: Project[]) => void; onOpenPicker: (setter: (url: string) => void) => void; }> = ({ projects, onChange, onOpenPicker }) => {
    const updateProject = (index: number, field: keyof Project, value: string | number) => { const updated = [...projects]; updated[index] = { ...updated[index], [field]: value }; onChange(updated); };
    const addProject = () => {
        const newProject: Project = {
            id: Date.now(),
            title: 'Yeni Proje',
            category: 'Kategori',
            image: ''
        };
        onChange([...projects, newProject]);
    };
    const removeProject = (index: number) => {
        if (projects.length <= 1) return alert('En az bir proje bulunmalıdır.');
        onChange(projects.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3"><LayoutGrid className="text-amber-500" />Galeri (Projeler)</h2>
                <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95">
                    <Plus size={18} /> Proje Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects.map((project, index) => (
                    <div key={project.id} className="group relative bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 hover:border-amber-500/50 transition-all">
                        <button
                            onClick={() => removeProject(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 z-10"
                            title="Projeyi Sil"
                        >
                            <Minus size={20} />
                        </button>
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Uygulama {index + 1}</h3>
                        <div className="mb-3 md:mb-4"><ImageUpload label="Görsel" value={project.image} onChange={(url) => updateProject(index, 'image', url)} onBrowseLibrary={() => onOpenPicker((url) => updateProject(index, 'image', url))} /></div>
                        <div className="mb-3 md:mb-4"><label className="block text-xs md:text-sm text-gray-400 mb-2">Proje Adı</label><input type="text" value={project.title} onChange={(e) => updateProject(index, 'title', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                        <div><label className="block text-xs md:text-sm text-gray-400 mb-2">Kategori</label><input type="text" value={project.category} onChange={(e) => updateProject(index, 'category', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- References Editor ---
const ReferencesEditor: React.FC<{ references: Reference[]; onChange: (references: Reference[]) => void; }> = ({ references, onChange }) => {
    const updateRef = (index: number, field: keyof Reference, value: string) => {
        const updated = [...references];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const addRef = () => {
        const newRef: Reference = {
            id: `ref-${Date.now()}`,
            name: 'Yeni Müşteri/Referans',
            location: 'Bodrum'
        };
        onChange([...references, newRef]);
    };

    const removeRef = (index: number) => {
        if (references.length <= 1) return alert('En az bir referans bulunmalıdır.');
        onChange(references.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3"><Library className="text-amber-500" />Referans Yönetimi</h2>
                <button onClick={addRef} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95">
                    <Plus size={18} /> Referans Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {references.map((ref, index) => (
                    <div key={ref.id || index} className="group relative bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all">
                        <button
                            onClick={() => removeRef(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 shadow-xl"
                        >
                            <Minus size={18} />
                        </button>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] text-amber-400 font-bold uppercase mb-2">Müşteri/Kurum Adı</label>
                                <input
                                    type="text"
                                    value={ref.name}
                                    onChange={(e) => updateRef(index, 'name', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-gray-400 font-bold uppercase mb-2">Konum (Opsiyonel)</label>
                                <input
                                    type="text"
                                    value={ref.location}
                                    onChange={(e) => updateRef(index, 'location', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- WhatsApp Editor ---
const WhatsAppEditor: React.FC<{ settings: WhatsAppContent; onChange: (settings: WhatsAppContent) => void; onOpenPicker: (setter: (url: string) => void) => void; }> = ({ settings, onChange, onOpenPicker }) => {
    const updateField = (field: keyof WhatsAppContent, value: any) => {
        onChange({ ...settings, [field]: value });
    };

    return (
        <div className="max-w-4xl">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                <MessageCircle className="text-amber-500" /> WhatsApp Buton Ayarları
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sol Kolon: Temel Bilgiler */}
                <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Smartphone size={16} /> İletişim Bilgileri
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-2">WhatsApp Telefon Numarası (Ülke kodu ile, Örn: 90532...)</label>
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-2">Otomatik Karşılama Mesajı</label>
                                <textarea
                                    value={settings.message}
                                    onChange={(e) => updateField('message', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white outline-none focus:border-amber-500 resize-none"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sağ Kolon: Görünüm ve Animasyon */}
                <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <PictureInPicture size={16} /> Görünüm & İkon
                        </h3>
                        <div className="mb-6">
                            <ImageUpload
                                label="Buton İkonu (whatsapp.png)"
                                value={settings.image}
                                onChange={(url) => updateField('image', url)}
                                onBrowseLibrary={() => onOpenPicker((url) => updateField('image', url))}
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={18} className="text-gray-400" />
                                    <span className="text-sm text-gray-200">Zıplama Animasyonu (5sn)</span>
                                </div>
                                <button
                                    onClick={() => updateField('isJumping', !settings.isJumping)}
                                    className={`p-1 rounded-full transition-colors ${settings.isJumping ? 'text-green-500' : 'text-gray-600'}`}
                                >
                                    {settings.isJumping ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CloudUpload size={18} className="text-gray-400" />
                                    <span className="text-sm text-gray-200">Işık Hüzmesi (Shimmer)</span>
                                </div>
                                <button
                                    onClick={() => updateField('isShimmering', !settings.isShimmering)}
                                    className={`p-1 rounded-full transition-colors ${settings.isShimmering ? 'text-green-500' : 'text-gray-600'}`}
                                >
                                    {settings.isShimmering ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Footer Editor ---
const FooterEditor: React.FC<{ footer: FooterContent; onChange: (footer: FooterContent) => void; }> = ({ footer, onChange }) => {
    const updateField = (field: keyof FooterContent, value: string) => { onChange({ ...footer, [field]: value }); };
    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3"><Contact className="text-amber-500" />İletişim Bilgileri</h2>
            <div className="max-w-2xl">
                <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 space-y-4 md:space-y-6 shadow-xl">
                    <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">Footer Sloganı</label><textarea value={footer.slogan} onChange={(e) => updateField('slogan', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white resize-none outline-none focus:border-amber-500 font-serif" rows={2} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">Telefon</label><input type="text" value={footer.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                        <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">E-posta</label><input type="email" value={footer.email} onChange={(e) => updateField('email', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                    </div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">Adres</label><textarea value={footer.address} onChange={(e) => updateField('address', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white resize-none outline-none focus:border-amber-500" rows={2} /></div>
                </div>
            </div>
        </div>
    );
};

// --- SEO Editor ---
const SEOEditor: React.FC<{
    seo: SEOContent;
    onChange: (seo: SEOContent) => void;
    onOpenPicker: (setter: (url: string) => void) => void;
}> = ({ seo, onChange, onOpenPicker }) => {
    const updateField = (field: keyof SEOContent, value: string) => {
        onChange({ ...seo, [field]: value });
    };

    const updatePageMeta = (page: keyof SEOContent['pages'], field: keyof SEOPageMeta, value: string) => {
        onChange({
            ...seo,
            pages: {
                ...seo.pages,
                [page]: {
                    ...seo.pages[page],
                    [field]: value
                }
            }
        });
    };

    const pageLabels: { key: keyof SEOContent['pages']; label: string }[] = [
        { key: 'home', label: 'Anasayfa' },
        { key: 'about', label: 'Hakkımızda' },
        { key: 'services', label: 'Hizmetler' },
        { key: 'gallery', label: 'Galeri' },
        { key: 'references', label: 'Referanslar' },
        { key: 'contact', label: 'İletişim' },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                <Search className="text-amber-500" />
                SEO Ayarları
            </h2>

            {/* Global SEO Settings */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Settings size={16} />
                    Genel SEO Ayarları
                </h3>
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">Site Başlığı (Title Tag)</label>
                        <input
                            type="text"
                            value={seo.siteTitle}
                            onChange={(e) => updateField('siteTitle', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500"
                            placeholder="Küpeşteci Merdiven | 1920'den Günümüze"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">Google arama sonuçlarında görünen ana başlık (50-60 karakter önerilir)</p>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">Site Açıklaması (Meta Description)</label>
                        <textarea
                            value={seo.siteDescription}
                            onChange={(e) => updateField('siteDescription', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500 resize-none"
                            rows={3}
                            placeholder="Bodrum merkezli, 100 yıllık gelenekle el yapımı ahşap küpeşte..."
                        />
                        <p className="text-[10px] text-gray-500 mt-1">Google arama sonuçlarında görünen açıklama (150-160 karakter önerilir)</p>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">Anahtar Kelimeler (Keywords)</label>
                        <textarea
                            value={seo.keywords}
                            onChange={(e) => updateField('keywords', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500 resize-none"
                            rows={2}
                            placeholder="küpeşte, ahşap merdiven, bodrum, tırabzan..."
                        />
                        <p className="text-[10px] text-gray-500 mt-1">Virgülle ayrılmış anahtar kelimeler</p>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">Sosyal Medya Görseli (OG Image)</label>
                        <div className="flex items-center gap-4">
                            <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0 border border-gray-600">
                                {seo.ogImage ? (
                                    <img src={seo.ogImage} alt="OG" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        <Images size={24} />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => onOpenPicker((url) => updateField('ogImage', url))}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all"
                            >
                                Görsel Seç
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2">Facebook, Twitter vb. paylaşımlarında görünecek görsel (1200x630 piksel önerilir)</p>
                    </div>
                </div>
            </div>

            {/* Page-Specific SEO */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <LayoutGrid size={16} />
                    Sayfa Bazlı SEO
                </h3>
                <div className="space-y-6">
                    {pageLabels.map(({ key, label }) => (
                        <div key={key} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                {label} Sayfası
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Sayfa Başlığı</label>
                                    <input
                                        type="text"
                                        value={seo.pages[key].title}
                                        onChange={(e) => updatePageMeta(key, 'title', e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Sayfa Açıklaması</label>
                                    <input
                                        type="text"
                                        value={seo.pages[key].description}
                                        onChange={(e) => updatePageMeta(key, 'description', e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEO Tips */}
            <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-2xl p-6 border border-amber-900/30">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">💡 SEO İpuçları</h3>
                <ul className="text-xs text-gray-400 space-y-2">
                    <li>• <strong>Başlık:</strong> 50-60 karakter arasında tutun, anahtar kelimeyi başa yerleştirin</li>
                    <li>• <strong>Açıklama:</strong> 150-160 karakter, kullanıcıyı tıklamaya teşvik eden bir metin yazın</li>
                    <li>• <strong>Anahtar Kelimeler:</strong> Ana hizmetlerinizi ve konumunuzu ekleyin (örn: "bodrum ahşap merdiven")</li>
                    <li>• <strong>OG Görseli:</strong> Profesyonel, dikkat çekici bir görsel seçin</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
