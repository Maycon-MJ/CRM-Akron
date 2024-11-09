import React, { useState } from 'react';
import { useAlertStore } from '../store/alertStore';
import { useRecordsStore } from '../store/recordsStore';
import { MessageCircle, Send, AlertCircle, Clock, CheckCircle, Paperclip, X, Info, AlertTriangle, HelpCircle } from 'lucide-react';
import { Alert, FileAttachment } from '../types';
import { formatRelativeDate } from '../utils/dateUtils';

interface NotificationListProps {
  departmentId: string;
}

export default function NotificationList({ departmentId }: NotificationListProps) {
  const alerts = useAlertStore((state) => state.getAlertsByDepartment(departmentId));
  const updateAlert = useAlertStore((state) => state.updateAlert);
  const addRecord = useRecordsStore((state) => state.addRecord);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [responseData, setResponseData] = useState({
    message: '',
    observation: '',
    responsible: '',
    files: [] as File[],
  });

  const handleStatusChange = (alertId: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
    updateAlert(alertId, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResponseData(prev => ({
        ...prev,
        files: [...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSendResponse = (alertId: string) => {
    if (!responseData.message || !responseData.responsible) return;

    const fileAttachments: FileAttachment[] = responseData.files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      lastModified: file.lastModified
    }));

    const now = new Date().toISOString();

    const response = {
      id: crypto.randomUUID(),
      alertId,
      fromDepartment: departmentId,
      message: responseData.message,
      observation: responseData.observation,
      responsible: responseData.responsible,
      files: fileAttachments,
      createdAt: now
    };

    updateAlert(alertId, {
      responses: [response]
    });

    addRecord(departmentId, 'notifications', {
      id: crypto.randomUUID(),
      alertId,
      message: responseData.message,
      observation: responseData.observation,
      responsible: responseData.responsible,
      files: fileAttachments,
      createdAt: now,
      priority: alerts.find(a => a.id === alertId)?.priority || 'medium'
    });

    setResponseData({
      message: '',
      observation: '',
      responsible: '',
      files: []
    });
    setSelectedAlert(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'request':
        return <HelpCircle className="w-5 h-5 text-purple-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'info':
        return 'Informativo';
      case 'warning':
        return 'Aviso';
      case 'urgent':
        return 'Urgente';
      case 'request':
        return 'Solicitação';
      default:
        return 'Informativo';
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em Andamento';
      default:
        return 'Pendente';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma notificação encontrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {getTypeIcon(alert.type)}
              <div>
                <h3 className="font-medium text-gray-900">{alert.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <span>{getTypeLabel(alert.type)}</span>
                  <span>•</span>
                  <span>De: {alert.fromDepartment}</span>
                  <span>•</span>
                  <span>{formatRelativeDate(alert.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                alert.priority === 'high' 
                  ? 'bg-red-100 text-red-800'
                  : alert.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {alert.priority === 'high' ? 'Alta' : alert.priority === 'medium' ? 'Média' : 'Baixa'}
              </span>
              <div className="flex items-center space-x-1">
                {getStatusIcon(alert.status)}
                <span className="text-sm text-gray-600">{getStatusLabel(alert.status)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{alert.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              Para: {alert.toDepartments.join(', ')}
            </div>
          </div>

          {/* Status Control Buttons (Only for sender) */}
          {alert.fromDepartment === departmentId && alert.status !== 'completed' && (
            <div className="mb-4 flex space-x-2">
              <button
                onClick={() => handleStatusChange(alert.id, 'pending')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  alert.status === 'pending'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pendente
              </button>
              <button
                onClick={() => handleStatusChange(alert.id, 'in_progress')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  alert.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Em Andamento
              </button>
              <button
                onClick={() => handleStatusChange(alert.id, 'completed')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  alert.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Concluído
              </button>
            </div>
          )}

          {/* Responses Thread */}
          {alert.responses && alert.responses.length > 0 && (
            <div className="space-y-4 mb-4">
              <h4 className="font-medium text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Respostas
              </h4>
              <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                {alert.responses.map((response) => (
                  <div
                    key={response.id}
                    className="bg-white rounded-lg border border-gray-100 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{response.fromDepartment}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{formatRelativeDate(response.createdAt)}</span>
                      </div>
                      <span className="text-sm text-gray-500">Responsável: {response.responsible}</span>
                    </div>
                    
                    <p className="text-gray-700">{response.message}</p>
                    
                    {response.observation && (
                      <p className="mt-2 text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-medium">Observação:</span> {response.observation}
                      </p>
                    )}

                    {response.files && response.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-sm text-gray-600 flex items-center">
                          <Paperclip className="w-4 h-4 mr-1" />
                          Anexos:
                        </div>
                        {response.files.map((file) => (
                          <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <a
                              href={file.url}
                              download={file.name}
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                            >
                              Download
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Response Form for Both Sender and Recipients */}
          {(alert.toDepartments.includes(departmentId) || alert.fromDepartment === departmentId) && 
           alert.status !== 'completed' && (
            <div className="mt-4">
              {selectedAlert === alert.id ? (
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
                      Observação
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
                          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
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

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedAlert(null)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleSendResponse(alert.id)}
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedAlert(alert.id)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Responder
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}