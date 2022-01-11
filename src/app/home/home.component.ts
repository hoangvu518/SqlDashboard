import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DBResult } from '@core/models/db-result.model';
import { DBResultDto } from '@core/services';
import { Observable, ObservedValueOf, tap } from 'rxjs';
import {
  ColumnDefinition,
  HomeFacadeService,
  State,
} from './home-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns$!: Observable<string[]>;
  // hiddenColumns$!: Observable<string[]>;
  allColumn$!: Observable<ReadonlyArray<string>>;
  columnsDefinition$!: Observable<ReadonlyArray<ColumnDefinition>>;
  allDatabase$!: Observable<DBResultDto>;
  pageIndex$!: Observable<number>;
  pageSize$!: Observable<number>;
  // state$!: Observable<State>;
  constructor(private homeFacadeService: HomeFacadeService) {}

  ngOnInit(): void {
    this.displayedColumns$ = this.homeFacadeService.displayedColumns$;
    // this.hiddenColumns$ = this.homeFacadeService.hiddenColumns$;
    this.allColumn$ = this.homeFacadeService.allColumns$;
    this.columnsDefinition$ = this.homeFacadeService.columnsDefinition$;
    // this.allDatabase$ = this.homeFacadeService.getAllDatabase(); // this.homeFacadeService.getAllDatabase().subscribe((x) => console.log(x));
    this.pageIndex$ = this.homeFacadeService.pageIndex$;
    this.pageSize$ = this.homeFacadeService.pageSize$;
    // this.state$ = this.homeFacadeService.state$;
  }

  changeDisplayedColumns(displayedColumns: string[]) {
    this.homeFacadeService.changeDisplayedColumns(displayedColumns);
  }
}
