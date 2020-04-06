import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GamePlayComponent } from './game-play/game-play.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameStartComponent } from './game-start/game-start.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, GamePlayComponent, GameStartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
