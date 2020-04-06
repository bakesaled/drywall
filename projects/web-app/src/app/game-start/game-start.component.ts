import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dry-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<GameStartComponent>) {}

  ngOnInit(): void {}

  onStartClick() {
    this.dialogRef.close(false);
  }

  onJoinClick() {
    this.dialogRef.close(true);
  }
}
