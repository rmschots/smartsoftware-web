import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionService } from './services/section/section.service';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgwWowModule } from 'ngx-wow';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { TellUsDialogComponent } from './components/dialogs/tell-us-dialog/tell-us-dialog.component';
import { CreateYourOwnJobDialogComponent } from './components/dialogs/create-your-own-job-dialog/create-your-own-job-dialog.component';
import { JobApplicationDialogComponent } from './components/dialogs/job-application-dialog/job-application-dialog.component';
import { JobDetailsDialogComponent } from './components/dialogs/job-details-dialog/job-details-dialog.component';
import { FirebaseService } from './services/firebase.service';
import { FacebookService } from './services/facebook.service';

const DIALOGS = [
  TellUsDialogComponent,
  CreateYourOwnJobDialogComponent,
  JobApplicationDialogComponent,
  JobDetailsDialogComponent
];

const COMPONENTS = [
  LoadingSpinnerComponent,
  ...DIALOGS
];

const SERVICES = [
  SectionService,
  FirebaseService,
  FacebookService,
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
  MatDialogModule,
  MatSidenavModule,
  MatExpansionModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
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
