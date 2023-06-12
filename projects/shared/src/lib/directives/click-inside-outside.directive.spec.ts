import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickInsideOutsideDirective } from './click-inside-outside.directive';

@Component({
  template: `<div libClickInsideOutside (clickOutside)="onOutsideClick()" (clickInside)="onInsideClick()"></div>`,
})
class TestComponent {
  onOutsideClick() {}
  onInsideClick() {}
}

describe('ClickInsideOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ClickInsideOutsideDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.debugElement.query(By.directive(ClickInsideOutsideDirective));
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new ClickInsideOutsideDirective(directiveElement.injector.get(ElementRef));
    expect(directive).toBeTruthy();
  });

  it('should emit clickInside event when clicking inside the element', () => {
    jest.spyOn(component, 'onInsideClick');
    directiveElement.nativeElement.click();
    expect(component.onInsideClick).toHaveBeenCalled();
  });

  it('should emit clickOutside event when clicking outside the element', () => {
    jest.spyOn(component, 'onOutsideClick');
    document.body.click();
    expect(component.onOutsideClick).toHaveBeenCalled();
  });
});
