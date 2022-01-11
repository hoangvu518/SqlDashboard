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
import { DBResult } from '@core/models/db-result.model';
import { DBResultDto } from '@core/services';
import {
  map,
  merge,
  Observable,
  of,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ColumnDefinition, HomeFacadeService } from '../home-facade.service';

@Component({
  selector: 'app-home-search-result',
  templateUrl: './home-search-result.component.html',
  styleUrls: ['./home-search-result.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSearchResultComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // @Input() dataSource$!: Observable<DBResultDto>;
  // @Input() columnsDefinition$!: Observable<ReadonlyArray<ColumnDefinition>>;
  // @Input() displayedColumns$!: Observable<string[]>;

  // dataSource$!: Observable<DBResultDto>;
  columnsDefinition$!: Observable<ReadonlyArray<ColumnDefinition>>;
  displayedColumns$!: Observable<string[]>;
  data!: DBResult[];
  totalCount!: number;
  subscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private homeFacadeService: HomeFacadeService) {}
  ngOnInit(): void {
    this.columnsDefinition$ = this.homeFacadeService.columnsDefinition$;
    this.displayedColumns$ = this.homeFacadeService.displayedColumns$;
  }
  ngAfterViewInit(): void {
    this.subscription = merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() =>
          this.homeFacadeService.getAllDatabaseBy({
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
          })
        )
      )
      .subscribe((x) => {
        this.data = x.Results;
        this.totalCount = x.TotalCount;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
