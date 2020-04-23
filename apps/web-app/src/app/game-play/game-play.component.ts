import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../core/services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, Seat } from '@drywall/shared/data-access';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dry-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePlayComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  private gameSubject = new BehaviorSubject<Game>(undefined);

  public game$: Observable<Game> = this.gameSubject.asObservable();
  public inProgress = false;

  get activeSeats(): Seat[] {
    const results = [];
    const game = this.gameSubject.getValue();
    // console.log('activeSeats', game);
    if (game) {
      game.seats.forEach((seat) => {
        const inCompleteHands = seat.book.hands.filter((h) => !h.complete);
        if (inCompleteHands.length) {
          results.push(seat);
        }
      });
    }
    return results;
  }

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.socketService
      .onGameJoined()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((game) => {
        console.log('onGameJoined', game);
        this.gameSubject.next(game);
      });
    console.log('prep emit join game');
    this.socketService
      .joinGame({
        id,
      })
      .pipe(
        // tap((returnedGame) => {
        //   console.log('returned game', returnedGame);
        //   if (!returnedGame) {
        //     this.router.navigate(['/']);
        //   }
        // })
        takeUntil(this.destroySubject)
      )
      .subscribe(
        (game: Game) => {
          console.log('done', game);
          if (!game.id.length) {
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log('error', error);
          this.router.navigate(['/']);
        }
      );

    // this.game$ = interval(1000).pipe(
    //   startWith(0),
    //   switchMap(() => this.socketService.getGame(id)),
    //   tap((returnedGame) => {
    //     console.log('returned game', returnedGame);
    //     if (!returnedGame) {
    //       this.router.navigate(['/']);
    //     }
    //   })
    // );

    this.socketService
      .onGameUpdated()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((data: { game; socketId }) => {
        // if (this.socketService.socket.id !== data.socketId) {
        if (data.game.complete) {
          console.log('game complete.  navigating');
          this.router.navigate(['/game-over/' + data.game.id]);
          return;
        }
        console.log('on-game-updated');
        this.gameSubject.next(data.game);
        this.inProgress = true;
        // }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onBegin() {
    this.inProgress = true;
  }
}
