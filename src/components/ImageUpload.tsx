import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, X, Loader2, RefreshCcw, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    onBrowseLibrary?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label, onBrowseLibrary }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('assets')
                .getPublicUrl(filePath);

            onChange(publicUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Görsel yüklenirken bir hata oluştu.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className="space-y-3">
            {label && <label className="block text-sm font-semibold text-gray-300 tracking-wide uppercase text-[11px] opacity-70">{label}</label>}
            <div className="flex flex-col gap-4">
                {value ? (
                    <div className="relative group w-full overflow-hidden rounded-xl border border-gray-700 shadow-2xl bg-gray-950">
                        {value.toLowerCase().endsWith('.mp4') || value.toLowerCase().endsWith('.mov') ? (
                            <video
                                src={value}
                                className="w-full aspect-video object-cover transition-transform group-hover:scale-105 duration-700"
                                controls
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={value}
                                alt="Önizleme"
                                className="w-full aspect-video object-cover transition-transform group-hover:scale-105 duration-700"
                            />
                        )}
                        <button
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1.5 bg-red-600/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 backdrop-blur-sm z-10"
                            title="Kaldır"
                        >
                            <X size={16} />
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                            <span className="text-[10px] text-white/70 font-mono truncate">{value.split('/').pop()}</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full aspect-video bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500 gap-3 group hover:border-amber-600/50 transition-colors">
                        <div className="p-4 bg-gray-800 rounded-full group-hover:bg-amber-600/10 transition-colors">
                            <ImageIcon size={32} className="opacity-20 group-hover:opacity-100 group-hover:text-amber-500 transition-all" />
                        </div>
                        <span className="text-xs font-medium tracking-wider uppercase opacity-40">Görsel Seçilmedi</span>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                    <label className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl cursor-pointer transition-all text-sm font-bold shadow-lg shadow-amber-900/20 active:scale-95
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}>
                        {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                        {isUploading ? 'Yükleniyor...' : 'Yeni Yükle'}
                        <input type="file" accept="image/*,video/mp4,video/quicktime" onChange={handleUpload} className="hidden" disabled={isUploading} />
                    </label>

                    {onBrowseLibrary && (
                        <button
                            onClick={onBrowseLibrary}
                            disabled={isUploading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-amber-500 rounded-xl border border-gray-700 border-b-2 border-b-amber-600/50 transition-all text-sm font-bold active:scale-95 hover:shadow-xl hover:shadow-black/20"
                            title="Kütüphaneden Seç"
                        >
                            <RefreshCcw size={18} />
                            Kütüphane
                        </button>
                    )}
                </div>
                <p className="text-[10px] text-gray-500 italic text-center">Tavsiye: 1200x800px veya 3:2 formatında görseller kullanın.</p>
            </div >
        </div >
    );
};

export default ImageUpload;
