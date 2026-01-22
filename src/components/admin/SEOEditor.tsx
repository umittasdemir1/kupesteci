import React from 'react';
import { Search, Settings, Images, LayoutGrid } from 'lucide-react';
import { SEOContent, SEOPageMeta } from '../../types';

interface SEOEditorProps {
    seo: SEOContent;
    onChange: (seo: SEOContent) => void;
    onOpenPicker: (setter: (url: string) => void) => void;
}

const SEOEditor: React.FC<SEOEditorProps> = ({ seo, onChange, onOpenPicker }) => {
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

export default SEOEditor;
