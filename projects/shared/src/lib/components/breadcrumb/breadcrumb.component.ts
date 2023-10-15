import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoCoreModule } from '../../transloco/transloco.module';
import { BreadcrumbItem } from './models/breadcrumb-item.interface';

@Component({
  selector: 'lib-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoCoreModule, RouterModule, MatIconModule, MatToolbarModule],
})
export class BreadcrumbComponent {
  @Input() breadcrumbItems: BreadcrumbItem[] = [];
}
