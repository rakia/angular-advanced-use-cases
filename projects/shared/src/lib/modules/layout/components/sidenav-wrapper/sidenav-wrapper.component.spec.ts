import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { MockModule, MockProviders } from 'ng-mocks';
import { KeycloakProfile } from 'keycloak-js';
import { of } from 'rxjs';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing.module';
import { LoadingProgressComponent } from '../../../loading-progress/components/loading-progress.component';
import { MetaInfoService } from '../../services/meta-info.service';
import { SchemeComponent } from '../scheme/scheme.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { SidenavWrapperComponent } from './sidenav-wrapper.component';

const MOCK_APIBASE = 'http://localhost:3000';

describe('SidenavWrapperComponent', () => {
  let component: SidenavWrapperComponent;
  let fixture: ComponentFixture<SidenavWrapperComponent>;
  let keycloakService: KeycloakService;
  let metaInfoService: MetaInfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavWrapperComponent, UserMenuComponent, SchemeComponent, LoadingProgressComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        getTranslocoTestingModule(),
        MockModule(MatToolbarModule),
        MockModule(MatIconModule),
        MockModule(MatSidenavModule),
        MockModule(MatMenuModule),
        MockModule(MatListModule),
      ],
      providers: [MockProviders(KeycloakService, MetaInfoService)],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavWrapperComponent);
    component = fixture.componentInstance;
    component.apiBase = MOCK_APIBASE;
    keycloakService = TestBed.inject(KeycloakService);
    metaInfoService = TestBed.inject(MetaInfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not translate translations without correct scope "shared"', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h4').textContent).toEqual('TOOLBAR.TITLE');
  });

  it('should load user profile and get meta infos', async () => {
    jest.spyOn(keycloakService, 'loadUserProfile').mockResolvedValue({} as KeycloakProfile);
    jest.spyOn(metaInfoService, 'getMetaInfo').mockReturnValue(
      of({
        lastCommit: '123456',
        logprepVersion: '1.0.0',
      })
    );
    await component.ngOnInit();
    expect(keycloakService.loadUserProfile).toHaveBeenCalledTimes(1);
    expect(metaInfoService.getMetaInfo).toHaveBeenCalledTimes(1);
    expect(metaInfoService.getMetaInfo).toHaveBeenCalledWith('http://localhost:3000');
  });
});
