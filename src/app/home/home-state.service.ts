import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DBResult } from '../core/models/db-result.model';
import { DbSearchService } from '../core/services';

export interface DBSearchColumnDef {
  columnDef: string;
  header: string;
  cell: (element: DBResult) => string;
}

export interface DisplayedColumn {
  columnDef: string;
  displayed: boolean;
}

export interface DBSearchState {
  hiddenColumns: string[];
  defaultDisplayedColumns: string[];
  displayedColumns: string[];
  columnsDef: DBSearchColumnDef[];
}

// displayedColumns: [
//   { columnDef: 'Id', displayed: true },
//   { columnDef: 'PhysicalName', displayed: true },
//   { columnDef: 'AliasName', displayed: true },
//   { columnDef: 'ProjectName', displayed: true },
// ],

@Injectable()
export class HomeStateService {
  private state: DBSearchState = {
    hiddenColumns: [],
    defaultDisplayedColumns: this.GetDefaultDisplayColumns(),
    displayedColumns: this.GetDefaultDisplayColumns(),
    columnsDef: [
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
  };

  private _state$: BehaviorSubject<DBSearchState> = new BehaviorSubject(
    this.state
  );

  get state$() {
    return this._state$.asObservable();
  }

  constructor(private dbSearchService: DbSearchService) {}

  GetAll(): Observable<DBResult[]> {
    return this.dbSearchService.getAll();
  }

  GetDefaultDisplayColumns(): string[] {
    return ['Id', 'PhysicalName', 'AliasName', 'ProjectName'];
  }

  // GetDataFilteredBySearchState(): Observable<any>{
  //   let a = this.GetAll().pipe(
  //     map(x=> new { })
  //   )
  // }

  UpdateDisplayedColumns(displayedColumns: string[]) {
    this.state.hiddenColumns = this.state.displayedColumns.filter((x) =>
      displayedColumns.includes(x)
    );
    this.state.displayedColumns = [...displayedColumns];
    this._state$.next(this.state);
  }
}
