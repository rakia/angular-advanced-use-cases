import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { BreadcrumbComponent, NavigationBarComponent } from 'projects/shared/src/public-api';
import { EcsSchemaDetailsContainerComponent } from './ecs-schema-details-container.component';

describe('EcsSchemaDetailsContainerComponent', () => {
  let component: EcsSchemaDetailsContainerComponent;
  let fixture: ComponentFixture<EcsSchemaDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcsSchemaDetailsContainerComponent],
      imports: [RouterTestingModule, MockComponent(NavigationBarComponent), MockComponent(BreadcrumbComponent)],
      providers: [{ provide: ActivatedRoute, useValue: { params: of({ version: '1.2' }) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(EcsSchemaDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
