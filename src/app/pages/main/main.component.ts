import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Movie } from 'src/app/shared/models/Movie';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() loggedInUser?: firebase.default.User | null;
  userData?: User;
  randomMovies?: Array<Movie>;

  constructor(private authService: AuthService, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    });
    
    this.moviesService.loadRandomMovies().subscribe(data => {
      for (let movie of data) {
        this.moviesService.loadPoster(movie.image).subscribe((imageUrl) => {
          movie.imageUrl = imageUrl;
        });
      }
      this.randomMovies = data;
    }, error => {
      console.error(error);
    });
  }

}
