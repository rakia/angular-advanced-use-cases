import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslocoCoreModule } from '../../transloco/transloco.module';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { EditStringChipsListComponent } from '../../components/edit-chips-list/edit-string-chips-list/edit-string-chips-list.component';
import { EditKeyValueChipsListComponent } from '../../components/edit-chips-list/edit-key-value-chips-list/edit-key-value-chips-list.component';
import { CustomAutocompleteModule } from '../custom-autocomplete/custom-autocomplete.module';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    EditStringChipsListComponent,
    EditKeyValueChipsListComponent,
    TranslocoCoreModule,
    MatInputModule,
    OverlayModule,
    CustomAutocompleteModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    CommonModule,
    MatButtonModule,
  ],
  exports: [DynamicFormComponent],
  providers: [],
})
export class DynamicFormModule {}
