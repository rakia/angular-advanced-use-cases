import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormControlDef } from '../models/form-control-def.model';
import { FormService } from '../../../services/form-service/form.service';

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  @Input() form!: FormGroup;
  @Input() formModel!: FormControlDef[];

  constructor(private formService: FormService) {}

  addFormArrayItem(formArrayName: string, formArrayModel: FormControlDef[]): void {
    const formArray = this.form.get(formArrayName) as FormArray;
    formArray.push(this.formService.createFormArray(formArrayModel));
  }

  removeFormArrayItem(formArrayName: string, index: number): void {
    const formArray = this.form.get(formArrayName) as FormArray;
    formArray.removeAt(index);
  }

  trackByFn(index: number, item: any): any {
    return item.key || index;
  }

  onDropdownlistChange(
    event: { [x: string]: any },
    formControl: FormControlDef,
    formControlName: string,
    formGroup: FormGroup
  ): void {
    if (event['label']) {
      // eslint-disable-next-line no-param-reassign
      formControl.valueLabel = event['label'];
      // eslint-disable-next-line no-param-reassign
      formControl.value = event['value'];
    } else {
      // @ts-ignore
      formGroup.get(formControlName).setValue(event);
    }
    formGroup.markAsTouched();
    formGroup.markAllAsTouched();
  }

  onMultiselectChange(selectedOptions: any[], formControl: FormControlDef): void {
    if (selectedOptions && selectedOptions[0] && selectedOptions[0].value) {
      // eslint-disable-next-line no-param-reassign
      formControl.value = selectedOptions.map((selectedOption) => selectedOption.value);
      // eslint-disable-next-line no-param-reassign
      formControl.valueLabel = selectedOptions.map((selectedOption) => selectedOption.label);
    }
  }
}
