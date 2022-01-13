import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server-paginator',
  templateUrl: './server-paginator.component.html',
  styleUrls: ['./server-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerPaginatorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() totalCount!: number;
  @Output() pageIndexChanged: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  subscription!: Subscription;
  constructor() {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.subscription = this.paginator.page.subscribe((x) => {
      this.pageIndexChanged.emit(this.paginator.pageIndex);
    });
  }

  ngOnInit(): void {}
}
