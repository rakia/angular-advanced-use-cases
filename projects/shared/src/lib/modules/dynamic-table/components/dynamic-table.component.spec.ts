import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueryList, SimpleChange } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatColumnDef, MatHeaderRowDef, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing.module';
import { DYNAMIC_TABLE_TEST_DATA } from '../../../test-data/dynamic-table';
import { DynamicTableComponent } from './dynamic-table.component';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent<any>;
  let fixture: ComponentFixture<DynamicTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTableComponent],
      imports: [
        getTranslocoTestingModule(),
        MatInputModule,
        OverlayModule,
        MatTableModule,
        NoopAnimationsModule,
        MatSortModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    component.dataList = DYNAMIC_TABLE_TEST_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit rowSelected event when selectRow is called', () => {
    jest.spyOn(component.rowSelected, 'emit');
    const testRow = DYNAMIC_TABLE_TEST_DATA[0];
    component.selectRow(testRow);
    expect(component.rowSelected.emit).toHaveBeenCalledWith(testRow);
  });

  it('should update dataSource when dataList changes', () => {
    const newDataList = [
      { id: 3, name: 'Alice' },
      { id: 4, name: 'Bob' },
    ];
    component.dataList = newDataList;
    fixture.detectChanges();

    const initialDataSource = component.dataSource;
    expect(initialDataSource.data).toEqual([]);

    const changes = { dataList: new SimpleChange(DYNAMIC_TABLE_TEST_DATA, newDataList, false) };
    component.ngOnChanges(changes);
    fixture.detectChanges();

    const updatedDataSource = component.dataSource;
    expect(updatedDataSource.data).toEqual(newDataList);
  });

  it('should initialize column, header row definitions, and selection in ngAfterContentInit', () => {
    const columnDef1 = new MatColumnDef();
    const columnDef2 = new MatColumnDef();
    component.columnDefs = new QueryList<MatColumnDef>();
    component.headerRowDefs = new QueryList<MatHeaderRowDef>();
    component.columnDefs.reset([columnDef1, columnDef2]);
    fixture.detectChanges();

    jest.spyOn(component.table!, 'addColumnDef').mockReturnValue(undefined);
    jest.spyOn(component.table!, 'addRowDef').mockReturnValue(undefined);
    jest.spyOn(component.table!, 'addHeaderRowDef').mockReturnValue(undefined);

    component.ngAfterContentInit();
    expect(component.table!.addColumnDef).toHaveBeenCalledTimes(2);
    expect(component.selection instanceof SelectionModel).toBeTruthy();
  });
});
