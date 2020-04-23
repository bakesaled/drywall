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
import { OpeningSceneComponent } from './game-play/opening-scene/opening-scene.component';
import { RoundDisplayComponent } from './game-play/round-display/round-display.component';
import { GameOverModule } from './game-over/game-over.module';
import { SeatListComponent } from './game-play/seat-list/seat-list.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    GamePlayComponent,
    BoardComponent,
    PlayerListComponent,
    OpeningSceneComponent,
    RoundDisplayComponent,
    SeatListComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PlayerModule,
    GameStartModule,
    GameOverModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
