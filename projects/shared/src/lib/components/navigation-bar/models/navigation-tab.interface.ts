import { ResourceItem } from '../../../models/resource-item.interface';

export interface NavigationTab extends ResourceItem {
  label: string;
  name?: string;
  link: string;
  index: number;
}
