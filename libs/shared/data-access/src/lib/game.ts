import { Hand } from './hand';
import { Player } from './player';
import { Round } from './round';
import { Seat } from './seat';
import { Book } from './book';

export interface Game {
  id?: string;
  name?: string;
  players?: Player[];
  seats?: Seat[];
  score?: number;
  turn?: string;
  hands?: Hand[];
  books?: Book[];
  rounds?: Round[];
  currentRoundIndex?: number;
  complete?: boolean;
}
