import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoCoreModule } from '../../transloco/transloco.module';
import { NavigationTab } from './models/navigation-tab.interface';

@Component({
  selector: 'lib-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatTabsModule, TranslocoCoreModule, RouterLink, RouterOutlet, RouterLinkActive],
})
export class NavigationBarComponent {
  @Input() navTabs: NavigationTab[] = [];
  @Output() selectedIndexChange = new EventEmitter<NavigationTab>();
}
