import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  Translation,
  TranslocoModule,
  TranslocoService,
  translocoConfig,
} from '@ngneat/transloco';
import { environment } from '../../../environments/environment';
import { TranslocoHttpLoader } from './transloco.http-loader';

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
        prodMode: environment.production,
      }),
    },
    // Provide the default Transloco loader
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
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
