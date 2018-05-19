import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { AfsJob, AfsJobsSection } from '../../../../shared/models/afs-jobs-section';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDetailRowDirective } from '../../../../shared/directives/cdk-detail-row/cdk-detail-row.directive';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements AfterViewInit {
  displayedColumns = ['title', 'location', 'date'];
  dataSource: MatTableDataSource<AfsJob> = new MatTableDataSource<AfsJob>([]);
  selection = new SelectionModel<AfsJob>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  private openedRow: CdkDetailRowDirective;

  @Input()
  set careersData(jobsSectionData: AfsJobsSection) {
    if (jobsSectionData) {
      this.dataSource.data = jobsSectionData.jobs;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onToggleChange(cdkDetailRow: CdkDetailRowDirective) {
    this.openedRow = cdkDetailRow.expanded ? cdkDetailRow : undefined;
  }
}
