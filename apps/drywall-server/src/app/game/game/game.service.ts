import { Injectable } from '@nestjs/common';
import { Game } from '@drywall/shared/data-access';
import * as uuid from 'uuid';
import { NameService } from '../../../name/name.service';

@Injectable()
export class GameService {
  private games: Game[];

  constructor(private nameService: NameService) {
    this.games = [];
  }
  public addGame() {
    const game = {
      id: uuid.v1(),
      name: this.nameService.getName('Game'),
    };
    this.games.push(game);
    return game.id;
  }
  update(game: Game) {
    const existingGame = this.get(game.id);

    if (existingGame) {
      const index = this.games.indexOf(existingGame);

      this.games[index] = {
        ...existingGame,
        name: game.name,
      };
      console.log('update-game', this.games);
    }
  }
  get(id: string) {
    return this.games.find((p) => p.id === id);
  }
  getAll() {
    return this.games;
  }
  private runGameCycle() {
    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
