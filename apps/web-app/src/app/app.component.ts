import { Component, OnInit } from '@angular/core';
import { SocketService } from './core/services/socket.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'dry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web-app';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.connect(io);

    this.socketService.emit();
  }
}
