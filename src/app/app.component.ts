import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input } from '@angular/core';
import { PageScrollConfig } from 'ngx-page-scroll';
import { SectionService } from './shared/services/section.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private el: ElementRef, private _sectionService: SectionService) {
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

  get isNavbarSticky$() {
    return this._sectionService.isSticky$;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this._sectionService.refreshCurrentSectionName();
  }
}
