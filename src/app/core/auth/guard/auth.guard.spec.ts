import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let keycloak: KeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeycloakService],
    });
    router = { navigate: jest.fn() } as any;
    keycloak = {
      login: jest.fn(),
      authenticated: true,
    } as any;
    authGuard = new AuthGuard(router, keycloak);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should redirect to login if not authenticated', async () => {
    // setup
    const getMock = jest.fn(() => '1');
    const paramMapMock = { get: getMock } as any;
    const route = { paramMap: paramMapMock } as ActivatedRouteSnapshot;
    const state = { url: '/releases/1/overview' } as RouterStateSnapshot;
    // when
    await authGuard.isAccessAllowed(route, state);
    // then
    expect(keycloak.login).toHaveBeenCalledWith({ redirectUri: `${window.location.origin}/releases/1/overview` });
  });
});
