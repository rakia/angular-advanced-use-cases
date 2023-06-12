import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import {
  DeleteEvent,
  EcsVersion,
  HttpEntityResponse,
  HttpResponse,
  RequestResponse,
  UpdatedEntity,
} from 'projects/shared/src/public-api';
import { AlertService } from 'src/app/core/alert/alert.service';
import { EcsFileToUpload } from '../../models/data-to-upload.interface';
import { EcsFieldset, UpdatableEcsFieldsetAttributes } from '../../models/ecs-fieldset.interface';
import { FieldType } from '../../models/field-type.types';
import { EcsFieldsetsService } from './ecs-fieldsets.service';
import {Release} from "../../models/release.interface";

@Injectable()
export class EcsFieldsetsStoreService {

  readonly selectedRelease = new BehaviorSubject<Release | undefined>(undefined);
  readonly selectedRelease$ = this.selectedRelease.asObservable();
  readonly ecsFieldsets = new BehaviorSubject<EcsFieldset[]>([]);
  readonly ecsFieldsets$ = this.ecsFieldsets.asObservable();

  private readonly ecsFieldset = new BehaviorSubject<EcsFieldset | null>(null);
  readonly ecsFieldset$ = this.ecsFieldset.asObservable();

  private readonly uploadStatus = new BehaviorSubject<EcsFileToUpload | null>(null);
  readonly uploadStatus$ = this.uploadStatus.asObservable();

  readonly ecsVersion = new BehaviorSubject<EcsVersion | null>(null);
  readonly ecsVersion$ = this.ecsVersion.asObservable();

  readonly query = new BehaviorSubject<string>('');
  readonly query$ = this.query.asObservable();

  readonly fieldTypes = new BehaviorSubject<FieldType[]>([]);
  readonly fieldTypes$ = this.fieldTypes.asObservable();

  private readonly requestResponse = new BehaviorSubject<RequestResponse<EcsFieldset> | null>(null);
  readonly requestResponse$ = this.requestResponse.asObservable();

  constructor(private service: EcsFieldsetsService, private alertService: AlertService) {}

  async uploadEcsFile(uploadData: EcsFileToUpload, releaseId: string): Promise<void> {
    this.uploadStatus.next(null);
    const formData = new FormData();
    const file = new Blob([uploadData.uploadFile!], { type: 'text/yaml' });
    formData.append('file', file, uploadData.uploadFile!.name);
    formData.append('version', uploadData.ecsVersion);

    await firstValueFrom(this.service.uploadEcsFile(formData, releaseId))
      .then((response: HttpEntityResponse<EcsVersion>) => {
        this.uploadStatus.next({
          ecsVersion: uploadData.ecsVersion,
          ecsVersionId: response.data.id,
          uploadFileName: uploadData.uploadFile!.name,
          isUploadedSuccessfully: true,
        });
        const ecsVersion: EcsVersion = {
          ...response.data,
          version: `${response.data.versionMajor}.${response.data.versionMinor}`,
          releaseVersion: this.ecsVersion.value?.releaseVersion,
        };
        this.ecsVersion.next(ecsVersion);

        this.alertService.openSnackBar(
          'ECS_FIELDSETS.MESSAGES.UPLOADED_SUCCESSFULLY',
          { value: `"${uploadData.uploadFile!.name}"`, version: `"${uploadData.ecsVersion}"` },
          'success',
          true
        );

        return of(response);
      })
      .catch(() => {
        this.uploadStatus.next({
          ecsVersion: uploadData.ecsVersion,
          uploadFileName: uploadData.uploadFile!.name,
          isUploadedSuccessfully: false,
        });
      });
  }

  async getAllEcsFieldsets(): Promise<void> {
    await firstValueFrom(this.service.getAllEcsFieldsets()).then((response: HttpResponse<EcsFieldset>) => {
      this.ecsFieldsets.next(response.data);
    });
  }

  async getEcsFieldsetsByEcsVersion(ecsVersionId: string): Promise<void> {
    await firstValueFrom(this.service.getEcsFieldsetsByEcsVersion(ecsVersionId)).then(
      (response: HttpResponse<EcsFieldset>) => {
        this.ecsFieldsets.next(response.data);
      }
    );
  }

  async filterEcsFieldsets(query: string, fieldTypes: FieldType[]): Promise<void> {
    const ecsVersionId = this.ecsVersion.getValue()?.id;
    if (!ecsVersionId) {
      return;
    }
    this.query.next(query);
    this.fieldTypes.next(fieldTypes);

    await firstValueFrom(this.service.filterEcsFieldsets(ecsVersionId, query, fieldTypes)).then(
      (response: HttpResponse<EcsFieldset>) => {
        this.ecsFieldsets.next(response.data);
      }
    );
  }

  async getEcsFieldsetDetails(id: string): Promise<void> {
    await firstValueFrom(this.service.getEcsFieldsetDetails(id)).then((response: HttpEntityResponse<EcsFieldset>) => {
      this.ecsFieldset.next(response.data);
    });
  }

  async updateEcsFieldset(updatedEntity: UpdatedEntity<UpdatableEcsFieldsetAttributes>): Promise<void> {
    await firstValueFrom(this.service.updateEcsFieldset(updatedEntity.entityId, updatedEntity.updatedAttributes)).then(
      (response) => {
        this.alertService.openSnackBar(
          'shared.MESSAGES.UPDATED_SUCCESSFULLY',
          { value: `EcsFieldset "${updatedEntity.entityName}"` },
          'success',
          true
        );
        this.requestResponse.next({
          entityId: updatedEntity.entityId,
          entity: response.data,
          message: 'updatedSuccessfully',
        });
      }
    );
  }

  async deleteEcsFieldset(event: DeleteEvent): Promise<void> {
    await firstValueFrom(this.service.deleteEcsFieldset(event.entityId)).then(() => {
      this.alertService.openSnackBar(
        'shared.MESSAGES.DELETED_SUCCESSFULLY',
        { value: `EcsFieldset "${event.entityName}"` },
        'success',
        true
      );
      this.filterEcsFieldsets(this.query.getValue(), this.fieldTypes.getValue());
    });
  }

  async createCustomFieldset(entity: EcsFieldset): Promise<void> {
    await firstValueFrom(this.service.createCustomFieldset(entity)).then((response) => {
      this.alertService.openSnackBar(
        'shared.MESSAGES.CREATED_SUCCESSFULLY',
        { value: `EcsFieldset "${entity.name}"` },
        'success',
        true
      );
      this.requestResponse.next({
        entityId: entity.id,
        entity: response.data,
        message: 'createdSuccessfully',
      });
      this.filterEcsFieldsets(this.query.getValue(), this.fieldTypes.getValue());
    });
  }

  async getRelease(releaseId: string, force: boolean = false): Promise<void> {
    if (!force && this.selectedRelease.value?.id === releaseId) {
      return;
    }
    await firstValueFrom(this.service.getRelease(releaseId)).then((response) => {
      if (response) {
        this.selectedRelease.next(response.data);
      }
    });
  }
}
