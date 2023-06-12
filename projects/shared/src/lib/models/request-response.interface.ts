import { RequestResponseMessageType } from './request-response.types';
import { BaseEntity } from './base-entity.interface';

export interface RequestResponse<T extends BaseEntity> {
  entityInstanceId?: string;
  entityId?: string;
  entity?: T;
  message: RequestResponseMessageType;
}
