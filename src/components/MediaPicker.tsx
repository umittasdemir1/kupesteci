import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { X, Search, Image as ImageIcon, Loader2, Check, ExternalLink } from 'lucide-react';

interface MediaFile {
    name: string;
    url: string;
    created_at?: string;
}

interface MediaPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

const STORAGE_BUCKET = 'assets';
const MEDIA_PATH = 'library';

const MediaPicker: React.FC<MediaPickerProps> = ({ isOpen, onClose, onSelect }) => {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const fetchFiles = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .list(MEDIA_PATH, {
                    limit: 5000,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' }
                });

            if (error) throw error;

            const fileUrls = await Promise.all(
                (data || []).filter(f => f.name !== '.emptyKeep').map(async (file) => {
                    const { data: { publicUrl } } = supabase.storage
                        .from(STORAGE_BUCKET)
                        .getPublicUrl(`${MEDIA_PATH}/${file.name}`);

                    return {
                        name: file.name,
                        url: publicUrl,
                        created_at: file.created_at
                    };
                })
            );

            // Sort by created_at desc
            const sortedFiles = fileUrls.sort((a, b) => {
                if (!a.created_at || !b.created_at) return 0;
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });

            setFiles(sortedFiles);
        } catch (error) {
            console.error('Error fetching media for picker:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchFiles();
        }
    }, [isOpen, fetchFiles]);

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-700 w-full max-w-5xl h-[80vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-600/20 rounded-lg text-amber-500">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Medya Seçici</h3>
                            <p className="text-xs text-gray-400">Kütüphaneden bir görsel seçin</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search & Actions */}
                <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Görsel ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Loader2 size={40} className="animate-spin text-amber-600 mb-3" />
                            <p>Kütüphane yükleniyor...</p>
                        </div>
                    ) : filteredFiles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
                            <ImageIcon size={48} className="opacity-10 mb-2" />
                            <p>Görsel bulunamadı</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.name}
                                    className="group relative aspect-square bg-gray-950 rounded-xl border border-gray-800 overflow-hidden cursor-pointer hover:border-amber-500 transition-all"
                                    onClick={() => onSelect(file.url)}
                                >
                                    {file.name.toLowerCase().endsWith('.mp4') || file.name.toLowerCase().endsWith('.mov') ? (
                                        <video
                                            src={file.url}
                                            className="w-full h-full object-cover group-hover:scale-110 duration-500 transition-transform"
                                            muted
                                            loop
                                            autoPlay
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="w-full h-full object-cover group-hover:scale-110 duration-500 transition-transform"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-2 bg-amber-600 text-white rounded-full shadow-lg">
                                                <Check size={20} />
                                            </div>
                                            <span className="text-[10px] text-white font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                                                Seçmek için tıkla
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewImage(file.url);
                                        }}
                                        className="absolute bottom-2 right-2 p-1.5 bg-gray-900/80 text-gray-400 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                                        title="Büyüt"
                                    >
                                        <ExternalLink size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Tips */}
                <div className="p-3 bg-gray-950/50 border-t border-gray-800 text-[10px] text-gray-500 text-center">
                    İpucu: Fotoğraflara tıklayarak seçebilir veya büyüteç ikonu ile önizleme yapabilirsiniz.
                </div>
            </div>

            {/* Preview Lightbox */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setPreviewImage(null)}
                >
                    <button className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                        <X size={32} />
                    </button>
                    {previewImage.toLowerCase().endsWith('.mp4') || previewImage.toLowerCase().endsWith('.mov') ? (
                        <video
                            src={previewImage}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            controls
                            autoPlay
                        />
                    ) : (
                        <img
                            src={previewImage}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            alt="Önizleme"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default MediaPicker;
