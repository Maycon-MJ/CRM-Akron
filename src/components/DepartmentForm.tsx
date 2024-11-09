import React, { useState } from 'react';
import { DepartmentFeature } from '../types';
import { X, Send, Paperclip } from 'lucide-react';
import { departments } from '../data/departments';
import { useRecordsStore } from '../store/recordsStore';
import { useAlertStore } from '../store/alertStore';

interface DepartmentFormProps {
  departmentId: string;
  feature: DepartmentFeature;
  onClose: () => void;
}

export default function DepartmentForm({ 
  departmentId,
  feature, 
  onClose 
}: DepartmentFormProps) {
  const addRecord = useRecordsStore((state) => state.addRecord);
  const addAlert = useAlertStore((state) => state.addAlert);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fileAttachments = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      lastModified: file.lastModified
    }));

    const timestamp = new Date().toISOString();

    // Create record with all form data
    const record = {
      id: crypto.randomUUID(),
      ...formData,
      notifyDepartments: selectedDepartments,
      files: fileAttachments,
      createdAt: timestamp,
      status: 'pending',
      priority: formData.priority || 'medium',
      responsible: formData.responsible || ''
    };

    addRecord(departmentId, feature.id, record);

    // Create alert if departments are selected
    if (selectedDepartments.length > 0) {
      const alert = {
        id: crypto.randomUUID(),
        title: `Novo registro em ${feature.name}`,
        description: formData.description || 'Nova atividade registrada',
        type: 'info',
        fromDepartment: departmentId,
        toDepartments: selectedDepartments,
        priority: formData.priority || 'medium',
        status: 'pending',
        createdAt: timestamp,
        updatedAt: timestamp,
        files: fileAttachments
      };

      addAlert(alert);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{feature.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Priority Field - Always show this first */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade *
              </label>
              <select
                id="priority"
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.priority || 'medium'}
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            {/* Responsible Field - Always show this second */}
            <div>
              <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-1">
                Responsável *
              </label>
              <input
                type="text"
                id="responsible"
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.responsible || ''}
                onChange={(e) => handleInputChange('responsible', e.target.value)}
              />
            </div>

            {/* Dynamic Fields from Feature */}
            {feature.formFields?.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'text' && (
                  <input
                    type="text"
                    id={field.id}
                    required={field.required}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}
                {field.type === 'number' && (
                  <input
                    type="number"
                    id={field.id}
                    required={field.required}
                    min="0"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value))}
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    id={field.id}
                    required={field.required}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}
                {field.type === 'select' && field.options && (
                  <select
                    id={field.id}
                    required={field.required}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === 'date' && (
                  <input
                    type="date"
                    id={field.id}
                    required={field.required}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}

            {/* Description Field - Always show this before attachments */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição *
              </label>
              <textarea
                id="description"
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            {/* Attachments Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  />
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notify Departments Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notificar Departamentos
              </label>
              <div className="grid grid-cols-2 gap-4">
                {departments
                  .filter(dept => dept.id !== departmentId)
                  .map((dept) => (
                    <label key={dept.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDepartments(prev => [...prev, dept.id]);
                          } else {
                            setSelectedDepartments(prev => prev.filter(id => id !== dept.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{dept.name}</span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-white pt-6 mt-6 flex justify-end space-x-3">
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}