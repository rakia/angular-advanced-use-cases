import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipsListComponent } from 'projects/shared/src/public-api';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { EcsFieldAllowedValuesComponent } from './ecs-field-allowed-values.component';

describe('EcsFieldAllowedValuesComponent', () => {
  let component: EcsFieldAllowedValuesComponent;
  let fixture: ComponentFixture<EcsFieldAllowedValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcsFieldAllowedValuesComponent, ChipsListComponent],
      imports: [getTranslocoTestingModule()],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsFieldAllowedValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
