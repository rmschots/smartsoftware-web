import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Unsubscribable } from '../../../shared/util/unsubscribable';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialogRef, MatStep } from '@angular/material';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AfsContactMessage } from '../../../shared/models/afs-contact-message';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-job-application-dialog',
  templateUrl: './job-application-dialog.component.html',
  styleUrls: ['./job-application-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobApplicationDialogComponent extends Unsubscribable {

  @ViewChild('doneStep') doneStep: MatStep;

  completionFormGroup: FormGroup;
  tellUsFormGroup: FormGroup;
  formsubmitting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _fb: FormBuilder,
              private _afs: AngularFirestore,
              private _dialogRef: MatDialogRef<JobApplicationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.tellUsFormGroup = _fb.group({
      contactInfo: _fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]]
      }),
      projectInfo: _fb.group({
        content: ['', Validators.required]
      }),
      recaptcha: [null, Validators.required]
    });
    this.completionFormGroup = this._fb.group({
      tellUs: this.tellUsFormGroup,
      sent: [null, Validators.required]
    });
  }

  doneClicked() {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this.tellUsFormGroup.valid) {
      this.formsubmitting$.next(true);
      const rawValue = this.tellUsFormGroup.getRawValue();
      const contactMessage = {
        subject: 'Job Application',
        job: this.data.job,
        name: `${rawValue.contactInfo.name} (${rawValue.contactInfo.phone})`,
        email: rawValue.contactInfo.email,
        message: rawValue.projectInfo.content,
        recaptcha: rawValue.recaptcha
      };
      fromPromise(
        this._afs.doc<AfsContactMessage>(`contactMessages/${this._afs.createId()}`)
          .set(contactMessage)
      ).takeUntil(this.ngUnsubscribe$).subscribe(
        () => {
          this.completionFormGroup.controls['sent'].setValue(true);
          this.doneStep.select();
          this.formCompleted$.next(true);
        },
        error => console.error(`error sending message: ${error}`)
      );
    }
  }
}
