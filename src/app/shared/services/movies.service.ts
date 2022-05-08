import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movieCollectionName = 'Movies';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  loadMovies(): Observable<Array<Movie>> {
    return this.afs.collection<Movie>(this.movieCollectionName, ref => ref.orderBy('title', 'asc')).valueChanges();
  }

  loadRandomMovies(): Observable<Array<Movie>> {
    var order = ['genre', 'title', 'playTime', 'rating']
    var random = Math.floor(Math.random() * 4)
    return this.afs.collection<Movie>(this.movieCollectionName, ref => ref.orderBy(order[random], 'asc').limit(3)).valueChanges();
  }

  loadPoster(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  getMovieById(id: string) {
    return this.afs.collection<Movie>(this.movieCollectionName, ref => ref.where('id', '==', id)).valueChanges();
  }
}
