import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../core/services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Game } from '@drywall/shared/data-access';

@Component({
  selector: 'dry-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  private gameSubject = new BehaviorSubject<Game>({});

  public game$: Observable<Game> = this.gameSubject.asObservable();

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.socketService
      .onGameEnded()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((game) => {
        this.gameSubject.next(game);
      });
    this.socketService.endGame(id);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
