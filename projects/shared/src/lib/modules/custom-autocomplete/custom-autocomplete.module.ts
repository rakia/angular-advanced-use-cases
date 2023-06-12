import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomAutocompleteComponent } from './components/custom-autocomplete/custom-autocomplete.component';
import { DynamicTableModule } from '../dynamic-table/dynamic-table.module';

@NgModule({
  declarations: [CustomAutocompleteComponent],
  imports: [
    CommonModule,
    DynamicTableModule,
    TranslocoModule,
    MatInputModule,
    OverlayModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [CustomAutocompleteComponent],
  providers: [],
})
export class CustomAutocompleteModule {}
