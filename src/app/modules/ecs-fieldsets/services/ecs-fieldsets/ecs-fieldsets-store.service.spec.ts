import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AlertService } from '../../../../core/alert/alert.service';
import { EcsFieldsetsStoreService } from './ecs-fieldsets-store.service';
import { EcsFieldsetsService } from './ecs-fieldsets.service';
import { EcsFileToUpload } from '../../models/data-to-upload.interface';
import { FieldType } from '../../models/field-type.types';

const RELEASE_ID = 'efer-3454-sdds';
const ECS_FIELDSET = { id: '1', name: 'fieldset1', title: 'Fieldset 1', ecsVersion: '1.0', isEcs: true };

describe('EcsFieldsetsStoreService', () => {
  let storeService: EcsFieldsetsStoreService;
  let service: EcsFieldsetsService;
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EcsFieldsetsStoreService,
        {
          provide: EcsFieldsetsService,
          useValue: {
            uploadEcsFile: jest.fn(() => of({ data: { id: '1' } })),
            getAllEcsFieldsets: jest.fn(() => of({ data: [ECS_FIELDSET] })),
            getEcsFieldsetsByEcsVersion: jest.fn(() => of({ data: [ECS_FIELDSET] })),
            filterEcsFieldsets: jest.fn(() => of({ data: [ECS_FIELDSET] })),
          },
        },
        { provide: AlertService, useValue: { openSnackBar: jest.fn() } },
      ],
    });
    storeService = TestBed.inject(EcsFieldsetsStoreService);
    service = TestBed.inject(EcsFieldsetsService);
    alertService = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(storeService).toBeTruthy();
  });

  it(`should uploadEcsFile`, async () => {
    jest.spyOn(service, 'uploadEcsFile');

    const uploadData: EcsFileToUpload = { uploadFile: new File([], 'agent.yaml'), ecsVersion: '1.0' };
    storeService.uploadEcsFile(uploadData, RELEASE_ID);
    expect(service.uploadEcsFile).toHaveBeenCalled();
  });

  it('should upload ECS file', async () => {
    const uploadData = { uploadFile: new File([], 'file.yml'), ecsVersion: '1.0' } as EcsFileToUpload;
    await storeService.uploadEcsFile(uploadData, RELEASE_ID);
    expect(service.uploadEcsFile).toHaveBeenCalledWith(expect.any(FormData), RELEASE_ID);
    expect(alertService.openSnackBar).toHaveBeenCalled();
  });

  it('should get all ECS fieldsets', async () => {
    await storeService.getAllEcsFieldsets();
    expect(service.getAllEcsFieldsets).toHaveBeenCalled();
    expect(storeService.ecsFieldsets.getValue()).toEqual([ECS_FIELDSET]);
  });

  it('should get ECS fieldsets by ECS version', async () => {
    const ecsVersionId = '1';
    await storeService.getEcsFieldsetsByEcsVersion(ecsVersionId);
    expect(service.getEcsFieldsetsByEcsVersion).toHaveBeenCalledWith(ecsVersionId);
    expect(storeService.ecsFieldsets.getValue()).toEqual([ECS_FIELDSET]);
  });

  it('should filter ECS fieldsets', async () => {
    const query = 'test';
    const fieldTypes: FieldType[] = ['ecs'];
    storeService.ecsVersion.next({ id: '1' });
    await storeService.filterEcsFieldsets(query, fieldTypes);
    expect(service.filterEcsFieldsets).toHaveBeenCalledWith('1', query, fieldTypes);
    expect(storeService.ecsFieldsets.getValue()).toEqual([ECS_FIELDSET]);
  });

  it('should not filter ECS fieldsets when ecs version is not set', async () => {
    const query = 'test';
    const fieldTypes: FieldType[] = ['ecs'];
    storeService.ecsVersion.next(null);
    await storeService.filterEcsFieldsets(query, fieldTypes);
    expect(service.filterEcsFieldsets).not.toHaveBeenCalled();
  });
});
