import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BreadcrumbItem, NavigationTab } from 'projects/shared/src/public-api';
import { EcsSchemaTabName } from '../../models/ecs-schema-tab-name.types';

/**
 * Container component to display the ecs-schema details page.
 */
@Component({
  selector: 'app-ecs-schema-details-container',
  templateUrl: './ecs-schema-details-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcsSchemaDetailsContainerComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  version: string = '1.0';
  tabName: EcsSchemaTabName = 'ecs-fieldsets';
  tabLabels = {
    'ecs-fieldsets': 'GENERAL.FIELDSETS',
    'ecs-fields': 'GENERAL.FIELDS',
  };
  navTabs: NavigationTab[] = [
    { label: 'GENERAL.FIELDSETS', link: './ecs-fieldsets', index: 0 },
    { label: 'GENERAL.FIELDS', link: './ecs-fields', index: 1 },
  ];
  breadcrumbItems$: Observable<BreadcrumbItem[]> = of([]);
  breadcrumbItems: BreadcrumbItem[] = [];

  /**
   * In this lifecycle hook, we get the version from the URL.
   * We also initialize the active tab on the view and determine the breadcrumb items.
   */
  async ngOnInit(): Promise<void> {
    // this.version = this.activatedRoute.snapshot?.paramMap.get('version');

    this.setActiveTab();
    this.breadcrumbItems$ = of(this.getBreadcrumbItems());
    this.breadcrumbItems = this.getBreadcrumbItems();
  }

  /**
   * This method sets the value of the active tab name after getting it from the URL.
   */
  setActiveTab(): void {
    const urlParts = this.router.url.split('/');
    const lastUrlPart = urlParts[urlParts.length - 1];
    if (['ecs-fieldsets', 'ecs-fields'].includes(lastUrlPart)) {
      this.tabName = lastUrlPart as EcsSchemaTabName;
    }
  }

  /**
   * This method is called when the user clicks on a tab.
   * It updates the active tab name and the breadcrumb items.
   * @param selectedTab
   */
  onSelectedIndexChange(selectedTab: NavigationTab): void {
    // slice(2) to remove './' from the link
    this.tabName = selectedTab?.link?.slice(2) as EcsSchemaTabName;
    this.breadcrumbItems$ = of(this.getBreadcrumbItems());
    this.breadcrumbItems = this.getBreadcrumbItems();
  }

  /**
   * This method calculates the breadcrumb items for the ecs-schema details page.
   */
  getBreadcrumbItems(): BreadcrumbItem[] {
    return [
      { label: 'ECS_FIELDSETS.TITLE', routerLink: '/ecs-schema', translate: true },
      {
        label: 'ECS_FIELDSETS.VERSION',
        routerLink: '/ecs-schema',
        // fragment: this.version!,
        translate: true,
        messageParams: { value: this.version },
      },
      { label: this.tabLabels[this.tabName], translate: true },
    ];
  }
}
