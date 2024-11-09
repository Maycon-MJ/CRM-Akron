import React, { useState } from 'react';
import { useAlertStore } from '../store/alertStore';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X, MessageCircle, Send, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface NotificationsPanelProps {
  departmentId: string;
  onClose: () => void;
}

export default function NotificationsPanel({ departmentId, onClose }: NotificationsPanelProps) {
  const alerts = useAlertStore((state) => state.getAlertsByDepartment(departmentId));
  const updateAlert = useAlertStore((state) => state.updateAlert);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [response, setResponse] = useState('');

  const handleSendResponse = (alertId: string) => {
    if (!response.trim()) return;

    updateAlert(alertId, {
      status: 'in_progress',
      responses: [{
        id: crypto.randomUUID(),
        fromDepartment: departmentId,
        message: response,
        timestamp: new Date()
      }]
    });

    setResponse('');
    setSelectedAlert(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Notificações</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {alerts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhuma notificação encontrada
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    {getStatusIcon(alert.status)}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{alert.description}</p>

                  {alert.responses && alert.responses.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {alert.responses.map((resp) => (
                        <div key={resp.id} className="bg-gray-50 rounded p-3">
                          <p className="text-gray-700">{resp.message}</p>
                          <div className="text-sm text-gray-500 mt-1">
                            De: {resp.fromDepartment} • {formatDistanceToNow(new Date(resp.timestamp), { addSuffix: true, locale: ptBR })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                      <p>De: {alert.fromDepartment}</p>
                      <p>Para: {alert.toDepartments.join(', ')}</p>
                    </div>
                    <span>{formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true, locale: ptBR })}</span>
                  </div>

                  {alert.toDepartments.includes(departmentId) && alert.status !== 'completed' && (
                    <div className="mt-3">
                      {selectedAlert === alert.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Digite sua resposta..."
                            className="w-full p-2 border rounded-lg resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setSelectedAlert(null)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleSendResponse(alert.id)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                            >
                              <Send className="w-4 h-4 mr-1" />
                              Enviar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedAlert(alert.id)}
                          className="flex items-center text-blue-600 hover:text-blue-700"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Responder
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}