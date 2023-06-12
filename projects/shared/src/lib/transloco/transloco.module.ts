import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_SCOPE,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';

export const loader = ['en', 'de'].reduce((acc: any, lang) => {
  acc[lang] = () => import(`../i18n/${lang}.json`);
  return acc;
}, {});

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      // Provide the default Transloco configuration
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [{ id: 'de', label: 'Deutsch' }, { id: 'en', label: 'English' }],
        defaultLang: 'en',
        fallbackLang: 'en',
      }),
    },
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'shared', loader },
    },
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      deps: [TranslocoService],
      useFactory:
        (translocoService: TranslocoService): any =>
        (): Promise<Translation | undefined> => {
          const defaultLang = translocoService.getDefaultLang();
          translocoService.setActiveLang(defaultLang);
          return translocoService.load(defaultLang).toPromise();
        },
      multi: true,
    },
  ],
})
export class TranslocoCoreModule {}
