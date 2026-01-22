import React from 'react';
import { Library, Plus, Minus } from 'lucide-react';
import { Reference } from '../../types';

interface ReferencesEditorProps {
    references: Reference[];
    onChange: (references: Reference[]) => void;
}

const ReferencesEditor: React.FC<ReferencesEditorProps> = ({ references, onChange }) => {
    const updateRef = (index: number, field: keyof Reference, value: string) => {
        const updated = [...references];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const addRef = () => {
        const newRef: Reference = {
            id: `ref-${Date.now()}`,
            name: 'Yeni Müşteri/Referans',
            location: 'Bodrum'
        };
        onChange([...references, newRef]);
    };

    const removeRef = (index: number) => {
        if (references.length <= 1) return alert('En az bir referans bulunmalıdır.');
        onChange(references.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3"><Library className="text-amber-500" />Referans Yönetimi</h2>
                <button onClick={addRef} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95">
                    <Plus size={18} /> Referans Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {references.map((ref, index) => (
                    <div key={ref.id || index} className="group relative bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all">
                        <button
                            onClick={() => removeRef(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 shadow-xl"
                        >
                            <Minus size={18} />
                        </button>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] text-amber-400 font-bold uppercase mb-2">Müşteri/Kurum Adı</label>
                                <input
                                    type="text"
                                    value={ref.name}
                                    onChange={(e) => updateRef(index, 'name', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-gray-400 font-bold uppercase mb-2">Konum (Opsiyonel)</label>
                                <input
                                    type="text"
                                    value={ref.location}
                                    onChange={(e) => updateRef(index, 'location', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReferencesEditor;
