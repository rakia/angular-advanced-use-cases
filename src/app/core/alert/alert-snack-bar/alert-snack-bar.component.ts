import { ChangeDetectionStrategy, Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from './snack-bar-data.interface';

@Component({
  selector: 'app-alert-snack-bar',
  templateUrl: './alert-snack-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AlertSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
}
