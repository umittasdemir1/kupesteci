import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Repeat, CloudUpload, PictureInPicture, Images, Store, BriefcaseBusiness, LayoutGrid, Contact, LogOut, Library, Check, Settings, Menu, X, UserRoundCog, Search, MessageCircle, Album } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import MediaLibrary from '../components/MediaLibrary';
import MediaPicker from '../components/MediaPicker';

// Admin Editors
import GeneralSettingsEditor from '../components/admin/GeneralSettingsEditor';
import HeroEditor from '../components/admin/HeroEditor';
import AboutEditor from '../components/admin/AboutEditor';
import ServicesEditor from '../components/admin/ServicesEditor';
import ProjectsEditor from '../components/admin/ProjectsEditor';
import ReferencesEditor from '../components/admin/ReferencesEditor';
import WhatsAppEditor from '../components/admin/WhatsAppEditor';
import FooterEditor from '../components/admin/FooterEditor';
import SEOEditor from '../components/admin/SEOEditor';

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

export default AdminPanel;