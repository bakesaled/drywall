import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GameService } from '../game/game/game.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('EventsGateway');

  @WebSocketServer()
  server: Server;

  constructor(private gameService: GameService) {}

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): string {
    this.logger.log('event received', data);
    return data;
  }

  @SubscribeMessage('add-game')
  onAddGame(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): string {
    this.logger.debug(`add-game received: ${data}`);
    const id = this.gameService.addGame({});
    return id;
  }

  afterInit(server: any) {
    this.logger.log('init');
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
