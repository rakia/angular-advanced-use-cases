import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { VersionInfo } from '../../models/version-info.interface';

@Component({
  selector: 'lib-user-menu',
  templateUrl: './user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @Input() userProfile!: { firstName: string; lastName: string; email: string };
  @Input() versionInfo: VersionInfo | null | undefined;
  @Output() logout = new EventEmitter<void>();
}
