import React, { useState, useRef } from 'react';
import { Upload, Download, Repeat, Save, PictureInPicture, Images, Store, BriefcaseBusiness, LayoutGrid, Contact, LogOut } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { Slide, Service, Project } from '../types';
import { AboutContent, FooterContent } from '../hooks/defaultContent';

type TabType = 'hero' | 'about' | 'services' | 'projects' | 'footer';

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

    const [activeTab, setActiveTab] = useState<TabType>('hero');
    const [notification, setNotification] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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

    const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
        { id: 'hero', label: 'Hero Slider', icon: <Images size={18} /> },
        { id: 'about', label: 'Hakkımızda', icon: <Store size={18} /> },
        { id: 'services', label: 'Hizmetler', icon: <BriefcaseBusiness size={18} /> },
        { id: 'projects', label: 'Galeri', icon: <LayoutGrid size={18} /> },
        { id: 'footer', label: 'İletişim', icon: <Contact size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">🔧 KÜPEŞTECİ ADMIN</h1>
                    {lastSaved && (
                        <span className="text-xs text-gray-400">
                            Son kayıt: {lastSaved.toLocaleTimeString('tr-TR')}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                        <Upload size={16} />
                        İçe Aktar
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                    />
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                        <Download size={16} />
                        Dışa Aktar
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                        <Repeat size={16} />
                        Sıfırla
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                    >
                        <Save size={16} />
                        {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                        <PictureInPicture size={16} />
                        Siteyi Gör
                    </a>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-200 rounded-lg text-sm transition-colors"
                    >
                        <LogOut size={16} />
                        Çıkış
                    </button>
                </div>
            </header>

            {/* Notification */}
            {notification && (
                <div className="fixed top-20 right-6 bg-gray-800 border border-gray-600 px-6 py-3 rounded-lg shadow-xl z-50 animate-pulse">
                    {notification}
                </div>
            )}

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-56 bg-gray-800 min-h-[calc(100vh-73px)] border-r border-gray-700">
                    <nav className="p-4 space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === tab.id
                                    ? 'bg-amber-600 text-white'
                                    : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-auto" style={{ maxHeight: 'calc(100vh - 73px)' }}>
                    {activeTab === 'hero' && (
                        <HeroEditor
                            slides={content.hero}
                            onChange={(slides) => updateSection('hero', slides)}
                        />
                    )}
                    {activeTab === 'about' && (
                        <AboutEditor
                            about={content.about}
                            onChange={(about) => updateSection('about', about)}
                        />
                    )}
                    {activeTab === 'services' && (
                        <ServicesEditor
                            services={content.services}
                            onChange={(services) => updateSection('services', services)}
                        />
                    )}
                    {activeTab === 'projects' && (
                        <ProjectsEditor
                            projects={content.projects}
                            onChange={(projects) => updateSection('projects', projects)}
                        />
                    )}
                    {activeTab === 'footer' && (
                        <FooterEditor
                            footer={content.footer}
                            onChange={(footer) => updateSection('footer', footer)}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

// Hero Editor Component
const HeroEditor: React.FC<{
    slides: Slide[];
    onChange: (slides: Slide[]) => void;
}> = ({ slides, onChange }) => {
    const updateSlide = (index: number, field: keyof Slide, value: string | number) => {
        const updated = [...slides];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Hero Slider Düzenleme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-amber-400">Slayt {index + 1}</h3>

                        <div className="mb-4">
                            <ImageUpload
                                label="Görsel"
                                value={slide.image}
                                onChange={(url) => updateSlide(index, 'image', url)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">Başlık</label>
                            <input
                                type="text"
                                value={slide.title}
                                onChange={(e) => updateSlide(index, 'title', e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Alt Başlık</label>
                            <textarea
                                value={slide.subtitle}
                                onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white resize-none"
                                rows={3}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// About Editor Component
const AboutEditor: React.FC<{
    about: AboutContent;
    onChange: (about: AboutContent) => void;
}> = ({ about, onChange }) => {
    const updateField = (field: keyof AboutContent, value: any) => {
        onChange({ ...about, [field]: value });
    };

    const updateParagraph = (index: number, value: string) => {
        const updated = [...about.paragraphs];
        updated[index] = value;
        updateField('paragraphs', updated);
    };

    const updateFeature = (index: number, field: 'title' | 'description', value: string) => {
        const updated = [...about.features];
        updated[index] = { ...updated[index], [field]: value };
        updateField('features', updated);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Hakkımızda Düzenleme</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <ImageUpload
                            label="Ana Görsel"
                            value={about.image}
                            onChange={(url) => updateField('image', url)}
                        />
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-amber-400">Başlıklar</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Üst Etiket</label>
                                <input
                                    type="text"
                                    value={about.badge}
                                    onChange={(e) => updateField('badge', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Ana Başlık</label>
                                <input
                                    type="text"
                                    value={about.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-amber-400">Paragraflar</h3>
                        {about.paragraphs.map((para, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm text-gray-400 mb-2">Paragraf {index + 1}</label>
                                <textarea
                                    value={para}
                                    onChange={(e) => updateParagraph(index, e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white resize-none"
                                    rows={4}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-amber-400">Özellikler</h3>
                        {about.features.map((feature, index) => (
                            <div key={index} className="mb-4 p-4 bg-gray-700/50 rounded-lg">
                                <div className="mb-3">
                                    <label className="block text-sm text-gray-400 mb-2">Başlık</label>
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Açıklama</label>
                                    <input
                                        type="text"
                                        value={feature.description}
                                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Services Editor Component
const ServicesEditor: React.FC<{
    services: Service[];
    onChange: (services: Service[]) => void;
}> = ({ services, onChange }) => {
    const updateService = (index: number, field: keyof Service, value: string) => {
        const updated = [...services];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Hizmetler Düzenleme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div key={service.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-amber-400">Hizmet {index + 1}</h3>

                        <div className="mb-4">
                            <ImageUpload
                                label="Hizmet Görseli"
                                value={service.image}
                                onChange={(url) => updateService(index, 'image', url)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">Başlık</label>
                            <input
                                type="text"
                                value={service.title}
                                onChange={(e) => updateService(index, 'title', e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Açıklama</label>
                            <textarea
                                value={service.description}
                                onChange={(e) => updateService(index, 'description', e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white resize-none"
                                rows={3}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Projects Editor Component
const ProjectsEditor: React.FC<{
    projects: Project[];
    onChange: (projects: Project[]) => void;
}> = ({ projects, onChange }) => {
    const updateProject = (index: number, field: keyof Project, value: string | number) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Projeler Düzenleme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div key={project.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-amber-400">Proje {index + 1}</h3>

                        <div className="mb-4">
                            <ImageUpload
                                label="Proje Görseli"
                                value={project.image}
                                onChange={(url) => updateProject(index, 'image', url)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">Başlık</label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateProject(index, 'title', e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Kategori</label>
                            <input
                                type="text"
                                value={project.category}
                                onChange={(e) => updateProject(index, 'category', e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Footer Editor Component
const FooterEditor: React.FC<{
    footer: FooterContent;
    onChange: (footer: FooterContent) => void;
}> = ({ footer, onChange }) => {
    const updateField = (field: keyof FooterContent, value: string) => {
        onChange({ ...footer, [field]: value });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri Düzenleme</h2>

            <div className="max-w-2xl">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Slogan</label>
                        <textarea
                            value={footer.slogan}
                            onChange={(e) => updateField('slogan', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white resize-none"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Telefon</label>
                        <input
                            type="text"
                            value={footer.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">E-posta</label>
                        <input
                            type="email"
                            value={footer.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Adres</label>
                        <textarea
                            value={footer.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white resize-none"
                            rows={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
