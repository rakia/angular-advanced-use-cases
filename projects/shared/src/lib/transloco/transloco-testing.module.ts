import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
// @ts-ignore
import de from '../i18n/de.json';
// @ts-ignore
import en from '../i18n/en.json';

// DO NOT EXPOSE THIS TRANSLOCO TESTING MODULE
// ONLY FOR TESTS IN THIS SHARED MODULE
export function getTranslocoTestingModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { 'shared/de': de, 'shared/en': en },
    translocoConfig: {
      availableLangs: [{ id: 'de', label: 'Deutsch' }, { id: 'en', label: 'English' }],
      defaultLang: 'en',
      fallbackLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
