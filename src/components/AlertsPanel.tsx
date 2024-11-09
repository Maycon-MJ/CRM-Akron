import React, { useState } from 'react';
import { Alert, AlertResponse, FileAttachment } from '../types';
import { X, AlertCircle, Clock, CheckCircle, MessageCircle, Paperclip, Send, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAlertStore } from '../store/alertStore';
import FilePreview from './FilePreview';

interface AlertsPanelProps {
  departmentId: string;
  onClose: () => void;
}

export default function AlertsPanel({ departmentId, onClose }: AlertsPanelProps) {
  const alerts = useAlertStore((state) => state.getAlertsByDepartment(departmentId));
  const updateAlert = useAlertStore((state) => state.updateAlert);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [responseData, setResponseData] = useState({
    message: '',
    observation: '',
    responsible: '',
    files: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResponseData(prev => ({
        ...prev,
        files: [...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmitResponse = (alertId: string) => {
    if (!responseData.message || !responseData.responsible) return;

    const fileAttachments: FileAttachment[] = responseData.files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      lastModified: file.lastModified
    }));

    const response: AlertResponse = {
      id: crypto.randomUUID(),
      alertId,
      fromDepartment: departmentId,
      message: responseData.message,
      observation: responseData.observation,
      responsible: responseData.responsible,
      files: fileAttachments,
      createdAt: new Date()
    };

    updateAlert(alertId, {
      responses: [response],
      status: 'in_progress'
    });

    setResponseData({
      message: '',
      observation: '',
      responsible: '',
      files: []
    });
    setSelectedAlert(null);
  };

  const handleAlertClick = (alert: Alert) => {
    if (alert.fromDepartment === departmentId) {
      updateAlert(alert.id, {
        status: alert.status === 'in_progress' ? 'completed' : 'in_progress',
        updatedAt: new Date()
      });
    } else {
      setSelectedAlert(alert);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Alertas</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center py-8">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Nenhuma notificação encontrada.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Alertas</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white border rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  {getStatusIcon(alert.status)}
                </div>

                <p className="text-gray-700 mb-4">{alert.description}</p>

                {alert.responses && alert.responses.length > 0 && (
                  <div className="mb-4 space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Respostas
                    </h4>
                    {alert.responses.map((response) => (
                      <div
                        key={response.id}
                        className="bg-gray-50 rounded p-3"
                      >
                        <p className="text-gray-700">{response.message}</p>
                        {response.observation && (
                          <p className="text-gray-600 mt-2">
                            <span className="font-medium">Observação:</span> {response.observation}
                          </p>
                        )}
                        {response.files && response.files.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {response.files.map((file) => (
                              <FilePreview key={file.id} file={file} />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                          <span>Responsável: {response.responsible}</span>
                          <span>
                            {formatDistanceToNow(new Date(response.createdAt), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  <div>
                    <p>De: {alert.fromDepartment}</p>
                    <p>Para: {alert.toDepartments.join(', ')}</p>
                  </div>
                  <span>
                    {formatDistanceToNow(new Date(alert.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>

                {alert.status !== 'completed' && (
                  <div className="mt-4">
                    {alert.fromDepartment === departmentId ? (
                      <button
                        onClick={() => handleAlertClick(alert)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        {alert.status === 'in_progress' ? 'Concluir' : 'Marcar Em Andamento'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAlertClick(alert)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Responder
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Responder Notificação</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  value={responseData.message}
                  onChange={(e) => setResponseData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações (opcional)
                </label>
                <textarea
                  value={responseData.observation}
                  onChange={(e) => setResponseData(prev => ({ ...prev, observation: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável
                </label>
                <input
                  type="text"
                  value={responseData.responsible}
                  onChange={(e) => setResponseData(prev => ({ ...prev, responsible: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
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
              </div>

              {responseData.files.length > 0 && (
                <div className="space-y-2">
                  {responseData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <button
                        onClick={() => setResponseData(prev => ({
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

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSubmitResponse(selectedAlert.id)}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Resposta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}