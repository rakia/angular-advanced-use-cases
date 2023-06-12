import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ObjectType } from '../../models/object.types';
import { isValidJSON } from '../../helpers/is-valid-json.validator';
import { FormControlDef } from '../../modules/dynamic-form/models/form-control-def.model';

@Injectable()
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  /**
   * Create FormGroup from entity that is a string
   * @param entity
   * @param populate
   */
  createFormGroupFromString(entity: string, populate = true): FormGroup {
    const formGroup = new FormGroup({});

    const value = populate ? entity : '';
    const formControl = new FormControl(value);
    formGroup.addControl(entity.trim(), formControl);
    return formGroup;
  }

  /**
   * Create FormGroup from entity
   * @param entity
   * @param populate
   */
  createFormGroupFromEntity(entity: ObjectType, populate = true): FormGroup {
    const formGroup = new FormGroup({});

    Object.keys(entity).forEach((key: string) => {
      const value = populate ? entity[key] : '';
      const formControl = new FormControl(value);
      formGroup.addControl(key, formControl);
    });
    return formGroup;
  }

  initFormArrayItems(form: FormGroup, formArrayName: string, items: ObjectType[] | undefined): void {
    // to make sure there are no other items in the FormArray
    form.setControl(formArrayName, this.formBuilder.array([]));

    const formArrayItems = form.get(formArrayName) as FormArray;
    items?.forEach((item) => {
      formArrayItems.push(this.createFormGroupFromEntity(item));
    });
  }

  initFormArrayStrings(form: FormGroup, formArrayName: string, items: string[] | undefined): void {
    // to make sure there are no other items in the FormArray
    form.setControl(formArrayName, this.formBuilder.array([]));

    const formArrayItems = form.get(formArrayName) as FormArray;
    items?.forEach((item) => {
      formArrayItems.push(this.createFormGroupFromString(item));
    });
  }

  addEmptyFormGrouptoFormArrayStrings(form: FormGroup, formArrayName: string, formItem: string): void {
    const control = form.get(formArrayName) as FormArray;
    const formGroup = this.createFormGroupFromString(formItem, false);
    control.push(formGroup);
  }

  addEmptyFormGrouptoFormArray(form: FormGroup, formArrayName: string, formItem: ObjectType): void {
    const control = form.get(formArrayName) as FormArray;
    const formGroup = this.createFormGroupFromEntity(formItem, false);
    control.push(formGroup);
  }

  /**
   * Create a FormGroup item that would be added to a FormArray
   * @param item
   * @param keyToDisplay
   */
  createFormArrayItem(item: any, keyToDisplay?: string): FormGroup {
    if (typeof item === 'string') {
      return this.formBuilder.group({ name: [item], id: [''] }); // item
    }
    const name = keyToDisplay ? item[keyToDisplay] : item.id;
    return this.formBuilder.group({ name: [item.name || name], ...item });
  }

  /**
   * Add a list of Items to a FormArray
   * @param formArrayName
   * @param items
   * @param form
   * @param keyToDisplay
   */
  addItemsToFormArray(formArrayName: string, items: any[] | undefined, form: FormGroup, keyToDisplay?: string): void {
    const formArrayItems = form.get(formArrayName) as FormArray;
    items?.forEach((item) => {
      formArrayItems.push(this.createFormArrayItem(item, keyToDisplay));
    });
  }

  createFormArray(formArrayModel: FormControlDef[]): FormArray {
    const formArray = this.formBuilder.array([]); // , CustomValidators.arrayHasItems
    const formGroup = new FormGroup({});

    formArrayModel.forEach((formControlDef) => {
      this.createFormControl(formControlDef, formGroup);
    });

    // @ts-ignore
    formArray.push(formGroup);
    return formArray;
  }

  private createAppropriateFormControl(formControlDef: FormControlDef, formGroup: FormGroup) {
    if (formControlDef.group) {
      formControlDef.group.forEach((fcDef) => {
        if (!fcDef.group && !fcDef.formArray && !fcDef.groupRow) {
          this.createFormControl(fcDef, formGroup);
        } else {
          this.createAppropriateFormControl(fcDef, formGroup);
        }
      });
    } else if (formControlDef.formArray) {
      this.initFormArrayItems(formGroup, formControlDef.key, []);
    } else {
      this.createFormControl(formControlDef, formGroup);
    }
  }

  /**
   * Create form from FormControlDef[]
   */
  /* createFormGroup(formModel: FormControlDef[], destroy$: Subject<void>): FormGroup {
    const formGroup = new FormGroup({});

    formModel.forEach((formControlDef) => {
      this.createAppropriateFormControl(formControlDef, formGroup);
    });

    // Dynamic callback functions
    formModel.forEach((formControlDef) => {
      if (!formControlDef.group) {
        if (formControlDef.valueChangeCallback) {
          formGroup.controls[formControlDef.key].valueChanges.pipe(takeUntil(destroy$)).subscribe((value: any) => {
            // @ts-ignore
            formControlDef.valueChangeCallback(formGroup, value);
          });
        }
      } else {
        formControlDef.group?.forEach((fcDef: FormControlDef) => {
          if (fcDef.valueChangeCallback) {
            formGroup.controls[fcDef.key].valueChanges.pipe(takeUntil(destroy$)).subscribe((value: any) => {
              // @ts-ignore
              fcDef.valueChangeCallback(formGroup, value);
            });
          }
        });
      }
    });
    return formGroup;
  } */

  /**
   * @param formControlDef
   * @param formGroup
   * @private
   */
  private createFormControl(formControlDef: FormControlDef, formGroup: FormGroup<{}>) {
    const defaultValue = formControlDef.defaultValue || '';
    const formControl = formControlDef.required
      ? new FormControl(defaultValue, Validators.required)
      : new FormControl(defaultValue);

    if (formControlDef.minLength) {
      formControl.addValidators(Validators.minLength(formControlDef.minLength));
    }
    if (formControlDef.type === 'json') {
      formControl.addValidators(isValidJSON());
    }
    if (formControlDef.disabled) {
      formControl.disable();
    }
    formGroup.addControl(formControlDef.key, formControl);
  }
}
