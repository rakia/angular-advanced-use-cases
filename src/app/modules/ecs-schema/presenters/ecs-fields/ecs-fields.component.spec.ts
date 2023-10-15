import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcsFieldsComponent } from './ecs-fields.component';

describe('ReleaseComponent', () => {
  let component: EcsFieldsComponent;
  let fixture: ComponentFixture<EcsFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcsFieldsComponent],
      imports: [],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
