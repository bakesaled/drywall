import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameStartComponent } from './game-start/game-start.component';
import { GameOverComponent } from './game-over/game-over.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game-start',
    pathMatch: 'full',
  },
  {
    path: 'game-play/:id',
    component: GamePlayComponent,
  },
  {
    path: 'game-start',
    component: GameStartComponent,
  },
  {
    path: 'game-over/:id',
    component: GameOverComponent,
  },
  {
    path: '**',
    redirectTo: 'game-start',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
