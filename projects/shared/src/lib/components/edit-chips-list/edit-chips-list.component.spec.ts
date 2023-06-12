import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { EditChipsListComponent } from './edit-chips-list.component';
import { FormService } from '../../services/form-service/form.service';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing.module';

describe('EditChipsListComponent', () => {
  let component: EditChipsListComponent;
  let fixture: ComponentFixture<EditChipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditChipsListComponent],
      imports: [
        getTranslocoTestingModule(),
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatChipsModule,
      ],
      providers: [FormService],
    }).compileComponents();

    fixture = TestBed.createComponent(EditChipsListComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.nameFormArray = 'test';
    component.form.addControl(component.nameFormArray, new FormArray([]));
    component.formArrayControls = (component.form.get(component.nameFormArray) as FormArray)?.controls;
    component.id = 'test-id';
    component.keyToDisplay = 'name';
    component.prefix = 'test-prefix';
    component.optionList = [
      { id: '1', name: 'option 1' },
      { id: '2', name: 'option 2' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter options based on input value', () => {
    component.optionInputCtrl.setValue('1');
    component.ngOnInit();
    component.filteredOptionList?.subscribe((filteredResult) => {
      expect(filteredResult).toEqual([{ id: '1', name: 'option 1' }]);
    });
  });

  it('should select option and add to formArray and chipSelectedOptionList', () => {
    jest.spyOn(component, 'updateSelectedOptionsAndForm');
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
    expect(component.updateSelectedOptionsAndForm).toHaveBeenCalled();

    expect(component.formArrayControls.length).toEqual(1);
    expect(component.chipSelectedOptionList).toEqual([{ id: '1', name: 'test-prefixoption 1' }]);
  });

  it('should emit labelAdded event on adding label', () => {
    component.labelAdded.subscribe((label) => {
      expect(label).toEqual('test-prefixoption 1');
    });
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
    component.itemAdded.subscribe((item) => {
      expect(item).toEqual({ id: '1', name: 'test-prefixoption 1' });
    });
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
  });

  it('should emit itemDeleted event on removing label', () => {
    component.itemDeleted.subscribe((index) => {
      expect(index).toEqual(0);
    });
    component.removeFormSelectedOptions(0);
  });

  it('should remove option from formArray and chipSelectedOptionList on removing label', () => {
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
    component.removeFormSelectedOptions(0);
    expect(component.formArrayControls.length).toEqual(0);
    expect(component.chipSelectedOptionList).toEqual([]);
  });

  it('should emit labelAdded event on adding chip', () => {
    component.labelAdded.subscribe((label) => {
      expect(label).toEqual('test-prefixtest');
    });
    component.addOption({ input: component.optionInput.nativeElement, value: 'test' } as MatChipInputEvent);
  });

  it('should not add chip on chipInputEvent when optionList is not empty', () => {
    jest.spyOn(component, 'updateSelectedOptionsAndForm');
    jest.spyOn(component.labelAdded, 'emit');
    component.addOption({ input: component.optionInput.nativeElement, value: 'test' } as MatChipInputEvent);

    expect(component.updateSelectedOptionsAndForm).toBeCalledTimes(0);
    expect(component.labelAdded.emit).toBeCalledTimes(0);
  });

  it('should add chip on chipInputEvent when optionList is empty', () => {
    jest.spyOn(component, 'updateSelectedOptionsAndForm');
    jest.spyOn(component.labelAdded, 'emit');

    component.optionList = [];
    component.addOption({ input: component.optionInput.nativeElement, value: 'test' } as MatChipInputEvent);
    expect(component.updateSelectedOptionsAndForm).toBeCalledTimes(1);
    expect(component.labelAdded.emit).toBeCalledTimes(1);
  });
});
