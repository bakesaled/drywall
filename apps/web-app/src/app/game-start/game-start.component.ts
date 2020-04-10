import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PlayerProfileDialogComponent } from '../player/player-profile-dialog/player-profile-dialog.component';
import { Subject } from 'rxjs';
import { SocketService } from '../core/services/socket.service';
import { GameDialogComponent } from './game-dialog/game-dialog.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'dry-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();

  constructor(
    public dialog: MatDialog,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.socketService.createNewPlayer().subscribe((player) => {
      const dialogRef = this.dialog.open(PlayerProfileDialogComponent, {
        width: '250px',
        data: player,
      });
      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroySubject))
        .subscribe(async (result) => {
          if (result) {
            this.socketService.updatePlayer(result);
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onAddClick() {
    this.socketService.createNewGame().subscribe((game) => {
      const dialogRef = this.dialog.open(GameDialogComponent, {
        width: '250px',
        data: game,
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
    });
  }
}
