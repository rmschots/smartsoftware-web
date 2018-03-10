import { Injectable } from '@angular/core';
import { Section } from './section';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SectionService {
  private _currentSectionName$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private _sections$: BehaviorSubject<Section[]> = new BehaviorSubject<Section[]>([]);
  private _isSticky$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addSection(section: Section) {
    this.sectionPosition(section);
  }

  get currentSectionName$(): Observable<string> {
    return this._currentSectionName$.asObservable();
  }

  get sectionNames$(): Observable<string[]> {
    return this._sections$.map(sections => sections.map(section => section.name));
  }

  get isSticky$(): Observable<boolean> {
    return this._isSticky$.asObservable();
  }

  scrollTop() {
    this.refreshCurrentSectionName();
    this._isSticky$.next(false);
  }

  sectionPosition(section: Section): void {
    //filter out the old position if it has been set
    const sections = this._sections$.getValue().filter(item => item.name !== section.name);
    //set the new position
    sections.push(section);
    this._sections$.next(sections);

    this.refreshCurrentSectionName();
  }

  refreshCurrentSectionName(): void {
    //sort the section based on their appearance order
    this.sortSections();

    //if the page has already been scrolled find the current name
    if (window.scrollY > 0) {
      const topSection = this._sections$.getValue().find(section => {
        return (section.position - window.scrollY - 104 - 1) < 0;
      });

      this._isSticky$.next(!!topSection);
      if (!topSection) {
        this._isSticky$.next(false);
      }
      if (topSection) {
        this._currentSectionName$.next(topSection.name);
      } else {
        const firstSection = this._sections$.getValue()[this._sections$.getValue().length - 1];
        this._currentSectionName$.next(firstSection ? firstSection.name : undefined);
      }
    } else {
      const firstSection = this._sections$.getValue()[this._sections$.getValue().length - 1];
      this._currentSectionName$.next(firstSection ? firstSection.name : undefined);
    }
  }

  private sortSections(): void {
    this._sections$.getValue().sort((a: any, b: any) => {
      return b.position - a.position;
    });
  }

}
