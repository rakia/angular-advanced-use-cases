import { AlertType } from '../../alert/alert.types';

export interface ServerResponse {
  data?: any;
  message?: string;
  error?: string;
  status?: number;
  type?: AlertType;
  timestamp?: Date;
}
