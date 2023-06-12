import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, finalize, mergeMap, retryWhen } from 'rxjs/operators';
import { LoadingService } from 'projects/shared/src/public-api';
import { AlertService } from '../../alert/alert.service';
import { ServerResponse } from '../models/server-response.interface';

export const maxRetries = 2;
export const delayMilliseconds = 2000;

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService, private loadingService: LoadingService) {}

  /**
   * The next object represents the next interceptor in the chain of interceptors
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * When we receive an error as a response of a request sent to server, we can apply
     * a retry strategies that specifies what should happen in that case.
     *
     * Here, we have 3 conditions to retry a failed request:
     *   - Retry twice at most
     *   - Only retry 500 internal server errors
     *   - Wait before retrying
     *
     *  The index from mergeMap() tells us which try we are on to stop retrying when we reach our limit.
     *  Depending on the error status, we can decide what to do.
     *  Here we retry twice with a delay when we get the error status 500. All remaining errors are re-thrown for further handling.
     */
    return next
      .handle(request)
      .pipe(
        retryWhen((error) =>
          error.pipe(
            mergeMap((err, index) => {
              if (index < maxRetries && err.status === 500) {
                return of(err).pipe(delay(delayMilliseconds));
              }
              throw err;
            })
          )
        )
      )
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.error instanceof ErrorEvent) {
            this.dispatchError(httpErrorResponse, 'ErrorEvent');
          } else {
            // `error status : ${httpErrorResponse.status} ${httpErrorResponse.statusText}`

            // eslint-disable-next-line default-case
            switch (httpErrorResponse.status) {
              case 0:
                // Response error: status = 0, net::ERR_CONNECTION_REFUSED
                this.dispatchError(httpErrorResponse, 'No connection to Server (Server might be down).');
                // TODO this.router.navigate(['error/500']);
                break;
              case 400:
                this.dispatchError(httpErrorResponse); // 'Response error: 400 Bad request'
                break;

              case 401: // unauthorized
                this.dispatchError(
                  httpErrorResponse,
                  'Response error: 401 unauthorized / not authenticated --> auto sign out'
                );
                // this.keycloakService.logout();
                break;

              case 403:
                this.dispatchError(
                  httpErrorResponse,
                  'Response error: 403 Forbidden - authenticated but not authorized'
                );
                break;

              case 404:
                this.dispatchError(
                  httpErrorResponse,
                  'Response error: 404 Not Found - the requested resource does not exist'
                );
                // TODO this.router.navigate(['error/404']);
                break;

              case 405:
                this.dispatchError(httpErrorResponse, 'Response error: 405 Method Not Allowed'); // httpErrorResponse.error.errors[0].description
                // TODO this.router.navigate(['error/404']);
                break;

              case 409:
                this.dispatchError(httpErrorResponse, 'Response error: 409 Method Not Allowed'); // httpErrorResponse.error.errors[0].description
                // TODO this.router.navigate(['error/404']);
                break;

              case 412:
                this.dispatchError(
                  httpErrorResponse,
                  'Response error: 412 Precondition failed - 1 or more conditions in the request header fields evaluated to false'
                );
                break;

              case 415: // Unsupported Media Type
                this.dispatchError(httpErrorResponse, httpErrorResponse.error.data?.detail);
                break;

              case 429: // Too Many Requests
                this.dispatchError(httpErrorResponse);
                break;

              case 500:
                // Response error: 500 Internal Server Error - a generic error occurred on the server
                this.dispatchError(httpErrorResponse, 'Internal Server Error');
                break;

              case 503:
                this.dispatchError(
                  httpErrorResponse,
                  'Response error: 503 Server Unavailable - the requested service is not available'
                );
                break;

              case 504:
                this.dispatchError(httpErrorResponse, 'Response error: 504 Gateway Timeout');
                break;
            }
          }

          // const err = httpErrorResponse.error.errors[0].description || httpErrorResponse.statusText;
          return throwError(() => httpErrorResponse);
        }),
        finalize(() => {
          // Hide loading spinner
          this.loadingService.isLoading.next(false);
        })
      );
  }

  dispatchError(httpErrorResponse: HttpErrorResponse, message?: string) {
    let errorMsg = '';
    if (httpErrorResponse.error?.errors?.length) {
      errorMsg = httpErrorResponse.error?.errors[0]?.description;
      // eslint-disable-next-line no-param-reassign
      message = message || httpErrorResponse.error?.errors[0]?.description;
    } else {
      // eslint-disable-next-line no-param-reassign
      message = message || httpErrorResponse.error?.message;
    }
    errorMsg = errorMsg || httpErrorResponse.error?.errorMessage || httpErrorResponse.message;
    const errorResponse: ServerResponse = {
      error: errorMsg,
      message,
      status: httpErrorResponse.status,
      type: 'error',
    };
    // @ts-ignore
    this.alertService.openSnackBar(errorResponse.message, '', 'error', false);
  }
}
