import { BaseEntity } from './base-entity.interface';

export interface EcsVersion extends BaseEntity {
  versionMajor?: number;
  versionMinor?: number;
  version?: string; // versionMajor.versionMinor
  releaseVersion?: string;
}
