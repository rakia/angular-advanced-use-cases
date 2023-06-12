import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
  ContentChildren,
  ViewChild,
  ContentChild,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  OnInit,
  OnChanges,
  AfterContentInit,
} from '@angular/core';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ColumnDefinition } from '../column-definition.model';

@Component({
  selector: 'lib-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent<T> implements OnInit, OnChanges, AfterContentInit {
  @Input() highlightRowIndex = -1;

  @Input() displayColumnDefs: ColumnDefinition[] = [];
  @Input() dataList: T[] | undefined;
  @Output() rowSelected = new EventEmitter<T>();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>([]);
  selection: SelectionModel<T> | undefined;

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef> | undefined;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>> | undefined;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef> | undefined;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow | undefined;

  @ViewChild(MatTable, { static: true }) table: MatTable<T> | undefined;
  @ViewChildren('matrow', { read: ViewContainerRef }) rows: QueryList<ViewContainerRef> | undefined;

  ngAfterContentInit(): void {
    this.columnDefs?.forEach((columnDef) => this.table?.addColumnDef(columnDef));
    this.rowDefs?.forEach((rowDef) => this.table?.addRowDef(rowDef));
    this.headerRowDefs?.forEach((headerRowDef) => this.table?.addHeaderRowDef(headerRowDef));

    // init grid state
    this.selection = new SelectionModel<T>(true, []);
    this.table?.setNoDataRow(this.noDataRow!);
  }

  ngOnInit(): void {
    if (!this.displayedColumns) {
      this.displayedColumns = this.displayColumnDefs.map((col) => col.key);
      // eslint-disable-next-line no-param-reassign,no-return-assign
      this.displayColumnDefs.forEach((col, index) => (col.index = index));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataList']?.currentValue) {
      this.dataSource = new MatTableDataSource<T>(this.dataList);
    }
    if (changes['displayColumnDefs']?.currentValue) {
      this.displayedColumns = this.displayColumnDefs.map((col) => col.key);
    }
  }

  selectRow(row: T): void {
    this.rowSelected.emit(row);
  }
}
