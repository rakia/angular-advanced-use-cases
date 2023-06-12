import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { SidenavItem } from '../../models/sidenav-item.interface';
import { MetaInfoService } from '../../services/meta-info.service';

@Component({
  selector: 'lib-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavWrapperComponent {
  private metaInfoService = inject(MetaInfoService);
  @Input() userProfile = { firstName: 'Rakia', lastName: 'Ben Sassi', email: 'rakia@email.com' };
  @Input() sidenavItems!: SidenavItem[];
  @Input() frontendCommitHash!: string;
  @Input() apiBase!: string;
  @Input() showLogprepVersion: boolean = true;

  isExpanded: boolean = true;
  scheme: 'dark' | 'light' = 'light';

  logout(): void {
    // await this.keycloakService.logout();
  }
}
