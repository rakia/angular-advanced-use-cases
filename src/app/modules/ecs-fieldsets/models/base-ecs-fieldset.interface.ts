import { BaseEntity } from 'projects/shared/src/lib/models/base-entity.interface';

export interface BaseEcsFieldset extends BaseEntity {
  name: string;
  title?: string;
  isEcs: boolean;
  short?: string;
  description?: string;
  md5Hash?: string;
}
