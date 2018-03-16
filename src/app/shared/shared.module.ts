import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionService } from './services/section.service';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgwWowModule } from 'ngx-wow';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

const COMPONENTS = [
  LoadingSpinnerComponent
];

const SERVICES = [
  SectionService
];

const GUARDS = [];

const PIPES = [];


const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
];

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgwWowModule,
  AngularFirestoreModule,
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
