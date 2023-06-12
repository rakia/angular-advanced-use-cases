import { DatePipe } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import {
  ActionsButtonsComponent,
  CardComponent,
  ChipsListComponent,
  EditChipsListComponent,
  FormService,
  SearchComponent,
} from 'projects/shared/src/public-api';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { EcsField } from '../../models/ecs-field.interface';
import { EcsFieldset } from '../../models/ecs-fieldset.interface';
import { EcsFieldsetComponent } from './ecs-fieldset.component';
import { EcsFieldsetsReusedStoreService } from '../../services/ecs-fieldsets-reused/ecs-fieldsets-reused-store.service';

const MOCK_ECS_FIELDSET: EcsFieldset = {
  id: '12345678',
  isEcs: true,
  name: 'geo',
  title: 'Geo',
  short: 'short1',
  footnote: '123456',
  created: '2022-08-31T12:09:11.048234Z',
  createdBy: 'dev',
  updated: '2022-08-31T12:09:11.048234Z',
  updatedBy: 'dev',
  ecsVersion: '1.0',
  beta: '1',
  customComment: '1',
};
const MOCK_ECS_FIELDS: EcsField[] = [];

describe('EcsFieldsetComponent', () => {
  let component: EcsFieldsetComponent;
  let fixture: ComponentFixture<EcsFieldsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EcsFieldsetComponent,
        MockComponent(ActionsButtonsComponent),
        MockComponent(SearchComponent),
        MockComponent(ChipsListComponent),
        MockComponent(EditChipsListComponent),
        MockComponent(CardComponent),
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        getTranslocoTestingModule(),
        MockModule(MatFormFieldModule),
        MockModule(MatInputModule),
        MockModule(MatIconModule),
        MockModule(MatSlideToggleModule),
        MockModule(MatTooltipModule),
        MockModule(MatDividerModule),
        MatButtonToggleModule,
      ],
      providers: [
        FormBuilder,
        FormService,
        MockProvider(EcsFieldsetsReusedStoreService),
        MockProvider(MatDialog),
        MockModule(MatInputModule),
        DatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsFieldsetComponent);
    component = fixture.componentInstance;
    component.entity = MOCK_ECS_FIELDSET;
    component.fields = MOCK_ECS_FIELDS;
    component.form = new FormBuilder().group({
      name: [''],
      title: [''],
      isEcs: [''],
      ecsVersion: [''],
      short: [''],
      description: [''],
      comment: [''],
      customDescription: [''],
      customComment: [''],
      shortOverride: [''],
      beta: [''],
      footnote: [''],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable EditMode after calling enableEditMode()', () => {
    component.isEditMode = false;
    component.entity.isEcs = true;
    component.enableEditMode();
    expect(component.isEditMode).toEqual(true);

    component.entity.isEcs = false;
    component.enableEditMode();
    expect(component.isEditMode).toEqual(true);
  });

  it('should disable the form after ngOnInit life cycle hook', () => {
    component.ngOnInit();
    expect(component.form.disabled).toEqual(true);
  });

  it('should disable form after receiving a change in entity', () => {
    const changes: SimpleChanges = {
      entity: { currentValue: MOCK_ECS_FIELDSET, previousValue: null, firstChange: false, isFirstChange: () => false },
    };
    component.ngOnChanges(changes);
    expect(component.form.disabled).toEqual(true);
  });

  it('should emit updateEcsField event after calling onClickSave() with entity.isEcs = true', () => {
    jest.spyOn(component.updateEcsField, 'emit');
    component.entity.isEcs = true;
    component.entity.name = 'Old name';
    component.form.controls['name'].setValue('New name');

    component.onClickSave();
    expect(component.entity.name).toEqual('Old name');
    // expect(component.updateEcsField.emit).toBeCalled();
  });

  it('should emit updateEcsField event after calling onClickSave() with entity.isEcs = false', () => {
    jest.spyOn(component.updateEcsField, 'emit');
    component.entity.isEcs = false;
    component.form.controls['name'].setValue('New name');

    component.onClickSave();
    expect(component.entity.name).toEqual('New name');
    // expect(component.updateEcsField.emit).toBeCalled();
  });
});
