import { GameModel } from './game.model';

export interface PlatformModel {
  id: string;
  games: GameModel[];
  players: any[];
}
