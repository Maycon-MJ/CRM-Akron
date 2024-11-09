import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Alert, AlertResponse } from '../types';

interface AlertStore {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  updateAlert: (alertId: string, update: Partial<Alert>) => void;
  getAlertsByDepartment: (departmentId: string) => Alert[];
  getPendingAlertCount: (departmentId: string) => number;
}

const createTimestamp = () => new Date().toISOString();

export const useAlertStore = create<AlertStore>()(
  persist(
    (set, get) => ({
      alerts: [],

      addAlert: (alert) => {
        const timestamp = createTimestamp();
        set((state) => ({
          alerts: [...state.alerts, {
            ...alert,
            id: alert.id || crypto.randomUUID(),
            status: alert.status || 'pending',
            createdAt: timestamp,
            updatedAt: timestamp,
            responses: alert.responses || []
          }]
        }));
      },

      updateAlert: (alertId, update) => {
        const timestamp = createTimestamp();
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === alertId
              ? {
                  ...alert,
                  ...update,
                  responses: [
                    ...(alert.responses || []),
                    ...(update.responses?.map(response => ({
                      ...response,
                      createdAt: response.createdAt || timestamp
                    })) || [])
                  ],
                  updatedAt: timestamp
                }
              : alert
          )
        }));
      },

      getAlertsByDepartment: (departmentId) => {
        return get().alerts.filter(
          (alert) =>
            alert.fromDepartment === departmentId ||
            alert.toDepartments.includes(departmentId)
        );
      },

      getPendingAlertCount: (departmentId) => {
        return get().alerts.filter(
          (alert) =>
            alert.status === 'pending' &&
            (alert.fromDepartment === departmentId ||
             alert.toDepartments.includes(departmentId))
        ).length;
      }
    }),
    {
      name: 'portal-akron-alerts',
      version: 1,
      storage: localStorage,
      partialize: (state) => ({
        alerts: state.alerts.map(alert => ({
          ...alert,
          createdAt: alert.createdAt || createTimestamp(),
          updatedAt: alert.updatedAt || createTimestamp(),
          responses: (alert.responses || []).map(response => ({
            ...response,
            createdAt: response.createdAt || createTimestamp()
          }))
        }))
      })
    }
  )
);