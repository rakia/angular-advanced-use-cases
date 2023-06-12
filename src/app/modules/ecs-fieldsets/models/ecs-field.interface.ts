import { BaseEntity } from 'projects/shared/src/public-api';
import { BaseEcsFieldset } from './base-ecs-fieldset.interface';

export interface UpdatableEcsFieldAttributes {
  customComment?: string;
  customDescription?: string;
  customExample?: string;
  customHelp?: string;
}

export interface EcsField extends BaseEcsFieldset, UpdatableEcsFieldAttributes {
  ecsFieldset: string;
  level: string;
  type: string;
  flatName?: string;
  beta?: string;
  example?: string;
  format?: string;
  inputFormat?: string;
  outputFormat?: string;
  outputPrecision?: string;
  pattern?: string;
  ignoreAbove?: number | null;
  index?: any;
  objectType?: string;
  required?: any;
  scalingFactor?: any;
  docValues?: boolean | null;
  normalize?: string[];
  expectedValues?: string[];
  ecsMultifields?: Multifield[];
  ecsFieldAllowedValues?: EcsFieldAllowedValue[];
}

export interface EcsFieldLevel extends BaseEntity {
  name: string;
  isEcs: boolean;
}

export interface EcsFieldType extends BaseEntity {
  name: string;
  isEcs: boolean;
}

export interface Multifield extends BaseEntity {
  md5Hash?: string;
  isEcs: boolean;
  ecsVersion: string; // ecsVersion's version
  ecsField?: string;
  flatName?: string;
  name: string;
  type?: string;
}

export interface EcsFieldAllowedValue extends BaseEntity {
  name: string;
  ecsField: string;
  description: string;
  expectedEventTypes: string[];
}
