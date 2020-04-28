import { Player } from './player';
import { Seat } from './seat';
import { Book } from './book';

export interface Game {
  id?: string;
  name?: string;
  players?: Player[];
  seats?: Seat[];
  score?: number;
  turn?: string;
  // hands?: Hand[];
  books?: Book[];
  // rounds?: Round[];
  currentRoundIndex?: number;
  complete?: boolean;
}
