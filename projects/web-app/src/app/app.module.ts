import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GamePlayComponent } from './game-play/game-play.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameStartComponent } from './game-start/game-start.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [MatDialogModule, MatButtonModule];

@NgModule({
  declarations: [AppComponent, GamePlayComponent, GameStartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
