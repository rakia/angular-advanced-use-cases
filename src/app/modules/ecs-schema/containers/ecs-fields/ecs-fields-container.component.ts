import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { EcsFieldsStoreService } from '../../../ecs-fieldsets/services/ecs-fields/ecs-fields-store.service';
import { EcsField } from '../../../ecs-fieldsets/models/ecs-field.interface';

@Component({
  selector: 'app-ecs-fields-container',
  templateUrl: './ecs-fields-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsFieldsContainerComponent implements OnInit {
  private storeService = inject(EcsFieldsStoreService);
  private destroyRef = inject(DestroyRef);

  readonly ecsFields$: Observable<EcsField[]> = this.storeService.ecsFields$;
  displayColumnDefs = [
    { key: 'flatName', label: 'Flat Name' },
    { key: 'short', label: 'Short Description' },
    { key: 'isEcs', label: 'Is Ecs' },
  ];
  private filterableColumns = ['flatName', 'short'];
  dataSource: EcsField[] = [];
  searchFormControl: FormControl<any> = new FormControl('');
  highlightRowIndex = -1;

  ngOnInit(): void {
    this.storeService.getEcsFields('abc-123');

    this.ecsFields$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((list) => {
      this.dataSource = list;
    });

    this.onSearchQueryChanged();
  }

  onSearchQueryChanged(): void {
    this.searchFormControl?.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(150), // debounce searchQueries & dismiss consecutive duplicates
        distinctUntilChanged()
      )
      .subscribe((searchQuery: string) => {
        this.applyFilter(searchQuery);
      });
  }

  applyFilter(searchQuery: string): void {
    this.dataSource = this.dataSource.filter((item) => item.name.toLowerCase().includes(searchQuery?.trim().toLowerCase()));
    console.log(`filtered data: ${this.dataSource.length}`);
  }

  selectRow(event: any) {
    console.log('selectRow', event);
  }
}
