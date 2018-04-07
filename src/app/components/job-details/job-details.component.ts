import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { JobDetailsDialogComponent } from '../../shared/components/dialogs/job-details-dialog/job-details-dialog.component';
import { Unsubscribable } from '../../shared/util/unsubscribable';
import { ActivatedRoute, Router } from '@angular/router';
import { AfsJob } from '../../shared/models/afs-jobs-section';
import { FirebaseService } from '../../shared/services/firebase.service';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent extends Unsubscribable {
  private _dialogRef: MatDialogRef<JobDetailsDialogComponent, any>;

  constructor(private _dialog: MatDialog,
              private _router: Router,
              private _route: ActivatedRoute,
              private _firebaseService: FirebaseService) {
    super();
    const idObservable$ = this._route.paramMap.map(params => params.get('id'));
    const jobs$ = this._firebaseService.jobs$;

    combineLatest(idObservable$, jobs$)
      .takeUntil(this.ngUnsubscribe$)
      .subscribe(([id, jobs]: [string, AfsJob[]]) => {
        const job = jobs.find(job => job.id === id);
        if (this._dialogRef) {
          this._dialogRef.close();
        }
        this._dialogRef = this._dialog.open(JobDetailsDialogComponent, {
          data: {job: job},
        });
        this._dialogRef.afterClosed().takeUntil(this.ngUnsubscribe$).subscribe(() => this._router.navigate(['../'], {fragment: 'JOBS'}));
      });
  }

}
