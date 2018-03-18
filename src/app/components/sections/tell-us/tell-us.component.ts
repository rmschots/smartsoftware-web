import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AfsContactMessage } from '../../../shared/models/afs-contact-message';
import { Unsubscribable } from '../../../shared/util/unsubscribable';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-tell-us',
  templateUrl: './tell-us.component.html',
  styleUrls: ['./tell-us.component.scss']
})
export class TellUsComponent extends Unsubscribable {

  tellUsFormGroup: FormGroup;
  formSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formsubmitting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(fb: FormBuilder, private _afs: AngularFirestore) {
    super();
    this.tellUsFormGroup = fb.group({
      content: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      recaptcha: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.tellUsFormGroup.valid) {
      this.formsubmitting$.next(true);
      const rawValue = this.tellUsFormGroup.getRawValue();
      const contactMessage = {
        subject: 'Tell us about your job',
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
