import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.startGameForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onStartSubmit() {
    const game: Game = {
      name: this.startGameForm.value.name,
    };
    this.dialogRef.close(game);
  }

  onJoinClick() {
    this.dialogRef.close(true);
  }
}
