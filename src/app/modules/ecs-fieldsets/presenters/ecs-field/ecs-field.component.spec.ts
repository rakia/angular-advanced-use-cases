import { DatePipe } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import {
  ActionsButtonsComponent,
  ChipsListComponent,
  EditChipsListComponent,
  FormService,
} from 'projects/shared/src/public-api';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { EcsField } from '../../models/ecs-field.interface';
import { EcsFieldComponent } from './ecs-field.component';

const MOCK_ECS_FIELD: EcsField = {
  name: 'domain',
  flatName: 'domain',
  isEcs: true,
  short: 'short desc',
  description: 'long desc',
  ecsFieldset: '123-abc',
  level: 'core',
  type: 'long',
};

describe('EcsFieldComponent', () => {
  let component: EcsFieldComponent;
  let fixture: ComponentFixture<EcsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EcsFieldComponent,
        MockComponent(ActionsButtonsComponent),
        MockComponent(EditChipsListComponent),
        MockComponent(ChipsListComponent),
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        getTranslocoTestingModule(),
        MockModule(MatFormFieldModule),
        MockModule(MatTooltipModule),
        MatInputModule,
        MatButtonToggleModule,
      ],
      providers: [FormBuilder, FormService, MockProvider(MatDialog), DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsFieldComponent);
    component = fixture.componentInstance;
    component.entity = MOCK_ECS_FIELD;
    component.form = new FormBuilder().group({
      name: [''],
      isEcs: [''],
      level: [''],
      type: [''],
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
      entity: { currentValue: MOCK_ECS_FIELD, previousValue: null, firstChange: false, isFirstChange: () => false },
    };
    component.ngOnChanges(changes);
    expect(component.form.disabled).toEqual(true);
  });

  it('should emit updateEcsField event after calling onClickSave() with entity.isEcs = true', () => {
    jest.spyOn(component.updateEcsField, 'emit');
    component.entity.isEcs = true;
    component.onClickSave();
    expect(component.updateEcsField.emit).toBeCalledTimes(1);
  });

  it('should emit updateEcsField event after calling onClickSave() with entity.isEcs = false', () => {
    jest.spyOn(component.updateEcsField, 'emit');
    component.entity.isEcs = false;
    component.onClickSave();
    expect(component.updateEcsField.emit).toBeCalledTimes(1);
  });
});
