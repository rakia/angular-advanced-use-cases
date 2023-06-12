import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent, MockProvider } from 'ng-mocks';
import {
  ActionsButtonsComponent,
  CardComponent,
  ChipsListComponent,
  EditChipsListComponent,
} from 'projects/shared/src/public-api';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { EcsFieldAllowedValuesComponent } from '../../ecs-field-allowed-values/ecs-field-allowed-values.component';
import { CreateCustomFieldComponent } from './create-custom-field.component';

describe('CreateCustomFieldComponent', () => {
  let component: CreateCustomFieldComponent;
  let fixture: ComponentFixture<CreateCustomFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateCustomFieldComponent,
        MockComponent(ActionsButtonsComponent),
        MockComponent(ChipsListComponent),
        MockComponent(EditChipsListComponent),
        MockComponent(EcsFieldAllowedValuesComponent),
        MockComponent(CardComponent),
      ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        getTranslocoTestingModule(),
        MatTooltipModule,
        MatInputModule,
        MatButtonToggleModule,
        MatSelectModule,
      ],
      providers: [FormBuilder, MockProvider(MatDialog), DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCustomFieldComponent);
    component = fixture.componentInstance;
    component.ecsFieldLevels = [];
    component.ecsFieldTypes = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
