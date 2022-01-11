import { Injectable } from '@angular/core';
import { DBResult } from '@core/models/db-result.model';
import { DBResultDto, DbSearchService, QueryParams } from '@core/services';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
export interface ColumnDefinition {
  columnDef: string;
  header: string;
  cell: (x: DBResult) => string;
}

export interface State {
  allColumns: ReadonlyArray<string>;
  displayedColumns: string[];
  columnsDefinition: ReadonlyArray<ColumnDefinition>;
  pageIndex: number;
  pageSize: number;
}

const initialState = {
  allColumns: ['Id', 'PhysicalName', 'AliasName', 'ProjectName'],
  displayedColumns: ['Id', 'PhysicalName', 'AliasName', 'ProjectName'],
  columnsDefinition: [
    {
      columnDef: 'Id',
      header: 'Id',
      cell: (element: DBResult) => `${element.Id}`,
    },
    {
      columnDef: 'PhysicalName',
      header: 'Physical Name',
      cell: (element: DBResult) => `${element.PhysicalName}`,
    },
    {
      columnDef: 'AliasName',
      header: 'Alias Name',
      cell: (element: DBResult) => `${element.AliasName}`,
    },
    {
      columnDef: 'ProjectName',
      header: 'Project Name',
      cell: (element: DBResult) => `${element.ProjectName}`,
    },
  ],
  pageIndex: 0,
  pageSize: 10,
} as State;

@Injectable()
export class HomeFacadeService {
  private _state = initialState;
  private _state$ = new BehaviorSubject<State>(this._state);

  get state$() {
    return this._state$.asObservable();
  }

  get allColumns$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.allColumns))
    );
  }

  get displayedColumns$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.displayedColumns))
    );
  }

  get columnsDefinition$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.columnsDefinition))
    );
  }

  get pageIndex$() {
    return this._state$.pipe(
      switchMap((x) => new BehaviorSubject(x.pageIndex))
    );
  }

  get pageSize$() {
    return this._state$.pipe(switchMap((x) => new BehaviorSubject(x.pageSize)));
  }

  constructor(private dbSearchService: DbSearchService) {}

  getAllDatabase(): Observable<DBResultDto> {
    return this.dbSearchService.getAll().pipe(shareReplay());
  }

  getAllDatabaseBy(params: QueryParams): Observable<DBResultDto> {
    this._state.pageIndex = params.pageIndex;
    this._state$.next(this._state);
    return this.dbSearchService.findBy(params);
  }

  changeDisplayedColumns(displayedColumns: string[]) {
    this._state.displayedColumns = [...displayedColumns];
    this._state$.next(this._state);
  }

  resetDisplayColumns() {
    this._state = initialState;
    this._state$.next(this._state);
  }
}
