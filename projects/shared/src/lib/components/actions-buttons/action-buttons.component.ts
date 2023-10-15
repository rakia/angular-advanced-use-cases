import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActionButton, ActionType } from './action-button.interface';
import { TranslocoCoreModule } from '../../transloco/transloco.module';

@Component({
  selector: 'lib-action-buttons',
  templateUrl: './action-buttons.component.html',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, TranslocoCoreModule, MatButtonModule, MatIconModule],
})
export class ActionButtonsComponent {
  @Input() isEditMode = false;
  @Input() isRestoreMode = false;
  @Input() isCreateMode = false;
  @Input() customActionsButtons: ActionButton[] = [];
  @Input() form!: FormGroup;
  @Output() clickEdit = new EventEmitter<void>();
  @Output() clickSave = new EventEmitter<void>();
  @Output() clickCancel = new EventEmitter<void>();
  @Output() clickAction = new EventEmitter<ActionType>();
}
