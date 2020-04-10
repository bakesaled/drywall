import { Module } from '@nestjs/common';
import { GameService } from './game/game.service';
import { NameService } from '../../name/name.service';

@Module({
  providers: [GameService, NameService],
  exports: [GameService],
})
export class GameModule {}
