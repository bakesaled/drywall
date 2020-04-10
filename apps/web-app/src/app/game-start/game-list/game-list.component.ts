import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { interval, Observable } from 'rxjs';
import { Game } from '@drywall/shared/data-access';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'dry-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent implements OnInit {
  public games$: Observable<any>;
  constructor(public socketService: SocketService) {}

  ngOnInit(): void {
    this.games$ = interval(1000).pipe(
      startWith(0),
      switchMap(() => this.socketService.getAllGames())
    );
    // this.socketService
    //   .getAllGames()
    //   .pipe(this.games$)
    //   .subscribe((games) => {
    //     this.games$;
    //   });
  }
}
