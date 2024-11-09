export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'urgent' | 'request';
  fromDepartment: string;
  toDepartments: string[];
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  responses?: AlertResponse[];
  files?: FileAttachment[];
}

export interface AlertResponse {
  id: string;
  alertId: string;
  fromDepartment: string;
  message: string;
  observation?: string;
  responsible: string;
  createdAt: string;
  files?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  lastModified: number;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  color: string;
  features: DepartmentFeature[];
}

export interface DepartmentFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  formFields?: FormField[];
  notifyDepartments?: string[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date';
  required?: boolean;
  options?: string[];
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}