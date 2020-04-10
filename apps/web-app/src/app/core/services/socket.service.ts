import { Injectable } from '@angular/core';
import * as SocketIOClient from 'socket.io-client';
import { Game, Player } from '@drywall/shared/data-access';
import { Observable, Observer } from 'rxjs';

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

  public createNewPlayer() {
    return new Observable((observer) => {
      console.log('emitting');
      this.socket.emit('new-player', {}, (player) => {
        observer.next(player);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public updatePlayer(player: Player) {
    this.socket.emit('update-player', player);
  }

  public updateGame(game: Game) {
    this.socket.emit('update-game', game);
  }

  // observer: Observer<any>;

  public getAllGames() {
    return new Observable((observer) => {
      console.log('emit get-all');
      this.socket.emit('get-all-games', {}, (games) => {
        return observer.next(games);
      });
      // return () => {
      //   this.socket.disconnect();
      // };
    });
    // return new Observable((observer) => (this.observer = observer));
  }

  public joinGame() {}

  createNewGame() {
    return new Observable((observer) => {
      this.socket.emit('new-game', {}, (game) => {
        observer.next(game);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
