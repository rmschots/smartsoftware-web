import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AfsJob, AfsJobsSection } from '../../../shared/models/afs-jobs-section';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent {
  @Output() jobDetailsClick: EventEmitter<AfsJob> = new EventEmitter<AfsJob>();
  @Input() careersData: AfsJobsSection;

  private _allJobsVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router, private _pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
  }


  clickJobDetails(job: AfsJob) {
    this.jobDetailsClick.next(job);
  }

  openJobDetails(job: AfsJob) {
    this._router.navigate(['/jobs/' + job.id], {fragment: 'JOBS'});
  }

  openAllJobs() {
    this._allJobsVisible$.next(true);
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, `#job-list`);
    setTimeout(() => this._pageScrollService.start(pageScrollInstance));
  }

  get allJobsVisible$() {
    return this._allJobsVisible$.asObservable();
  }
}
