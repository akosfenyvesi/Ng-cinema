import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Room } from 'src/app/shared/models/Room';
import { Seat } from 'src/app/shared/models/Seat';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss'],
})
export class SeatSelectionComponent implements OnInit {
  seats: Room = {
    rows: 10,
    columns: 20,
    occupiedSeats: ['1.10', '1.11', '2.11', '2.12', '2.13', '5.10', '5.11', '5.12', '6.12', '6.13', '6.14', '6.15'],
  };

  selectedSeats: Array<string> = [];
  @Output() seatArrayEmitter: EventEmitter<Array<string>> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  choose(id: string) {
    var seat = document.getElementById(id);
    if (seat?.classList.contains('selected')) {
      seat.classList.remove('selected');
      const index = this.selectedSeats!.indexOf(id as string);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }
    } else {
      seat?.classList.add('selected');
      this.selectedSeats.push(id);
    }
  }

  onChoseSeats() {
    console.log('Seats emitted' + this.selectedSeats);
    this.seatArrayEmitter.emit(this.selectedSeats);
  }

  onConfirm() {
    this.seatArrayEmitter.emit(this.selectedSeats);
  }
}
