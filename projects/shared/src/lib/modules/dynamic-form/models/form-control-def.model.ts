import { FormFieldDefinition } from './form-field-definition.model';

export class FormControlDef extends FormFieldDefinition {
  isReadOnly?: boolean;
  groupLayout?: string;
  groupLayoutAlign?: string;
  group?: FormControlDef[];
  groupRow?: FormControlDef[];
  formArray?: FormControlDef[];
}
