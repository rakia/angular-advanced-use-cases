import { ActionButton } from '../../components/actions-buttons/action-button.interface';

export interface ColumnDefinition {
  index?: number; // if the list of columns will be displayed in material edit-grid (angular material grid), index must be given
  label: string;
  key: string;
  type?: string;
  format?: any; // it could be: { style: 'currency', currency: 'EUR' }, { date: 'short' }
  hasFooter?: boolean;
  actions?: ActionButton[];
}
