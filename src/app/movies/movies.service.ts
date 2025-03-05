import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from './movies.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies: Movie[] = [];
  private maxMovieId = 0;
  movieSelectedEvent = new EventEmitter<Movie>();
  movieListChangedEvent = new Subject<Movie[]>();

  constructor(
    private http: HttpClient
  ) {
    this.movies = this.getMovies();
    this.maxMovieId = this.getMaxId()
  }

  getMovies(): Movie[]{
    this.http.get<Movie[]>('http://localhost:3000/movie').subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.maxMovieId = this.getMaxId();

      this.movies.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));
      this.movieListChangedEvent.next(this.movies.slice());

    }, (error: any) => {
      console.error('Error fetching movies: ', error);
    })
    return this.movies.slice();
  }
  getMovie(id: string): Movie {
    for (const movie of this.movies) {
      if (movie.id === id) {
        return movie;
      }
    }
    return null; // PROBLEM: returning null
  }
  // getMovie(id: string): Movie | undefined {
  //   return this.movies.find(movie => movie.id === id);
  // }
  
  
  deleteMovie(movie: Movie) {
    if (!movie) {
      return;
    }
    const pos = this.movies.findIndex(d => d.id === movie.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http.delete('http://localhost:3000/movies/' + movie.id)
      .subscribe(
        (response: Response) => {
          this.movies.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  sortAndSend() {
    const moviesJSON = JSON.stringify(this.movies); // Convert documents to JSON string
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.put(
      'http://localhost:3000/movies', // Use your local Node.js server URL
      moviesJSON,
      { headers }
    ).subscribe(
      () => {
        const movieListClone = this.movies.slice();
        this.movieListChangedEvent.next(movieListClone);
      },
      (error) => {
        console.error('Error storing movies:', error);
      }
    );
  }
}
