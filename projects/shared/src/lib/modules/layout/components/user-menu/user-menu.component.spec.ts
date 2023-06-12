import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MockModule } from 'ng-mocks';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing.module';
import { UserMenuComponent } from './user-menu.component';
import { VersionInfo } from '../../models/version-info.interface';

const MOCK_VERSION_INFO: VersionInfo = {
  frontendCommitHash: '34abcdef',
  backendCommitHash: 'abcdef12',
  logprepVersion: '1.0.0',
};

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [
        getTranslocoTestingModule(),
        MockModule(MatIconModule),
        MockModule(MatMenuModule),
        MockModule(MatListModule),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    component.versionInfo = MOCK_VERSION_INFO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should translate meta information', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#versionNumber').textContent).toContain('Versionsnummer');
    expect(compiled.querySelector('#backendCommitHash').textContent).toContain('Backend');
    expect(compiled.querySelector('#frontendCommitHash').textContent).toContain('Frontend');
    expect(compiled.querySelector('#logprepVersion').textContent).toContain('Logprep');
  });
});
