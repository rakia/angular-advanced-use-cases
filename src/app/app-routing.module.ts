import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ecs-fieldsets',
    loadChildren: () => import('./modules/ecs-fieldsets/ecs-fieldsets.module').then((m) => m.EcsFieldsetsModule),
  },
  {
    path: 'ecs-schema',
    loadChildren: () => import('./modules/ecs-schema/ecs-schema.module').then((m) => m.EcsSchemaModule),
  },
  {
    path: 'file-upload',
    loadChildren: () => import('./modules/ecs-fieldsets/ecs-fieldsets.module').then((m) => m.EcsFieldsetsModule),
  },
  {
    path: '**',
    redirectTo: '/ecs-schema/ecs-fieldsets',
    pathMatch: 'full',
  },
];

const routerOptions: ExtraOptions = { anchorScrolling: 'enabled', enableTracing: false };

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
