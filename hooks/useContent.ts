import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_CONTENT, SiteContent } from './defaultContent';

const STORAGE_KEY = 'kupesteci_content';

// Get content from localStorage or return default
function getStoredContent(): SiteContent {
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

// Save content to localStorage
function saveToStorage(content: SiteContent): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Custom hook for content management
export function useContent() {
    const [content, setContent] = useState<SiteContent>(getStoredContent);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Reload content from storage (useful for syncing between tabs)
    const reloadContent = useCallback(() => {
        setContent(getStoredContent());
    }, []);

    // Update a specific section
    const updateSection = useCallback(<K extends keyof SiteContent>(
        section: K,
        data: SiteContent[K]
    ) => {
        setContent(prev => ({
            ...prev,
            [section]: data
        }));
    }, []);

    // Save all content to localStorage
    const saveContent = useCallback(() => {
        setIsSaving(true);
        try {
            saveToStorage(content);
            setLastSaved(new Date());
        } finally {
            setIsSaving(false);
        }
    }, [content]);

    // Reset to default content
    const resetToDefault = useCallback(() => {
        setContent(DEFAULT_CONTENT);
        saveToStorage(DEFAULT_CONTENT);
        setLastSaved(new Date());
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
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target?.result as string) as SiteContent;
                    setContent(imported);
                    saveToStorage(imported);
                    setLastSaved(new Date());
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
        lastSaved,
        updateSection,
        saveContent,
        reloadContent,
        resetToDefault,
        exportContent,
        importContent
    };
}

// Simple hook for reading content only (for main site components)
export function useReadContent() {
    const [content, setContent] = useState<SiteContent>(getStoredContent);

    useEffect(() => {
        // Listen for storage changes (when admin saves in another tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                setContent(getStoredContent());
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return content;
}
