import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Alert, AlertResponse } from '../types';

interface StoreState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  updateAlert: (alertId: string, update: Partial<Alert>) => void;
  getAlertsByDepartment: (departmentId: string) => Alert[];
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      alerts: [],

      addAlert: (alert) => {
        set((state) => ({
          alerts: [...state.alerts, {
            ...alert,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: alert.status || 'pending',
            responses: alert.responses || []
          }],
        }));
      },

      updateAlert: (alertId, update) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === alertId 
              ? { 
                  ...alert, 
                  ...update, 
                  updatedAt: new Date(),
                  responses: [...(alert.responses || []), ...(update.responses || [])]
                } 
              : alert
          ),
        }));
      },

      getAlertsByDepartment: (departmentId) => {
        return get().alerts.filter(
          (alert) =>
            alert.toDepartments.includes(departmentId) ||
            alert.fromDepartment === departmentId
        );
      },
    }),
    {
      name: 'portal-akron-alerts',
      version: 1,
      partialize: (state) => ({ alerts: state.alerts }),
    }
  )
);