// Add to existing types
export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  lastModified: number;
}

// Update AlertResponse interface
export interface AlertResponse {
  id: string;
  alertId: string;
  fromDepartment: string;
  message: string;
  observation?: string;
  responsible: string;
  createdAt: Date;
  files?: FileAttachment[];
  status?: 'approved' | 'rejected' | 'needs-review';
}