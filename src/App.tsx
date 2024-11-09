import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DepartmentPanel from './components/DepartmentPanel';
import FeaturePage from './components/FeaturePage';
import { departments } from './data/departments';
import { DepartmentFeature } from './types';
import { useAlertStore } from './store/alertStore';
import { useRecordsStore } from './store/recordsStore';

function App() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(departments[0].id);
  const [selectedFeature, setSelectedFeature] = useState<DepartmentFeature | null>(null);
  const addAlert = useAlertStore((state) => state.addAlert);
  const addRecord = useRecordsStore((state) => state.addRecord);

  const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId);

  const handleFeatureClick = (feature: DepartmentFeature) => {
    setSelectedFeature(feature);
  };

  const handleFormSubmit = (data: any) => {
    // Add record
    const record = {
      id: crypto.randomUUID(),
      departmentId: selectedDepartmentId,
      featureId: selectedFeature!.id,
      data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    addRecord(record);

    // Create alert if departments are notified
    if (data.notifyDepartments?.length > 0) {
      const alert = {
        id: crypto.randomUUID(),
        title: `Novo registro em ${selectedFeature?.name}`,
        description: data.description || 'Nova atividade registrada',
        fromDepartment: selectedDepartmentId,
        toDepartments: data.notifyDepartments,
        priority: data.priority || 'medium',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      addAlert(alert);
    }
    
    setSelectedFeature(null);
  };

  if (!selectedDepartment) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        selectedDepartment={selectedDepartmentId}
        onDepartmentSelect={setSelectedDepartmentId}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto">
          <div className="h-full overflow-y-auto">
            {selectedFeature ? (
              <FeaturePage
                departmentId={selectedDepartmentId}
                feature={selectedFeature}
                onBack={() => setSelectedFeature(null)}
                onSubmit={handleFormSubmit}
              />
            ) : (
              <DepartmentPanel
                department={selectedDepartment}
                onFeatureClick={handleFeatureClick}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;