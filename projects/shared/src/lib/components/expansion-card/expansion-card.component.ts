import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-expansion-card',
  templateUrl: './expansion-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
})
export class ExpansionCardComponent {
  @Input() title!: string;
  @Input() id?: string | undefined;
  @Input() expanded = false;
  @Output() toggleExpand = new EventEmitter<void>();
}
