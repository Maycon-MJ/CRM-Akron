import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatRelativeDate = (dateString: string): string => {
  try {
    if (!dateString) {
      return 'Data não disponível';
    }

    const date = parseISO(dateString);
    
    if (!isValid(date)) {
      return 'Data inválida';
    }

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data não disponível';
  }
};