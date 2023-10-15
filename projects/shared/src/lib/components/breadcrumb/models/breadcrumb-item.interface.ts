import { HashMap } from '@ngneat/transloco/lib/types';

export interface BreadcrumbItem {
  label: string;
  translate?: boolean;
  messageParams?: HashMap;
  routerLink?: any[] | string;
  fragment?: string;
  icon?: string;
}
