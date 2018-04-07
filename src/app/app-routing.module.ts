import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'jobs/:id', component: JobDetailsComponent},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

