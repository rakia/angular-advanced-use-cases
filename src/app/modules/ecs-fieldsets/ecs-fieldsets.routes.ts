import { Routes } from '@angular/router';
import { EcsFieldsetsContainerComponent } from './containers/ecs-fieldsets-container.component';

export const ecsFieldsetsRoutes: Routes = [
  {
    path: '',
    component: EcsFieldsetsContainerComponent,
    title: 'ECS Fieldsets',
  },
];
