import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePlayComponent } from './game-play/game-play.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game-play',
    pathMatch: 'full',
  },
  {
    path: 'game-play',
    component: GamePlayComponent,
  },
  {
    path: '**',
    redirectTo: 'game-play',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
