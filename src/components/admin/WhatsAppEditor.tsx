import React from 'react';
import { MessageCircle, Smartphone, PictureInPicture, ToggleLeft, ToggleRight, CloudUpload } from 'lucide-react';
import ImageUpload from '../ImageUpload';
import { WhatsAppContent } from '../../types';

interface WhatsAppEditorProps {
    settings: WhatsAppContent;
    onChange: (settings: WhatsAppContent) => void;
    onOpenPicker: (setter: (url: string) => void) => void;
}

const WhatsAppEditor: React.FC<WhatsAppEditorProps> = ({ settings, onChange, onOpenPicker }) => {
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

export default WhatsAppEditor;
