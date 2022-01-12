import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Server } from '@core/models/server';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerEditComponent implements OnInit {
  disabledSubmitButton = false;
  editServerForm = this.fb.group({
    Id: [this.data.Id, Validators.required],
    PhysicalName: [this.data.PhysicalName, Validators.required],
    AliasName: [this.data.AliasName, Validators.required],
    ProjectName: [this.data.ProjectName, Validators.required],
    Status: [this.data.Status.Id, Validators.required],
    Version: [this.data.SQLVersion.Id, Validators.required],
    Environment: [this.data.Environment.Id, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Server,
    private dialogRef: MatDialogRef<ServerEditComponent>
  ) {}

  ngOnInit(): void {}
  submit() {}
}
