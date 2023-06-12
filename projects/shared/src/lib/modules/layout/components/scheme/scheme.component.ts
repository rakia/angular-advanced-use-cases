import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Scheme, SchemeOption } from '../../models/scheme.types';

export const LOCALSTORAGE_SCHEME_ITEM = 'scheme';

@Component({
  selector: 'lib-scheme',
  templateUrl: './scheme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemeComponent implements OnInit {
  scheme!: Scheme;
  selectedScheme!: SchemeOption;

  constructor(@Inject(DOCUMENT) private document: any, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const savedScheme = localStorage.getItem(LOCALSTORAGE_SCHEME_ITEM);
    if (savedScheme === 'light' || savedScheme === 'dark') {
      this.selectedScheme = savedScheme as SchemeOption;
      this.scheme = savedScheme as Scheme;
      this.refreshUI(this.scheme);
    } else {
      this.setSelectedScheme('auto');
    }

    // Watch for changes of the preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      const turnOn = e.matches;
      const localstorageScheme = localStorage.getItem(LOCALSTORAGE_SCHEME_ITEM);

      if (localstorageScheme === 'auto' || !localstorageScheme) {
        this.scheme = turnOn ? 'dark' : 'light';
        this.refreshUI(this.scheme);
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  setSelectedScheme(scheme: SchemeOption): void {
    // If the scheme is set to 'auto'...
    if (scheme === 'auto') {
      // Decide the scheme using the media query
      this.scheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      this.scheme = scheme;
    }
    this.refreshUI(this.scheme);
    localStorage.setItem(LOCALSTORAGE_SCHEME_ITEM, scheme);
    this.selectedScheme = scheme;
  }

  /**
   * Trigger refresh of UI
   * @param scheme
   */
  refreshUI(scheme: Scheme): void {
    // Remove class names from body for all schemes
    this.document.body.classList.remove('light', 'dark');

    // Add class name to body for the currently selected scheme
    this.document.body.classList.add(scheme);
  }
}
