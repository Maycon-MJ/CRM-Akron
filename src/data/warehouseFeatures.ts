import { DepartmentFeature } from '../types';

export const warehouseFeatures: DepartmentFeature[] = [
  {
    id: 'new-restock',
    name: 'Novo Pedido de Reabastecimento',
    description: 'Solicitar reabastecimento de materiais',
    icon: 'Package'
  },
  {
    id: 'check-stock',
    name: 'Verificar Estoque Atual',
    description: 'Visualizar estoque de materiais e matéria-prima',
    icon: 'List'
  }
];