import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { distinctUntilChanged, fromEvent, Subject, takeUntil } from 'rxjs';
import { TranslocoCoreModule } from '../../transloco/transloco.module';

/**
 * Example of how tho use the component:
 * <div #mainView>
 *   ...
 *   <scroll-to-top [element]="mainView"></scroll-to-top>
 * </div>
 */
@Component({
  selector: 'lib-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatTooltipModule, TranslocoCoreModule, MatIconModule, MatButtonModule],
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  @Input() element: HTMLElement | undefined;
  @Output() scrollToTopClicked = new EventEmitter<void>();

  elementScrolled: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(@Inject(DOCUMENT) private document: Document, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.element) {
      fromEvent(this.element, 'scroll')
        .pipe(
          distinctUntilChanged(), // Dispatch change only if result from map above is different from previous result
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          if (this.element && this.element.scrollTop > 100) {
            this.elementScrolled = true;
            this.changeDetectorRef.markForCheck();
          } else if (this.elementScrolled && this.element && this.element.scrollTop <= 100) {
            this.elementScrolled = false;
            this.changeDetectorRef.markForCheck();
          }
        });
    } else {
      fromEvent(window, 'scroll')
        .pipe(
          // map((e: Event) => (e.srcElement as Element).scrollTop > 100), // Is elementId scrolled for more than 100 from top?
          distinctUntilChanged(), // Dispatch change only if result from map above is different from previous result
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.elementScrolled = true;
          } else if (
            (this.elementScrolled && window.scrollY) ||
            document.documentElement.scrollTop ||
            document.body.scrollTop <= 100
          ) {
            this.elementScrolled = false;
          }
        });
    }
  }

  scrollToTop(): void {
    if (this.element) {
      // scroll to the top of the specified element
      if (this.element.scrollTop > 0) {
        this.element.scrollTo(0, 0);
      }
    } else {
      // scroll to the top of the window
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    }
    this.scrollToTopClicked.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
