import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStartComponent } from './game-start.component';
import { GameDialogComponent } from './game-dialog/game-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { GameListComponent } from './game-list/game-list.component';

@NgModule({
  declarations: [GameStartComponent, GameDialogComponent, GameListComponent],
  imports: [CommonModule, SharedModule],
})
export class GameStartModule {}
