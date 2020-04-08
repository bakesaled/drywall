import { Injectable } from '@angular/core';
import * as SocketIOClient from 'socket.io-client';

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
    this.socket.emit('new-player', {});
  }

  public startNewGame() {
    this.socket.emit('add-game', {}, (game) => {
      console.log('add-game', game);
    });
  }

  public joinGame() {}
}
