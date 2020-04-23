import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';
import { WINDOW_PROVIDERS } from './services/window.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SocketService, WINDOW_PROVIDERS],
})
export class CoreModule {}
