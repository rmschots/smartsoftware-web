import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AfsSection } from '../../../shared/models/afs-section';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallToActionComponent {
  @Output() tellUsClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  callToActionData$: Observable<AfsSection>;

  constructor(private _afs: AngularFirestore) {
    this.callToActionData$ = _afs.doc<AfsSection>('sections/callToAction').valueChanges();
  }

  clickTellUs() {
    this.tellUsClick.next(true);
  }
}
