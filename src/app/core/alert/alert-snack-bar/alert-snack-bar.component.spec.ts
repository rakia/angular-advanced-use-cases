import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MockModule, MockProvider } from 'ng-mocks';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { AlertSnackBarComponent } from './alert-snack-bar.component';

describe('AlertSnackBarComponent', () => {
  let component: AlertSnackBarComponent;
  let fixture: ComponentFixture<AlertSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertSnackBarComponent],
      imports: [getTranslocoTestingModule(), MockModule(MatIconModule), MockModule(MatMenuModule)],
      providers: [MockProvider(MatSnackBarRef), { provide: MAT_SNACK_BAR_DATA, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
