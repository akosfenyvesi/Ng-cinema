import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketTypes } from '../../../shared/models/TicketType';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { Booking } from '../../../shared/models/Booking';
import { Room } from '../../../shared/models/Room';
import { User } from '../../../shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { Timestamp } from '@angular/fire/firestore';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Router } from '@angular/router';

const TICKET_TYPES: TicketTypes[] = [
  { type: 'Normal', price: 1650, convenienceFee: 80 },
  { type: 'Student', price: 1400, convenienceFee: 80 },
  { type: 'Senior', price: 1400, convenienceFee: 80 },
  { type: 'Disabled', price: 1400, convenienceFee: 80 },
];

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss'],
})
export class BookTicketComponent implements OnInit, OnChanges {
  config?: Map<string, string>;

  seats: Room = {
    rows: 10,
    columns: 20,
    occupiedSeats: ['1.10', '1.11', '2.11', '2.12', '2.13'],
  };

  ticketType: string = 'reserve';
  ticketNumbers: Map<string, number> = new Map<string, number>();
  selectedSeats: Array<string> = [];
  numberOfSeats: number = 0;
  user?: User;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  displayedColumns: string[] = ['type', 'price', 'convenienceFee', 'qty'];
  dataSource = TICKET_TYPES;

  booking?: Booking;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TODO
    const user = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  ngOnChanges() {}

  radioChange(event: MatRadioChange) {
    this.ticketType = event.value;
  }

  selectionChange(event: MatSelectChange, type: string) {
    this.ticketNumbers.set(type as string, +event.value);
  }

  clickFirstStep() {}

  clickSecondStep() {
    this.numberOfSeats = 0;
    this.ticketNumbers.forEach((num) => {
      this.numberOfSeats += +num;
    });
  }

  clickThirdStep() {}

  clickFinalStep() {
    var tmpDate = new Date(this.config?.get("date") as string);
    tmpDate.setHours(+(this.config?.get("time") as string)?.split(':')[0]);
    tmpDate.setMinutes(+(this.config?.get("time") as string)?.split(':')[1]);
    tmpDate.setSeconds(0);
    const booking: Booking = {
    id: "",
    type: this.ticketType,
    movieId: this.config?.get("movieid") as string,
    title: this.config?.get("title") as string,
    date: tmpDate.getTime() / 1000,
    tickets: this.numberOfSeats,
    selectedSeats: this.selectedSeats,
    userId: this.config?.get("loggeduser") as string
    }

    this.bookingService.book(booking).then(_ => {
      alert('Successful booking!');
      this.router.navigateByUrl('/tickets');
    }).catch(error => {
      alert('Something went wrong...' + error);
    });
  }

  // Seat selection
  choose(id: string) {
    var seat = document.getElementById(id);
    if (seat?.classList.contains('selected')) {
      seat.classList.remove('selected');
      const index = this.selectedSeats!.indexOf(id as string);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }
    } else if (this.selectedSeats.length < this.numberOfSeats) {
      seat?.classList.add('selected');
      this.selectedSeats.push(id);
    }
  }
}
