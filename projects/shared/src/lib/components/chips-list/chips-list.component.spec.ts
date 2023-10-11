import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChipsListComponent } from './chips-list.component';

describe('ChipsListComponent', () => {
  let component: ChipsListComponent;
  let fixture: ComponentFixture<ChipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ChipsListComponent, RouterTestingModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsListComponent);
    component = fixture.componentInstance;
    component.title = 'Test Title';
    component.values = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    component.stringValues = ['Item 1', 'Item 2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title when provided', () => {
    const compiled = fixture.debugElement.nativeElement;
    const titleElement = compiled.querySelector('#title');
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should render a list of chips', () => {
    const compiled = fixture.debugElement.nativeElement;
    const chips = compiled.querySelectorAll('.chip');
    expect(chips).toBeTruthy();
    expect(chips.length).toEqual(2);
  });

  it('should render first chip with id #chip-0 and second chip with id #chip-1', () => {
    const compiled = fixture.debugElement.nativeElement;
    const chip1 = compiled.querySelector('#chip-0');
    expect(chip1).toBeTruthy();
    const chip2 = compiled.querySelector('#chip-1');
    expect(chip2).toBeTruthy();
  });

  it('should emit clickValue event after a click on a chip', async () => {
    jest.spyOn(component.clickValue, 'emit');
    jest.spyOn(component.clickStringValue, 'emit');
    const compiled = fixture.debugElement.nativeElement;
    const chip1 = compiled.querySelector('#chip-0');
    expect(chip1).toBeTruthy();

    await chip1.click();
    expect(component.clickValue.emit).toHaveBeenCalledTimes(1);
    expect(component.clickValue.emit).toHaveBeenCalledWith({ id: 1, name: 'Item 1' });
    expect(component.clickStringValue.emit).not.toHaveBeenCalled();
  });

  it('should emit clickStringValue event after a click on a chip', async () => {
    jest.spyOn(component.clickValue, 'emit');
    jest.spyOn(component.clickStringValue, 'emit');

    const compiled = fixture.debugElement.nativeElement;
    const chip1 = compiled.querySelector('#string-chip-0');
    expect(chip1).toBeTruthy();

    await chip1.click();
    expect(component.clickStringValue.emit).toHaveBeenCalledTimes(1);
    expect(component.clickStringValue.emit).toHaveBeenCalledWith('Item 1');
    expect(component.clickValue.emit).not.toHaveBeenCalled();
  });
});
