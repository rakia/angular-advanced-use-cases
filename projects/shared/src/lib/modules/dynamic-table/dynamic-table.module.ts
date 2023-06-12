import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSortModule } from '@angular/material/sort';
import { DynamicTableComponent } from './components/dynamic-table.component';

@NgModule({
  declarations: [DynamicTableComponent],
  imports: [TranslocoModule, MatInputModule, OverlayModule, MatTableModule, CommonModule, MatSortModule],
  exports: [DynamicTableComponent],
  providers: [],
})
export class DynamicTableModule {}
