import { Book } from './book';
import { Player } from './player';

export interface Seat {
  id?: string;
  player?: Player;
  book?: Book;
  nextSeat?: Seat;
  previousSeat?: Seat;
}
