import { Component, Input, OnInit } from '@angular/core';
import { Player } from '@drywall/shared/data-access';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'dry-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input()
  players: Player[];
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {}

  getMe(player: Player) {
    console.log(this.socketService.socket.id);
    return player ? this.socketService.socket.id === player.clientId : false;
  }
}
