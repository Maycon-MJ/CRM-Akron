import React from 'react';
import { useRecordsStore } from '../store/recordsStore';
import { BarChart2, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface FeatureMetricsProps {
  departmentId: string;
  featureId: string;
}

export default function FeatureMetrics({ departmentId, featureId }: FeatureMetricsProps) {
  const metrics = useRecordsStore((state) => 
    state.getFeatureMetrics(departmentId, featureId)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart2 className="w-5 h-5 mr-2" />
        Métricas
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total de Registros</p>
          <p className="text-2xl font-semibold text-gray-900">{metrics.total}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Última Semana</p>
          <p className="text-2xl font-semibold text-blue-600">{metrics.lastWeek}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Último Mês</p>
          <p className="text-2xl font-semibold text-green-600">{metrics.lastMonth}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Alta Prioridade</p>
          <p className="text-2xl font-semibold text-red-600">{metrics.priority.high}</p>
        </div>
      </div>

      <div className="flex space-x-6 text-sm">
        <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
          <span className="text-red-700">Alta: {metrics.priority.high}</span>
        </div>
        <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
          <Clock className="w-4 h-4 text-yellow-500 mr-2" />
          <span className="text-yellow-700">Média: {metrics.priority.medium}</span>
        </div>
        <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
          <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
          <span className="text-blue-700">Baixa: {metrics.priority.low}</span>
        </div>
      </div>
    </div>
  );
}