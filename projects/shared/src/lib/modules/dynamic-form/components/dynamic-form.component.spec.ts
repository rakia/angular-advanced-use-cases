import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormControlDef } from '../models/form-control-def.model';
import { FormService } from '../../../services/form-service/form.service';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formService: FormService;
  let form: FormGroup;

  const formModel: FormControlDef[] = [
    { type: 'string', key: 'name', label: 'Name', required: true },
    { type: 'number', key: 'age', label: 'Age', required: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [
        getTranslocoTestingModule(),
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatChipsModule,
        MatTooltipModule,
      ],
      providers: [FormService],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormService);
    const formControl = new FormControl('');
    form = new FormGroup({ testFormControl: formControl });
    component.form = form;
    component.formModel = formModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a form array item to the form', () => {
    jest.spyOn(formService, 'createFormArray');
    form.addControl('formArray', new FormArray([]));

    expect(form.get('formArray') as FormArray).toBeDefined();

    component.addFormArrayItem('formArray', formModel);
    expect(formService.createFormArray).toBeCalledWith(formModel);
    expect(form.get('formArray')).toBeInstanceOf(FormArray);
  });

  it('should remove a form array item from the form', () => {
    form.setControl('formArray', new FormArray([]));
    component.removeFormArrayItem('formArray', 0);
    expect((form.get('formArray') as FormArray).length).toEqual(0);
  });

  it('onDropdownlistChange should set the value and valueLabel of formControl and mark the formGroup as touched', () => {
    const event = { value: 'testValue', label: 'testLabel' };
    const formControlDef = { value: '', valueLabel: '' } as FormControlDef;
    component.onDropdownlistChange(event, formControlDef, 'testFormControl', form);
    expect(formControlDef.value).toEqual(event.value);
    expect(formControlDef.valueLabel).toEqual(event.label);
    expect(form.touched).toBe(true);
  });

  it('onMultiselectChange should set the value and valueLabel of formControl', () => {
    const selectedOptions = [{ value: 'testValue', label: 'testLabel' }];
    const formControlDef = { value: [], valueLabel: [] } as FormControlDef;
    component.onMultiselectChange(selectedOptions, formControlDef);
    expect(formControlDef.value).toEqual(['testValue']);
    expect(formControlDef.valueLabel).toEqual(['testLabel']);
  });
});
