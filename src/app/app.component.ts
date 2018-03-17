import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { PageScrollConfig, PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import { SectionService } from './shared/services/section.service';
import { NgwWowService } from 'ngx-wow';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass = '';

  tellUsOpen$ = new BehaviorSubject<boolean>(false);

  constructor(private el: ElementRef,
              private _sectionService: SectionService,
              private _wowService: NgwWowService,
              private _pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
    PageScrollConfig.defaultScrollOffset = 104;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    };
    PageScrollConfig.defaultDuration = 750;
  }

  themeChanged(isDark: boolean) {
    if (isDark) {
      this.componentCssClass = 'dark-theme';
    } else {
      this.componentCssClass = '';
    }
  }

  ngOnInit(): void {
    this._wowService.init();
  }

  get isNavbarSticky$() {
    return this._sectionService.isSticky$;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this._sectionService.refreshCurrentSectionName();
  }

  openTellUs(scrollTo: boolean) {
    this.tellUsOpen$.next(true);
    if (scrollTo) {
      setTimeout(() => {
        const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#tell-us');
        this._pageScrollService.start(pageScrollInstance);
      }, 0);
    }

  }
}
