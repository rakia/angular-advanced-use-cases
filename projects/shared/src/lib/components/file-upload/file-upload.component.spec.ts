import { FormControl, FormGroup, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';

@Component({
  template: `
    <form [formGroup]="formGroup">
      <mat-form-field>
        <lib-file-upload formControlName="file"></lib-file-upload>
      </mat-form-field>
    </form>
  `,
})
class TestHostComponent {
  formGroup = new FormGroup({
    file: new FormControl(null),
  });
}

describe('FileUploadComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [FileUploadComponent, ReactiveFormsModule, MatFormFieldModule, NoopAnimationsModule],
      providers: [{ provide: NgControl, useValue: new FormControl() }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
