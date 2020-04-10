import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Game } from '@drywall/shared/data-access';

@Component({
  selector: 'dry-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss'],
})
export class GameDialogComponent implements OnInit {
  public startGameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Game
  ) {}

  ngOnInit(): void {
    this.startGameForm = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
    });
  }

  onStartSubmit() {
    this.data = {
      ...this.data,
      name: this.startGameForm.value.name,
    };
    this.dialogRef.close(this.data);
  }

  onJoinClick() {
    this.dialogRef.close(true);
  }
}
