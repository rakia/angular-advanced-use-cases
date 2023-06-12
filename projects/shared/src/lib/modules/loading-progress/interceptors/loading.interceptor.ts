import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests += 1;
    this.loadingService.isLoading.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        // eslint-disable-next-line no-plusplus
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.isLoading.next(false);
        }
      })
    );
  }

  getTotalRequests(): number {
    return this.totalRequests;
  }

  setTotalRequests(value: number) {
    this.totalRequests = value;
  }
}
