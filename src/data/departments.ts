import { Department } from '../types';
import {
  purchasingFeatures,
  pcpFeatures,
  productionFeatures,
  qualityFeatures,
  warrantyFeatures,
  regulatoryFeatures,
  commercialFeatures,
  warehouseFeatures,
  marketingFeatures,
  researchFeatures
} from './departmentFeatures';

export const departments: Department[] = [
  {
    id: 'purchasing',
    name: 'Compras',
    icon: 'ShoppingCart',
    color: 'text-blue-600',
    features: [
      ...purchasingFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'pcp',
    name: 'PCP',
    icon: 'Calendar',
    color: 'text-green-600',
    features: [
      ...pcpFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'production',
    name: 'Produção',
    icon: 'Factory',
    color: 'text-yellow-600',
    features: [
      ...productionFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'research',
    name: 'P&D',
    icon: 'Lightbulb',
    color: 'text-purple-600',
    features: [
      ...researchFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'quality',
    name: 'Controle de Qualidade',
    icon: 'Microscope',
    color: 'text-red-600',
    features: [
      ...qualityFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'warranty',
    name: 'Garantia',
    icon: 'Shield',
    color: 'text-indigo-600',
    features: [
      ...warrantyFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'regulatory',
    name: 'Regulatórios',
    icon: 'FileCheck',
    color: 'text-gray-600',
    features: [
      ...regulatoryFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'commercial',
    name: 'Comercial',
    icon: 'Store',
    color: 'text-orange-600',
    features: [
      ...commercialFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'warehouse',
    name: 'Almoxarifado',
    icon: 'Package',
    color: 'text-teal-600',
    features: [
      ...warehouseFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: 'BarChart',
    color: 'text-pink-600',
    features: [
      ...marketingFeatures,
      {
        id: 'notifications',
        name: 'Notificações',
        description: 'Visualizar e gerenciar notificações do departamento',
        icon: 'Bell'
      }
    ]
  }
];