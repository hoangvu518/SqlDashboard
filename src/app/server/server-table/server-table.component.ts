import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Server } from '@core/models/server';
import {
  merge,
  Observable,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ServerEditComponent } from '../server-edit/server-edit.component';
import {
  ColumnDefinition,
  ServerFacadeService,
} from '../server-facade.service';

@Component({
  selector: 'app-server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerTableComponent implements OnInit {
  columnsDefinition$!: Observable<ReadonlyArray<ColumnDefinition>>;
  displayedColumns$!: Observable<string[]>;
  data!: Server[];
  totalCount!: number;
  pageSubscription!: Subscription;
  dataSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private databaseFacadeService: ServerFacadeService
  ) {}
  ngOnInit(): void {
    this.columnsDefinition$ = this.databaseFacadeService.columnsDefinition$;
    this.displayedColumns$ = this.databaseFacadeService.displayedColumns$;
  }
  ngAfterViewInit(): void {
    this.dataSubscription = this.databaseFacadeService.queryParams$
      .pipe(
        tap((x) => (this.paginator.pageIndex = x.pageIndex)),
        switchMap((x) => this.databaseFacadeService.getAllDatabaseBy(x))
      )
      .subscribe((x) => {
        this.totalCount = x.TotalCount;
        this.data = x.Results;
      });
    this.pageSubscription = merge(this.paginator.page)
      .pipe(startWith({}))
      .subscribe((x) => {
        console.log(this.paginator.pageIndex);
        this.databaseFacadeService.updatePageIndex(this.paginator.pageIndex);
      });
  }
  openEditDialog(server: Server) {
    console.log(server);
    this.dialog.open(ServerEditComponent, {
      // minWidth: 600,
      data: server,
    });
  }
  ngOnDestroy(): void {
    this.pageSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }
}
