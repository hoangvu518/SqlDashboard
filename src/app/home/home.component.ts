import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResult } from '../core/models/db-result.model';
import { Employee } from '../core/models/employee.model';
import { DbSearchService, EmployeeService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // tableData = new Observable<DBResult[]>();
  data!: Observable<Employee[]>;
  constructor(
    private dbSearchService: DbSearchService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.data = this.employeeService.getAll();
    // this.tableData = this.dbSearchService.getAll();
    // this.employeeService.getAll().subscribe((x) => console.log(x));
  }
}
