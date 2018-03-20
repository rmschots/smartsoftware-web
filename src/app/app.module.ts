import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SectionComponent } from './components/section/section.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServicesComponent } from './components/sections/services/services.component';
import { CareersComponent } from './components/sections/careers/careers.component';
import { ContactComponent } from './components/sections/contact/contact.component';
import { CallToActionComponent } from './components/sections/call-to-action/call-to-action.component';
import { SloganComponent } from './components/sections/slogan/slogan.component';
import { NgwWowModule } from 'ngx-wow';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatDialogModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { FooterComponent } from './components/footer/footer.component';

const SINGLETON_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  NgxPageScrollModule,
  MatDialogModule,
  OverlayModule,
  FlexLayoutModule,
  NgwWowModule.forRoot(),
  RecaptchaModule.forRoot(),
  SharedModule.forRoot(),
  AngularFireModule.initializeApp(environment.firebase)
];

const CONTAINERS = [
  AppComponent,
  SectionComponent,
  NavbarComponent,
  HeaderComponent,
  ServicesComponent,
  CareersComponent,
  ContactComponent,
  CallToActionComponent,
  SloganComponent,
  FooterComponent
];

@NgModule({
  declarations: [
    ...CONTAINERS
  ],
  imports: [
    ...SINGLETON_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
