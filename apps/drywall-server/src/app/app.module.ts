import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';
import { GameModule } from './game/game.module';
import { NameService } from '../name/name.service';
import { PlayerService } from '../player/player.service';
import { HandService } from '../hand/hand.service';

@Module({
  imports: [GameModule],
  controllers: [AppController],
  providers: [
    AppService,
    EventsGateway,
    NameService,
    PlayerService,
    HandService,
  ],
})
export class AppModule {}
