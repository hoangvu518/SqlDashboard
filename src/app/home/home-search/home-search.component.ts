import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css'],
})
export class HomeSearchComponent implements OnInit {
  searchOption = new FormControl('PhysicalName');
  placeHolder = 'Enter search key...';
  constructor() {}

  ngOnInit(): void {}
  applyFilter(event: Event) {}
  updatePlaceHolder(change: MatSelectChange) {
    console.log(change);
    // this.placeHolder = change.value;
  }
}
