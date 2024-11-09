import React from 'react';
import { useRecordsStore } from '../store/recordsStore';
import { BarChart, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface DepartmentMetricsProps {
  departmentId: string;
}

export default function DepartmentMetrics({ departmentId }: DepartmentMetricsProps) {
  const store = useRecordsStore();
  const records = store.departmentRecords[departmentId] || [];
  
  const metrics = {
    total: records.length,
    pending: records.filter(r => r.data.status === 'pending').length,
    completed: records.filter(r => r.data.status === 'completed').length,
    inProgress: records.filter(r => r.data.status === 'in_progress').length,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart className="w-5 h-5 mr-2" />
        Métricas do Departamento
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <BarChart className="w-5 h-5 text-blue-600 mr-2" />
            <p className="text-sm text-gray-600">Total de Registros</p>
          </div>
          <p className="text-2xl font-semibold">{metrics.total}</p>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-sm text-gray-600">Pendentes</p>
          </div>
          <p className="text-2xl font-semibold text-yellow-600">
            {metrics.pending}
          </p>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <p className="text-sm text-gray-600">Em Progresso</p>
          </div>
          <p className="text-2xl font-semibold text-blue-600">
            {metrics.inProgress}
          </p>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-sm text-gray-600">Concluídos</p>
          </div>
          <p className="text-2xl font-semibold text-green-600">
            {metrics.completed}
          </p>
        </div>
      </div>
    </div>
  );
}