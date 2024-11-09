import React from 'react';
import { useAlertStore } from '../store/alertStore';
import { Bell, Clock, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';

interface NotificationMetricsProps {
  departmentId: string;
}

export default function NotificationMetrics({ departmentId }: NotificationMetricsProps) {
  const alerts = useAlertStore((state) => state.getAlertsByDepartment(departmentId));
  
  const metrics = {
    total: alerts.length,
    sent: alerts.filter(a => a.fromDepartment === departmentId).length,
    received: alerts.filter(a => a.toDepartments.includes(departmentId)).length,
    pending: alerts.filter(a => a.status === 'pending' && a.toDepartments.includes(departmentId)).length,
    inProgress: alerts.filter(a => a.status === 'in_progress').length,
    completed: alerts.filter(a => a.status === 'completed').length,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Notificações</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <Bell className="w-5 h-5 text-blue-600 mr-2" />
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <p className="text-2xl font-semibold">{metrics.total}</p>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <MessageCircle className="w-5 h-5 text-indigo-600 mr-2" />
            <p className="text-sm text-gray-600">Enviadas</p>
          </div>
          <p className="text-2xl font-semibold text-indigo-600">{metrics.sent}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <MessageCircle className="w-5 h-5 text-purple-600 mr-2" />
            <p className="text-sm text-gray-600">Recebidas</p>
          </div>
          <p className="text-2xl font-semibold text-purple-600">{metrics.received}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-sm text-gray-600">Pendentes</p>
          </div>
          <p className="text-2xl font-semibold text-red-600">{metrics.pending}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-sm text-gray-600">Em Progresso</p>
          </div>
          <p className="text-2xl font-semibold text-yellow-600">{metrics.inProgress}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-sm text-gray-600">Concluídas</p>
          </div>
          <p className="text-2xl font-semibold text-green-600">{metrics.completed}</p>
        </div>
      </div>
    </div>
  );
}