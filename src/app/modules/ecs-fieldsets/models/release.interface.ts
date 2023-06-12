import { BaseEntity } from 'projects/shared/src/public-api';

export interface Release extends BaseEntity {
  version: string;
  versionMajor?: string;
  versionMinor?: string;
  ecsVersion: string; // ecsVersion's version
  ecsVersionId: string;
  stage: string; // Stage;
  releaseStatus: string; // Status;
  baseRelease?: string; // baseRelease's version
  baseReleaseId?: string;
  logclassCount: number;
  logsourceCount: number;
  ecsFieldCount: number;
}
