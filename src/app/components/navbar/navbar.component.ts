import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from '../../shared/services/section.service';
import { Unsubscribable } from '../../shared/util/unsubscribable';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent extends Unsubscribable {

  @Output() themeChange = new EventEmitter<boolean>();

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

  themeChanged(changeEvent: MatButtonToggleChange) {
    this.themeChange.next(changeEvent.source.checked);
  }
}
