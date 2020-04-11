import { Injectable } from '@angular/core';
import * as SocketIOClient from 'socket.io-client';
import { Game, Player } from '@drywall/shared/data-access';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url = 'http://localhost:3000';
  public socket: SocketIOClient.Socket;

  constructor() {}

  public connect(io) {
    this.socket = io(this.url);
  }

  public emit() {
    this.socket.emit('events', { name: 'Nest' }, (data) => console.log(data));
  }

  // public createNewPlayer() {
  //   return new Observable((observer) => {
  //     console.log('emitting');
  //     this.socket.emit('new-player', {}, (player) => {
  //       observer.next(player);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  // }

  public onNewPlayer() {
    return new Observable((observer) => {
      this.socket.on('new-player', (player: Player, games: Game[]) => {
        console.log('on-new-player', player, games);
        observer.next({ player, games });
      });
    });
  }

  public updatePlayer(player: Player) {
    this.socket.emit('update-player', player);
  }

  public updateGame(game: Game) {
    this.socket.emit('update-game', game);
  }

  // observer: Observer<any>;

  // public getAllGames() {
  //   return new Observable((observer) => {
  //     console.log('emit get-all');
  //     this.socket.emit('get-all-games', {}, (games) => {
  //       return observer.next(games);
  //     });
  //   });
  // }

  public onNewGame() {
    return new Observable((observer) => {
      this.socket.on(
        'new-game',
        (game: Game, games: Game[], socketId: string) => {
          observer.next({ game, games, socketId });
        }
      );
    });
  }

  // public getGame(gameId: string) {
  //   return new Observable((observer) => {
  //     console.log('emit get game');
  //     this.socket.emit('get-game', gameId, (game) => {
  //       return observer.next(game);
  //     });
  //   });
  // }

  public joinGame(game: Game) {
    return new Observable((observer) => {
      console.log('emit join game');
      this.socket.emit('join-game', game, (joinedGame) => {
        console.log('observer game joined', joinedGame);
        return observer.next(joinedGame);
      });
    });
  }

  public onGameJoined() {
    return new Observable((observer) => {
      this.socket.on('game-joined', (game: Game) => {
        observer.next(game);
      });
    });
  }

  createNewGame() {
    this.socket.emit('new-game');
  }
}
