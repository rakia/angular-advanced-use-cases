import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockComponent, MockModule } from 'ng-mocks';
import { CardComponent, FileUploadComponent } from 'projects/shared/src/public-api';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { UploadEcsFieldsetsComponent } from './upload-ecs-fieldsets.component';

describe('UploadEcsFieldsetsComponent', () => {
  let component: UploadEcsFieldsetsComponent;
  let fixture: ComponentFixture<UploadEcsFieldsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadEcsFieldsetsComponent, MockComponent(CardComponent), MockComponent(FileUploadComponent)],
      imports: [
        getTranslocoTestingModule(),
        MockModule(MatButtonModule),
        MockModule(MatDialogModule),
        MockModule(MatExpansionModule),
        MockModule(MatIconModule),
        MockModule(MatInputModule),
        MockModule(MatOptionModule),
        MockModule(MatSelectModule),
        MockModule(MatTooltipModule),
        MockModule(FormsModule),
        MockModule(ReactiveFormsModule),
      ],
      providers: [FormBuilder, MatSnackBar],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadEcsFieldsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
