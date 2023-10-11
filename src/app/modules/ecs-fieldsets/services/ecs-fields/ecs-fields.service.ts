import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpEntityResponse, HttpResponse } from 'projects/shared/src/public-api';
import { environment } from 'src/environments/environment';
import { EcsField, EcsFieldLevel, EcsFieldType } from '../../models/ecs-field.interface';
import { UpdatableEcsFieldsetAttributes } from '../../models/ecs-fieldset.interface';
import { FieldType } from '../../models/field-type.types';
import { ParameterDescription } from '../../models/parameter-description.interface';
import { PARAMETER_DESCRIPTION_RESPONSE } from './parameters-description.const';
import { ECS_FIELD_LEVELS_RESPONSE } from './ecs-field-levels.const';
import { ECS_FIELD_TYPES_RESPONSE } from './ecs-field-types.const';
import {
  AGENT_ECS_FIELDS_RESPONSE,
  AS_ECS_FIELDS_RESPONSE,
  ECS_FIELDS_RESPONSE,
  FILE_ECS_FIELDS_RESPONSE,
  GEO_ECS_FIELDS_RESPONSE,
  THREAT_ECS_FIELDS_RESPONSE,
  TLS_ECS_FIELDS_RESPONSE
} from './ecs-fields.const';
// import { ECS_FIELDS } from './all-ecs-fields.const';

const ECS_FIELDS: EcsField[] = [];

@Injectable()
export class EcsFieldsService {
  constructor(private readonly httpClient: HttpClient) {}

  getEcsFields(fieldsetId: string): Observable<HttpResponse<EcsField>> {
    if (environment.mockRequests) {
      return of(ECS_FIELDS_RESPONSE);
    }
    return this.httpClient.get<HttpResponse<EcsField>>(`${environment.apiBase}/ecsfieldsets/${fieldsetId}/fields`);
  }

  getEcsFieldsByEcsVersionId(versionId: string, query?: string): Observable<HttpResponse<EcsField>> {
    if (environment.mockRequests && !query) {
      // Return all ECS Fields
      return of({ data: ECS_FIELDS });
    }
    const searchQuery = query ? `?search=${query}` : '';
    return this.httpClient.get<HttpResponse<EcsField>>(
      `${environment.apiBase}/ecsversions/${versionId}/fields${searchQuery}`
    );
  }

  filterEcsFields(
    versionId: string,
    fieldsetId: string,
    query: string,
    fieldTypes: FieldType[],
    name: string
  ): Observable<HttpResponse<EcsField>> {
    if (environment.mockRequests) {
      switch (name) {
        case 'as': // Autonomous System: 2 Fields
          return of(AS_ECS_FIELDS_RESPONSE);
        case 'agent': // 6 Fields
          return of(AGENT_ECS_FIELDS_RESPONSE);
        case 'file': // 22 Fields
          return of(FILE_ECS_FIELDS_RESPONSE);
        case 'tls': // 29 Fields
          return of(TLS_ECS_FIELDS_RESPONSE);
        case 'threat': // 60 Fields
          return of(THREAT_ECS_FIELDS_RESPONSE);
        case 'geo': // 111 Fields
          return of(GEO_ECS_FIELDS_RESPONSE);
        default: // 12 Fields
          return of(ECS_FIELDS_RESPONSE);
      }
    }

    let fieldType = '';
    if (fieldTypes?.length === 1) {
      fieldType = fieldTypes[0] === 'ecs' ? '&ecs' : '&custom';
    }
    const searchQuery = query ? `search=${query}` : '';
    const and = searchQuery || fieldType ? `&` : '';

    return this.httpClient.get<HttpResponse<EcsField>>(
      `${environment.apiBase}/ecsversions/${versionId}/fields?${searchQuery}${fieldType}${and}fieldset=${fieldsetId}`
    );
  }

  getEcsfieldTypes(): Observable<HttpResponse<EcsFieldType>> {
    if (environment.mockRequests) {
      return of(ECS_FIELD_TYPES_RESPONSE);
    }
    return this.httpClient.get<HttpResponse<EcsFieldType>>(`${environment.apiBase}/ecsfieldtypes`);
  }

  getEcsfieldLevels(): Observable<HttpResponse<EcsFieldLevel>> {
    if (environment.mockRequests) {
      return of(ECS_FIELD_LEVELS_RESPONSE);
    }
    return this.httpClient.get<HttpResponse<EcsFieldLevel>>(`${environment.apiBase}/ecsfieldlevels`);
  }

  updateEcsField(
    ecsFieldId: string,
    updatedEcsField: UpdatableEcsFieldsetAttributes
  ): Observable<HttpEntityResponse<EcsField>> {
    return this.httpClient.patch<HttpEntityResponse<EcsField>>(
      `${environment.apiBase}/ecsfields/${ecsFieldId}`,
      updatedEcsField
    );
  }

  deleteEcsField(ecsFieldId: string): Observable<HttpEntityResponse<EcsField>> {
    return this.httpClient.delete<HttpEntityResponse<EcsField>>(`${environment.apiBase}/ecsfields/${ecsFieldId}`);
  }

  createCustomField(entity: EcsField): Observable<HttpEntityResponse<EcsField>> {
    return this.httpClient.post<HttpEntityResponse<EcsField>>(`${environment.apiBase}/ecsfields`, entity);
  }

  getParameterDescriptions(): Observable<HttpResponse<ParameterDescription>> {
    if (environment.mockRequests) {
      return of(PARAMETER_DESCRIPTION_RESPONSE);
    }
    return this.httpClient.get<HttpResponse<ParameterDescription>>(`${environment.apiBase}/parameterdescriptions`);
  }
}
