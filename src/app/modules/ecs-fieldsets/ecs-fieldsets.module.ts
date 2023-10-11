import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ChipsListComponent, EditObjectChipsListComponent, EditStringChipsListComponent, FileUploadComponent, FormService, SharedModule } from 'projects/shared/src/public-api';
import { EcsFieldsetsContainerComponent } from './containers/ecs-fieldsets-container.component';
import { ecsFieldsetsRoutes } from './ecs-fieldsets.routes';
import { EcsFieldAllowedValuesComponent } from './presenters/ecs-field-allowed-values/ecs-field-allowed-values.component';
import { CreateCustomFieldComponent } from './presenters/ecs-field/create-custom-field/create-custom-field.component';
import { EcsFieldComponent } from './presenters/ecs-field/ecs-field.component';
import { CreateCustomFieldsetComponent } from './presenters/ecs-fieldset/create-custom-field/create-custom-fieldset.component';
import { EcsFieldsetComponent } from './presenters/ecs-fieldset/ecs-fieldset.component';
import { EcsFieldsetsWithDetailsComponent } from './presenters/ecs-fieldsets-with-details/ecs-fieldsets-with-details.component';
import { UploadEcsFieldsetsComponent } from './presenters/upload-ecs-fieldsets/upload-ecs-fieldsets.component';
import { EcsFieldsStoreService } from './services/ecs-fields/ecs-fields-store.service';
import { EcsFieldsService } from './services/ecs-fields/ecs-fields.service';
import { EcsFieldsetsReusedStoreService } from './services/ecs-fieldsets-reused/ecs-fieldsets-reused-store.service';
import { EcsFieldsetsReusedService } from './services/ecs-fieldsets-reused/ecs-fieldsets-reused.service';
import { EcsFieldsetsStoreService } from './services/ecs-fieldsets/ecs-fieldsets-store.service';
import { EcsFieldsetsService } from './services/ecs-fieldsets/ecs-fieldsets.service';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    EcsFieldsetsContainerComponent,
    UploadEcsFieldsetsComponent,
    EcsFieldsetsWithDetailsComponent,
    EcsFieldsetComponent,
    CreateCustomFieldsetComponent,
    EcsFieldComponent,
    CreateCustomFieldComponent,
    EcsFieldAllowedValuesComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(ecsFieldsetsRoutes),
    TranslocoModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDividerModule,
    FileUploadComponent,
    ChipsListComponent,
    EditObjectChipsListComponent,
    EditStringChipsListComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
  ],
  providers: [
    DatePipe,
    EcsFieldsetsService,
    EcsFieldsetsStoreService,
    EcsFieldsStoreService,
    EcsFieldsService,
    EcsFieldsetsReusedStoreService,
    EcsFieldsetsReusedService,
    FormService,
  ],
})
export class EcsFieldsetsModule {}
