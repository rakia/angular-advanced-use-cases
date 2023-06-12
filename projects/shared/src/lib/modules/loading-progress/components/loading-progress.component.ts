import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'lib-loading-progress',
  templateUrl: './loading-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingProgressComponent {
  isLoading$ = this.loadingService.isLoading.asObservable();

  constructor(private loadingService: LoadingService) {}
}
