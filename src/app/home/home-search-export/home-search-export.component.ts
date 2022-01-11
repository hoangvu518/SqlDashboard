import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DBResult } from '@core/models/db-result.model';
// import { ConsoleReporter } from 'jasmine';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Observable, Subscription } from 'rxjs';
//  import { DBSearchState } from '../home-state.service';

@Component({
  selector: 'app-home-search-export',
  templateUrl: './home-search-export.component.html',
  styleUrls: ['./home-search-export.component.css'],
})
export class HomeSearchExportComponent implements OnInit, OnDestroy {
  // @Input() searchState$!: Observable<DBSearchState>;
  @Input() pdfData$!: Observable<DBResult[]>;
  // data!: DBResult[];

  dataSubscription!: Subscription;
  stateSubscription!: Subscription;
  constructor() {}
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }
  title = 'jspdf-autotable-demo';

  // head = [['ID', 'Country', 'Rank', 'Capital']];

  // dataState!: DBSearchState;

  data!: DBResult[];

  ngOnInit(): void {
    // this.dataSubscription = this.pdfData$.subscribe((x) => (this.data = x));
    // this.stateSubscription = this.searchState$.subscribe(
    //   (x) => (this.dataState = x)
    // );
  }

  private DeleteKeys(myObj: any, array: string[]) {
    for (let index = 0; index < array.length; index++) {
      delete myObj[array[index]];
    }
    return myObj;
  }

  exportPDF() {
    var doc = new jsPDF();
    // var head = [this.dataState.displayedColumns];
    // var hiddenColumns = this.dataState.hiddenColumns;

    let testData: any[];
    let myTableData: any[][] = [];
    this.data.forEach((x) => {
      let myObject = { ...x };
      // let finalObject = this.DeleteKeys(myObject, hiddenColumns);
      // let singleRowTableValue = Object.values(finalObject);
      // myTableData.push(singleRowTableValue);
    });

    var tableData = this.data.map((x) => Object.values(x));
    console.log(tableData);

    // doc.setFontSize(18);
    // doc.text('My PDF Table', 11, 8);
    // doc.setFontSize(11);
    // doc.setTextColor(100);

    (doc as any).autoTable({
      // head: head,
      body: myTableData,
      // theme: 'plain',
      // didDrawCell: (data) => {
      //   console.log(data.column.index);
      // },
    });

    // Open PDF document in new tab
    // doc.output('dataurlnewwindow');

    // Download PDF document
    doc.save('table.pdf');
  }
}
