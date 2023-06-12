import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationTab } from './navigation-tab.interface';

@Component({
  selector: 'lib-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  @Input() navTabs: NavigationTab[] = [];
  @Output() selectedIndexChange = new EventEmitter<NavigationTab>();
}
