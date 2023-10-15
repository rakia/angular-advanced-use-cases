import { Routes } from '@angular/router';
import { EcsFieldsContainerComponent } from './containers/ecs-fields/ecs-fields-container.component';
import { EcsFieldsetsContainerComponent } from '../ecs-fieldsets/containers/ecs-fieldsets-container.component';
import { EcsSchemaDetailsContainerComponent } from './containers/ecs-schema-details/ecs-schema-details-container.component';

/**
 * This is the routing configuration for the ecs-schema module.
 */
export const ecsSchemaRoutes: Routes = [
  {
    path: '', // :version
    component: EcsSchemaDetailsContainerComponent,
    children: [
      { path: 'ecs-fieldsets', component: EcsFieldsetsContainerComponent },
      { path: 'ecs-fields', component: EcsFieldsContainerComponent },
    ],
  },
];
