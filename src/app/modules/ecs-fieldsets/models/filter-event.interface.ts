import { FieldType } from './field-type.types';

export interface FilterEvent {
  query: string;
  fieldTypes: FieldType[];
}
