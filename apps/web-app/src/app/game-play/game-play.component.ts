import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../core/services/socket.service';

@Component({
  selector: 'dry-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
})
export class GamePlayComponent implements OnInit, OnDestroy {
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.createNewPlayer();
  }

  ngOnDestroy(): void {}
}
