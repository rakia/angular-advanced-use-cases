import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class CardComponent {
  @Input() expanded = false;
  @Output() toggleExpand = new EventEmitter<void>();
}
