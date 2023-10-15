import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { EcsFieldsStoreService } from '../../../ecs-fieldsets/services/ecs-fields/ecs-fields-store.service';
import { EcsFieldsContainerComponent } from './ecs-fields-container.component';

describe('EcsFieldsContainerComponent', () => {
  let component: EcsFieldsContainerComponent;
  let fixture: ComponentFixture<EcsFieldsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcsFieldsContainerComponent],
      imports: [
        getTranslocoTestingModule(),
        MockModule(MatIconModule),
        MockModule(MatTooltipModule),
        RouterTestingModule,
      ],
      providers: [MockProvider(EcsFieldsStoreService)],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsFieldsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
