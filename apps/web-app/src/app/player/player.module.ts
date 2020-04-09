import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerProfileDialogComponent } from './player-profile-dialog/player-profile-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlayerProfileDialogComponent],
  imports: [CommonModule, SharedModule],
})
export class PlayerModule {}
