import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSortModule } from '@angular/material/sort';
import { TranslocoCoreModule } from '../../transloco/transloco.module';
import { DynamicTableComponent } from './components/dynamic-table.component';

@NgModule({
  declarations: [DynamicTableComponent],
  imports: [TranslocoCoreModule, MatInputModule, OverlayModule, MatTableModule, CommonModule, MatSortModule],
  exports: [DynamicTableComponent],
  providers: [],
})
export class DynamicTableModule {}
