import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { MockProvider } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { LoadingInterceptor } from 'projects/shared/src/lib/modules/loading-progress/interceptors/loading.interceptor';
import { LoadingService } from 'projects/shared/src/public-api';
import { AlertService } from '../../alert/alert.service';
import { HttpErrorInterceptor } from './http-error.interceptor';

const testUrl = '/releases';
interface Data {
  name: string;
}

describe('HttpErrorInterceptor', () => {
  let httpErrorInterceptor: HttpErrorInterceptor;
  let alertService: AlertService;
  let loadingService: LoadingService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        MockProvider(AlertService),
        MockProvider(LoadingInterceptor),
        MockProvider(MatSnackBar),
        MockProvider(TranslocoService),
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
      ],
      imports: [HttpClientTestingModule],
    });

    alertService = TestBed.inject(AlertService);
    loadingService = new LoadingService();
    httpErrorInterceptor = new HttpErrorInterceptor(alertService, loadingService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    jest.spyOn(alertService, 'openSnackBar');
  });

  it('should be created', () => {
    expect(httpErrorInterceptor).toBeTruthy();
  });

  it('should call the openSnackBar() function when an error is thrown', () => {
    const error = new HttpErrorResponse({});
    jest.spyOn(alertService, 'openSnackBar');
    httpErrorInterceptor.dispatchError(error);
    expect(alertService.openSnackBar).toHaveBeenCalled();
  });

  it('should dispatch an error', () => {
    const error = new HttpErrorResponse({
      error: { message: 'Test error' },
      status: 400,
      statusText: 'Bad Request',
    });
    jest.spyOn(alertService, 'openSnackBar');
    const message = 'Test error';
    httpErrorInterceptor.dispatchError(error, message);
    expect(alertService.openSnackBar).toHaveBeenCalledWith(message, '', 'error', false);
  });

  it('should retry a failed request up to maxRetries times', () => {
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    // setup retry behavior for next.handle
    next.handle.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 500 }))).mockReturnValue(of({}));

    // call intercept method
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  it('should handle 401 status code by logging out the user and dispatch an error message', async () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ error: { message: 'Unauthorized' }, status: 401 }))
    ); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ error: { message: 'Unauthorized' }, status: 401 }),
      'Response error: 401 unauthorized / not authenticated --> auto sign out'
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  it('should handle 401 status code by logging out the user', () => {
    const request = new HttpRequest('POST', testUrl, {});
    const next = { handle: jest.fn() };
    const errorResponse = new HttpErrorResponse({
      error: 'Unauthorized',
      status: 401,
      statusText: 'Unauthorized',
    });
    next.handle.mockReturnValue(throwError(() => errorResponse));

    // call intercept method
    httpErrorInterceptor.intercept(request, next as any).subscribe();
  });

  it('should log out and call openSnackBar() when status is 401', () => {
    jest.spyOn(alertService, 'openSnackBar');

    const request = new HttpRequest('GET', '/test');
    const next = { handle: jest.fn() };
    // setup error response for next.handle
    const errorResponse = new HttpErrorResponse({
      error: 'Unauthorized',
      status: 401,
      statusText: 'Unauthorized',
    });
    next.handle.mockReturnValue(throwError(() => errorResponse));
    // call intercept method
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(alertService.openSnackBar).toHaveBeenCalledWith(
      'Response error: 401 unauthorized / not authenticated --> auto sign out',
      '',
      'error',
      false
    );
  });

  // TODO: later add user is automatically logged out
  it('When 401, show error message in SnackBar', () => {
    const emsg = 'deliberate 401 error';

    // Make an HTTP GET request
    httpClient.get<Data>(testUrl).subscribe(
      () => fail('should have failed with the 401 error'),
      (error: HttpErrorResponse) => {
        expect(error).toEqual(emsg);
      }
    );
    const req = httpMock.expectOne(testUrl);

    // Respond with mock error
    req.flush(emsg, { status: 401, statusText: 'Unauthorized' });
    expect(alertService.openSnackBar).toHaveBeenCalledTimes(1);
  });

  it('should handle 401 status code by logging out the user', () => {
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    const errorResponse = new HttpErrorResponse({
      error: 'Unauthorized',
      status: 401,
      statusText: 'Unauthorized',
    });
    next.handle.mockReturnValue(throwError(() => errorResponse));

    // call intercept method
    httpErrorInterceptor.intercept(request, next as any).subscribe();
  });

  it('should log out when status is 401', () => {
    jest.spyOn(alertService, 'openSnackBar');

    const request = new HttpRequest('GET', '/test');
    const next = { handle: jest.fn() };
    // setup error response for next.handle
    const errorResponse = new HttpErrorResponse({
      error: 'Unauthorized',
      status: 401,
      statusText: 'Unauthorized',
    });
    next.handle.mockReturnValue(throwError(() => errorResponse));
    // call intercept method
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(alertService.openSnackBar).toHaveBeenCalled();
  });

  it('should call dispatchError() after failed requests with error code 403', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 403 }))); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 403 }),
      'Response error: 403 Forbidden - authenticated but not authorized'
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  it('should call dispatchError() after failed requests with error code 404', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 404 }))); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 404 }),
      'Response error: 404 Not Found - the requested resource does not exist'
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  xit('should call dispatchError() after failed requests with error code 405', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 405 }))); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 405 }),
      'Response error: 405 Method Not Allowed'
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  xit('should call dispatchError() after failed requests with error code 409', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 409 }))); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 409 }),
      'Response error: 409 Method Not Allowed'
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  it('should call dispatchError() after failed requests with error code 412', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 412 }))); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 412 }),
      'Response error: 412 Precondition failed - 1 or more conditions in the request header fields evaluated to false'
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  it('should call dispatchError() after failed requests with error code 415', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ status: 415, error: { data: { detail: 'error 415' } } }))
    ); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 415, error: { data: { detail: 'error 415' } } }),
      'error 415'
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  it('should call dispatchError() after failed requests with error code 429', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ status: 429, error: { message: 'error 429' } }))
    ); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 429, error: { message: 'error 429' } })
    );
    expect(next.handle).toHaveBeenCalledTimes(1);
    httpMock.verify();
  });

  it('should call dispatchError() after failed requests with error code 503', () => {
    jest.spyOn(httpErrorInterceptor, 'dispatchError');
    const request = new HttpRequest('GET', testUrl);
    const next = { handle: jest.fn() };
    next.handle.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 503 }))); // setup retry behavior for next.handle
    httpErrorInterceptor.intercept(request, next as any).subscribe();

    expect(httpErrorInterceptor.dispatchError).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 503 }),
      'Response error: 503 Server Unavailable - the requested service is not available'
    );
    httpMock.verify();
  });
  // 500 504

  it('should not retry when receiving a status code other than 500', () => {
    const mockHttpErrorResponse = new HttpErrorResponse({
      error: 'Bad Request',
      status: 400,
      statusText: 'Bad Request',
    });

    httpClient.get<Data>(testUrl).subscribe(
      () => fail('Expected an error'),
      (error: HttpErrorResponse) => {
        expect(error).toEqual(mockHttpErrorResponse.error);
      }
    );
    const req = httpMock.expectOne(testUrl);
    // Respond with mock error
    req.flush(mockHttpErrorResponse.error, { status: 400, statusText: 'Unauthorized' });

    expect(alertService.openSnackBar).toHaveBeenCalledTimes(1);
  });

  it('When 503, show error message in SnackBar', () => {
    const emsg = 'deliberate 503 error';

    // Make an HTTP GET request
    httpClient.get<Data>(testUrl).subscribe(
      () => fail('Response error: 503 Server Unavailable - the requested service is not available'),
      (error: HttpErrorResponse) => {
        expect(error).toEqual(emsg);
      }
    );
    const req = httpMock.expectOne(testUrl);

    // Respond with mock error
    req.flush(emsg, { status: 503, statusText: 'Server Unavailable' });

    expect(alertService.openSnackBar).toHaveBeenCalledTimes(1);
  });
});
