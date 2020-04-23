import { Module } from '@nestjs/common';
import { GameService } from './game/game.service';
import { NameService } from '../../name/name.service';
import { HandService } from '../../hand/hand.service';

@Module({
  providers: [GameService, NameService, HandService],
  exports: [GameService],
})
export class GameModule {}
