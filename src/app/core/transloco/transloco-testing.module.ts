import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
// @ts-ignore
import de from 'src/assets/i18n/de.json';
// @ts-ignore
import en from 'src/assets/i18n/en.json';

export function getTranslocoTestingModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { de, en },
    translocoConfig: {
      availableLangs: ['de', 'en'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
