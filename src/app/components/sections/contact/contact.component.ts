import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AfsContactSection } from '../../../shared/models/afs-contact-section';
import { AfsContactMessage } from '../../../shared/models/afs-contact-message';
import { Unsubscribable } from '../../../shared/util/unsubscribable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent extends Unsubscribable {
  @Input() contactData: AfsContactSection;
  contactFormGroup: FormGroup;
  formSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formsubmitting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(fb: FormBuilder, private _afs: AngularFirestore) {
    super();
    this.contactFormGroup = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      content: ['', Validators.required],
      recaptcha: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.contactFormGroup.valid) {
      this.formsubmitting$.next(true);
      const rawValue = this.contactFormGroup.getRawValue();
      const contactMessage = {
        subject: rawValue.subject,
        name: rawValue.name,
        email: rawValue.email,
        message: rawValue.content
      };
      fromPromise(
        this._afs.doc<AfsContactMessage>(`contactMessages/${this._afs.createId()}`)
          .set(contactMessage)
      ).takeUntil(this.ngUnsubscribe$).subscribe(
        () => this.formSubmitted$.next(true),
        error => console.error(`error sending message: ${error}`)
      );
    }
  }
}
