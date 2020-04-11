import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '@drywall/shared/data-access';

@Component({
  selector: 'dry-player-profile-dialog',
  templateUrl: './player-profile-dialog.component.html',
  styleUrls: ['./player-profile-dialog.component.scss'],
})
export class PlayerProfileDialogComponent implements OnInit {
  playerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PlayerProfileDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Player,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
    });
  }

  onSubmit() {
    this.data = {
      ...this.data,
      name: this.playerForm.value.name,
    };
    this.dialogRef.close(this.data);
  }
}
