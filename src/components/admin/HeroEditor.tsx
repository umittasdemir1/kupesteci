import React from 'react';
import { Images, Plus, Minus } from 'lucide-react';
import ImageUpload from '../ImageUpload';
import { Slide } from '../../types';

interface HeroEditorProps {
    slides: Slide[];
    onChange: (slides: Slide[]) => void;
    onOpenPicker: (setter: (url: string) => void) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ slides, onChange, onOpenPicker }) => {
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

export default HeroEditor;
