import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class CustomPageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private translateService: TranslocoService) {
    super();
  }

  updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (!title) {
      const longTitle = this.translateService.translate('APP_LONG_TITLE');
      this.title.setTitle(longTitle); // same as document.title = 'FDA - Field Directory Application'
    } else {
      const shortTitle = this.translateService.translate('APP_SHORT_TITLE');
      this.title.setTitle(`${shortTitle} | ${title}`); // same as document.title = `FDA - ${title}`
    }
  }
}
