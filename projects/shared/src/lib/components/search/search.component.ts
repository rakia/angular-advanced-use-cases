import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { TranslocoCoreModule } from '../../transloco/transloco.module';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, ReactiveFormsModule, TranslocoCoreModule, MatInputModule],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() debounce = 300;

  @Output() searchQuery = new EventEmitter<string>();

  searchControl: UntypedFormControl = new UntypedFormControl();
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    // Subscribe to the search field value changes
    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => this.searchQuery.emit(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
