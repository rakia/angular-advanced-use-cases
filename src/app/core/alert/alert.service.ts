import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { HashMap } from '@ngneat/transloco/lib/types';
import { AlertType } from './alert.types';
import { SnackBarData } from './alert-snack-bar/snack-bar-data.interface';
import { AlertAppearance } from './alert-appearance.types';
import { AlertSnackBarComponent } from './alert-snack-bar/alert-snack-bar.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private snackBar: MatSnackBar, private translateService: TranslocoService) {}

  openSnackBar(
    message: string,
    messageParams?: HashMap,
    type: AlertType = 'info',
    translate: boolean = false,
    duration: number = 5000,
    appearance: AlertAppearance = 'fill',
    buttonLabel: string = 'X', // If we want a button, this is its label. It could be 'Ok', 'Close', etc
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ) {
    let translatedMessage = message;
    if (translate) {
      translatedMessage = this.translateService.translate(message, messageParams);
    }

    const snackBarData: SnackBarData = {
      message: translatedMessage,
      // eslint-disable-next-line no-nested-ternary
      // icon: type === 'success' ? 'done' : type === 'error' ? 'warning' : 'info',
      buttonLabel,
    };

    this.snackBar.openFromComponent(AlertSnackBarComponent, {
      data: snackBarData,
      duration,
      panelClass: [`alert-type-${appearance}-${type}`],
      verticalPosition, // 'top' | 'bottom'
      horizontalPosition, // 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
