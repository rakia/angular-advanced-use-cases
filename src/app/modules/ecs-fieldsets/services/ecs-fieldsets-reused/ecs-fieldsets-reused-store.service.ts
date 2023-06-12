import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { HttpEntityResponse, HttpResponse, RequestResponse } from 'projects/shared/src/public-api';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Reuse } from '../../models/reuse.interface';
import { EcsFieldsetsReusedService } from './ecs-fieldsets-reused.service';

@Injectable()
export class EcsFieldsetsReusedStoreService {
  readonly ecsFieldsetsReused = new BehaviorSubject<Reuse[]>([]);
  readonly ecsFieldsetsReused$ = this.ecsFieldsetsReused.asObservable();

  private readonly requestResponse = new BehaviorSubject<RequestResponse<Reuse> | null>(null);
  readonly requestResponse$ = this.requestResponse.asObservable();

  constructor(private service: EcsFieldsetsReusedService, private alertService: AlertService) {}

  async getEcsFieldsetsReused(): Promise<void> {
    // id: string
    await firstValueFrom(this.service.getEcsFieldsetsReused()).then((response: HttpResponse<Reuse>) => {
      this.ecsFieldsetsReused.next(response.data);
    });
  }

  createReuse(entity: Reuse, ecsFieldsetName: string): Observable<HttpEntityResponse<Reuse>> {
    return this.service.createReuse(entity).pipe(
      tap(() => {
        this.alertService.openSnackBar(
          'REUSES.CREATED_SUCCESSFULLY',
          { reuse: `Reuse "${entity.reusedAs}"`, ecsFieldset: ecsFieldsetName },
          'success',
          true
        );
      })
    );
  }

  async deleteReuse(entity: Reuse, ecsFieldsetName: string): Promise<void> {
    await firstValueFrom(this.service.deleteReuse(entity.id!)).then(() => {
      this.alertService.openSnackBar(
        'REUSES.DELETED_SUCCESSFULLY',
        { reuse: `Reuse "${entity.reusedAs}"`, ecsFieldset: ecsFieldsetName },
        'success',
        true
      );
    });
  }

  async updateReuse(entity: Reuse): Promise<void> {
    await firstValueFrom(this.service.updateReuse(entity)).then(() => {
      this.alertService.openSnackBar(
        'shared.MESSAGES.UPDATED_SUCCESSFULLY',
        { value: `Reuse "${entity.reusedAs}"` },
        'success',
        true
      );
    });
  }
}
