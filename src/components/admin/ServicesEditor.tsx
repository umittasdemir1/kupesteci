import React from 'react';
import { BriefcaseBusiness, Plus, Trash2, Type, Images, X } from 'lucide-react';
import ImageUpload from '../ImageUpload';
import { Service } from '../../types';

interface ServicesEditorProps {
    services: Service[];
    onChange: (services: Service[]) => void;
    onOpenPicker: (setter: (url: string) => void) => void;
}

const ServicesEditor: React.FC<ServicesEditorProps> = ({ services, onChange, onOpenPicker }) => {
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

export default ServicesEditor;
