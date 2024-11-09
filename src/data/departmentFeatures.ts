import { DepartmentFeature } from '../types';

export const purchasingFeatures: DepartmentFeature[] = [
  {
    id: 'new-purchase',
    name: 'Novo Pedido de Compra',
    description: 'Criar um novo pedido de compra de materiais',
    icon: 'ShoppingBag',
    formFields: [
      {
        id: 'material',
        label: 'Material',
        type: 'text',
        required: true
      },
      {
        id: 'quantity',
        label: 'Quantidade',
        type: 'number',
        required: true
      },
      {
        id: 'supplier',
        label: 'Fornecedor',
        type: 'select',
        options: ['Fornecedor A', 'Fornecedor B', 'Fornecedor C'],
        required: true
      },
      {
        id: 'deadline',
        label: 'Data Necessária',
        type: 'date',
        required: true
      },
      {
        id: 'priority',
        label: 'Prioridade',
        type: 'select',
        options: ['Baixa', 'Média', 'Alta'],
        required: true
      },
      {
        id: 'observations',
        label: 'Observações',
        type: 'textarea'
      }
    ],
    notifyDepartments: ['pcp', 'warehouse']
  },
  {
    id: 'suppliers',
    name: 'Consultar Fornecedores',
    description: 'Visualizar e gerenciar fornecedores',
    icon: 'Users',
    formFields: [
      {
        id: 'supplierName',
        label: 'Nome do Fornecedor',
        type: 'text',
        required: true
      },
      {
        id: 'category',
        label: 'Categoria',
        type: 'select',
        options: ['Matéria Prima', 'Embalagem', 'Serviços'],
        required: true
      }
    ]
  }
];

export const pcpFeatures: DepartmentFeature[] = [
  {
    id: 'new-schedule',
    name: 'Novo Cronograma',
    description: 'Criar um novo cronograma de produção',
    icon: 'Calendar',
    formFields: [
      {
        id: 'productionOrder',
        label: 'Ordem de Produção',
        type: 'text',
        required: true
      },
      {
        id: 'product',
        label: 'Produto',
        type: 'select',
        options: ['Produto A', 'Produto B', 'Produto C'],
        required: true
      },
      {
        id: 'startDate',
        label: 'Data de Início',
        type: 'date',
        required: true
      },
      {
        id: 'endDate',
        label: 'Data de Conclusão',
        type: 'date',
        required: true
      },
      {
        id: 'priority',
        label: 'Prioridade',
        type: 'select',
        options: ['Baixa', 'Média', 'Alta'],
        required: true
      }
    ],
    notifyDepartments: ['production', 'quality']
  }
];

export const productionFeatures: DepartmentFeature[] = [
  {
    id: 'new-order',
    name: 'Nova Ordem de Produção',
    description: 'Criar uma nova ordem de produção',
    icon: 'Factory',
    formFields: [
      {
        id: 'product',
        label: 'Produto',
        type: 'select',
        options: ['Produto A', 'Produto B', 'Produto C'],
        required: true
      },
      {
        id: 'quantity',
        label: 'Quantidade',
        type: 'number',
        required: true
      },
      {
        id: 'batch',
        label: 'Lote',
        type: 'text',
        required: true
      },
      {
        id: 'startDate',
        label: 'Data de Início',
        type: 'date',
        required: true
      }
    ],
    notifyDepartments: ['quality', 'warehouse']
  }
];

export const qualityFeatures: DepartmentFeature[] = [
  {
    id: 'new-inspection',
    name: 'Nova Inspeção',
    description: 'Registrar uma nova inspeção de qualidade',
    icon: 'ClipboardCheck',
    formFields: [
      {
        id: 'productionOrder',
        label: 'Ordem de Produção',
        type: 'text',
        required: true
      },
      {
        id: 'inspectionType',
        label: 'Tipo de Inspeção',
        type: 'select',
        options: ['Matéria Prima', 'Processo', 'Produto Final'],
        required: true
      },
      {
        id: 'result',
        label: 'Resultado',
        type: 'select',
        options: ['Aprovado', 'Reprovado', 'Necessita Ajustes'],
        required: true
      },
      {
        id: 'observations',
        label: 'Observações',
        type: 'textarea'
      }
    ],
    notifyDepartments: ['production', 'warranty']
  }
];

export const warrantyFeatures: DepartmentFeature[] = [
  {
    id: 'new-warranty-report',
    name: 'Novo Relatório de Garantia',
    description: 'Registrar incidentes de garantia ou falhas de qualidade',
    icon: 'FileWarning',
    formFields: [
      {
        id: 'product',
        label: 'Produto',
        type: 'select',
        options: ['Produto A', 'Produto B', 'Produto C'],
        required: true
      },
      {
        id: 'incidentType',
        label: 'Tipo de Incidente',
        type: 'select',
        options: ['Falha de Qualidade', 'Defeito de Fabricação', 'Não Conformidade'],
        required: true
      },
      {
        id: 'description',
        label: 'Descrição do Problema',
        type: 'textarea',
        required: true
      }
    ],
    notifyDepartments: ['quality', 'regulatory']
  }
];

export const regulatoryFeatures: DepartmentFeature[] = [
  {
    id: 'new-compliance',
    name: 'Nova Conformidade',
    description: 'Registrar conformidade para produto ou processo',
    icon: 'ClipboardCheck',
    formFields: [
      {
        id: 'product',
        label: 'Produto',
        type: 'select',
        options: ['Produto A', 'Produto B', 'Produto C'],
        required: true
      },
      {
        id: 'complianceType',
        label: 'Tipo de Conformidade',
        type: 'select',
        options: ['Registro', 'Certificação', 'Licença'],
        required: true
      },
      {
        id: 'status',
        label: 'Status',
        type: 'select',
        options: ['Em Análise', 'Aprovado', 'Pendente'],
        required: true
      }
    ],
    notifyDepartments: ['quality', 'warranty']
  }
];

export const commercialFeatures: DepartmentFeature[] = [
  {
    id: 'new-sale',
    name: 'Novo Pedido de Venda',
    description: 'Criar pedidos de venda para atender demandas',
    icon: 'ShoppingCart',
    formFields: [
      {
        id: 'client',
        label: 'Cliente',
        type: 'text',
        required: true
      },
      {
        id: 'product',
        label: 'Produto',
        type: 'select',
        options: ['Produto A', 'Produto B', 'Produto C'],
        required: true
      },
      {
        id: 'quantity',
        label: 'Quantidade',
        type: 'number',
        required: true
      },
      {
        id: 'deliveryDate',
        label: 'Data de Entrega',
        type: 'date',
        required: true
      }
    ],
    notifyDepartments: ['warehouse', 'production']
  }
];

export const warehouseFeatures: DepartmentFeature[] = [
  {
    id: 'new-restock',
    name: 'Novo Pedido de Reabastecimento',
    description: 'Solicitar reabastecimento de materiais',
    icon: 'Package',
    formFields: [
      {
        id: 'materialType',
        label: 'Tipo de Material',
        type: 'select',
        options: ['Matéria Prima', 'Material de Embalagem'],
        required: true
      },
      {
        id: 'material',
        label: 'Material',
        type: 'text',
        required: true
      },
      {
        id: 'quantity',
        label: 'Quantidade',
        type: 'number',
        required: true
      },
      {
        id: 'urgency',
        label: 'Urgência',
        type: 'select',
        options: ['Baixa', 'Média', 'Alta'],
        required: true
      }
    ],
    notifyDepartments: ['purchasing', 'production']
  }
];

export const marketingFeatures: DepartmentFeature[] = [
  {
    id: 'new-label',
    name: 'Novo Projeto de Rótulo',
    description: 'Criar e aprovar novos rótulos',
    icon: 'Tag',
    formFields: [
      {
        id: 'product',
        label: 'Produto',
        type: 'select',
        options: ['Produto A', 'Produto B', 'Produto C'],
        required: true
      },
      {
        id: 'labelType',
        label: 'Tipo de Rótulo',
        type: 'select',
        options: ['Novo', 'Atualização', 'Sazonal'],
        required: true
      },
      {
        id: 'description',
        label: 'Descrição',
        type: 'textarea',
        required: true
      },
      {
        id: 'launchDate',
        label: 'Data de Lançamento',
        type: 'date',
        required: true
      }
    ],
    notifyDepartments: ['regulatory', 'commercial']
  }
];

export const researchFeatures: DepartmentFeature[] = [
  {
    id: 'new-project',
    name: 'Novo Projeto',
    description: 'Criar um novo projeto de pesquisa e desenvolvimento',
    icon: 'Lightbulb',
    formFields: [
      {
        id: 'projectName',
        label: 'Nome do Projeto',
        type: 'text',
        required: true
      },
      {
        id: 'category',
        label: 'Categoria',
        type: 'select',
        options: ['Novo Produto', 'Melhoria', 'Inovação'],
        required: true
      },
      {
        id: 'description',
        label: 'Descrição',
        type: 'textarea',
        required: true
      },
      {
        id: 'deadline',
        label: 'Prazo Estimado',
        type: 'date',
        required: true
      }
    ],
    notifyDepartments: ['quality', 'regulatory']
  }
];