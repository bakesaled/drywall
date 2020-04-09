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
import { PlayerService } from '../../player/player.service';
import { Player } from '@drywall/shared/data-access';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('EventsGateway');

  @WebSocketServer()
  server: Server;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService
  ) {}

  afterInit(server: any) {
    this.logger.log('init');
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

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
    return this.gameService.addGame({});
  }

  @SubscribeMessage('new-player')
  onNewPlayer(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): Player {
    this.logger.debug(`new-player received`);
    const id = this.playerService.addPlayer();
    return this.playerService.get(id);
  }

  @SubscribeMessage('update-player')
  onUpdatePlayer(
    @MessageBody() data: Player,
    @ConnectedSocket() client: Socket
  ): void {
    this.logger.debug(`update-player received ${data}`);
    this.playerService.update(data);
    return;
  }
}
