import { Injectable } from '@nestjs/common';
import { Game } from '@drywall/shared/data-access';

@Injectable()
export class GameService {
  private games: Game[];

  constructor() {
    this.games = [];
  }
  public addGame(game: Game) {
    game.id = '123';
    this.games.push(game);
    return game.id;
  }
  private runGameCycle() {
    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
