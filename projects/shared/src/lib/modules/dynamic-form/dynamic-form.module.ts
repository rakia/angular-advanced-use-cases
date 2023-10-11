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
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { CustomAutocompleteModule } from '../custom-autocomplete/custom-autocomplete.module';
import {EditStringChipsListComponent} from "../../components/edit-string-chips-list/edit-string-chips-list.component";

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    TranslocoModule,
    MatInputModule,
    OverlayModule,
    CustomAutocompleteModule,
    SharedModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    CommonModule,
    MatButtonModule,
    EditStringChipsListComponent,
  ],
  exports: [DynamicFormComponent],
  providers: [],
})
export class DynamicFormModule {}
