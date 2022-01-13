import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Server } from '@core/models/server';
import { Observable } from 'rxjs';
import { ServerEditComponent } from '../server-edit/server-edit.component';
import { ColumnDefinition } from '../server-facade.service';

@Component({
  selector: 'app-server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerTableComponent {
  @Input() servers!: Server[];
  @Input() columnsDefinition$!: Observable<ColumnDefinition[]>;
  @Input() displayedColumns$!: Observable<string[]>;

  constructor(private dialog: MatDialog) {}
  openEditDialog(server: Server) {
    this.dialog.open(ServerEditComponent, {
      data: server,
    });
  }
}
