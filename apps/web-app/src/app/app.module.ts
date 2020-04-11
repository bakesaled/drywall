import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GamePlayComponent } from './game-play/game-play.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PlayerModule } from './player/player.module';
import { GameStartModule } from './game-start/game-start.module';
import { BoardComponent } from './game-play/board/board.component';
import { PlayerListComponent } from './game-play/player-list/player-list.component';

@NgModule({
  declarations: [AppComponent, GamePlayComponent, BoardComponent, PlayerListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PlayerModule,
    GameStartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
