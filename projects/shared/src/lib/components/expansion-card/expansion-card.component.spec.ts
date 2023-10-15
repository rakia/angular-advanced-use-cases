import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionCardComponent } from './expansion-card.component';

describe('ExpansionCardComponent', () => {
  let component: ExpansionCardComponent;
  let fixture: ComponentFixture<ExpansionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ExpansionCardComponent, MockModule(MatExpansionModule)],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpansionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
