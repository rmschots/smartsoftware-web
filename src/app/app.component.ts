import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { PageScrollConfig, PageScrollService } from 'ngx-page-scroll';
import { SectionService } from './shared/services/section/section.service';
import { NgwWowService } from 'ngx-wow';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { AfsJobsSection, Job } from './shared/models/afs-jobs-section';
import { AfsSection } from './shared/models/afs-section';
import { AfsContactSection } from './shared/models/afs-contact-section';
import { MatDialog } from '@angular/material';
import { TellUsDialogComponent } from './components/tell-us-dialog/tell-us-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CreateYourOwnJobDialogComponent } from './components/create-your-own-job-dialog/create-your-own-job-dialog.component';
import { JobApplicationDialogComponent } from './components/job-application-dialog/job-application-dialog.component';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Unsubscribable } from './shared/util/unsubscribable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends Unsubscribable implements OnInit {

  @HostBinding('class.dark-theme') componentCssClass = false;
  @HostBinding('class.text-center') textCenterClass = false;

  sectionsChange$: Observable<DocumentChangeAction[]>;

  headerData$: Observable<AfsSection>;
  servicesData$: Observable<AfsSection>;
  sloganData$: Observable<AfsSection>;
  careersData$: Observable<AfsSection>;
  callToActionData$: Observable<AfsSection>;
  contactData$: Observable<AfsSection>;

  constructor(public media: ObservableMedia,
              private _el: ElementRef,
              private _sectionService: SectionService,
              private _wowService: NgwWowService,
              private _pageScrollService: PageScrollService,
              private _afs: AngularFirestore,
              private _dialog: MatDialog,
              private _overlayContainer: OverlayContainer,
              @Inject(DOCUMENT) private _document: any) {
    super();
    media.asObservable().takeUntil(this.ngUnsubscribe$).subscribe((mediaChange: MediaChange) => {
      if (media.isActive('lt-lg')) {
        PageScrollConfig.defaultScrollOffset = 0;
        this.textCenterClass = true;
      } else {
        PageScrollConfig.defaultScrollOffset = 104;
        this.textCenterClass = false;
      }
    });
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
      this.componentCssClass = true;
      this._overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.componentCssClass = false;
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

  openJobDetails(job: Job) {
    this._dialog.open(JobApplicationDialogComponent, {
      data: {
        job: job
      }
    });
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
