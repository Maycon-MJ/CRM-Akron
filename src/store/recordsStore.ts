import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecordsState {
  records: Record<string, any[]>;
  addRecord: (departmentId: string, featureId: string, record: any) => void;
  getFeatureRecords: (departmentId: string, featureId: string) => any[];
  getFeatureMetrics: (departmentId: string, featureId: string) => {
    total: number;
    lastWeek: number;
    lastMonth: number;
    priority: {
      high: number;
      medium: number;
      low: number;
    };
  };
}

export const useRecordsStore = create<RecordsState>()(
  persist(
    (set, get) => ({
      records: {},

      addRecord: (departmentId, featureId, record) => {
        set((state) => {
          const key = `${departmentId}-${featureId}`;
          const existingRecords = state.records[key] || [];
          return {
            records: {
              ...state.records,
              [key]: [...existingRecords, {
                ...record,
                id: record.id || crypto.randomUUID(),
                createdAt: record.createdAt || new Date().toISOString(),
                updatedAt: record.updatedAt || new Date().toISOString()
              }]
            }
          };
        });
      },

      getFeatureRecords: (departmentId, featureId) => {
        const key = `${departmentId}-${featureId}`;
        return get().records[key] || [];
      },

      getFeatureMetrics: (departmentId, featureId) => {
        const records = get().getFeatureRecords(departmentId, featureId);
        const now = new Date();
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        return {
          total: records.length,
          lastWeek: records.filter(r => new Date(r.createdAt) > lastWeek).length,
          lastMonth: records.filter(r => new Date(r.createdAt) > lastMonth).length,
          priority: {
            high: records.filter(r => r.priority === 'high').length,
            medium: records.filter(r => r.priority === 'medium').length,
            low: records.filter(r => r.priority === 'low').length,
          }
        };
      }
    }),
    {
      name: 'portal-akron-records',
      version: 1,
      storage: localStorage,
      partialize: (state) => ({
        records: Object.fromEntries(
          Object.entries(state.records).map(([key, records]) => [
            key,
            records.map(record => ({
              ...record,
              createdAt: record.createdAt || new Date().toISOString(),
              updatedAt: record.updatedAt || new Date().toISOString()
            }))
          ])
        )
      })
    }
  )
);