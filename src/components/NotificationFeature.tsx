import React from 'react';
import NotificationMetrics from './NotificationMetrics';
import NotificationList from './NotificationList';
import FeatureRecords from './FeatureRecords';

interface NotificationFeatureProps {
  departmentId: string;
}

export default function NotificationFeature({ departmentId }: NotificationFeatureProps) {
  return (
    <div className="space-y-6 min-h-full overflow-y-auto">
      <NotificationMetrics departmentId={departmentId} />
      <NotificationList departmentId={departmentId} />
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Respostas</h3>
        <FeatureRecords departmentId={departmentId} featureId="notifications" />
      </div>
    </div>
  );
}