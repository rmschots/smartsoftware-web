import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionService } from './services/section/section.service';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatStepperModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgwWowModule } from 'ngx-wow';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { TellUsDialogComponent } from '../components/tell-us-dialog/tell-us-dialog.component';
import { CreateYourOwnJobDialogComponent } from "../components/create-your-own-job-dialog/create-your-own-job-dialog.component";

const DIALOGS = [
  TellUsDialogComponent,
  CreateYourOwnJobDialogComponent
];

const COMPONENTS = [
  LoadingSpinnerComponent,
  ...DIALOGS
];

const SERVICES = [
  SectionService,
  {
    provide: RECAPTCHA_SETTINGS,
    useValue: {siteKey: '6LdcFU0UAAAAAJO-X2OKoqeuiLDRJ8TouPBsdFln'} as RecaptchaSettings,
  }
];

const GUARDS = [];

const PIPES = [];


const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatDialogModule
];

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgwWowModule,
  AngularFirestoreModule,
  RecaptchaModule,
  RecaptchaFormsModule,
  ...MATERIAL_MODULES
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    LoadingSpinnerComponent
  ],
  entryComponents: [
    ...DIALOGS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...SERVICES, ...GUARDS]
    };
  }
}
