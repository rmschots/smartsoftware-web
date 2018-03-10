import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tell-us',
  templateUrl: './tell-us.component.html',
  styleUrls: ['./tell-us.component.scss']
})
export class TellUsComponent {

  tellUsFormGroup: FormGroup;

  constructor(fb: FormBuilder) {
    this.tellUsFormGroup = fb.group({
      content: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
}
