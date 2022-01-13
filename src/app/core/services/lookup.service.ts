import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment, SQLVersion, Status } from '@core/models/index';
import { environment } from 'src/environments/environment';

@Injectable()
export class LookupService {
  constructor(private http: HttpClient) {}
  getServerEnvironments(): Observable<Environment[]> {
    return this.http.get<Environment[]>(`${environment.api_url}/environments?`);
  }

  getServerVersions(): Observable<SQLVersion[]> {
    return this.http.get<Environment[]>(`${environment.api_url}/sqlversions?`);
  }

  getServerStatuses(): Observable<Status[]> {
    return this.http.get<Environment[]>(`${environment.api_url}/statuses?`);
  }
}
