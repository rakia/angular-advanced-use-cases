import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoCoreModule } from '../../transloco/transloco.module';
import { CustomAutocompleteComponent } from './components/custom-autocomplete/custom-autocomplete.component';
import { DynamicTableModule } from '../dynamic-table/dynamic-table.module';

@NgModule({
  declarations: [CustomAutocompleteComponent],
  imports: [
    CommonModule,
    DynamicTableModule,
    TranslocoCoreModule,
    MatInputModule,
    OverlayModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [CustomAutocompleteComponent],
  providers: [],
})
export class CustomAutocompleteModule {}
