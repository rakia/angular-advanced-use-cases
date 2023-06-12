import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpEntityResponse, HttpResponse } from 'projects/shared/src/public-api';
import { environment } from '../../../../../environments/environment';
import { EcsFieldset } from '../../models/ecs-fieldset.interface';
import { FieldType } from '../../models/field-type.types';
import { EcsFieldsetsService } from './ecs-fieldsets.service';

const ECS_FIELDSET = { id: '1', name: 'fieldset1', title: 'Fieldset 1', ecsVersion: '1.0', isEcs: true };
const CUSTOM_FIELDSET = { id: '2', name: 'fieldset1', title: 'Fieldset 1', ecsVersion: '1.0', isEcs: false };

describe('EcsFieldsetsService', () => {
  let service: EcsFieldsetsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EcsFieldsetsService],
    });
    service = TestBed.inject(EcsFieldsetsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload a file', () => {
    const formData = new FormData();
    formData.append('file', new File([], 'agent.yaml'));
    formData.append('version', '1.0');
    const releaseId = 'efer-3454-sdds';
    const mockResponse = { data: { id: '1', version: '1.0.0' } };

    service.uploadEcsFile(formData, releaseId).subscribe((response) => {
      expect(response.data.id).toEqual('1');
      expect(response.data.version).toEqual('1.0.0');
    });
    const req = httpMock.expectOne(`${environment.apiBase}/releases/${releaseId}/ecsupload`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get all ECS fieldsets', () => {
    const mockResponse = {
      data: [
        { id: '1', name: 'ecs_fieldsets_1' },
        { id: '2', name: 'ecs_fieldsets_2' },
      ],
    };
    service.getAllEcsFieldsets().subscribe((response) => {
      expect(response.data.length).toEqual(2);
      expect(response.data[0].id).toEqual('1');
      expect(response.data[0].name).toEqual('ecs_fieldsets_1');
      expect(response.data[1].id).toEqual('2');
      expect(response.data[1].name).toEqual('ecs_fieldsets_2');
    });
    const req = httpMock.expectOne(`${environment.apiBase}/ecsfieldsets`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get ECS fieldsets by version ID', () => {
    const versionId = '1.0';
    const expectedResponse: HttpResponse<EcsFieldset> = {
      data: [ECS_FIELDSET],
    };

    service.getEcsFieldsetsByEcsVersion(versionId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/ecsversions/${versionId}/fieldsets`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should filter ECS fieldsets', () => {
    const versionId = '1.0';
    const query = 'fieldset';
    const fieldTypes: FieldType[] = ['ecs'];
    const expectedResponse: HttpResponse<EcsFieldset> = {
      data: [ECS_FIELDSET],
    };
    service.filterEcsFieldsets(versionId, query, fieldTypes).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/ecsversions/${versionId}/fieldsets?search=${query}&ecs`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should get ECS fieldset details', () => {
    const fieldsetId = '1';
    const expectedResponse: HttpResponse<EcsFieldset> = {
      data: [ECS_FIELDSET],
    };
    service.getEcsFieldsetDetails(fieldsetId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/ecsfieldsets/${fieldsetId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should update ECS fieldset', () => {
    const ecsFieldsetId = '1';
    const updatedEcsFieldset: EcsFieldset = {
      id: '1',
      name: 'updated fieldset1',
      title: 'Updated Fieldset 1',
      ecsVersion: '1.0',
      isEcs: true,
    };
    const expectedResponse: HttpEntityResponse<EcsFieldset> = {
      data: {
        id: '1',
        name: 'updated fieldset1',
        title: 'Updated Fieldset 1',
        ecsVersion: '1.0',
        isEcs: true,
      },
    };
    service.updateEcsFieldset(ecsFieldsetId, updatedEcsFieldset).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/ecsfieldsets/${ecsFieldsetId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedEcsFieldset);
    req.flush(expectedResponse);
  });

  it('should delete ECS fieldset', () => {
    const ecsFieldsetId = '1';
    const expectedResponse: HttpEntityResponse<EcsFieldset> = { data: ECS_FIELDSET };
    service.deleteEcsFieldset(ecsFieldsetId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/ecsfieldsets/${ecsFieldsetId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedResponse);
  });

  it('should create custom fieldset', () => {
    const entity: EcsFieldset = CUSTOM_FIELDSET;
    const expectedResponse = { data: { id: 1, name: 'Custom Fieldset' } };

    service.createCustomFieldset(entity).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/ecsfieldsets`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(entity);
    req.flush(expectedResponse);
  });
});
