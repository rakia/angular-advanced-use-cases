import { Reuse } from './reuse.interface';
import { BaseEcsFieldset } from './base-ecs-fieldset.interface';

export interface UpdatableEcsFieldsetAttributes {
  customComment?: string;
  customDescription?: string;
}

export interface EcsFieldset extends BaseEcsFieldset, UpdatableEcsFieldsetAttributes {
  ecsVersion: string;
  title: string;
  root?: boolean;
  comment?: string;
  shortOverride?: string;
  beta?: string;
  footnote?: string;
  reuses?: Reuse[];
}
