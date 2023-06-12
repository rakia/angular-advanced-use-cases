import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';
import { SearchComponent } from 'projects/shared/src/public-api';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { EcsFieldset } from '../../models/ecs-fieldset.interface';
import { EcsFieldsStoreService } from '../../services/ecs-fields/ecs-fields-store.service';
import { EcsFieldsetsWithDetailsComponent } from './ecs-fieldsets-with-details.component';

const MOCK_ECS_FIELDSETS: EcsFieldset[] = [
  {
    id: '12345678',
    isEcs: true,
    name: 'geo',
    title: 'Geo',
    short: 'short1',
    footnote: '123456',
    created: '2022-08-31T12:09:11.048234Z',
    createdBy: 'dev',
    updated: '2022-08-31T12:09:11.048234Z',
    updatedBy: 'dev',
    ecsVersion: '1.0',
    beta: '1',
    customComment: '1',
  },
  {
    id: '12345678',
    isEcs: true,
    name: 'client',
    title: 'Client',
    short: 'short1',
    footnote: '123456',
    created: '2022-08-31T12:09:11.048234Z',
    createdBy: 'dev',
    updated: '2022-08-31T12:09:11.048234Z',
    updatedBy: 'dev',
    ecsVersion: '1.0',
    beta: '1',
    customComment: '1',
  },
];
const mockActivatedRouteFragment = new Subject<string>();

describe('EcsFieldsetsWithDetailsComponent', () => {
  let component: EcsFieldsetsWithDetailsComponent;
  let fixture: ComponentFixture<EcsFieldsetsWithDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcsFieldsetsWithDetailsComponent, MockComponent(SearchComponent)],
      imports: [
        getTranslocoTestingModule(),
        MockModule(MatSortModule),
        MockModule(MatIconModule),
        MockModule(MatTooltipModule),
        MatButtonToggleModule,
      ],
      providers: [
        MockProvider(EcsFieldsStoreService),
        { provide: ActivatedRoute, useValue: { fragment: mockActivatedRouteFragment.asObservable() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsFieldsetsWithDetailsComponent);
    component = fixture.componentInstance;
    component.ecsFieldsets = MOCK_ECS_FIELDSETS;
    component.filteredEcsFieldsets = MOCK_ECS_FIELDSETS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have elements in fieldsets-grid', () => {
    const ecsFieldsetRow = fixture.debugElement.query(By.css('div.fieldsets-grid:first-child')).nativeElement;
    expect(ecsFieldsetRow).toBeDefined();
  });

  it('should emit getEcsFieldsetFields event after calling toggleDetails()', () => {
    jest.spyOn(component, 'filterEcsFields');
    jest.spyOn(component, 'closeDetails');

    component.toggleDetails(MOCK_ECS_FIELDSETS[0]);

    expect(component.filterEcsFields).toHaveBeenCalledWith(MOCK_ECS_FIELDSETS[0].id);
    expect(component.closeDetails).toBeCalledTimes(0);
  });

  it('should closeDetails after calling toggleDetails() on selectedEcsFieldset', () => {
    jest.spyOn(component, 'filterEcsFields');
    jest.spyOn(component, 'closeDetails');

    // eslint-disable-next-line prefer-destructuring
    component.selectedEcsFieldset = MOCK_ECS_FIELDSETS[0];
    component.toggleDetails(MOCK_ECS_FIELDSETS[0]);

    expect(component.closeDetails).toBeCalled();
    expect(component.filterEcsFields).toBeCalledTimes(0);
    expect(component.selectedEcsFieldset).toBeUndefined();
  });
});
