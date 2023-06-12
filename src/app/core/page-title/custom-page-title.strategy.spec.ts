import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoService } from '@ngneat/transloco';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { CustomPageTitleStrategy } from './custom-page-title.strategy';

describe('CustomPageTitleStrategy', () => {
  let title: Title;
  let translateService: TranslocoService;
  let customPageTitleStrategy: CustomPageTitleStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, getTranslocoTestingModule()],
      providers: [Title, CustomPageTitleStrategy],
    });
    title = TestBed.inject(Title);
    translateService = TestBed.inject(TranslocoService);
    customPageTitleStrategy = TestBed.inject(CustomPageTitleStrategy);
  });

  it('should be created', () => {
    expect(customPageTitleStrategy).toBeTruthy();
  });

  it('should set the default title when no title is provided', () => {
    jest.spyOn(translateService, 'translate').mockReturnValue('FDA - Field Directory Application');
    jest.spyOn(title, 'setTitle');
    customPageTitleStrategy.updateTitle({ url: '/dashboard' } as RouterStateSnapshot);
    expect(translateService.translate).toHaveBeenCalledWith('APP_LONG_TITLE');
    expect(title.setTitle).toHaveBeenCalledWith('FDA - Field Directory Application');
  });

  it('should set the title to the short title and the provided title', () => {
    jest.spyOn(customPageTitleStrategy, 'buildTitle').mockReturnValue('My Page');
    jest.spyOn(translateService, 'translate').mockReturnValue('FDA');
    jest.spyOn(title, 'setTitle');
    customPageTitleStrategy.updateTitle({ url: '' } as RouterStateSnapshot); // , data: { title: 'My Page' }
    expect(translateService.translate).toHaveBeenCalledWith('APP_SHORT_TITLE');
    expect(title.setTitle).toHaveBeenCalledWith('FDA | My Page');
  });

  it('should set the title to the long title when no title is provided', () => {
    const routerState = {} as RouterStateSnapshot;
    jest.spyOn(translateService, 'translate').mockReturnValue('My FDA App');
    customPageTitleStrategy.updateTitle(routerState);
    expect(title.getTitle()).toBe('My FDA App');
  });
});
