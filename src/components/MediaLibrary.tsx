import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { processImage } from '../utils/imageProcessor';
import { Upload, X, Copy, Trash2, Loader2, Image as ImageIcon, Check, AlertCircle, CheckSquare, Square, Trash, Maximize2 } from 'lucide-react';

interface MediaFile {
    name: string;
    url: string;
    size?: number;
    created_at?: string;
}

interface UploadStatus {
    current: number;
    total: number;
    status: 'idle' | 'processing' | 'uploading' | 'completed' | 'error';
    errors: string[];
}

const STORAGE_BUCKET = 'assets';
const MEDIA_PATH = 'library';

const MediaLibrary: React.FC = () => {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        current: 0,
        total: 0,
        status: 'idle',
        errors: []
    });
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    // Bulk Management State
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
                        size: file.metadata?.size,
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
            console.error('Error fetching media:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        const totalFiles = fileList.length;
        setUploadStatus({
            current: 0,
            total: totalFiles,
            status: 'processing',
            errors: []
        });

        for (let i = 0; i < totalFiles; i++) {
            const file = fileList[i];

            await new Promise(r => setTimeout(r, 0));

            setUploadStatus(prev => ({
                ...prev,
                current: i + 1,
                status: 'processing'
            }));

            try {
                let uploadBlob: Blob | File = file;
                let fileName = file.name;
                let contentType = file.type;

                // Only process if it's an image
                if (file.type.startsWith('image/')) {
                    const processedBlob = await processImage(file, 0.75, 1920);
                    uploadBlob = processedBlob;
                    const timestamp = Date.now();
                    const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').split('_')[0] || 'img';
                    fileName = `${cleanName.substring(0, 20)}_${timestamp}.webp`;
                    contentType = 'image/webp';
                }

                const filePath = `${MEDIA_PATH}/${fileName}`;

                setUploadStatus(prev => ({ ...prev, status: 'uploading' }));

                const { error: uploadError } = await supabase.storage
                    .from(STORAGE_BUCKET)
                    .upload(filePath, uploadBlob, {
                        contentType: contentType,
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) throw uploadError;

                // Add a small delay between uploads to prevent rate limiting
                await new Promise(resolve => setTimeout(resolve, totalFiles > 10 ? 200 : 50));

            } catch (error) {
                console.error(`Upload failed for ${file.name}:`, error);
                setUploadStatus(prev => ({
                    ...prev,
                    errors: [...prev.errors, `${file.name}: ${(error as Error).message}`]
                }));
            }
        }

        setUploadStatus(prev => ({ ...prev, status: 'completed' }));
        await fetchFiles();

        setTimeout(() => {
            setUploadStatus(prev => ({ ...prev, status: 'idle' }));
        }, 5000);
    };

    const handleDelete = async (fileName: string) => {
        if (!confirm('Bu görseli silmek istediğinizden emin misiniz?')) return;

        try {
            const { error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .remove([`${MEDIA_PATH}/${fileName}`]);

            if (error) throw error;

            setFiles(prev => prev.filter(f => f.name !== fileName));
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Silme işlemi başarısız oldu.');
        }
    };

    // Bulk Management Functions
    const toggleFileSelection = (fileName: string) => {
        setSelectedFiles(prev =>
            prev.includes(fileName)
                ? prev.filter(name => name !== fileName)
                : [...prev, fileName]
        );
    };

    const selectAll = () => {
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(files.map(f => f.name));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedFiles.length === 0) return;
        if (!confirm(`${selectedFiles.length} adet görseli silmek istediğinizden emin misiniz?`)) return;

        setIsDeleting(true);
        try {
            const pathsToDelete = selectedFiles.map(name => `${MEDIA_PATH}/${name}`);
            const { error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .remove(pathsToDelete);

            if (error) throw error;

            setFiles(prev => prev.filter(f => !selectedFiles.includes(f.name)));
            setSelectedFiles([]);
            setIsSelectMode(false);
            alert('Seçilen görseller başarıyla silindi.');
        } catch (error) {
            console.error('Bulk delete failed:', error);
            alert('Bazı görseller silinemedi.');
        } finally {
            setIsDeleting(false);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ImageIcon className="text-amber-500" />
                        Medya Kütüphanesi
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {isSelectMode ? `${selectedFiles.length} görsel seçildi` : 'Medya dosyalarınızı toplu olarak yönetin ve yükleyin.'}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {uploadStatus.status !== 'idle' && (
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                {uploadStatus.status === 'processing' && <span className="text-blue-400 animate-pulse">İşleniyor...</span>}
                                {uploadStatus.status === 'uploading' && <span className="text-amber-400 animate-pulse">Yükleniyor...</span>}
                                {uploadStatus.status === 'completed' && <span className="text-green-400">Yükleme Bitti</span>}
                                {uploadStatus.status === 'error' && <span className="text-red-400">Hata!</span>}
                                <span className="text-gray-400">({uploadStatus.current} / {uploadStatus.total})</span>
                            </div>
                            <div className="w-32 h-2 bg-gray-700 rounded-full mt-1 overflow-hidden border border-gray-600">
                                <div
                                    className={`h-full transition-all duration-300 ${uploadStatus.status === 'completed' ? 'bg-green-500' :
                                        uploadStatus.status === 'processing' ? 'bg-blue-500' : 'bg-amber-500'
                                        }`}
                                    style={{ width: `${(uploadStatus.current / uploadStatus.total) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Bulk Actions UI */}
                    {isSelectMode ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={selectAll}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
                            >
                                {selectedFiles.length === files.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                disabled={selectedFiles.length === 0 || isDeleting}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash size={16} />}
                                Seçilen görselleri Sil
                            </button>
                            <button
                                onClick={() => {
                                    setIsSelectMode(false);
                                    setSelectedFiles([]);
                                }}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            {files.length > 0 && (
                                <button
                                    onClick={() => setIsSelectMode(true)}
                                    className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-all font-medium text-sm"
                                >
                                    <CheckSquare size={18} />
                                    Seçim Yap
                                </button>
                            )}
                            <label className={`
                                flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-full cursor-pointer transition-all font-medium shadow-lg shadow-amber-900/20
                                ${uploadStatus.status !== 'idle' && uploadStatus.status !== 'completed' ? 'opacity-50 cursor-not-allowed' : ''}
                            `}>
                                {uploadStatus.status === 'processing' || uploadStatus.status === 'uploading' ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <Upload size={20} />
                                )}
                                {uploadStatus.status === 'processing' || uploadStatus.status === 'uploading' ? 'Lütfen Bekleyin' : 'Görsel Ekle'}
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/mp4,video/quicktime"
                                    onChange={handleUpload}
                                    className="hidden"
                                    disabled={uploadStatus.status !== 'idle' && uploadStatus.status !== 'completed'}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {uploadStatus.errors.length > 0 && (
                <div className="mx-6 mt-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex gap-3">
                    <AlertCircle className="text-red-500 shrink-0" size={20} />
                    <div>
                        <p className="text-sm font-bold text-red-100">Bazı medyalar yüklenemedi:</p>
                        <ul className="text-xs text-red-300 mt-1 list-disc list-inside space-y-0.5">
                            {uploadStatus.errors.slice(0, 5).map((err, idx) => (
                                <li key={idx} className="truncate max-w-md">{err}</li>
                            ))}
                            {uploadStatus.errors.length > 5 && <li>...ve {uploadStatus.errors.length - 5} dosya daha.</li>}
                        </ul>
                    </div>
                </div>
            )}

            <div className="p-6">
                {isLoading && files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Loader2 size={48} className="animate-spin mb-4 text-amber-600" />
                        <p>Kütüphane taranıyor...</p>
                    </div>
                ) : files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500 border-2 border-dashed border-gray-700 rounded-2xl bg-gray-900/30">
                        <ImageIcon size={64} className="mb-4 opacity-10" />
                        <p>Kütüphane Boş</p>
                        <p className="text-sm opacity-60">Sürükle bırak veya butonu kullanarak sınırsız yükleme yapabilirsiniz.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {files.map((file) => (
                            <div
                                key={file.name}
                                onClick={() => isSelectMode ? toggleFileSelection(file.name) : setPreviewUrl(file.url)}
                                className={`
                                    group relative bg-gray-900 rounded-xl border overflow-hidden transition-all duration-300
                                    ${isSelectMode ? (selectedFiles.includes(file.name) ? 'border-amber-500 ring-2 ring-amber-500/50 scale-[0.98]' : 'border-gray-700 opacity-60 hover:opacity-100') : 'border-gray-700 hover:border-amber-600/50 hover:shadow-xl hover:shadow-black/50'}
                                    cursor-pointer
                                `}
                            >
                                <div className="aspect-square bg-gray-950 overflow-hidden flex items-center justify-center">
                                    {file.name.toLowerCase().endsWith('.mp4') || file.name.toLowerCase().endsWith('.mov') ? (
                                        <video
                                            src={file.url}
                                            className="w-full h-full object-cover"
                                            muted
                                            loop
                                            autoPlay
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700 ease-out"
                                        />
                                    )}
                                </div>

                                {/* Selection Checkbox */}
                                {isSelectMode && (
                                    <div className="absolute top-2 left-2 z-10">
                                        {selectedFiles.includes(file.name) ? (
                                            <div className="bg-amber-500 text-white rounded-lg p-1 shadow-lg">
                                                <CheckSquare size={18} />
                                            </div>
                                        ) : (
                                            <div className="bg-black/50 text-white/50 border border-white/20 rounded-lg p-1 backdrop-blur-sm">
                                                <Square size={18} />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!isSelectMode && (
                                    <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewUrl(file.url);
                                            }}
                                            className="w-3/4 py-2 bg-white text-gray-900 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-bold"
                                        >
                                            <Maximize2 size={14} />
                                            Önizle
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(file.url);
                                            }}
                                            className="w-3/4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-semibold"
                                        >
                                            {copiedUrl === file.url ? <Check size={14} /> : <Copy size={14} />}
                                            {copiedUrl === file.url ? 'Kopyalandı' : 'URL Kopyala'}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(file.name);
                                            }}
                                            className="w-3/4 py-2 bg-transparent hover:bg-red-600/20 text-red-500 rounded-lg transition-all flex items-center justify-center gap-2 text-xs"
                                        >
                                            <Trash2 size={14} />
                                            Görseli Sil
                                        </button>
                                    </div>
                                )}
                                <div className="p-2 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
                                    <p className="text-[10px] text-gray-400 truncate font-mono text-center" title={file.name}>
                                        {file.name.split('_')[0]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Preview Modal */}
            {previewUrl && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300 backdrop-blur-md"
                    onClick={() => setPreviewUrl(null)}
                >
                    <button
                        className="absolute top-8 right-8 text-white hover:text-amber-500 transition-colors z-[110] bg-black/40 p-2 rounded-full"
                        onClick={() => setPreviewUrl(null)}
                    >
                        <X size={32} />
                    </button>
                    <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        {previewUrl.toLowerCase().endsWith('.mp4') || previewUrl.toLowerCase().endsWith('.mov') ? (
                            <video
                                src={previewUrl}
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                                controls
                                autoPlay
                            />
                        ) : (
                            <img
                                src={previewUrl}
                                alt="Önizleme"
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;
