import { ServerResponseError } from './server-response-error.interface';

export interface HttpEntityResponse<T> {
  data: T;
  message?: string;
  errors?: ServerResponseError[];
}
