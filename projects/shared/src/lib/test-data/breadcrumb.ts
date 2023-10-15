import { BreadcrumbItem } from '../components/breadcrumb/models/breadcrumb-item.interface';

export const MOCK_BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'ADMINISTRATION', routerLink: '/administration', translate: true },
  { label: 'FIELDS.TITLE', routerLink: `/fields`, translate: true },
  { label: 'TEST.TITLE', translate: true },
];
