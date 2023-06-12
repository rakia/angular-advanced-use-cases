import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor;
  let loadingService: LoadingService;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    loadingService = new LoadingService();
    interceptor = new LoadingInterceptor(loadingService);
    httpHandler = { handle: jest.fn().mockReturnValue(of({} as HttpEvent<any>)) } as HttpHandler;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should increment totalRequests on each request', () => {
    interceptor.intercept(new HttpRequest<any>('GET', '/data'), httpHandler);
    interceptor.intercept(new HttpRequest<any>('POST', '/data', {}), httpHandler);
    interceptor.intercept(new HttpRequest<any>('PUT', '/data', {}), httpHandler);

    expect(interceptor.getTotalRequests()).toBe(3);
    expect(loadingService.isLoading.getValue()).toBe(true);
  });

  it('should decrement totalRequests and set loading to false when totalRequests is 0', () => {
    interceptor.intercept(new HttpRequest<any>('GET', '/test-url'), httpHandler);
    interceptor.intercept(new HttpRequest<any>('GET', '/test-url'), httpHandler);
    expect(interceptor.getTotalRequests()).toBe(2);
    expect(loadingService.isLoading.value).toBe(true);

    interceptor.setTotalRequests(0);
    interceptor.intercept(new HttpRequest<any>('GET', '/test-url'), httpHandler);
    expect(interceptor.getTotalRequests()).toBe(1);
    expect(loadingService.isLoading.getValue()).toBe(true);
  });

  it('should set isLoading to true on each request', () => {
    interceptor.intercept(new HttpRequest<any>('GET', '/data'), httpHandler);

    expect(loadingService.isLoading.getValue()).toBe(true);
  });

  it('should set isLoading to false on error', () => {
    httpHandler.handle = jest.fn().mockReturnValue(throwError(() => new Error('error')));
    interceptor.intercept(new HttpRequest<any>('GET', '/data'), httpHandler);

    expect(interceptor.getTotalRequests()).toEqual(1);
    expect(loadingService.isLoading.getValue()).toBe(true);
  });
});
