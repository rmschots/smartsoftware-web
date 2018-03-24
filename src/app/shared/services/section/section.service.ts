import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ObservableMedia } from '@angular/flex-layout';

@Injectable()
export class SectionService {
  private _currentSectionName$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private _isSticky$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _sectionNames$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private _sectionPositionMap: Map<string, number> = new Map<string, number>();

  constructor(private _media: ObservableMedia) {
  }

  addSection(sectionName: string, position: number) {
    this._sectionPositionMap.set(sectionName, position);
    if (!this._sectionNames$.getValue().includes(sectionName)) {
      const updatedSectionNames = this._sectionNames$.getValue().concat(sectionName);
      updatedSectionNames.sort((a: string, b: string) => {
        return this._sectionPositionMap.get(b) - this._sectionPositionMap.get(a);
      });
      this._sectionNames$.next(updatedSectionNames);
    }

    this.refreshCurrentSectionName();
  }

  get currentSectionName$(): Observable<string> {
    return this._currentSectionName$.distinctUntilChanged();
  }

  get sectionNames$(): Observable<string[]> {
    return this._sectionNames$.map(names => names.slice());
  }

  get isSticky$(): Observable<boolean> {
    return this._isSticky$.distinctUntilChanged();
  }

  scrollTop() {
    this.refreshCurrentSectionName();
    this._isSticky$.next(false);
  }

  refreshCurrentSectionName(): void {
    const currentSectionNames = this._sectionNames$.getValue();
    //if the page has already been scrolled find the current name
    if (window.scrollY > 0) {
      const topSectionName = currentSectionNames.find(sectionName => {
        const offset = this._media.isActive('lt-lg') ? -1 : -104 - 1;
        return (this._sectionPositionMap.get(sectionName) - window.scrollY + offset) < 0;
      });

      this._isSticky$.next(!!topSectionName);
      if (!topSectionName) {
        this._isSticky$.next(false);
      }
      if (topSectionName) {
        this._currentSectionName$.next(topSectionName);
      } else {
        const firstSectionName = currentSectionNames[currentSectionNames.length - 1];
        this._currentSectionName$.next(firstSectionName ? firstSectionName : undefined);
      }
    } else {
      const firstSectionName = currentSectionNames[currentSectionNames.length - 1];
      this._currentSectionName$.next(firstSectionName ? firstSectionName : undefined);
    }
  }
}
