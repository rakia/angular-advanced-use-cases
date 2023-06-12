import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import {
  ActionsButtonsComponent,
  CardComponent,
  EditChipsListComponent,
} from 'projects/shared/src/public-api';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { CreateCustomFieldsetComponent } from './create-custom-fieldset.component';

describe('CreateCustomFieldsetComponent', () => {
  let component: CreateCustomFieldsetComponent;
  let fixture: ComponentFixture<CreateCustomFieldsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateCustomFieldsetComponent,
        MockComponent(ActionsButtonsComponent),
        MockComponent(EditChipsListComponent),
        MockComponent(CardComponent),
      ],
      imports: [
        getTranslocoTestingModule(),
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(MatSlideToggleModule),
        MockModule(MatTooltipModule),
        MatInputModule,
        MatButtonToggleModule,
      ],
      providers: [FormBuilder, MockProvider(MatDialog), DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCustomFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
