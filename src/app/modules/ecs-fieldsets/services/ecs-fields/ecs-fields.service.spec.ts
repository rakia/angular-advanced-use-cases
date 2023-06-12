import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../environments/environment';
import { EcsFieldsService } from './ecs-fields.service';

describe('EcsFieldsetsService', () => {
  let service: EcsFieldsService;
  let httpTestingCtl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, EcsFieldsService],
    });
    service = TestBed.inject(EcsFieldsService);
    httpTestingCtl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get EcsFields`, async () => {
    const fieldsetId = 'ljk-9789-dfg';
    service.getEcsFields(fieldsetId).subscribe((result) => {
      expect(result).toBeDefined();
    });

    const req = httpTestingCtl.expectOne(`${environment.apiBase}/ecsfieldsets/${fieldsetId}/fields`);

    expect(req.request.method).toBe('GET');
    httpTestingCtl.verify();
  });
});
