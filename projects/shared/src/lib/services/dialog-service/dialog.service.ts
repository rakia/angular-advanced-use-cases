import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../components/confirm-dialog/dialog-data.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  onClickDelete<T>(onConfirmCallback: (arg: T) => void, arg: T, itemIdentifier: string, dialogData?: DialogData): void {
    // eslint-disable-next-line no-param-reassign
    dialogData = dialogData || {
      hasActions: true,
      mode: `delete`,
      text: itemIdentifier
        ? 'shared.MESSAGES.CONFIRM_DELETE.TEXT_WITH_ITEM_NAME'
        : 'shared.MESSAGES.CONFIRM_DELETE.TEXT',
      title: 'shared.MESSAGES.CONFIRM_DELETE.TITLE',
      itemIdentifier,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        onConfirmCallback(arg);
      }
    });
  }

  onClickCancel<T>(onConfirmCallback: (arg?: T) => void, arg?: T): void {
    const dialogData: DialogData = {
      hasActions: true,
      mode: `confirmAction`,
      text: '', // 'MESSAGES.CONFIRM_CANCEL.TEXT',
      title: 'shared.MESSAGES.CONFIRM_CANCEL.TITLE',
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        if (arg) {
          onConfirmCallback(arg);
        } else {
          onConfirmCallback();
        }
      }
    });
  }

  onClickRestore<T>(onConfirmCallback: (arg?: T) => void, arg?: T): void {
    const dialogData: DialogData = {
      hasActions: true,
      mode: `confirmAction`,
      text: '',
      title: 'shared.MESSAGES.CONFIRM_CANCEL.TITLE',
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        if (arg) {
          onConfirmCallback(arg);
        } else {
          onConfirmCallback();
        }
      }
    });
  }
}
