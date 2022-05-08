import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/shared/models/Booking';
import { Movie } from 'src/app/shared/models/Movie';
import { BookingService } from 'src/app/shared/services/booking.service';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  bookings?: Array<Booking>;
  movie?: Movie;

  constructor(private bookingService: BookingService, private moviesService: MoviesService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.bookingService.getAll(user.uid).subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  deleteTicket(id: string) {
      if (id) {
        this.bookingService.delete(id).then(_ => {
          alert('Succesfully deleted!');
        }).catch(error => {
          console.error(error);
        });
      }
  }
}
