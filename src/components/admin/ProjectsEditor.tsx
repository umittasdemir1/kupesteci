import React from 'react';
import { LayoutGrid, Plus, Minus } from 'lucide-react';
import ImageUpload from '../ImageUpload';
import { Project } from '../../types';

interface ProjectsEditorProps {
    projects: Project[];
    onChange: (projects: Project[]) => void;
    onOpenPicker: (setter: (url: string) => void) => void;
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onChange, onOpenPicker }) => {
    const updateProject = (index: number, field: keyof Project, value: string | number) => { const updated = [...projects]; updated[index] = { ...updated[index], [field]: value }; onChange(updated); };
    const addProject = () => {
        const newProject: Project = {
            id: Date.now(),
            title: 'Yeni Proje',
            category: 'Kategori',
            image: ''
        };
        onChange([...projects, newProject]);
    };
    const removeProject = (index: number) => {
        if (projects.length <= 1) return alert('En az bir proje bulunmalıdır.');
        onChange(projects.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3"><LayoutGrid className="text-amber-500" />Galeri (Projeler)</h2>
                <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95">
                    <Plus size={18} /> Proje Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects.map((project, index) => (
                    <div key={project.id} className="group relative bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 hover:border-amber-500/50 transition-all">
                        <button
                            onClick={() => removeProject(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 z-10"
                            title="Projeyi Sil"
                        >
                            <Minus size={20} />
                        </button>
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-amber-400">Uygulama {index + 1}</h3>
                        <div className="mb-3 md:mb-4"><ImageUpload label="Görsel" value={project.image} onChange={(url) => updateProject(index, 'image', url)} onBrowseLibrary={() => onOpenPicker((url) => updateProject(index, 'image', url))} /></div>
                        <div className="mb-3 md:mb-4"><label className="block text-xs md:text-sm text-gray-400 mb-2">Proje Adı</label><input type="text" value={project.title} onChange={(e) => updateProject(index, 'title', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                        <div><label className="block text-xs md:text-sm text-gray-400 mb-2">Kategori</label><input type="text" value={project.category} onChange={(e) => updateProject(index, 'category', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 md:px-4 py-2 text-white outline-none focus:border-amber-500" /></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsEditor;
