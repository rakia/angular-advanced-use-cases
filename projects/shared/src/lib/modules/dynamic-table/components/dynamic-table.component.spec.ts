import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule } from '@angular/material/sort';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicTableComponent } from './dynamic-table.component';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent<any>;
  let fixture: ComponentFixture<DynamicTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTableComponent],
      imports: [TranslocoModule, MatInputModule, OverlayModule, MatTableModule, NoopAnimationsModule, MatSortModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
