export interface ServerResponseError {
  code: string;
  description: string;
  field_description: string;
  help_text: string;
  path: string;
  type: ErrorType;
}

export type ErrorType = 'ValidationError' | 'Warning' | any;
