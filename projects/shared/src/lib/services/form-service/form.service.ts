import { DestroyRef, inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ObjectType } from '../../models/object.types';
import { isValidJSON } from '../../form-field-validator/is-valid-json.validator';
import { FormControlDef } from '../../modules/dynamic-form/models/form-control-def.model';

@Injectable()
export class FormService {
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);

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

  /**
   * Method to init a FormArray with a list of ObjectType
   */
  initFormArrayWithItems(form: FormGroup, formArrayName: string, items: ObjectType[] | undefined): void {
    // to make sure there are no other items in the FormArray
    form.setControl(formArrayName, this.formBuilder.array([]));

    items?.forEach((item) => {
      (form.get(formArrayName) as FormArray).push(new FormControl(item));
    });
  }

  /**
   * Method to init a FormArray with a list of strings
   */
  initFormArrayWithStrings(form: FormGroup, formArrayName: string, items: string[] | undefined): void {
    // to make sure there are no other items in the FormArray
    form.setControl(formArrayName, this.formBuilder.array([]));

    items?.forEach((value) => {
      (form.get(formArrayName) as FormArray).push(new FormControl(value));
    });
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

  private createFormControlByDefinition(formControlDef: FormControlDef, formGroup: FormGroup) {
    if (formControlDef.group) {
      formControlDef.group.forEach((fcDef) => {
        if (!fcDef.group && !fcDef.formArray && !fcDef.groupRow) {
          this.createFormControl(fcDef, formGroup);
        } else {
          this.createFormControlByDefinition(fcDef, formGroup);
        }
      });
    } else if (formControlDef.formArray) {
      this.initFormArrayWithItems(formGroup, formControlDef.key, []);
    } else {
      this.createFormControl(formControlDef, formGroup);
    }
  }

  /**
   * Create FormGroup from FormControlDef[]
   *
   */
  createFormGroupByDefinitions(formModel: FormControlDef[]): FormGroup {
    const formGroup = new FormGroup({});

    formModel.forEach((formControlDef) => {
      this.createFormControlByDefinition(formControlDef, formGroup);
    });

    // Dynamic callback functions
    formModel.forEach((formControlDef) => {
      if (!formControlDef.group) {
        if (formControlDef.valueChangeCallback) {
          // @ts-ignore
          formGroup.controls[formControlDef.key].valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value: any) => {
              // @ts-ignore
              formControlDef.valueChangeCallback(formGroup, value);
            });
        }
      } else {
        formControlDef.group?.forEach((fcDef: FormControlDef) => {
          if (fcDef.valueChangeCallback) {
            // @ts-ignore
            formGroup.controls[fcDef.key].valueChanges
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe((value: any) => {
                // @ts-ignore
                fcDef.valueChangeCallback(formGroup, value);
              });
          }
        });
      }
    });
    return formGroup;
  }

  /**
   * @param formControlDef
   * @param formGroup
   * @private
   */
  private createFormControl(formControlDef: FormControlDef, formGroup: FormGroup<{}>): void {
    const formControl = formControlDef.required
      ? new FormControl(formControlDef.defaultValue, Validators.required)
      : new FormControl(formControlDef.defaultValue);

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
