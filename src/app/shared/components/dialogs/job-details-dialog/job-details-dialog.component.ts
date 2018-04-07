import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AfsJob } from '../../../models/afs-jobs-section';

@Component({
  selector: 'app-job-details-dialog',
  templateUrl: './job-details-dialog.component.html',
  styleUrls: ['./job-details-dialog.component.scss']
})
export class JobDetailsDialogComponent {
  public job: AfsJob;

  constructor(private _dialogRef: MatDialogRef<JobDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) _data: any) {
    this.job = _data.job;
  }


}
