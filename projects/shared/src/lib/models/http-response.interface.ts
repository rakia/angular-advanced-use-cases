import { ServerResponseError } from './server-response-error.interface';

export interface HttpResponse<T> {
  data: T[];
  message?: string;
  errors?: ServerResponseError[];
}
