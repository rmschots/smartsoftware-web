import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AfsJobsSection } from '../../../shared/models/afs-jobs-section';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent {
  @Input() careersData: AfsJobsSection;
}
