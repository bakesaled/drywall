import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '@drywall/shared/data-access';

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

  constructor() {}

  ngOnInit(): void {}

  onBeginClick() {
    this.begin.emit();
  }

  canBegin() {
    return this.game && this.game.players && this.game.players.length > 1;
  }
}
