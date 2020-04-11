import { Hand } from './hand';
import { Player } from './player';

export interface Game {
  id?: string;
  name?: string;
  players?: Player[];
  score?: number;
  turn?: string;
  hands?: Hand[];
}
