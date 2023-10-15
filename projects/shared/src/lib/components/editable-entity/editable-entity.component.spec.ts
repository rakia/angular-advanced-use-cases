import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MockComponent, MockProvider } from 'ng-mocks';
import { DatePipe } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { EditableEntityComponent } from './editable-entity.component';
import { ActionButtonsComponent } from '../actions-buttons/action-buttons.component';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing.module';

const MOCK_USE_CASE: any = {
  id: 'e62938cf-9239-4788-8d24-e7a39a66f901',
  usecaseInstanceId: 'e62938cf-9239-4788-8d24-e7a39a66f911',
  version: 1,
  name: 'Unerlaubte Administration des SAP',
  requester: 'CISO',
  description: 'Super Beschreibung dieses UseCases',
  outputType: 'SOAR-Alarm',
  usecasePriority: 'Mittel',
  usecaseStatus: 'active',
  created: new Date().toISOString(),
  createdBy: 'teberle',
  responsePlanItemsCount: 0,
  detectionRulesCount: 0,
};

describe('EditableEntityComponent', () => {
  let component: EditableEntityComponent<any>;
  let fixture: ComponentFixture<EditableEntityComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableEntityComponent, MockComponent(ActionButtonsComponent)],
      imports: [getTranslocoTestingModule()],
      providers: [FormBuilder, MockProvider(MatDialog), DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(EditableEntityComponent<any>);
    component = fixture.componentInstance;
    component.entity = MOCK_USE_CASE;
    component.editableFields = ['name'];
    // component.readOnlyFields = ['id'];
    component.form = new FormBuilder().group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      createdBy: [{ value: '', disabled: true }, Validators.required],
      created: [{ value: '', disabled: true }, Validators.required],
      updatedBy: [{ value: '', disabled: true }, Validators.required],
      updated: [{ value: '', disabled: true }, Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable EditMode', () => {
    component.disableEditMode();
    expect(component.isEditMode).toEqual(false);
  });

  it('should enable EditMode', () => {
    component.enableEditMode();
    expect(component.isEditMode).toEqual(true);
    expect(component.form.controls['name'].enabled).toEqual(true);
    expect(component.form.controls['created'].enabled).toEqual(false);
  });

  it('should disable form after receiving a change in entity', () => {
    const changes: SimpleChanges = {
      entity: { currentValue: MOCK_USE_CASE, previousValue: null, firstChange: false, isFirstChange: () => false },
    };
    component.ngOnChanges(changes);
    expect(component.form.disabled).toEqual(true);
  });

  it('should call enableEditMode() after receiving a change in isEditMode = true', () => {
    jest.spyOn(component, 'enableEditMode');
    const changes: SimpleChanges = {
      isEditMode: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false },
    };
    component.ngOnChanges(changes);
    expect(component.enableEditMode).toHaveBeenCalledTimes(1);
  });

  it('should call disableEditMode() after receiving a change in isEditMode = false', () => {
    jest.spyOn(component, 'disableEditMode');
    const changes: SimpleChanges = {
      isEditMode: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false },
    };
    component.ngOnChanges(changes);
    expect(component.disableEditMode).toHaveBeenCalledTimes(1);
  });

  it('should call disableEditMode() after calling onClickCancel() and the form is not touched', () => {
    jest.spyOn(component, 'disableEditMode');
    component.onClickCancel();
    expect(component.disableEditMode).toHaveBeenCalledTimes(1);
  });

  xit('should emit delete event after calling onClickDelete()', () => {
    jest.spyOn(component.delete, 'emit');
    component.onClickDelete('abc-123', 'Dummy Entity Name');
    expect(component.delete.emit).toHaveBeenCalledTimes(1);
  });

  it('should disable form after receiving a change in entity', () => {
    const changes: SimpleChanges = {
      entity: { currentValue: MOCK_USE_CASE, previousValue: null, firstChange: false, isFirstChange: () => false },
    };
    component.ngOnChanges(changes);
    expect(component.form.disabled).toEqual(true);
  });

  it('should emit update event when calling onClickSave()', () => {
    jest.spyOn(component.update, 'emit');
    component.onClickSave();
    expect(component.update.emit).toHaveBeenCalledTimes(1);
  });
});
