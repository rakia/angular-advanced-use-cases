import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionButton, ActionType } from './action-button.interface';

@Component({
  selector: 'lib-actions-buttons',
  templateUrl: './actions-buttons.component.html',
})
export class ActionsButtonsComponent {
  @Input() isEditMode = false;
  @Input() isRestoreMode = false;
  @Input() isCreateMode = false;
  @Input() customActionsButtons: ActionButton[] = [];
  @Input() form!: FormGroup;
  @Output() clickEdit = new EventEmitter<void>();
  @Output() clickSave = new EventEmitter<void>();
  @Output() clickCancel = new EventEmitter<void>();
  @Output() clickAction = new EventEmitter<ActionType>();
  @Output() clickRestore = new EventEmitter<void>();
  @Output() clickModifiedRestore = new EventEmitter<void>();
}
