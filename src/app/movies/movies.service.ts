import { Injectable } from '@angular/core';
import { Movie } from './movies.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies: Movie[] = [];
  private maxMovieId = 0;
  movieListChangedEvent = new Subject<Movie[]>();

  constructor(
    private http: HttpClient
  ) {
    this.movies = this.getMovies();
    this.maxMovieId = this.getMaxId()
  }

  getMovies(): Movie[]{
    this.http.get<Movie[]>('http://localhost:3000/movies').subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.maxMovieId = this.getMaxId();

      this.movies.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));
      this.movieListChangedEvent.next(this.movies.slice());

    }, (error: any) => {
      console.error('Error fetching movies: ', error);
    })
    return this.movies.slice();
  }

  getMaxId(): number{
    let maxId = 0;

    for (const movie of this.movies){
      if (+movie.id > maxId){
        maxId = +movie.id;
      }
    }
    return maxId;
  }
}
