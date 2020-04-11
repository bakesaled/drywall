import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PlayerProfileDialogComponent } from '../player/player-profile-dialog/player-profile-dialog.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { SocketService } from '../core/services/socket.service';
import { GameDialogComponent } from './game-dialog/game-dialog.component';
import { Router } from '@angular/router';
import { Game } from '@drywall/shared/data-access';
import * as io from 'socket.io-client';

@Component({
  selector: 'dry-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  private gamesSubject = new BehaviorSubject<Game[]>([]);

  public games$ = this.gamesSubject.asObservable();

  constructor(
    public dialog: MatDialog,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.socketService.connect(io);
    this.socketService
      .onNewPlayer()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((data: { player; games }) => {
        console.log('on-new-player games', data.games);
        this.gamesSubject.next(data.games);
        if (data.player.socketId === this.socketService.socket.id) {
          const dialogRef = this.dialog.open(PlayerProfileDialogComponent, {
            width: '250px',
            data: data.player,
          });
          dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroySubject))
            .subscribe(async (result) => {
              if (result) {
                this.socketService.updatePlayer(result);
              }
            });
        }
      });

    this.socketService
      .onNewGame()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((data: { game; games; socketId }) => {
        this.gamesSubject.next(data.games);
        if (data.socketId === this.socketService.socket.id) {
          const dialogRef = this.dialog.open(GameDialogComponent, {
            width: '250px',
            data: data.game,
          });
          dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroySubject))
            .subscribe(async (result) => {
              if (result) {
                this.socketService.updateGame(result);
                await this.router.navigate(['/game-play/' + result.id]);
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onAddClick() {
    this.socketService.createNewGame();
  }
}
