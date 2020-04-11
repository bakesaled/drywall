import { Injectable } from '@nestjs/common';
import { Game, Player } from '@drywall/shared/data-access';
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
      players: [],
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

  join(player: Player, game: Game) {
    const existingGame = this.get(game.id);
    if (existingGame) {
      existingGame.players.push(player);
    }
    console.log('joined game', existingGame);
    return existingGame;
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
