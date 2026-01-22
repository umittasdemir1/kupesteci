import React from 'react';
import { Store, Plus, Trash2, Minus } from 'lucide-react';
import ImageUpload from '../ImageUpload';
import { AboutContent } from '../../types';

interface AboutEditorProps {
    about: AboutContent;
    onChange: (about: AboutContent) => void;
    onOpenPicker: (setter: (url: string) => void) => void;
}

const AboutEditor: React.FC<AboutEditorProps> = ({ about, onChange, onOpenPicker }) => {
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

export default AboutEditor;
