import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AfsContactSection } from '../../../shared/models/afs-contact-section';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {

  contactData$: Observable<AfsContactSection>;
  contactFormGroup: FormGroup;

  constructor(fb: FormBuilder, private _afs: AngularFirestore) {
    this.contactData$ = _afs.doc<AfsContactSection>('sections/contact').valueChanges();
  }
}
