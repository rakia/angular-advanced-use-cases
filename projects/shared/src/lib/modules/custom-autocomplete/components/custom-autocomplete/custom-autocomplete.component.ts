import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnDefinition } from '../../../dynamic-table/column-definition.model';

@Component({
  selector: 'lib-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomAutocompleteComponent),
      multi: true,
    },
  ],
})
export class CustomAutocompleteComponent<T>
  implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() displayColumnDefs: ColumnDefinition[] | undefined;
  @Input() searchLabel: string | undefined;
  @Input() searchColumn: string | number | undefined; // TODO: with Angular 16, add required to this & other inputs
  @Input() filterableColumns?: string[];
  @Input() optionsList: T[] | undefined;
  @Input() overlayHasFocus = true;
  @Input() required?: boolean = false;
  @Input() hasFocus?: boolean = false;
  @Input() hasCancelButton?: boolean = false;
  @Input() hintMessage?: string;
  @Input() errorMessage?: string;
  @Output() optionSelected = new EventEmitter<T>();
  @Output() blurSearchField = new EventEmitter<boolean>();
  @Output() searchQueryChanged = new EventEmitter<string>();

  searchFormControl: FormControl<any> = new FormControl('');
  currentOption: T | undefined;

  @ViewChild('searchInputField', { read: ElementRef }) searchInputField: ElementRef | undefined;
  @ViewChild('sort', { static: true }) sort: MatSort | undefined;

  destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<T>([]);
  highlightRowIndex = -1;
  isOverlayOpen = false;
  overlayPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.searchFormControl.setValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchFormControl.disable();
    } else {
      this.searchFormControl.enable();
    }
  }

  ngOnInit(): void {
    // @ts-ignore
    this.dataSource.sort = this.sort;
    this.onSearchQueryChanged();
  }

  ngAfterViewInit(): void {
    if (this.hasFocus) {
      this.searchInputField?.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hasFocus']?.currentValue && this.searchInputField) {
      this.searchInputField.nativeElement.focus();
      this.onFocusSearchField();
    }
    if (changes['required']) {
      if (this.required) {
        this.searchFormControl.setValidators([Validators.required]);
      } else {
        this.searchFormControl.clearValidators();
      }
      this.searchFormControl.updateValueAndValidity();
    }
    if (changes['optionsList']?.currentValue) {
      this.dataSource = new MatTableDataSource<T>(this.optionsList);
      this.highlightRowIndex = -1;
    }
    if (changes['filterableColumns']?.currentValue?.length) {
      this.dataSource.filterPredicate = (data: T, filter: string) => {
        let dataMatchesFilter = false;
        const filterText = filter.trim().toLowerCase();
        this.filterableColumns?.forEach((field) => {
          // @ts-ignore
          dataMatchesFilter = dataMatchesFilter || data[field].toLowerCase().includes(filterText);
        });
        return dataMatchesFilter;
      };
    }
  }

  /**
   * The goal here is to automatically show the drop-down (the overlay with list of options) when user sets the focus in the search-field.
   * Since the drop-down (overlay) is configured this way: [cdkConnectedOverlayOpen]="isOverlayOpen",
   * we need to set isOverlayOpen to true to open it.
   * So when optionsList is not empty and the search-field searchFormControl has no value yet, and user sets focus in it,
   * it will show up the list of options just like any other standard mat-select or mat-autocomplete.
   */
  onFocusSearchField(): void {
    this.isOverlayOpen = !!(this.optionsList && this.optionsList?.length && !this.searchFormControl?.value);
  }

  onClickRemoveSearchQuery(event: MouseEvent): void {
    event.stopPropagation();
    this.searchFormControl.setValue('');
    this.onChange('');
    this.onTouched();
    this.applyFilter('');
  }

  onSearchQueryChanged(): void {
    this.searchFormControl?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(150), // debounce searchQueries & dismiss consecutive duplicates
        distinctUntilChanged()
      )
      .subscribe((searchQuery) => {
        this.onChange(searchQuery);
        this.onTouched();
        this.applyFilter(searchQuery);
        this.searchQueryChanged.emit(searchQuery);
      });
  }

  applyFilter(searchQuery: string): void {
    this.dataSource.filter = searchQuery.trim().toLowerCase();
    // console.log(`filtered data: ${this.dataSource.filteredData.length}`);
    this.cdRef.markForCheck();
  }

  /**
   * Navigate between options in overlay and highlight the one that has keydown.arrowdown
   */
  @HostListener('keydown.arrowdown', ['$event'])
  onArrowDown(): void {
    if (this.overlayHasFocus && this.highlightRowIndex < this.dataSource.filteredData.length - 1) {
      this.highlightRowIndex += 1;
    }
  }

  /**
   * Navigate between options in overlay and highlight the one that has keydown.arrowup
   */
  @HostListener('keydown.arrowup', ['$event'])
  onArrowUp(): void {
    if (this.overlayHasFocus && this.highlightRowIndex > 0) {
      this.highlightRowIndex -= 1;
    }
  }

  /**
   * Close searchList and select option that is currently highlighted
   */
  @HostListener('keydown.enter', ['$event'])
  onKeyEnter(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.isOverlayOpen) {
      if (
        this.overlayHasFocus &&
        this.highlightRowIndex >= 0 &&
        this.highlightRowIndex < this.dataSource.filteredData.length
      ) {
        // data
        this.selectRow(this.dataSource.filteredData[this.highlightRowIndex]);
      }
    } else {
      this.openOverlay();
    }
  }

  /**
   * open searchList when user is typing
   * @param event
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== 'Tab' && !this.isOverlayOpen) {
      this.openOverlay();
    }
  }

  selectRow(row: T, closeOverlay = true): void {
    if (closeOverlay) {
      this.closeOverlay();
    }
    this.currentOption = row;
    // @ts-ignore
    this.searchFormControl?.setValue(row[this.searchColumn!]);
    // @ts-ignore
    this.onChange(row[this.searchColumn!]);
    this.onTouched();
    this.optionSelected.emit(row);
    if (this.hasFocus) {
      // without the following line, the input field looses the focus after the user clicks on an option
      this.searchInputField?.nativeElement.focus();
    }
  }

  openOverlay(): void {
    this.isOverlayOpen = true;
    this.highlightRowIndex = -1;
  }

  closeOverlay(): void {
    this.isOverlayOpen = false;
    this.highlightRowIndex = -1;
  }

  onDetachOverlay(): void {
    this.closeOverlay();
  }

  onBlurSearchField() {
    // ignore blur event if overlay is open (useful when user clicks on an option in autocomplete overlay)
    if (!this.isOverlayOpen) {
      this.blurSearchField.emit(this.isOverlayOpen);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
