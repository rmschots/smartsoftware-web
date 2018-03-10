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
import { TellUsComponent } from './components/sections/tell-us/tell-us.component';

const SINGLETON_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  NgxPageScrollModule,
  SharedModule.forRoot(),
  FlexLayoutModule
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
  TellUsComponent
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
