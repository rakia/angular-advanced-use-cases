export interface ParameterDescription {
  id: string;
  schema: string | 'ecs';
  type: 'fieldset' | 'field';
  required: boolean;
  parameterName: string;
  description: string;
}
