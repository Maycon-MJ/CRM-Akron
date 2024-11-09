import React, { useState } from 'react';
import { useStore } from '../store';
import { Feature, Department } from '../types';
import { X, Send, Paperclip } from 'lucide-react';

interface FeatureFormProps {
  featureId: string;
  departmentId: string;
  onClose: () => void;
}

export default function FeatureForm({ featureId, departmentId, onClose }: FeatureFormProps) {
  const addFeatureRecord = useStore((state) => state.addFeatureRecord);
  const departments = useStore((state) => state.departments);
  const features = useStore((state) => state.getFeaturesByDepartment(departmentId));
  const feature = features.find(f => f.id === featureId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedDepartments: [] as string[],
    files: [] as File[],
    responsible: '',
    observation: ''
  });

  const handleDepartmentChange = (deptId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDepartments: prev.selectedDepartments.includes(deptId)
        ? prev.selectedDepartments.filter(id => id !== deptId)
        : [...prev.selectedDepartments, deptId]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: [...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.responsible) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const fileAttachments = formData.files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      lastModified: file.lastModified
    }));

    const record = {
      id: crypto.randomUUID(),
      featureId,
      departmentId,
      title: formData.title,
      description: formData.description,
      responsible: formData.responsible,
      observation: formData.observation,
      notifiedDepartments: formData.selectedDepartments,
      files: fileAttachments,
      createdAt: new Date(),
      status: 'pending'
    };

    addFeatureRecord(record);
    onClose();
  };

  if (!feature) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{feature.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsável *
            </label>
            <input
              type="text"
              value={formData.responsible}
              onChange={(e) => setFormData(prev => ({ ...prev, responsible: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              value={formData.observation}
              onChange={(e) => setFormData(prev => ({ ...prev, observation: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notificar Departamentos
            </label>
            <div className="grid grid-cols-2 gap-2">
              {departments
                .filter((dept: Department) => dept.id !== departmentId)
                .map((dept: Department) => (
                  <label
                    key={dept.id}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedDepartments.includes(dept.id)}
                      onChange={() => handleDepartmentChange(dept.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{dept.name}</span>
                  </label>
                ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Anexos
            </label>
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
                <Paperclip className="w-4 h-4 mr-2" />
                <span>Escolher arquivos</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {formData.files.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        files: prev.files.filter((_, i) => i !== index)
                      }))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}