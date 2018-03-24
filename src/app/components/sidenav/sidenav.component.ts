import { Component, EventEmitter, Output } from '@angular/core';
import { Unsubscribable } from '../../shared/util/unsubscribable';
import { MatButtonToggleChange } from '@angular/material';
import { SectionService } from '../../shared/services/section/section.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends Unsubscribable {

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

  themeChanged() {
    this.themeChange.next(null);
  }
}
