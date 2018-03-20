import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { PageScrollConfig, PageScrollService } from 'ngx-page-scroll';
import { SectionService } from './shared/services/section/section.service';
import { NgwWowService } from 'ngx-wow';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { AfsJobsSection } from './shared/models/afs-jobs-section';
import { AfsSection } from './shared/models/afs-section';
import { AfsContactSection } from './shared/models/afs-contact-section';
import { MatDialog } from '@angular/material';
import { TellUsDialogComponent } from './components/tell-us-dialog/tell-us-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CreateYourOwnJobDialogComponent } from './components/create-your-own-job-dialog/create-your-own-job-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass = '';

  sectionsChange$: Observable<DocumentChangeAction[]>;

  headerData$: Observable<AfsSection>;
  servicesData$: Observable<AfsSection>;
  sloganData$: Observable<AfsSection>;
  careersData$: Observable<AfsSection>;
  callToActionData$: Observable<AfsSection>;
  contactData$: Observable<AfsSection>;

  constructor(private el: ElementRef,
              private _sectionService: SectionService,
              private _wowService: NgwWowService,
              private _pageScrollService: PageScrollService,
              private _afs: AngularFirestore,
              private _dialog: MatDialog,
              private _overlayContainer: OverlayContainer,
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
    this.initSections();
  }

  themeChanged(isDark: boolean) {
    if (isDark) {
      this.componentCssClass = 'dark-theme';
      this._overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.componentCssClass = '';
      this._overlayContainer.getContainerElement().classList.remove('dark-theme');
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

  openTellUs() {
    this._dialog.open(TellUsDialogComponent);
  }

  openCreateYourOwnJob() {
    this._dialog.open(CreateYourOwnJobDialogComponent);
  }

  private initSections() {
    this.sectionsChange$ = this._afs.collection<AfsJobsSection>('sections').snapshotChanges();
    this.headerData$ = this.sectionsChange$.map(actions => this.findSection(actions, 'header') as AfsSection);
    this.servicesData$ = this.sectionsChange$.map(actions => this.findSection(actions, 'services') as AfsSection);
    this.sloganData$ = this.sectionsChange$.map(actions => this.findSection(actions, 'slogan') as AfsSection);
    this.careersData$ = this.sectionsChange$.map(actions => this.findSection(actions, 'careers') as AfsJobsSection);
    this.callToActionData$ = this.sectionsChange$.map(actions => this.findSection(actions, 'callToAction') as AfsSection);
    this.contactData$ = this.sectionsChange$.map(actions => this.findSection(actions, 'contact') as AfsContactSection);
  }

  private findSection(actions: DocumentChangeAction[], sectionName: string) {
    const foundSectionAction = actions.find(action => action.payload.doc.id === sectionName);
    if (!foundSectionAction) {
      return null;
    }
    return foundSectionAction.payload.doc.data();
  }
}
