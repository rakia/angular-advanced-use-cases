import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EcsField } from '../../../ecs-fieldsets/models/ecs-field.interface';

/**
 * This is the presenter component to display the ecs-fields list and handle UI logic.
 */
@Component({
  selector: 'app-ecs-fields',
  templateUrl: './ecs-fields.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsFieldsComponent {
  @Input({ required: true }) ecsFields: EcsField[] | null | undefined;
}
