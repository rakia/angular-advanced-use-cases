import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EcsFieldAllowedValue } from '../../models/ecs-field.interface';

@Component({
  selector: 'app-ecs-field-allowed-values',
  templateUrl: './ecs-field-allowed-values.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsFieldAllowedValuesComponent {
  @Input() ecsFieldAllowedValues!: EcsFieldAllowedValue[];
  @Input() hoverDescription: string = '';
}
