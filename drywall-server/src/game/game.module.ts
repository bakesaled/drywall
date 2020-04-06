import { Module } from '@nestjs/common';
import { GameService } from './game/game.service';
import { PlatformService } from './platform/platform.service';

@Module({
  providers: [GameService, PlatformService]
})
export class GameModule {}
