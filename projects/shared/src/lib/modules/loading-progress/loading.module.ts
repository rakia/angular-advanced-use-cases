import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingService } from './services/loading.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingProgressComponent } from './components/loading-progress.component';

@NgModule({
  declarations: [LoadingProgressComponent],
  imports: [BrowserModule, HttpClientModule, MatProgressSpinnerModule],
  providers: [LoadingService, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  exports: [LoadingProgressComponent],
})
export class LoadingModule {}
