import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { PageScrollConfig, PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import { SectionService } from './shared/services/section/section.service';
import { NgwWowService } from 'ngx-wow';
import { DOCUMENT } from '@angular/common';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { AfsJob } from './shared/models/afs-jobs-section';
import { MatDialog, MatSidenav } from '@angular/material';
import { TellUsDialogComponent } from './shared/components/dialogs/tell-us-dialog/tell-us-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CreateYourOwnJobDialogComponent } from './shared/components/dialogs/create-your-own-job-dialog/create-your-own-job-dialog.component';
import { JobApplicationDialogComponent } from './shared/components/dialogs/job-application-dialog/job-application-dialog.component';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Unsubscribable } from './shared/util/unsubscribable';
import { Router } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import { FacebookService } from './shared/services/facebook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends Unsubscribable implements OnInit {

  private static darkThemeClassName = 'dark-theme';

  @HostBinding(`class.${AppComponent.darkThemeClassName}`) isDarkTheme = false;
  @HostBinding('class.text-center') textCenterClass = false;
  @ViewChild(MatSidenav) sidenav;

  constructor(public media: ObservableMedia,
              private _el: ElementRef,
              private _sectionService: SectionService,
              private _facebookService: FacebookService,
              private _firebaseService: FirebaseService,
              private _wowService: NgwWowService,
              private _pageScrollService: PageScrollService,
              private _dialog: MatDialog,
              private _overlayContainer: OverlayContainer,
              @Inject(DOCUMENT) private _document: any,
              private _router: Router) {
    super();
    history.scrollRestoration = 'manual';
    this.initTheme();
    this.observeMedia();
    this.configurePageScroll();
    this.initSections();
  }

  themeChanged() {
    if (this.isDarkTheme) {
      this.isDarkTheme = false;
      this._overlayContainer.getContainerElement().classList.remove(AppComponent.darkThemeClassName);
      window.localStorage.setItem('darkTheme', 'false');
    } else {
      this.isDarkTheme = true;
      this._overlayContainer.getContainerElement().classList.add(AppComponent.darkThemeClassName);
      window.localStorage.setItem('darkTheme', 'true');
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
    this._facebookService.sendCustomEvent('openTellUs');
    this._dialog.open(TellUsDialogComponent);
  }

  openCreateYourOwnJob() {
    this._facebookService.sendCustomEvent('openCreateYourOwnJob');
    this._dialog.open(CreateYourOwnJobDialogComponent);
  }

  openJobDetails(job: AfsJob) {
    this._facebookService.sendCustomEvent('openJobDetails', {id: job.id, job: job.title});
    this._dialog.open(JobApplicationDialogComponent, {
      data: {
        job: job
      }
    });
  }

  openSidenav() {
    this.sidenav.open();
  }

  get jobs$() {
    return this._firebaseService.jobs$;
  }

  get headerData$() {
    return this._firebaseService.headerData$;
  }

  get servicesData$() {
    return this._firebaseService.servicesData$;
  }

  get sloganData$() {
    return this._firebaseService.sloganData$;
  }

  get careersData$() {
    return this._firebaseService.careersData$;
  }

  get callToActionData$() {
    return this._firebaseService.callToActionData$;
  }

  get contactData$() {
    return this._firebaseService.contactData$;
  }

  private initSections() {
    this._firebaseService.init();
    this._firebaseService.sectionsChange$
      .takeUntil(this.ngUnsubscribe$)
      .subscribe(() => {
        const fragment = this._router.routerState.snapshot.root.fragment;
        if (fragment) {
          const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this._el.nativeElement, `#${fragment}`);
          setTimeout(() => this._pageScrollService.start(pageScrollInstance));
        }
      });
  }

  private configurePageScroll() {
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

  private observeMedia() {
    this.media.asObservable().takeUntil(this.ngUnsubscribe$).subscribe((mediaChange: MediaChange) => {
      if (this.media.isActive('lt-lg')) {
        PageScrollConfig.defaultScrollOffset = 0;
        this.textCenterClass = true;
      } else {
        PageScrollConfig.defaultScrollOffset = 104;
        this.textCenterClass = false;
      }
    });
  }

  private initTheme() {
    if (window.localStorage.getItem('darkTheme') === 'true') {
      this.isDarkTheme = true;
      this._overlayContainer.getContainerElement().classList.add(AppComponent.darkThemeClassName);
    }
  }
}
