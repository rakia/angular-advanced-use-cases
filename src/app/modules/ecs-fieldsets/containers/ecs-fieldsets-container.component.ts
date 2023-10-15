import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  DeleteEvent,
  EcsVersion,
  RequestResponse,
  UpdatedEntity,
} from 'projects/shared/src/public-api';
import { EcsFileToUpload } from '../models/data-to-upload.interface';
import { EcsFieldset, UpdatableEcsFieldsetAttributes } from '../models/ecs-fieldset.interface';
import { EcsFieldsetsStoreService } from '../services/ecs-fieldsets/ecs-fieldsets-store.service';
import { FilterEvent } from '../models/filter-event.interface';

@Component({
  selector: 'app-ecs-fieldsets-container',
  templateUrl: './ecs-fieldsets-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsFieldsetsContainerComponent implements OnInit, OnDestroy {
  releaseId: string | null | undefined;

  uploadStatus$: Observable<EcsFileToUpload | null> = this.storeService.uploadStatus$;
  ecsVersion$: Observable<EcsVersion | null> = this.storeService.ecsVersion$;
  ecsFieldsets$: Observable<EcsFieldset[]> = this.storeService.ecsFieldsets$;
  requestResponse$: Observable<RequestResponse<EcsFieldset> | null> = this.storeService.requestResponse$;

  isCreateMode: boolean = false;
  isUploadEcsFieldsMode: boolean = false;
  private destroy$ = new Subject<any>();

  constructor(private storeService: EcsFieldsetsStoreService, private activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.releaseId = this.activatedRoute.parent?.snapshot?.paramMap.get('releaseId');
    this.storeService.getRelease(this.releaseId!);

    this.storeService.selectedRelease$.pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      this.releaseId = response?.id;
      if (response?.ecsVersionId) {
        const ecsVersion: EcsVersion = {
          id: response?.ecsVersionId,
          version: response?.ecsVersion,
          releaseVersion: response?.version,
        };
        this.storeService.ecsVersion.next(ecsVersion);
      }
    });
  }

  uploadEcsFields(ecsFileToUpload: EcsFileToUpload): void {
    this.storeService.uploadEcsFile(ecsFileToUpload, this.releaseId!);
  }

  getEcsFieldsets(ecsVersionId: string): void {
    this.storeService.getEcsFieldsetsByEcsVersion(ecsVersionId);
  }

  updateEcsFieldset(updatedEntity: UpdatedEntity<UpdatableEcsFieldsetAttributes>): void {
    this.storeService.updateEcsFieldset(updatedEntity);
  }

  deleteEcsFieldset(event: DeleteEvent): void {
    this.storeService.deleteEcsFieldset(event);
  }

  createCustomFieldset(entity: EcsFieldset | Partial<EcsFieldset>): void {
    // @ts-ignore
    this.storeService.createCustomFieldset(entity);
  }

  filterEcsFieldsets(event: FilterEvent): void {
    this.storeService.filterEcsFieldsets(event.query, event.fieldTypes);
  }

  ngOnDestroy(): void {
    // reset ecsFieldsets state
    this.storeService.ecsFieldsets?.next([]);
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
