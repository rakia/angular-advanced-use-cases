import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../environments/environment';
import { EcsFieldsetsReusedService } from './ecs-fieldsets-reused.service';

describe('EcsFieldsetsReusedService', () => {
  let service: EcsFieldsetsReusedService;
  let httpTestingCtl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, EcsFieldsetsReusedService],
    });
    service = TestBed.inject(EcsFieldsetsReusedService);
    httpTestingCtl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get getEcsFieldsetsReused`, async () => {
    service.getEcsFieldsetsReused().subscribe((result) => {
      expect(result).toBeDefined();
    });

    const req = httpTestingCtl.expectOne(`${environment.apiBase}/ecsfieldsetsreused`);

    expect(req.request.method).toBe('GET');
    httpTestingCtl.verify();
  });
});
