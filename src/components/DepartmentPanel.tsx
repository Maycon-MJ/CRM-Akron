import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Department } from '../types';
import { Bell } from 'lucide-react';
import { useAlertStore } from '../store/alertStore';

interface DepartmentPanelProps {
  department: Department;
  onFeatureClick: (feature: any) => void;
}

export default function DepartmentPanel({ 
  department,
  onFeatureClick
}: DepartmentPanelProps) {
  const DepartmentIcon = LucideIcons[department.icon as keyof typeof LucideIcons];
  const pendingAlerts = useAlertStore((state) => state.getPendingAlertCount(department.id));

  return (
    <div className="min-h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-50 py-4 z-10">
        <div className="flex items-center">
          {DepartmentIcon && (
            <DepartmentIcon className={`w-8 h-8 ${department.color} mr-3`} />
          )}
          <h1 className="text-2xl font-bold text-gray-900">{department.name}</h1>
        </div>
        <button
          onClick={() => onFeatureClick(department.features.find(f => f.id === 'notifications'))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Bell className="w-5 h-5 mr-2" />
          Alertas
          {pendingAlerts > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {pendingAlerts}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {department.features.filter(f => f.id !== 'notifications').map((feature) => {
          const FeatureIcon = LucideIcons[feature.icon as keyof typeof LucideIcons];
          return (
            <button
              key={feature.id}
              onClick={() => onFeatureClick(feature)}
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {FeatureIcon && (
                <FeatureIcon className={`w-6 h-6 ${department.color} mr-3`} />
              )}
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}