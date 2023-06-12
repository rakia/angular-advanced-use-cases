import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpEntityResponse } from '../../../models/http-entity-response.interface';
import { BackendMetaInfo } from '../models/backend-meta-info.interface';

@Injectable()
export class MetaInfoService {
  httpClient = inject(HttpClient);

  getMetaInfo(apiBase: string): Observable<BackendMetaInfo> {
    return this.httpClient
      .get<HttpEntityResponse<BackendMetaInfo>>(`${apiBase}/meta-information`)
      .pipe(map(({ data }) => data));
  }
}
