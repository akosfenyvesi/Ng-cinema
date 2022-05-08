import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Movie } from '../../shared/models/Movie';
import { MoviesService } from '../../shared/services/movies.service';
import { BookTicketComponent } from './book-ticket/book-ticket.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  @Output() movieDataEmitter: EventEmitter<Map<string, string>> =
    new EventEmitter();

  @Input() loggedInUser?: firebase.default.User | null;

  minDate = new Date();
  maxDate = new Date(2022, 4, 30);
  today = new Date();

  selectedDate: Date = new Date();

  movieObject?: Array<Movie>;

  public isMobileLayout = false;

  constructor(
    private moviesService: MoviesService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 750);

    this.moviesService.loadMovies().subscribe((data: Array<Movie>) => {
      for (let movie of data) {
        this.moviesService.loadPoster(movie.image).subscribe((imageUrl) => {
          movie.imageUrl = imageUrl;
        });
      }
      this.movieObject = data;
    });

    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value as Date;
    this.movieObject = this.movieObject;
  }

  openDialog(movieid: string, time: string, title: string) {
    let dialogRef = this.dialog.open(BookTicketComponent, {
      width: '600vh',
      maxHeight: '150vh',
      autoFocus: false,
    });

    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    let instance = dialogRef.componentInstance;
    instance.config = new Map<string, string>([
      ['movieid', movieid],
      ['time', time],
      ['date', this.selectedDate.toString()],
      ['loggeduser', user.uid],
      ['title', title]
    ]);
  }
}
