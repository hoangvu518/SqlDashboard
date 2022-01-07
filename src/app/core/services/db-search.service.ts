import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResult } from '../models/db-result.model';
import { Employee } from '../models/employee.model';
import { ApiService } from './api.service';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class DbSearchService {
  constructor(private apiService: ApiService, private http: HttpClient) {}
  getAll(): Observable<DBResult[]> {
    return this.apiService.get('/servers');
    // return this.http.get<DBResult[]>('/api/servers');
    // return this.http.get<Employee[]>('/api/employees');
  }
}
