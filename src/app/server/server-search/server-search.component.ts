import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-server-search',
  templateUrl: './server-search.component.html',
  styleUrls: ['./server-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerSearchComponent implements OnInit, OnDestroy {
  @Output() filterColumnChanged: EventEmitter<string> = new EventEmitter();
  @Output() filterValueChanged: EventEmitter<string> = new EventEmitter();
  private searchTerms$ = new Subject<string>();
  searchOption = new FormControl('PhysicalName');
  placeHolder = 'Enter search key...';
  searchSubscription!: Subscription;
  constructor() {}
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchTerms$
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => of(term))
      )
      .subscribe((x) => this.filterValueChanged.emit(x));
  }
  applyFilter(searchValue: string) {
    this.searchTerms$.next(searchValue);
  }
  updateFilterBy(change: MatSelectChange) {
    this.filterColumnChanged.emit(change.value);
  }
}
