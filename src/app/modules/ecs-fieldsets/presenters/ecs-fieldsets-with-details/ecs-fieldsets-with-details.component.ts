import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  DeleteEvent,
  EcsVersion,
  NameIdEntity,
  RequestResponse,
  scrollToElement,
  UpdatedEntity,
} from 'projects/shared/src/public-api';
import { EcsField, EcsFieldLevel, EcsFieldType, UpdatableEcsFieldAttributes } from '../../models/ecs-field.interface';
import { EcsFieldset, UpdatableEcsFieldsetAttributes } from '../../models/ecs-fieldset.interface';
import { FieldType } from '../../models/field-type.types';
import { FilterEvent } from '../../models/filter-event.interface';
import { ParameterDescription } from '../../models/parameter-description.interface';
import { EcsFieldsStoreService } from '../../services/ecs-fields/ecs-fields-store.service';

@Component({
  selector: 'app-ecs-fieldsets-with-details',
  templateUrl: './ecs-fieldsets-with-details.component.html',
  styles: [
    /* language=SCSS */
    `
      .fieldsets-grid {
        grid-template-columns: 200px auto 150px 150px 200px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsFieldsetsWithDetailsComponent implements OnChanges, OnDestroy {
  @Input() ecsVersion: EcsVersion | null = null;
  @Input() ecsFieldsets!: EcsFieldset[];
  @Input() requestResponse: RequestResponse<EcsFieldset> | null | undefined;
  @Input() isCreateMode: boolean = false;
  @Output() cancelCreateMode = new EventEmitter<void>();
  @Output() getEcsFieldsets = new EventEmitter<string>();
  @Output() updateEcsFieldset = new EventEmitter<UpdatedEntity<UpdatableEcsFieldsetAttributes>>();
  @Output() deleteEcsFieldset = new EventEmitter<DeleteEvent>();
  @Output() createCustomFieldset = new EventEmitter<EcsFieldset | Partial<EcsFieldset>>();
  @Output() filterEcsFieldsets = new EventEmitter<FilterEvent>();

  selectedEcsFieldset: EcsFieldset | undefined;
  selectedFieldTypes: FieldType[] = [];
  searchQuery: string = '';
  filteredEcsFieldsets: EcsFieldset[] = [];
  ecsFieldsetsLightList: NameIdEntity[] = [];
  private currentSort: Sort | undefined;
  private destroy$ = new Subject<void>();

  ecsFields$: Observable<EcsField[]> = this.storeService.ecsFields$;
  ecsFieldTypes$: Observable<EcsFieldType[]> = this.storeService.ecsFieldTypes$;
  ecsFieldLevels$: Observable<EcsFieldLevel[]> = this.storeService.ecsFieldLevels$;
  requestResponseEcsField$: Observable<RequestResponse<EcsField> | null> = this.storeService.requestResponse$;
  parameterDescriptions$: Observable<ParameterDescription[] | null> = this.storeService.parameterDescriptions$;

  constructor(private storeService: EcsFieldsStoreService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.fragment.pipe(takeUntil(this.destroy$)).subscribe((ecsFieldsetId) => {
      if (ecsFieldsetId) {
        this.openEcsFieldsetById(ecsFieldsetId);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ecsVersion']?.currentValue) {
      this.getEcsFieldsets.emit(this.ecsVersion?.id);
    }
    if (changes['ecsFieldsets']?.currentValue && !changes['ecsFieldsets']?.firstChange) {
      this.filteredEcsFieldsets = this.ecsFieldsets;
      this.ecsFieldsetsLightList = this.ecsFieldsets.map((ecsFieldset) => ({
        name: ecsFieldset.name,
        id: ecsFieldset.id!,
      }));
    }
  }

  private openEcsFieldsetById(ecsFieldsetId: string): void {
    const foundEcsFieldset = this.filteredEcsFieldsets.find((ecsFieldset) => ecsFieldset.id === ecsFieldsetId);
    if (foundEcsFieldset) {
      this.selectedEcsFieldset = foundEcsFieldset;

      scrollToElement(ecsFieldsetId);
    }
  }

  toggleDetails(ecsFieldset: EcsFieldset): void {
    // If an item is already selected...
    if (this.selectedEcsFieldset && this.selectedEcsFieldset.id === ecsFieldset.id) {
      this.closeDetails();
      return;
    }
    this.selectedEcsFieldset = ecsFieldset;
    this.filterEcsFields(ecsFieldset.id!, ecsFieldset.name);
  }

  closeDetails(): void {
    this.selectedEcsFieldset = undefined;
  }

  filterEcsFields(ecsFieldsetId: string, name: string): void {
    const filterEvent: FilterEvent = { query: this.searchQuery, fieldTypes: this.selectedFieldTypes };
    this.storeService.filterEcsFields(this.ecsVersion?.id!, ecsFieldsetId, filterEvent, name);
  }

  updateEcsField(updatedEntity: UpdatedEntity<UpdatableEcsFieldAttributes>): void {
    this.storeService.updateEcsField(updatedEntity);
  }

  deleteEcsField(event: DeleteEvent): void {
    this.storeService.deleteEcsField(event, this.selectedEcsFieldset?.id!);
  }

  createCustomField(entity: EcsField | Partial<EcsField>): void {
    // @ts-ignore
    this.storeService.createCustomField(entity);
  }

  onFieldsetTypesChange(selectedFieldTypes: MatButtonToggleChange): void {
    this.selectedFieldTypes = selectedFieldTypes.value;
    this.filterEcsFieldsets.emit({ query: this.searchQuery, fieldTypes: selectedFieldTypes.value });
  }

  filterBySearchQuery(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.filterEcsFieldsets.emit({ query: this.searchQuery, fieldTypes: this.selectedFieldTypes });
  }

  onSort(sortEvent: Sort) {
    this.currentSort = sortEvent;
    // TODO: call REST API to get data sorted
  }

  /**
   * Track by function for ngFor loops
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    // reset ecsFields state
    this.storeService.ecsFields?.next([]);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
