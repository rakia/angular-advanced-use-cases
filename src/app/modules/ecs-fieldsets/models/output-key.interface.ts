// extends BaseEntity and Object only necessary to make use of current implementation of lib-lucene-editor
import { BaseEntity } from 'projects/shared/src/lib/models/base-entity.interface';

export interface OutputKey extends BaseEntity {
  value: string;
}
