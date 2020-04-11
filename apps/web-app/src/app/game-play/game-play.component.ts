import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SocketService } from '../core/services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '@drywall/shared/data-access';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dry-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePlayComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  private gameSubject = new BehaviorSubject<Game>({});

  public game$: Observable<Game> = this.gameSubject.asObservable();
  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.socketService.onGameJoined().subscribe((game) => {
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
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
