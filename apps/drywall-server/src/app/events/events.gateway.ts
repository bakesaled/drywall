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
    this.playerService.addPlayer(client.id);
    const newPlayer = this.playerService.getBySocketId(client.id);
    const currentGames = this.gameService.getAll();
    this.server.emit('new-player', newPlayer, currentGames);
  }

  handleDisconnect(client: any): any {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.playerService.removePlayer(client.id);
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
  ): void {
    this.logger.debug(`new-game received: ${data}`);
    const id = this.gameService.addGame();
    const newGame = this.gameService.get(id);
    const allGames = this.gameService.getAll();
    this.server.emit('new-game', newGame, allGames, client.id);
    // return this.gameService.get(id);
  }

  // @SubscribeMessage('get-all-games')
  // onGetAllGames(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() client: Socket
  // ): Game[] {
  //   this.logger.debug(`get-all-games received: ${data}`);
  //   return this.gameService.getAll();
  // }

  @SubscribeMessage('update-game')
  onUpdateGame(
    @MessageBody() data: Game,
    @ConnectedSocket() client: Socket
  ): void {
    this.logger.debug(`update-game received ${JSON.stringify(data)}`);
    this.gameService.update(data);
  }

  @SubscribeMessage('join-game')
  onJoinGame(
    @MessageBody() data: Game,
    @ConnectedSocket() client: Socket
  ): Game {
    this.logger.debug(`join-game received ${JSON.stringify(data)}`);
    const player = this.playerService.getBySocketId(client.id);

    if (!player) {
      return { id: '' };
    }
    client.join(data.name);
    const joinedGame = this.gameService.join(player, data);
    this.server.emit('game-joined', joinedGame);
    return joinedGame ? joinedGame : { id: '' };
  }

  // @SubscribeMessage('get-game')
  // onGetGame(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() client: Socket
  // ): Game {
  //   this.logger.debug(`get-game received ${data}`);
  //   return this.gameService.get(data);
  // }

  // @SubscribeMessage('new-player')
  // onNewPlayer(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() client: Socket
  // ): Player {
  //   this.logger.debug(`new-player received`);
  //   const id = this.playerService.addPlayer(client.id);
  //   return this.playerService.get(id);
  // }

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
