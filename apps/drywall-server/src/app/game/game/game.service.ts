import { Injectable } from '@nestjs/common';
import { Game, Player } from '@drywall/shared/data-access';
import * as uuid from 'uuid';
import { NameService } from '../../../name/name.service';
import { HandService } from '../../../hand/hand.service';

@Injectable()
export class GameService {
  private readonly games: Game[];

  constructor(
    private nameService: NameService,
    private handService: HandService
  ) {
    this.games = [];
  }
  public addGame() {
    const game = {
      id: uuid.v1(),
      name: this.nameService.getName('Game'),
      players: [],
      // hands: [],
      // rounds: [],
      seats: [],
      // books: [],
      currentRoundIndex: 1,
    };
    this.games.push(game);
    return game.id;
  }
  update(game: Game) {
    const existingGame = this.get(game.id);

    if (existingGame) {
      const index = this.games.indexOf(existingGame);
      if (this.isRoundComplete(game)) {
        game.currentRoundIndex++;

        if (game.seats.length + 1 === game.currentRoundIndex) {
          game.complete = true;
        }
        // console.log('prerotate', game.seats);
        this.rotateBooks(game);
        // console.log('afterrotate', game.seats);
      }
      // if (game.rounds[game.currentRoundIndex].complete) {
      //   if (game.rounds.length === game.currentRoundIndex - 1) {
      //     game.complete = true;
      //   } else {
      //     game.currentRoundIndex++;
      //   }
      // }

      this.games[index] = {
        ...existingGame,
        name: game.name,
        // hands: [...game.hands],
        // rounds: [...game.rounds],
        // seats: [...game.seats],
        seats: JSON.parse(JSON.stringify(game.seats)),
        complete: game.complete,
        currentRoundIndex: game.currentRoundIndex,
      };
      // console.log('update-game', JSON.stringify(this.games[index]));
    }
  }

  join(player: Player, game: Game) {
    const existingGame = this.get(game.id);
    if (existingGame) {
      existingGame.players.push(player);
      const openingHand = this.handService.generateHand();
      const emptyHand = {
        id: uuid.v1(),
        // playerId: player.socketId,
      };

      // existingGame.seats.forEach((seat) => {
      //   seat.book.hands.push({
      //     id: uuid.v1(),
      //     // playerId: player.socketId,
      //   });
      //   seat.book.hands.push({
      //     id: uuid.v1(),
      //     // playerId: player.socketId,
      //   });
      // });

      // existingGame.hands.push(openingHand);
      // existingGame.hands.push(emptyHand);
      const book = {
        id: uuid.v1(),
        hands: [],
      };
      book.hands.push(openingHand);
      book.hands.push(emptyHand);
      // existingGame.books.push(book);
      // existingGame.rounds.push({
      //   handId: openingHand.id,
      //   playerId: player.socketId,
      //   id: uuid.v1(),
      // });
      // existingGame.rounds.push({
      //   handId: emptyHand.id,
      //   playerId: player.socketId,
      //   id: uuid.v1(),
      // });
      existingGame.seats.push({
        id: uuid.v1(),
        player,
        book,
      });

      // existingGame.seats.forEach((seat) => {
      //   seat.book.hands.push({
      //     id: uuid.v1(),
      //     playerId: player.socketId,
      //   });
      //   seat.book.hands.push({
      //     id: uuid.v1(),
      //     playerId: player.socketId,
      //   });
      // });

      existingGame.seats.forEach((seat) => {
        for (let i = 0; i < existingGame.seats.length; i++) {
          if (seat.book.hands.length === existingGame.seats.length + 1) {
            break;
          }
          seat.book.hands.push({
            id: uuid.v1(),
          });
        }
      });
    }
    console.log('joined game', existingGame);
    return existingGame;
  }

  get(id: string) {
    return this.games.find((g) => g.id === id);
  }

  getByPlayerId(socketId: string) {
    return this.games.find((g) =>
      g.players.find((p) => p.socketId === socketId)
    );
  }

  getAll() {
    return this.games;
  }

  removePlayer(game: Game, socketId: string) {
    const existingGame = this.get(game.id);

    if (existingGame) {
      const index = this.games.indexOf(existingGame);
      const playerIndex = existingGame.players.findIndex(
        (p) => p.socketId === socketId
      );
      this.games[index] = {
        ...existingGame,
        players: existingGame.players.splice(playerIndex, 1),
      };

      const seatIndex = existingGame.seats.findIndex(
        (s) => s.player.id === socketId
      );
      this.games[index] = {
        ...existingGame,
        seats: existingGame.seats.splice(seatIndex, 1),
      };

      return this.games[index];
    }
  }

  endGame(id: string) {
    const existingGame = this.get(id);
    if (existingGame) {
      const index = this.games.indexOf(existingGame);
      this.games[index] = {
        ...existingGame,
        complete: true,
      };
      return this.games[index];
    }
    return;
  }

  private isRoundComplete(game: Game) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < game.seats.length; i++) {
      const seat = game.seats[i];
      const handComplete = seat.book.hands[game.currentRoundIndex].complete;
      // console.log('yo', completeHands.length, seat.book.hands.length);
      if (!handComplete) {
        console.log('roundInComplete');
        return false;
      }
    }
    console.log('roundComplete');
    return true;
  }

  private rotateBooks(game: Game) {
    const bookList = [];
    game.seats.forEach((seat) => {
      bookList.push(seat.book);
    });
    const firstBook = bookList.shift();
    bookList.push(firstBook);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < game.seats.length; i++) {
      game.seats[i].book = bookList[i];
    }
    // for (let i = game.seats.length - 1; i >= 0; i--) {
    //   currentBook = JSON.parse(JSON.stringify(game.seats[i].book));
    //   if (i === game.seats.length - 1) {
    //     console.log('last', currentBook.id);
    //     game.seats[0].book = JSON.parse(JSON.stringify(currentBook));
    //   } else {
    //     console.log('other', currentBook.id);
    //     game.seats[i + 1].book = JSON.parse(JSON.stringify(currentBook));
    //   }
    // }
  }

  private runGameCycle() {
    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
