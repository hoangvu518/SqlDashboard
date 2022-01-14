import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Server } from '@core/models';

@Component({
  selector: 'app-server-change-tracking',
  templateUrl: './server-change-tracking.component.html',
  styleUrls: ['./server-change-tracking.component.scss'],
})
export class ServerChangeTrackingComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Server) {}

  ngOnInit(): void {}
}
