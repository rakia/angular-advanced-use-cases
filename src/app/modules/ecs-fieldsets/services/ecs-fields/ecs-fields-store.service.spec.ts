import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { UpdatedEntity } from 'projects/shared/src/public-api';
import { environment } from '../../../../../environments/environment';
import { AlertService } from '../../../../core/alert/alert.service';
import { EcsField, UpdatableEcsFieldAttributes } from '../../models/ecs-field.interface';
import { EcsFieldsStoreService } from './ecs-fields-store.service';
import { EcsFieldsService } from './ecs-fields.service';

const MOCK_ECS_FIELDS: EcsField[] = [
  {
    id: '12345678',
    ecsFieldset: 'wer-235-abc',
    isEcs: true,
    name: 'domain',
    flatName: 'domain',
    short: 'short1',
    level: 'extended',
    type: 'long',
    created: '2022-08-31T12:09:11.048234Z',
    createdBy: 'dev',
    updated: '2022-08-31T12:09:11.048234Z',
    updatedBy: 'dev',
    description: 'some description',
    beta: '1',
    customComment: '1',
  },
];

describe('EcsFieldsStoreService', () => {
  let storeService: EcsFieldsStoreService;
  let service: EcsFieldsService;
  let httpTestingCtl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockProvider(AlertService), EcsFieldsService, EcsFieldsStoreService],
    });
    storeService = TestBed.inject(EcsFieldsStoreService);
    service = TestBed.inject(EcsFieldsService);
    httpTestingCtl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(storeService).toBeTruthy();
  });

  xit('should get getEcsFields and update ecsFields', async () => {
    jest.spyOn(service, 'getEcsFields').mockReturnValue(of({ data: MOCK_ECS_FIELDS }));
    storeService.getEcsFields('wer-235-abc');
    expect(service.getEcsFields).toHaveBeenCalledTimes(1);
    expect(service.getEcsFields).toHaveBeenCalledWith('wer-235-abc');

    storeService.ecsFields$.subscribe((response) => {
      expect(response?.length).toEqual(1);
    });
    httpTestingCtl.verify();
  });

  xit(`should update EcsField`, async () => {
    const ecsFieldId = 'se-3434-fdsdf';
    const updatedEntity: UpdatedEntity<UpdatableEcsFieldAttributes> = {
      entityId: ecsFieldId,
      entityName: 'account.id',
      updatedAttributes: { customComment: 'some comment', customDescription: 'some desc...' },
    };
    storeService.updateEcsField(updatedEntity).then((result) => {
      expect(result).toBeDefined();
    });

    const req = httpTestingCtl.expectOne(`${environment.apiBase}/ecsfields/${ecsFieldId}`);

    expect(req.request.method).toBe('PATCH');
    httpTestingCtl.verify();
  });
});
