import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Loader2, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = 'Görsel' }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // Generate a unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `site-assets/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('assets')
                .getPublicUrl(filePath);

            onChange(publicUrl);
        } catch (error: any) {
            console.error('Upload error:', error);
            alert('Yükleme başarısız: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm text-gray-400">{label}</label>

            <div className="flex flex-col gap-3">
                {/* Preview & Controls */}
                <div className="relative group rounded-xl overflow-hidden bg-gray-700 aspect-video flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-amber-500/50 transition-colors">
                    {value ? (
                        <>
                            <img
                                src={value}
                                alt="Önizleme"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md text-white transition-colors"
                                    title="Değiştir"
                                >
                                    <Upload size={20} />
                                </button>
                                <button
                                    onClick={() => onChange('')}
                                    className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-full backdrop-blur-md text-white transition-colors"
                                    title="Sil"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex flex-col items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors"
                        >
                            {uploading ? (
                                <Loader2 className="animate-spin" size={32} />
                            ) : (
                                <>
                                    <ImageIcon size={32} />
                                    <span className="text-xs font-medium">Görsel Seç</span>
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Direct Link Input (Fallback) */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Veya doğrudan URL yapıştırın..."
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300 outline-none focus:border-amber-500/50 transition-colors"
                    />
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;
