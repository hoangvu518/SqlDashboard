import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-column-filter',
  templateUrl: './home-column-filter.component.html',
  styleUrls: ['./home-column-filter.component.css'],
})
export class HomeColumnFilterComponent implements OnInit {
  panelOpenState = false;
  columns = ['Id', 'PhysicalName', 'Alias Name', 'Project Name'];
  constructor() {}

  ngOnInit(): void {}
}
