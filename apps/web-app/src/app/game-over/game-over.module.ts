import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameOverComponent } from './game-over.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GameOverComponent],
  imports: [CommonModule, SharedModule],
})
export class GameOverModule {}
