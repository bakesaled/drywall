import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '@drywall/shared/data-access';

@Component({
  selector: 'dry-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit {
  public startGameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GameStartComponent>,
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
