import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-expansion-card',
  templateUrl: './expansion-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ExpansionCardComponent {
  @Input() title!: string;
  @Input() id?: string | undefined;
  @Input() expanded = false;
  @Output() toggleExpand = new EventEmitter<void>();
}
