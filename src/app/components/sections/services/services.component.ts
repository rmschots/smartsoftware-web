import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AfsSection } from '../../../shared/models/afs-section';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  servicesData$: Observable<AfsSection>;

  constructor(private _afs: AngularFirestore) {
    this.servicesData$ = _afs.doc<AfsSection>('sections/services').valueChanges();
  }
}
