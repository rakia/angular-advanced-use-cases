import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { EditObjectChipsListComponent } from './edit-object-chips-list.component';
import { FormService } from '../../../services/form-service/form.service';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing.module';

describe('EditObjectChipsListComponent', () => {
  let component: EditObjectChipsListComponent;
  let fixture: ComponentFixture<EditObjectChipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        EditObjectChipsListComponent,
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

    fixture = TestBed.createComponent(EditObjectChipsListComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.nameFormArray = 'test';
    component.form.addControl(component.nameFormArray, new FormArray([]));
    component.keyToDisplay = 'name';
    component.prefix = 'test-prefix';
    component.autocompleteOptions = [
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
    component.filteredOptions?.subscribe((filteredResult) => {
      expect(filteredResult).toEqual([{ id: '1', name: 'option 1' }]);
    });
  });

  it('should select option and add to formArray and selectedOptions', () => {
    jest.spyOn(component, 'updateSelectedOptionsAndForm');
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
    expect(component.updateSelectedOptionsAndForm).toHaveBeenCalled();
    expect(component.selectedOptions).toEqual([{ id: '1', name: 'test-prefixoption 1' }]);
  });

  it('should emit chipAdded event on adding label', () => {
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
    component.chipAdded.subscribe((item) => {
      expect(item).toEqual({ id: '1', name: 'test-prefixoption 1' });
    });
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
  });

  it('should emit chipDeleted event on removing label', () => {
    component.chipDeleted.subscribe((index) => {
      expect(index).toEqual(0);
    });
    component.removeFormSelectedOptions(0);
  });

  it('should remove option from formArray and selectedOptions on removing label', () => {
    component.selectOption({ option: { viewValue: 'option 1' } } as MatAutocompleteSelectedEvent);
    component.removeFormSelectedOptions(0);
    expect(component.selectedOptions).toEqual([]);
  });

  it('should not add chip on chipInputEvent when autocompleteOptions is not empty', () => {
    jest.spyOn(component, 'updateSelectedOptionsAndForm');
    component.addOption({ input: component.optionInput.nativeElement, value: 'test' } as MatChipInputEvent);

    expect(component.updateSelectedOptionsAndForm).toBeCalledTimes(0);
  });

  it('should add chip on chipInputEvent when autocompleteOptions is empty', () => {
    jest.spyOn(component, 'updateSelectedOptionsAndForm');

    component.autocompleteOptions = [];
    component.addOption({ input: component.optionInput.nativeElement, value: 'test' } as MatChipInputEvent);
    expect(component.updateSelectedOptionsAndForm).toBeCalledTimes(1);
  });
});
