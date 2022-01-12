import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Employee[]> {
    // return this.apiService.get('/Employee/GetAllEmployees');
    // return this.http.get<Employee[]>(
    //   'http://localhost:58675/api/Employee/GetAllEmployees'
    // );
    return this.http.get<Employee[]>('/api/employees');
  }
}
