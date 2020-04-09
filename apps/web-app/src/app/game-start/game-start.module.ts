import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStartComponent } from './game-start.component';
import { GameDialogComponent } from './game-dialog/game-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GameStartComponent, GameDialogComponent],
  imports: [CommonModule, SharedModule],
})
export class GameStartModule {}
