import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslocoCoreModule } from 'src/app/core/transloco/transloco.module';
import { BreadcrumbComponent, NavigationBarComponent, DynamicTableModule } from 'projects/shared/src/public-api';
import { EcsSchemaDetailsContainerComponent } from './containers/ecs-schema-details/ecs-schema-details-container.component';
import { EcsFieldsStoreService } from '../ecs-fieldsets/services/ecs-fields/ecs-fields-store.service';
import { EcsFieldsetsModule } from '../ecs-fieldsets/ecs-fieldsets.module';
import { EcsFieldsComponent } from './presenters/ecs-fields/ecs-fields.component';
import { ecsSchemaRoutes } from './ecs-schema.routes';
import { EcsFieldsContainerComponent } from './containers/ecs-fields/ecs-fields-container.component';

@NgModule({
  declarations: [EcsSchemaDetailsContainerComponent, EcsFieldsContainerComponent, EcsFieldsComponent],
  imports: [
    CommonModule,
    TranslocoCoreModule,
    RouterModule.forChild(ecsSchemaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    EcsFieldsetsModule,
    BreadcrumbComponent,
    NavigationBarComponent,
    DynamicTableModule,
  ],
  providers: [DatePipe, EcsFieldsStoreService],
})
export class EcsSchemaModule {}
