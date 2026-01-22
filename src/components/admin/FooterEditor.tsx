import React from 'react';
import { Contact } from 'lucide-react';
import { FooterContent } from '../../types';

interface FooterEditorProps {
    footer: FooterContent;
    onChange: (footer: FooterContent) => void;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ footer, onChange }) => {
    const updateField = (field: keyof FooterContent, value: string) => { onChange({ ...footer, [field]: value }); };
    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3"><Contact className="text-amber-500" />İletişim Bilgileri</h2>
            <div className="max-w-2xl">
                <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 space-y-4 md:space-y-6 shadow-xl">
                    <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">Footer Sloganı</label><textarea value={footer.slogan} onChange={(e) => updateField('slogan', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white resize-none outline-none focus:border-amber-500 font-serif" rows={2} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">Telefon</label><input type="text" value={footer.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                        <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">E-posta</label><input type="email" value={footer.email} onChange={(e) => updateField('email', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                    </div>
                    <div><label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">Adres</label><textarea value={footer.address} onChange={(e) => updateField('address', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white resize-none outline-none focus:border-amber-500" rows={2} /></div>
                </div>
            </div>
        </div>
    );
};

export default FooterEditor;
