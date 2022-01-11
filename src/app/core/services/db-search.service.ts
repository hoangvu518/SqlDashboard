import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DBResult } from '../models/db-result.model';

// @Injectable({
//   providedIn: 'root',
// })

export interface DBResultDto {
  TotalCount: number;
  Results: DBResult[];
}

export interface QueryParams {
  pageIndex: number;
  pageSize: number;
}
@Injectable()
export class DbSearchService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<DBResultDto> {
    var response = this.http
      .get(`${environment.api_url}/servers?_start=20&_end=30`, {
        observe: 'response',
      })
      .pipe(
        switchMap((x) =>
          of({
            TotalCount: x.headers.get('X-Total-Count') ?? 0,
            Results: x.body,
          } as DBResultDto)
        ),
        shareReplay()
      );
    return response;
  }

  findBy(params: QueryParams): Observable<DBResultDto> {
    const start = params.pageIndex * params.pageSize;
    const end = (params.pageIndex + 1) * params.pageSize;

    var response = this.http
      .get(`${environment.api_url}/servers?_start=${start}&_end=${end}`, {
        observe: 'response',
      })
      .pipe(
        switchMap((x) =>
          of({
            TotalCount: x.headers.get('X-Total-Count') ?? 0,
            Results: x.body,
          } as DBResultDto)
        ),
        shareReplay()
      );
    return response;
  }
}
