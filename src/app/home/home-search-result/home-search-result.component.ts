import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { DBResult } from '@core/models/db-result.model';
import { Employee } from '@core/models/employee.model';
import { DBSearchColumnDef, DBSearchState } from '../home-state.service';

@Component({
  selector: 'app-home-search-result',
  templateUrl: './home-search-result.component.html',
  styleUrls: ['./home-search-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSearchResultComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // @Input() dataSource$!: Observable<DBResult[]>;
  @Input() source$!: Observable<DBResult[]>;
  @Input() searchState$!: Observable<DBSearchState>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  stateSubscription!: Subscription;

  columns!: DBSearchColumnDef[];

  // columns = [
  //   {
  //     columnDef: 'Id',
  //     header: 'Id',
  //     cell: (element: DBResult) => `${element.Id}`,
  //   },
  //   {
  //     columnDef: 'PhysicalName',
  //     header: 'Physical Name',
  //     cell: (element: DBResult) => `${element.PhysicalName}`,
  //   },
  //   {
  //     columnDef: 'AliasName',
  //     header: 'Alias Name',
  //     cell: (element: DBResult) => `${element.AliasName}`,
  //   },
  //   {
  //     columnDef: 'ProjectName',
  //     header: 'Project Name',
  //     cell: (element: DBResult) => `${element.ProjectName}`,
  //   },
  // ];
  // displayedColumns = this.columns.map((c) => c.columnDef);
  displayedColumns!: string[];
  data: Employee[] = [];
  // data: DBResult[] = [
  //   {
  //     Id: 1,
  //     PhysicalName: 'FD123',
  //     AliasName: 'AuditSQLDEV',
  //     ProjectName: 'VRC',
  //   },
  //   {
  //     Id: 2,
  //     PhysicalName: 'FD124',
  //     AliasName: 'AuditSQLUAT',
  //     ProjectName: 'VRC',
  //   },
  // ];
  // data!: DBResult[];
  // displayedColumns = ['id'];
  // displayedColumns = ['Id', 'PhysicalName', 'AliasName', 'ProjectName'];

  // constructor() {}
  constructor() {}
  ngOnDestroy(): void {
    // this.stateSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    // this.employeeService.getAll().subscribe((x) => (this.data = x));
    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // this.dataSource$.subscribe((x) => {
    //   console.log(x);
    //   this.recordCount = x.length;
    //   this.data = x;
    //   console.log(this.recordCount);
    //   console.log(this.data);
    //   console.log('hahahahah');
    // });
    // const test = this.dataSource$
    //   .pipe(tap((x) => (this.data = x)))
    //   .subscribe((x) => console.log(this.data));
    //   merge(this.sort.sortChange, this.paginator.page)
    //     .pipe(
    //       startWith({}),
    //       switchMap((x) => this.dataSource$),
    //       map((data) => {
    //         // Flip flag to show that loading has finished.
    //         // this.isLoadingResults = false;
    //         // this.isRateLimitReached = data === null;
    //         if (data === null) {
    //           return [];
    //         }
    //         // Only refresh the result length if there is new data. In case of rate
    //         // limit errors, we do not want to reset the paginator to zero, as that
    //         // would prevent users from re-triggering requests.
    //         this.recordCount = data.length;
    //         return data;
    //       })
    //     )
    //     .subscribe((data) => (this.data = data));
  }

  ngOnInit(): void {
    // this.stateSubscription = this.searchState$.subscribe((x) => {
    //   this.columns = x.columnsDef;
    //   this.displayedColumns = x.columnsDef.map((x) => x.columnDef);
    // });
    // this.employeeService.getAll().subscribe((x) => (this.data = x));
    // this.dataSource$.subscribe((x) => (this.data = x));
    // console.log(this.data);
    // this.dbSearchService.getAll().subscribe((x) => (this.data = x));
    // this.dataSource$.subscribe((x) => {
    //   console.log(x);
    //   this.recordCount = x.length;
    //   this.data = x;
    //   console.log(this.recordCount);
    //   console.log(this.data);
    //   console.log('hahahahah');
    // });
    // this.source$.subscribe((x) => (this.data = x));
  }
}
