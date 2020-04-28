import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Observable, Subject, timer } from 'rxjs';
import { map, repeatWhen, startWith, takeUntil } from 'rxjs/operators';
import { Game, Hand, Seat } from '@drywall/shared/data-access';
import { SocketService } from '../../core/services/socket.service';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'dry-round-display',
  templateUrl: './round-display.component.html',
  styleUrls: ['./round-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoundDisplayComponent implements OnInit, OnDestroy {
  private timeLeft;
  private gm: Game;
  private boardComp;
  private readonly startTimer = new Subject<void>();
  private readonly stopTimer = new Subject<void>();
  private destroySubject = new Subject();
  private timer$;

  @HostBinding('class.dry-round-display') hostClass = true;

  wordForm: FormGroup;
  timeText$: Observable<string>;

  @Input()
  get game(): Game {
    return this.gm;
  }
  set game(newValue: Game) {
    this.gm = newValue;

    if (this.gm) {
      console.log('game set', this.gm.complete);
      this.restartHandTimer();
      // console.log('game set', JSON.stringify(this.gm));
      // this.currentRound = this.gm.rounds[this.gm.currentRoundIndex];
      // this.currentHand = this.gm.hands.find(
      //   (h) => h.id === this.currentRound.handId
      // );
    }
  }

  // @Input()
  // rounds: Round[];
  //
  // @Input()
  // hands: Hand[];
  // get roundComplete(): Boolean {
  //   this.game.
  // }

  get currentHand(): Hand {
    return this.currentSeat
      ? this.currentSeat.book.hands[this.game.currentRoundIndex]
      : undefined;
    // ? this.gm.hands.find((h) => h.id === this.currentRound.handId)
    // : undefined;
  }
  get previousHand(): Hand {
    return this.currentSeat
      ? this.currentSeat.book.hands[this.game.currentRoundIndex - 1]
      : undefined;
    // return this.previousRound
    //   ? this.gm.hands.find((h) => h.id === this.previousRound.handId)
    //   : undefined;
  }
  // get currentRound(): Round {
  //   return this.gm.rounds[this.gm.currentRoundIndex];
  // }
  // get previousRound(): Round {
  //   return this.gm.currentRoundIndex > 0
  //     ? this.gm.rounds[this.gm.currentRoundIndex - 1]
  //     : undefined;
  // }

  get currentSeat(): Seat {
    // console.log('currentSeat', this.gm.seats);
    return this.gm.seats.find(
      (s) => s.player.socketId === this.socketService.socket.id
    );
  }

  get isRoundComplete(): boolean {
    console.log(
      'round complete',
      this.gm.currentRoundIndex,
      this.gm.seats[0].book.hands.length,
      this.gm.seats[1].book.hands.length
    );
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.gm.seats.length; i++) {
      if (!this.gm.seats[i].book.hands[this.gm.currentRoundIndex].complete) {
        return false;
      }
    }
    return true;
  }

  @ViewChild(BoardComponent, { static: false }) set boardComponent(
    newValue: BoardComponent
  ) {
    if (newValue) {
      this.boardComp = newValue;
    }
  }

  constructor(private fb: FormBuilder, private socketService: SocketService) {}

  ngOnInit(): void {
    this.wordForm = this.fb.group({
      word: [''],
    });

    this.initTimer();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onDone() {
    this.stopHandTimer();
    console.log('timer done');

    // this.game.rounds[this.game.currentRoundIndex].complete = true;
    if (this.isDrawRound()) {
      this.currentHand.picture = this.boardComp.context.canvas.toDataURL();
    } else {
      this.currentHand.word = this.wordForm.value.word;
    }
    this.currentHand.complete = true;
    // console.log('currentHand pic', this.currentHand.picture);
    this.socketService.updateGame(this.game);
  }

  private initTimer() {
    this.timeLeft = 60;
    this.timer$ = timer(61000).pipe(takeUntil(this.destroySubject));
    this.timeText$ = interval(1000).pipe(
      startWith(0),
      map(() => {
        if (this.timeLeft <= 0) {
          this.onDone();
        } else {
          this.timeLeft -= 1;
        }
        return this.timeLeft + ' s';
      }),
      takeUntil(this.destroySubject),
      takeUntil(this.timer$),
      takeUntil(this.stopTimer),
      repeatWhen(() => this.startTimer)
    );
  }

  private restartHandTimer() {
    this.timeLeft = 60;
    this.timer$ = timer(61000).pipe();
    this.startTimer.next();
  }

  private stopHandTimer() {
    this.stopTimer.next();
  }

  isDrawRound() {
    return this.game.currentRoundIndex % 2;
  }
}
