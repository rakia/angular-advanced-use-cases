import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ObjectType } from '../../models/object.types';

@Component({
  selector: 'lib-chips-list',
  templateUrl: './chips-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsListComponent {
  @Input() values: ObjectType[] = [];
  @Input() stringValues: string[] = [];
  @Input() keyToDisplay!: string;
  @Input() id!: string;
  @Input() title?: string;
  @Input() hoverDescription = '';
  @Input() selectedId: string | undefined;
  @Input() allSelected = false;
  @Input() isClickable = false;
  @Output() clickValue = new EventEmitter<ObjectType>();
  @Output() clickStringValue = new EventEmitter<string>();

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
