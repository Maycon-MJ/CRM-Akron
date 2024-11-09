import React from 'react';
import { departments } from '../data/departments';
import * as LucideIcons from 'lucide-react';

interface SidebarProps {
  selectedDepartment?: string;
  onDepartmentSelect: (departmentId: string) => void;
}

export default function Sidebar({ selectedDepartment, onDepartmentSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Portal Akron</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {departments.map((department) => {
            const Icon = LucideIcons[department.icon as keyof typeof LucideIcons];
            return (
              <li key={department.id}>
                <button
                  onClick={() => onDepartmentSelect(department.id)}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    selectedDepartment === department.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className={`w-5 h-5 ${department.color} mr-3`} />}
                  <span className="font-medium">{department.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}