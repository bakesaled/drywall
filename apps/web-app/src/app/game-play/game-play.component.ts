import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../core/services/socket.service';
import { takeUntil } from 'rxjs/operators';
import { GameStartComponent } from '../game-start/game-start.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'dry-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
})
export class GamePlayComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  constructor(private socketService: SocketService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.socketService.createNewPlayer();
    const dialogRef = this.dialog.open(GameStartComponent, {
      width: '250px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroySubject))
      .subscribe(async (result) => {
        if (result && result.name) {
          this.socketService.startNewGame();
        } else {
          this.socketService.joinGame();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
