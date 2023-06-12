import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { MockComponent } from 'ng-mocks';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing.module';
import { CustomAutocompleteComponent } from './custom-autocomplete.component';
import { DynamicTableComponent } from '../../../dynamic-table/components/dynamic-table.component';

interface TestOption {
  id: number;
  name: string;
  description: string;
}

describe('CustomAutocompleteComponent', () => {
  let component: CustomAutocompleteComponent<TestOption>;
  let fixture: ComponentFixture<CustomAutocompleteComponent<TestOption>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAutocompleteComponent, MockComponent(DynamicTableComponent)],
      imports: [
        getTranslocoTestingModule(),
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        OverlayModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomAutocompleteComponent<TestOption>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should focus the input field on initialization if hasFocus is true', () => {
    component.hasFocus = true;
    jest.spyOn(component.searchInputField?.nativeElement, 'focus');
    component.ngAfterViewInit();
    expect(component.searchInputField?.nativeElement.focus).toHaveBeenCalled();
  });

  it('should not focus the input field on initialization if hasFocus is false', () => {
    component.hasFocus = false;
    jest.spyOn(component.searchInputField?.nativeElement, 'focus');
    component.ngAfterViewInit();
    expect(component.searchInputField?.nativeElement.focus).not.toHaveBeenCalled();
  });

  it('should focus the input field when hasFocus changes from false to true', () => {
    component.hasFocus = false;
    jest.spyOn(component.searchInputField?.nativeElement, 'focus');
    component.ngOnChanges({
      hasFocus: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false },
    });
    expect(component.searchInputField?.nativeElement.focus).toHaveBeenCalled();
  });

  it('should not focus the input field when hasFocus changes from true to false', () => {
    component.hasFocus = true;
    jest.spyOn(component.searchInputField?.nativeElement, 'focus');
    component.ngOnChanges({
      hasFocus: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false },
    });
    expect(component.searchInputField?.nativeElement.focus).not.toHaveBeenCalled();
  });
});
