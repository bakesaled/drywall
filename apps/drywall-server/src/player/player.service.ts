import { Injectable } from '@nestjs/common';
import { Player } from '@drywall/shared/data-access';
import * as uuid from 'uuid';
import { NameService } from '../name/name.service';

@Injectable()
export class PlayerService {
  private players: Player[] = [];
  constructor(private nameService: NameService) {}

  addPlayer() {
    const player = {
      id: uuid.v1(),
      name: this.nameService.getName('Player'),
    };
    this.players.push(player);
    return player.id;
  }

  update(player: Player) {
    const existingPlayer = this.get(player.id);

    if (existingPlayer) {
      const index = this.players.indexOf(existingPlayer);

      this.players[index] = {
        ...existingPlayer,
        name: player.name,
      };
    }
  }

  getAll() {
    return this.players;
  }

  get(id: string) {
    return this.players.find((p) => p.id === id);
  }
}
