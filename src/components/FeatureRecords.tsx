import React from 'react';
import { useRecordsStore } from '../store/recordsStore';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, User, Clock, AlertTriangle, Paperclip } from 'lucide-react';

interface FeatureRecordsProps {
  departmentId: string;
  featureId: string;
}

export default function FeatureRecords({ departmentId, featureId }: FeatureRecordsProps) {
  const records = useRecordsStore((state) => 
    state.getFeatureRecords(departmentId, featureId)
  );

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500">Nenhum registro encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div
          key={record.id}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              {/* Display all form fields */}
              {Object.entries(record).map(([key, value]) => {
                // Skip internal fields and complex objects
                if (['id', 'files', 'createdAt', 'status', 'notifyDepartments'].includes(key) || typeof value === 'object') {
                  return null;
                }
                return (
                  <p key={key} className="text-gray-700">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>{' '}
                    {value}
                  </p>
                );
              })}
            </div>
            {record.priority && (
              <div className={`px-3 py-1 rounded-full text-sm flex items-center ${
                record.priority === 'high' 
                  ? 'bg-red-100 text-red-800'
                  : record.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {record.priority === 'high' && <AlertTriangle className="w-4 h-4 mr-1" />}
                {record.priority === 'high' ? 'Alta' : record.priority === 'medium' ? 'Média' : 'Baixa'}
              </div>
            )}
          </div>

          {/* Display files if any */}
          {record.files && record.files.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Paperclip className="w-4 h-4 mr-1" />
                <span>Anexos:</span>
              </div>
              <div className="space-y-2">
                {record.files.map((file: any) => (
                  <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <a
                      href={file.url}
                      download={file.name}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display notifications if any */}
          {record.notifyDepartments && record.notifyDepartments.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-medium">Departamentos Notificados:</span>{' '}
              {record.notifyDepartments.join(', ')}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t mt-4">
            <div className="flex items-center space-x-4">
              {record.responsible && (
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {record.responsible}
                </span>
              )}
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatDistanceToNow(new Date(record.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </span>
            </div>
            {record.status && (
              <span className={`px-2 py-1 rounded-full ${
                record.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : record.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {record.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}