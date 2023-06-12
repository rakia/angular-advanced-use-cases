import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing.module';
import { LOCALSTORAGE_SCHEME_ITEM, SchemeComponent } from './scheme.component';

describe('SchemeComponent', () => {
  let component: SchemeComponent;
  let fixture: ComponentFixture<SchemeComponent>;
  let documentSpy: jest.Mocked<Document>;

  beforeEach(async () => {
    documentSpy = { body: { classList: { remove: jest.fn(), add: jest.fn() } } } as any;

    await TestBed.configureTestingModule({
      declarations: [SchemeComponent],
      imports: [
        getTranslocoTestingModule(),
        MockModule(MatIconModule),
        MockModule(MatMenuModule),
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(SchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call refreshUI on setSelectedScheme', () => {
    const refreshUISpy = jest.spyOn(component, 'refreshUI');
    component.setSelectedScheme('light');
    expect(refreshUISpy).toHaveBeenCalledWith('light');
  });

  it('should set the selected scheme to "light" in local storage', () => {
    localStorage.setItem(LOCALSTORAGE_SCHEME_ITEM, 'light');
    component.ngOnInit();
    expect(component.selectedScheme).toBe('light');
  });

  it('should set the selected scheme to "dark" in local storage', () => {
    localStorage.setItem(LOCALSTORAGE_SCHEME_ITEM, 'dark');
    component.ngOnInit();
    expect(component.selectedScheme).toBe('dark');
  });

  xit('should set light scheme when selected', () => {
    component.setSelectedScheme('light');
    expect(documentSpy.body.classList.add).toHaveBeenCalledWith('light');
    expect(component.scheme).toBe('light');
    expect(component.selectedScheme).toBe('light');
    expect(localStorage.getItem('scheme')).toBe('light');
  });
});
