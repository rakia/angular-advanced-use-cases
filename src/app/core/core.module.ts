import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy } from '@angular/router';
import { LoadingModule } from 'projects/shared/src/public-api';
import { AlertSnackBarComponent } from './alert/alert-snack-bar/alert-snack-bar.component';
import { AuthModule } from './auth/auth.module';
import { CustomPageTitleStrategy } from './page-title/custom-page-title.strategy';
import { TranslocoCoreModule } from './transloco/transloco.module';

@NgModule({
  declarations: [AlertSnackBarComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    TranslocoCoreModule,
    LoadingModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: TitleStrategy, useClass: CustomPageTitleStrategy },
    {
      // Use appearance='outline' & floatLabel='always' on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
  }
}
