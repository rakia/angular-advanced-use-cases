import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { AlertService } from 'src/app/core/alert/alert.service';
import { getTranslocoTestingModule } from 'src/app/core/transloco/transloco-testing.module';
import { EcsFieldsetsStoreService } from '../services/ecs-fieldsets/ecs-fieldsets-store.service';
import { UploadEcsFieldsetsComponent } from '../presenters/upload-ecs-fieldsets/upload-ecs-fieldsets.component';
import { EcsFieldsetsContainerComponent } from './ecs-fieldsets-container.component';
import { EcsFieldsetsWithDetailsComponent } from '../presenters/ecs-fieldsets-with-details/ecs-fieldsets-with-details.component';

describe('EcsFieldsetsContainerComponent', () => {
  let component: EcsFieldsetsContainerComponent;
  let fixture: ComponentFixture<EcsFieldsetsContainerComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EcsFieldsetsContainerComponent,
        MockComponent(UploadEcsFieldsetsComponent),
        MockComponent(EcsFieldsetsWithDetailsComponent),
      ],
      imports: [
        getTranslocoTestingModule(),
        MockModule(MatButtonModule),
        MockModule(MatIconModule),
        MockModule(MatTabsModule),
        MockModule(MatTooltipModule),
      ],
      providers: [
        MockProvider(EcsFieldsetsStoreService),
        MockProvider(AlertService),
        { provide: ActivatedRoute, useValue: { params: of({ releaseId: 'sfsd-1233' }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsFieldsetsContainerComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('click on ECS-Schema Upload button', () => {
    it('should emit event', async () => {
      expect(component.isUploadEcsFieldsMode).toEqual(false);
      const cloneButton = await loader.getHarness(MatButtonHarness.with({ selector: '#ecsSchemeUpload' }));
      expect(cloneButton).toBeDefined();

      await cloneButton.click();

      expect(component.isUploadEcsFieldsMode).toEqual(true);
    });
  });
});
