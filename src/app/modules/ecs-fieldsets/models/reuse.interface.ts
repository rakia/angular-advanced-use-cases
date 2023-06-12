import { BaseEntity } from 'projects/shared/src/public-api';

export interface Reuse extends BaseEntity {
  isEcs?: boolean;
  md5Hash?: string;
  reusedAs: string;
  ecsFieldset: string;
  ecsReusedAtFieldset?: string;
  topLevel?: boolean;
  beta?: string;
  shortOverride?: string;
}
