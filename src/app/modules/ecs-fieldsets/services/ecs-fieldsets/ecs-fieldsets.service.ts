import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EcsVersion, HttpEntityResponse, HttpResponse } from 'projects/shared/src/public-api';
import { environment } from 'src/environments/environment';
import { EcsFieldset, UpdatableEcsFieldsetAttributes } from '../../models/ecs-fieldset.interface';
import { ECS_FIELDSETS_RESPONSE } from './ecs-fieldsets.const';
import { RELEASE_RESPONSE } from './release.const';
import { FieldClass } from '../../models/field-class.interface';
import { FieldType } from '../../models/field-type.types';
import { Release } from '../../models/release.interface';

@Injectable()
export class EcsFieldsetsService {
  constructor(private readonly httpClient: HttpClient) {}

  getRelease(releaseId: string): Observable<HttpEntityResponse<Release>> {
    if (environment.mockRequests) {
      return of(RELEASE_RESPONSE);
    }
    return this.httpClient.get<HttpEntityResponse<Release>>(`${environment.apiBase}/releases/${releaseId}`);
  }

  uploadEcsFile(formData: FormData, releaseId: string): Observable<HttpEntityResponse<EcsVersion>> {
    return this.httpClient.post<HttpEntityResponse<EcsVersion>>(
      `${environment.apiBase}/releases/${releaseId}/ecsupload`,
      formData
    );
  }

  getAllEcsFieldsets(): Observable<HttpResponse<EcsFieldset>> {
    return this.httpClient.get<HttpResponse<EcsFieldset>>(`${environment.apiBase}/ecsfieldsets`);
  }

  getEcsFieldsetsByEcsVersion(versionId: string): Observable<HttpResponse<EcsFieldset>> {
    if (environment.mockRequests) {
      return of(ECS_FIELDSETS_RESPONSE);
    }
    return this.httpClient.get<HttpResponse<EcsFieldset>>(`${environment.apiBase}/ecsversions/${versionId}/fieldsets`);
  }

  filterEcsFieldsets(versionId: string, query: string, fieldTypes: FieldType[]): Observable<HttpResponse<EcsFieldset>> {
    let filterType = '';
    if (fieldTypes?.length === 1) {
      filterType = fieldTypes[0] === 'ecs' ? '&ecs' : '&custom';
    }
    const searchQuery = query ? `search=${query}` : '';
    return this.httpClient.get<HttpResponse<EcsFieldset>>(
      `${environment.apiBase}/ecsversions/${versionId}/fieldsets?${searchQuery}${filterType}`
    );
  }

  getEcsFieldsetDetails(fieldsetId: string): Observable<HttpEntityResponse<EcsFieldset>> {
    return this.httpClient.get<HttpEntityResponse<EcsFieldset>>(`${environment.apiBase}/ecsfieldsets/${fieldsetId}`);
  }

  updateEcsFieldset(
    ecsFieldsetId: string,
    updatedEcsFieldset: UpdatableEcsFieldsetAttributes
  ): Observable<HttpEntityResponse<EcsFieldset>> {
    return this.httpClient.patch<HttpEntityResponse<EcsFieldset>>(
      `${environment.apiBase}/ecsfieldsets/${ecsFieldsetId}`,
      updatedEcsFieldset
    );
  }

  deleteEcsFieldset(ecsFieldsetId: string): Observable<HttpEntityResponse<EcsFieldset>> {
    return this.httpClient.delete<HttpEntityResponse<EcsFieldset>>(
      `${environment.apiBase}/ecsfieldsets/${ecsFieldsetId}`
    );
  }

  createCustomFieldset(entity: EcsFieldset): Observable<HttpEntityResponse<EcsFieldset>> {
    return this.httpClient.post<HttpEntityResponse<EcsFieldset>>(`${environment.apiBase}/ecsfieldsets`, entity);
  }

  getFieldClasses(): Observable<HttpResponse<FieldClass>> {
    return this.httpClient.get<HttpResponse<FieldClass>>(`${environment.apiBase}/field-classes`);
  }

  /**
   * this method fetches the output keys from the API for a given fieldClass.
   * @param fieldClassId
   */
  getOutputKeysForFieldClass(fieldClassId: string): Observable<HttpResponse<string>> {
    return this.httpClient.get<HttpResponse<string>>(`${environment.apiBase}/field-classes/outputkeys`);
  }
}
