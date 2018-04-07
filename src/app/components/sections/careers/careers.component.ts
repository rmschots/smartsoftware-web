import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AfsJobsSection, AfsJob } from '../../../shared/models/afs-jobs-section';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent {
  @Output() jobDetailsClick: EventEmitter<AfsJob> = new EventEmitter<AfsJob>();
  @Input() careersData: AfsJobsSection;

  constructor(private _router: Router) {
  }


  clickJobDetails(job: AfsJob) {
    this.jobDetailsClick.next(job);
  }

  openJobDetails(job: AfsJob) {
    this._router.navigate(['/jobs/' + job.id], {fragment: 'JOBS'});
  }
}
