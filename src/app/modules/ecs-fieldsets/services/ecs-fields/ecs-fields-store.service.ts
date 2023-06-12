import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import {
  DeleteEvent,
  HttpResponse,
  RequestResponse,
  UpdatedEntity,
} from 'projects/shared/src/public-api';
import { AlertService } from 'src/app/core/alert/alert.service';
import { EcsField, EcsFieldLevel, EcsFieldType, UpdatableEcsFieldAttributes } from '../../models/ecs-field.interface';
import { FilterEvent } from '../../models/filter-event.interface';
import { ParameterDescription } from '../../models/parameter-description.interface';
import { EcsFieldsService } from './ecs-fields.service';
import {ECS_FIELDS_RESPONSE} from "./ecs-fields.const";

@Injectable()
export class EcsFieldsStoreService {
  readonly ecsFields = new BehaviorSubject<EcsField[]>([]);
  readonly ecsFields$ = this.ecsFields.asObservable();

  readonly ecsFieldTypes = new BehaviorSubject<EcsFieldType[]>([]);
  readonly ecsFieldTypes$ = this.ecsFieldTypes.asObservable();

  readonly ecsFieldLevels = new BehaviorSubject<EcsFieldLevel[]>([]);
  readonly ecsFieldLevels$ = this.ecsFieldLevels.asObservable();

  readonly parameterDescriptions = new BehaviorSubject<ParameterDescription[]>([]);
  readonly parameterDescriptions$ = this.parameterDescriptions.asObservable();

  private readonly requestResponse = new BehaviorSubject<RequestResponse<EcsField> | null>(null);
  readonly requestResponse$ = this.requestResponse.asObservable();

  constructor(private service: EcsFieldsService, private alertService: AlertService) {
    this.getEcsfieldTypes();
    this.getEcsfieldLevels();
    this.getParameterDescriptions();
  }

  async getEcsFields(fieldsetId: string): Promise<void> {
    await firstValueFrom(this.service.getEcsFields(fieldsetId)).then((response: HttpResponse<EcsField>) => {
      this.ecsFields.next(response.data);
    });
  }

  async getEcsFieldsByEcsVersionId(versionId: string, filterEvent?: FilterEvent): Promise<void> {
    await firstValueFrom(this.service.getEcsFieldsByEcsVersionId(versionId, filterEvent?.query)).then(
      (response: HttpResponse<EcsField>) => {
        this.ecsFields.next(response.data);
      }
    );
  }

  async filterEcsFields(versionId: string, fieldsetId: string, filterEvent: FilterEvent, name: string): Promise<void> {
    await firstValueFrom(
      this.service.filterEcsFields(versionId, fieldsetId, filterEvent.query, filterEvent.fieldTypes, name)
    ).then((response: HttpResponse<EcsField>) => {
      this.ecsFields.next(response.data);
    });
  }

  async updateEcsField(updatedEntity: UpdatedEntity<UpdatableEcsFieldAttributes>): Promise<void> {
    await firstValueFrom(this.service.updateEcsField(updatedEntity.entityId, updatedEntity.updatedAttributes)).then(
      (response) => {
        this.alertService.openSnackBar(
          'shared.MESSAGES.UPDATED_SUCCESSFULLY',
          { value: `EcsField "${updatedEntity.entityName}"` },
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

  async deleteEcsField(event: DeleteEvent, fieldsetId: string): Promise<void> {
    await firstValueFrom(this.service.deleteEcsField(event.entityId)).then(() => {
      this.alertService.openSnackBar(
        'shared.MESSAGES.DELETED_SUCCESSFULLY',
        { value: `EcsField "${event.entityName}"` },
        'success',
        true
      );
      this.getEcsFields(fieldsetId);
    });
  }

  async createCustomField(entity: EcsField): Promise<void> {
    await firstValueFrom(this.service.createCustomField(entity)).then((response) => {
      this.alertService.openSnackBar(
        'shared.MESSAGES.CREATED_SUCCESSFULLY',
        { value: `EcsField "${entity.name}"` },
        'success',
        true
      );
      this.requestResponse.next({
        entityId: entity.id,
        entity: response.data,
        message: 'createdSuccessfully',
      });
      this.getEcsFields(entity.ecsFieldset);
    });
  }

  async getEcsfieldTypes(): Promise<void> {
    await firstValueFrom(this.service.getEcsfieldTypes()).then((response: HttpResponse<EcsFieldType>) => {
      this.ecsFieldTypes.next(response.data);
    });
  }

  async getEcsfieldLevels(): Promise<void> {
    await firstValueFrom(this.service.getEcsfieldLevels()).then((response: HttpResponse<EcsFieldLevel>) => {
      this.ecsFieldLevels.next(response.data);
    });
  }

  async getParameterDescriptions(): Promise<void> {
    await firstValueFrom(this.service.getParameterDescriptions()).then(
      (response: HttpResponse<ParameterDescription>) => {
        this.parameterDescriptions.next(response.data);
      }
    );
  }
}
