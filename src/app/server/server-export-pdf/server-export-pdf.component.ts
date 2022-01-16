import { Component, OnDestroy, OnInit } from '@angular/core';
import { Server } from '@core/models';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Subject, Subscription, switchMap } from 'rxjs';
import { ServerFacadeService } from '../server-facade.service';

@Component({
  selector: 'app-server-export-pdf',
  templateUrl: './server-export-pdf.component.html',
  styleUrls: ['./server-export-pdf.component.scss'],
})
export class ServerExportPdfComponent implements OnInit, OnDestroy {
  data!: Server[];
  displayedColumns!: string[];
  hiddenColumns!: string[];

  export$ = new Subject();
  dataSubscription!: Subscription;
  displayedColumnSubscription!: Subscription;
  hiddenColumnSubscription!: Subscription;
  constructor(private serverFacadeService: ServerFacadeService) {}

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.displayedColumnSubscription.unsubscribe();
    this.hiddenColumnSubscription.unsubscribe();
  }
  title = 'jspdf-autotable';

  ngOnInit(): void {
    this.dataSubscription = this.export$
      .pipe(switchMap((x) => this.serverFacadeService.getPDFData()))
      .subscribe((x) => {
        this.data = x;
        this.exportPDF(this.displayedColumns, this.hiddenColumns, this.data);
      });
    this.displayedColumnSubscription =
      this.serverFacadeService.displayedColumns$.subscribe(
        (x) => (this.displayedColumns = x)
      );
    this.hiddenColumnSubscription =
      this.serverFacadeService.hiddenColumns$.subscribe(
        (x) => (this.hiddenColumns = x)
      );
  }

  private DeleteKeys(myObj: any, array: string[]) {
    for (let index = 0; index < array.length; index++) {
      delete myObj[array[index]];
    }
    return myObj;
  }

  initiateExportPDF() {
    this.export$.next(true);
  }

  exportPDF(
    displayedColumns: string[],
    hiddenColumns: string[],
    data: Server[]
  ) {
    var doc = new jsPDF();
    var head = [displayedColumns];
    let myTableData: any[][] = [];
    data.forEach((x) => {
      let myObject = { ...x };
      let finalObject = this.DeleteKeys(myObject, hiddenColumns);
      let singleRowTableValue = Object.values(finalObject);
      myTableData.push(singleRowTableValue);
    });
    var tableData = this.data.map((x) => Object.values(x));
    // doc.setFontSize(18);
    // doc.text('My PDF Table', 11, 8);
    // doc.setFontSize(11);
    // doc.setTextColor(100);
    (doc as any).autoTable({
      head: head,
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
