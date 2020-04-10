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
import { Game, Player } from '@drywall/shared/data-access';

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

  @SubscribeMessage('new-game')
  onNewGame(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): Game {
    this.logger.debug(`new-game received: ${data}`);
    const id = this.gameService.addGame();
    return this.gameService.get(id);
  }

  @SubscribeMessage('get-all-games')
  onGetAllGames(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): Game[] {
    this.logger.debug(`get-all-games received: ${data}`);
    return this.gameService.getAll();
  }

  @SubscribeMessage('update-game')
  onUpdateGame(
    @MessageBody() data: Game,
    @ConnectedSocket() client: Socket
  ): void {
    this.logger.debug(`update-game received ${JSON.stringify(data)}`);
    this.gameService.update(data);
    return;
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
    this.logger.debug(`update-player received ${JSON.stringify(data)}`);
    this.playerService.update(data);
    return;
  }
}
