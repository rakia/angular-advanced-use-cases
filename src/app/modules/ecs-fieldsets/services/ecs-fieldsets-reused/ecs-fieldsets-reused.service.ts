import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEntityResponse, HttpResponse } from 'projects/shared/src/public-api';
import { environment } from 'src/environments/environment';
import { Reuse } from '../../models/reuse.interface';

@Injectable()
export class EcsFieldsetsReusedService {
  constructor(private readonly httpClient: HttpClient) {}

  getEcsFieldsetsReused(): Observable<HttpResponse<Reuse>> {
    return this.httpClient.get<HttpResponse<Reuse>>(`${environment.apiBase}/ecsfieldsetsreused`);
  }

  createReuse(entity: Reuse): Observable<HttpEntityResponse<Reuse>> {
    return this.httpClient.post<HttpEntityResponse<Reuse>>(`${environment.apiBase}/ecsfieldsetsreused`, entity);
  }

  updateReuse(entity: Reuse): Observable<HttpEntityResponse<Reuse>> {
    return this.httpClient.put<HttpEntityResponse<Reuse>>(
      `${environment.apiBase}/ecsfieldsetsreused/${entity.id}`,
      entity
    );
  }

  deleteReuse(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiBase}/ecsfieldsetsreused/${id}`);
  }
}
