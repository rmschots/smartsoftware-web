import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AfsSection } from '../../../shared/models/afs-section';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-slogan',
  templateUrl: './slogan.component.html',
  styleUrls: ['./slogan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SloganComponent {
  sloganData$: Observable<AfsSection>;

  constructor(private _afs: AngularFirestore) {
    this.sloganData$ = _afs.doc<AfsSection>('sections/slogan').valueChanges();
  }
}
