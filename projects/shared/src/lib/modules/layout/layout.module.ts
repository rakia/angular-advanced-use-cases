import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModule } from '../loading-progress/loading.module';
import { SchemeComponent } from './components/scheme/scheme.component';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { MetaInfoService } from './services/meta-info.service';

@NgModule({
  declarations: [SidenavWrapperComponent, UserMenuComponent, SchemeComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    LoadingModule,
  ],
  providers: [MetaInfoService],
  exports: [SidenavWrapperComponent],
})
export class LayoutModule {}
