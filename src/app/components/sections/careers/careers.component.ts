import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AfsJobsSection } from '../../../shared/models/afs-jobs-section';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent {
  careersData$: Observable<AfsJobsSection>;

  constructor(private _afs: AngularFirestore) {
    this.careersData$ = _afs.doc<AfsJobsSection>('sections/careers').valueChanges();
  }
}
