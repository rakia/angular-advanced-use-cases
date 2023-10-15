import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HarnessLoader } from '@angular/cdk/testing';
import { ActionButtonsComponent } from './action-buttons.component';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing.module';

describe('ActionButtonsComponent', () => {
  let component: ActionButtonsComponent;
  let fixture: ComponentFixture<ActionButtonsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ActionButtonsComponent, getTranslocoTestingModule(), MatButtonModule, MatIconModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit clickEdit event after a click on editButton', async () => {
    jest.spyOn(component.clickEdit, 'emit');
    component.isEditMode = false;

    const button = await loader.getHarness(MatButtonHarness.with({ selector: '#editButton' }));
    expect(button).toBeDefined();
    await button.click();

    expect(component.clickEdit.emit).toHaveBeenCalled();
  });

  it('should emit clickAction event after a click on delete Button', async () => {
    jest.spyOn(component.clickAction, 'emit');
    component.isEditMode = false;
    component.customActionsButtons = [{ name: 'delete', label: 'BUTTONS.DELETE', icon: 'delete' }];

    const button = await loader.getHarness(MatButtonHarness.with({ selector: '#clickAction' }));
    expect(button).toBeDefined();
    await button.click();

    expect(component.clickAction.emit).toHaveBeenCalledWith('delete');
  });
});
