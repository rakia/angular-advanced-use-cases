import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ActionsButtonsComponent } from '../actions-buttons/actions-buttons.component';
import { CreateEntityComponent } from './create-entity.component';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing.module';

interface ExampleDataType {}

describe('CreateEntityComponent', () => {
  let component: CreateEntityComponent<ExampleDataType>;
  let fixture: ComponentFixture<CreateEntityComponent<ExampleDataType>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEntityComponent, MockComponent(ActionsButtonsComponent)],
      imports: [getTranslocoTestingModule()],
      providers: [FormBuilder, MockProvider(MatDialog), DatePipe, MockProvider(KeycloakService)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEntityComponent<ExampleDataType>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
