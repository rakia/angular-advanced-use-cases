import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MetaInfoService } from './meta-info.service';

describe('MetaInfoService', () => {
  let service: MetaInfoService;
  let httpTestingCtl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, MetaInfoService],
    });
    service = TestBed.inject(MetaInfoService);
    httpTestingCtl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get meta information`, () => {
    service.getMetaInfo('testApiBase').subscribe((result) => {
      expect(result).toBeDefined();
      expect(result.lastCommit).toBe('123');
      expect(result.logprepVersion).toBe('1.2.3');
    });

    const req = httpTestingCtl.expectOne(`testApiBase/meta-information`);
    req.flush({ data: { lastCommit: '123', logprepVersion: '1.2.3' } });

    expect(req.request.method).toBe('GET');
    httpTestingCtl.verify();
  });

  afterEach(() => {
    httpTestingCtl.verify();
  });
});
