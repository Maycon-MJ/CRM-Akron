import React, { useState } from 'react';
import { DepartmentFeature } from '../types';
import { ArrowLeft, Plus } from 'lucide-react';
import NotificationFeature from './NotificationFeature';
import FeatureMetrics from './FeatureMetrics';
import FeatureRecords from './FeatureRecords';
import DepartmentForm from './DepartmentForm';

interface FeaturePageProps {
  departmentId: string;
  feature: DepartmentFeature;
  onBack: () => void;
}

export default function FeaturePage({
  departmentId,
  feature,
  onBack
}: FeaturePageProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-full overflow-y-auto">
      <div className="sticky top-0 bg-gray-50 z-10">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{feature.name}</h2>
          </div>
          {feature.id !== 'notifications' && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Registro
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {feature.id === 'notifications' ? (
          <NotificationFeature departmentId={departmentId} />
        ) : (
          <div className="space-y-6">
            <FeatureMetrics departmentId={departmentId} featureId={feature.id} />
            <FeatureRecords departmentId={departmentId} featureId={feature.id} />
          </div>
        )}
      </div>

      {showForm && (
        <DepartmentForm
          departmentId={departmentId}
          feature={feature}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}