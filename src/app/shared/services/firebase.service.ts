import { Injectable } from '@angular/core';
import { AfsSection } from '../models/afs-section';
import { AfsJobsSection } from '../models/afs-jobs-section';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { AfsContactSection } from '../models/afs-contact-section';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FirebaseService {

  private _initialized = false;

  private _sectionsChange$: BehaviorSubject<DocumentChangeAction[]> = new BehaviorSubject<DocumentChangeAction[]>([]);
  private _headerData$: BehaviorSubject<AfsSection> = new BehaviorSubject<AfsSection>(undefined);
  private _servicesData$: BehaviorSubject<AfsSection> = new BehaviorSubject<AfsSection>(undefined);
  private _sloganData$: BehaviorSubject<AfsSection> = new BehaviorSubject<AfsSection>(undefined);
  private _careersData$: BehaviorSubject<AfsJobsSection> = new BehaviorSubject<AfsJobsSection>(undefined);
  private _callToActionData$: BehaviorSubject<AfsSection> = new BehaviorSubject<AfsSection>(undefined);
  private _contactData$: BehaviorSubject<AfsSection> = new BehaviorSubject<AfsSection>(undefined);

  constructor(private _afs: AngularFirestore) {
  }

  init() {
    if (this._initialized) {
      console.error('firebase service already initialized');
      return;
    }
    this._initialized = true;
    this._afs.collection<AfsJobsSection>('sections').snapshotChanges()
      .subscribe(data => this._sectionsChange$.next(data));
    this._sectionsChange$.map(actions => this.findSection(actions, 'header') as AfsSection)
      .subscribe(data => this._headerData$.next(data));
    this._sectionsChange$.map(actions => this.findSection(actions, 'services') as AfsSection)
      .subscribe(data => this._servicesData$.next(data));
    this._sectionsChange$.map(actions => this.findSection(actions, 'slogan') as AfsSection)
      .subscribe(data => this._sloganData$.next(data));
    this._sectionsChange$.map(actions => this.findSection(actions, 'careers') as AfsJobsSection)
      .subscribe(data => this._careersData$.next(data));
    this._sectionsChange$.map(actions => this.findSection(actions, 'callToAction') as AfsSection)
      .subscribe(data => this._callToActionData$.next(data));
    this._sectionsChange$.map(actions => this.findSection(actions, 'contact') as AfsContactSection)
      .subscribe(data => this._contactData$.next(data));
  }

  get jobs$() {
    return this.careersData$.filter(data => !!data).map(careersData => careersData.jobs);
  }

  get sectionsChange$() {
    return this._sectionsChange$.asObservable();
  }

  get headerData$() {
    return this._headerData$.asObservable();
  }

  get servicesData$() {
    return this._servicesData$.asObservable();
  }

  get sloganData$() {
    return this._sloganData$.asObservable();
  }

  get careersData$() {
    return this._careersData$.asObservable();
  }

  get callToActionData$() {
    return this._callToActionData$.asObservable();
  }

  get contactData$() {
    return this._contactData$.asObservable();
  }

  private findSection(actions: DocumentChangeAction[], sectionName: string) {
    const foundSectionAction = actions.find(action => action.payload.doc.id === sectionName);
    if (!foundSectionAction) {
      return null;
    }
    return foundSectionAction.payload.doc.data();
  }

}
