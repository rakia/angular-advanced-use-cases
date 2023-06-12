import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AlertService } from '../../../../core/alert/alert.service';
import { EcsFieldsetsReusedStoreService } from './ecs-fieldsets-reused-store.service';
import { EcsFieldsetsReusedService } from './ecs-fieldsets-reused.service';
import { Reuse } from '../../models/reuse.interface';

describe('EcsFieldsetsReusedStoreService', () => {
  let storeService: EcsFieldsetsReusedStoreService;
  let service: EcsFieldsetsReusedService;
  let httpTestingCtl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockProvider(AlertService), EcsFieldsetsReusedService, EcsFieldsetsReusedStoreService],
    });
    storeService = TestBed.inject(EcsFieldsetsReusedStoreService);
    service = TestBed.inject(EcsFieldsetsReusedService);
    httpTestingCtl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(storeService).toBeTruthy();
  });

  it('should get getEcsFieldsetsReused and update ecsFieldsetsReused', async () => {
    jest.spyOn(service, 'getEcsFieldsetsReused').mockReturnValue(of({ data: [] }));
    storeService.getEcsFieldsetsReused();
    expect(service.getEcsFieldsetsReused).toHaveBeenCalledTimes(1);

    storeService.ecsFieldsetsReused$.subscribe((response) => {
      expect(response?.length).toEqual(0);
    });
    httpTestingCtl.verify();
  });

  it(`should creare Reuse`, async () => {
    const ecsFieldsetId = 'se-3434-fdsdf';
    const updatedEntity: Reuse = {
      ecsFieldset: ecsFieldsetId,
      ecsReusedAtFieldset: '123-eer-23',
      reusedAs: 'client.as',
      topLevel: true,
    };
    storeService.createReuse(updatedEntity, 'base').subscribe((result) => {
      expect(result).toBeDefined();
    });

    const req = httpTestingCtl.expectOne(`${environment.apiBase}/ecsfieldsetsreused`);

    expect(req.request.method).toBe('POST');
    httpTestingCtl.verify();
  });
});
