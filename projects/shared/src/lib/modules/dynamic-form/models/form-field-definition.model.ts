import { Params } from '@angular/router';
import { ColumnDefinition } from '../../dynamic-table/column-definition.model';

export class FormFieldDefinition {
  value?: any; // T
  valueLabel?: any;
  defaultValue?: any;
  defaultValueLabel?: any;
  key: string;
  label: string;
  hint?: string;
  description?: string;
  minLength?: number;
  dateRangeConfig?: DateRangeConfig;
  required?: boolean;
  disabled?: boolean;
  order?: number;
  icon?: string;
  controlType?: ControlType = 'textbox';
  type?: FieldType = 'string';
  options?: string[];
  valueOptions?: Params[]; // needed for search-option-overlay
  displayColumnDefs?: ColumnDefinition[]; // needed for search-option-overlay
  filterableColumns?: string[]; // needed for search-option-overlay
  searchColumn?: string; // needed for search-option-overlay
  errorMessage?: string; // needed for search-option-overlay
  width?: string;
  valueChangeCallback?: Function;

  constructor(
    options: {
      value?: any; // T
      valueLabel?: any;
      defaultValue?: any;
      defaultValueLabel?: any;
      key?: string;
      label?: string;
      hint?: string;
      description?: string;
      dateRangeConfig?: DateRangeConfig;
      required?: boolean;
      disabled?: boolean;
      order?: number;
      icon?: string;
      controlType?: ControlType;
      type?: FieldType;
      options?: string[]; // { label: string, value: string | number }[]
      valueOptions?: { label: string; value: string | number }[];
      errorMessage?: string;
      width?: string;
      valueChangeCallback?: Function;
    } = {}
  ) {
    this.value = options.value;
    this.valueLabel = options.valueLabel;
    this.defaultValue = options.defaultValue;
    this.defaultValueLabel = options.defaultValueLabel;
    this.key = options.key || '';
    this.label = options.label || '';
    this.hint = options.hint || '';
    this.description = options.description || '';
    this.dateRangeConfig = options.dateRangeConfig;
    this.required = !!options.required;
    this.disabled = options.disabled;
    this.order = options.order === undefined ? 1 : options.order;
    this.icon = options.icon;
    this.controlType = options.controlType || 'textbox';
    this.type = options.type || 'string';
    this.options = options.options || [];
    this.valueOptions = options.valueOptions || [];
    this.errorMessage = options.errorMessage || '';
    this.width = options.width;
    this.valueChangeCallback = options.valueChangeCallback || undefined;
  }
}

export interface DateRangeConfig {
  startDate: FormFieldDefinition;
  endDate: FormFieldDefinition;
}

export declare type FieldType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'json'
  | 'date'
  | 'month'
  | 'email'
  | 'password'
  | 'tel'
  | 'hidden'
  | 'image'
  | 'url'
  | 'week'
  | 'search'
  | 'reset';

export declare type ControlType =
  | 'textbox'
  | 'combobox'
  | 'textboxNum'
  | 'chipsList'
  | 'dropdown'
  | 'dropdownlist'
  | 'customAutocomplete'
  | 'multiselect'
  | 'autocomplete'
  | 'checkbox'
  | 'radiobutton'
  | 'timepicker'
  | 'datepicker'
  | 'daterange'
  | 'textarea'
  | 'slideToggle'
  | 'slider'
  | 'switch'
  | 'buttonToggleGroup'; // checkboxGroup
