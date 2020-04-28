import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '@drywall/shared/data-access';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'dry-opening-scene',
  templateUrl: './opening-scene.component.html',
  styleUrls: ['./opening-scene.component.scss'],
})
export class OpeningSceneComponent implements OnInit {
  @Input()
  game: Game;

  @Output()
  readonly begin: EventEmitter<any> = new EventEmitter();

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {}

  onBeginClick() {
    this.begin.emit();
  }

  canBegin() {
    console.log('canBegin', this.game.seats, this.socketService.socket.id);
    return (
      this.game &&
      this.game.seats &&
      this.game.seats.length > 1 &&
      this.game.seats[0].player.socketId === this.socketService.socket.id
    );
  }
}
