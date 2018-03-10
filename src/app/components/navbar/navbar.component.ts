import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from '../../shared/services/section.service';
import { Unsubscribable } from '../../shared/util/unsubscribable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent extends Unsubscribable {

  constructor(private _sectionService: SectionService) {
    super();
  }

  get activeSectionName$(): Observable<string> {
    return this._sectionService.currentSectionName$;
  }

  get sectionNames$(): Observable<string[]> {
    return this._sectionService.sectionNames$.map(names => names.reverse());
  }

  scrollTop() {
    this._sectionService.scrollTop();
  }
}
