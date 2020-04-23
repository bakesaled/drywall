import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Seat } from '@drywall/shared/data-access';

@Component({
  selector: 'dry-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SeatListComponent implements OnInit {
  @HostBinding('class.dry-seat-list') hostClass = true;
  @Input()
  seats: Seat[];

  @Input()
  seatsInProgress: Seat[];

  constructor() {}

  ngOnInit(): void {}

  getTransform(index: number) {
    index++;
    const rot = 360 / index;
    return `rotate(${rot}deg) translate(10em) rotate(${rot * -1}deg)`;
  }

  getActiveSeat(seatId: string) {
    return this.seatsInProgress.some((s) => s.id === seatId);
  }
}
