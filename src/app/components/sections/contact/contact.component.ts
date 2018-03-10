import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {

  contactFormGroup: FormGroup;

  constructor(fb: FormBuilder) {
    this.contactFormGroup = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
}
