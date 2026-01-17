import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_CONTENT, SiteContent } from './defaultContent';

const STORAGE_KEY = 'kupesteci_content';
const CONTENT_KEY = 'main';

// Get content from localStorage as initial fallback
function getInitialContent(): SiteContent {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error reading from localStorage:', error);
    }
    return DEFAULT_CONTENT;
}

// Custom hook for content management (Admin Panel)
export function useContent() {
    const [content, setContent] = useState<SiteContent>(getInitialContent);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Fetch from Supabase on mount
    const fetchContent = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('content')
                .eq('key', CONTENT_KEY)
                .single();

            if (error) throw error;
            if (data?.content && Object.keys(data.content).length > 0) {
                setContent(data.content as SiteContent);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.content));
            }
        } catch (error) {
            console.error('Error fetching from Supabase:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    // Update a specific section locally
    const updateSection = useCallback(<K extends keyof SiteContent>(
        section: K,
        data: SiteContent[K]
    ) => {
        setContent(prev => ({
            ...prev,
            [section]: data
        }));
    }, []);

    // Save all content to Supabase
    const saveContent = useCallback(async () => {
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('site_content')
                .update({ content: content, updated_at: new Date().toISOString() })
                .eq('key', CONTENT_KEY);

            if (error) throw error;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
            setLastSaved(new Date());
        } catch (error) {
            console.error('Error saving to Supabase:', error);
            alert('Kaydetme sırasında bir hata oluştu: ' + (error as Error).message);
        } finally {
            setIsSaving(false);
        }
    }, [content]);

    // Reset to default content
    const resetToDefault = useCallback(async () => {
        if (window.confirm('Veritabanındaki veriler varsayılana döndürülecek. Emin misiniz?')) {
            setContent(DEFAULT_CONTENT);
            const { error } = await supabase
                .from('site_content')
                .update({ content: DEFAULT_CONTENT, updated_at: new Date().toISOString() })
                .eq('key', CONTENT_KEY);

            if (error) {
                console.error('Error resetting Supabase:', error);
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTENT));
                setLastSaved(new Date());
            }
        }
    }, []);

    // Export content as JSON file
    const exportContent = useCallback(() => {
        const dataStr = JSON.stringify(content, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `kupesteci-content-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [content]);

    // Import content from JSON file
    const importContent = useCallback((file: File) => {
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const imported = JSON.parse(e.target?.result as string) as SiteContent;
                    setContent(imported);
                    // We don't auto-save to Supabase here, User must click "Save"
                    resolve();
                } catch (error) {
                    reject(new Error('Geçersiz JSON dosyası'));
                }
            };
            reader.onerror = () => reject(new Error('Dosya okunamadı'));
            reader.readAsText(file);
        });
    }, []);

    return {
        content,
        isSaving,
        isLoading,
        lastSaved,
        updateSection,
        saveContent,
        resetToDefault,
        exportContent,
        importContent
    };
}

// Hook for reading content only (Site Home)
export function useReadContent() {
    const [content, setContent] = useState<SiteContent>(getInitialContent);

    useEffect(() => {
        const fetchContent = async () => {
            const { data, error } = await supabase
                .from('site_content')
                .select('content')
                .eq('key', CONTENT_KEY)
                .single();

            if (!error && data?.content && Object.keys(data.content).length > 0) {
                setContent(data.content as SiteContent);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.content));
            }
        };

        fetchContent();

        // Optional: Real-time subscription for instant updates on all clients
        const subscription = supabase
            .channel('site_content_changes')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'site_content',
                filter: `key=eq.${CONTENT_KEY}`
            }, (payload) => {
                if (payload.new && (payload.new as any).content) {
                    setContent((payload.new as any).content as SiteContent);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return content;
}
