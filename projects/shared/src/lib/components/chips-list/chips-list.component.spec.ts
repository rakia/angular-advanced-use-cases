import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipsListComponent } from './chips-list.component';

describe('ChipsListComponent', () => {
  let component: ChipsListComponent;
  let fixture: ComponentFixture<ChipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipsListComponent],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
