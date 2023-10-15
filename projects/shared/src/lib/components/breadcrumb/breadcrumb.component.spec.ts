import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MockModule } from 'ng-mocks';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing.module';
import { MOCK_BREADCRUMB_ITEMS } from '../../test-data/breadcrumb';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [
        RouterTestingModule,
        getTranslocoTestingModule(),
        MockModule(MatIconModule),
        MockModule(MatToolbarModule),
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    component.breadcrumbItems = MOCK_BREADCRUMB_ITEMS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find breadcrumb items on the view when breadcrumbItems is not empty', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
    expect(compiled.querySelector('.text-primary-500')).toBeTruthy();
  });
});
