import { BaseEntity } from './base-entity.interface';
import { StatusType } from './status.types';

// only in FDA left
export interface Status extends BaseEntity {
  id: string;
  name: StatusType;
}
