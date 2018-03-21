import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AfsJobsSection, Job } from '../../../shared/models/afs-jobs-section';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent {
  @Output() jobDetailsClick: EventEmitter<Job> = new EventEmitter<Job>();
  @Input() careersData: AfsJobsSection;


  clickJobDetails(job: Job) {
    this.jobDetailsClick.next(job);
  }
}
