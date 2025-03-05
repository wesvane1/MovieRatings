import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Review } from './review.model';
import { Observable, Subject } from 'rxjs';
import { MoviesService } from '../movies/movies.service';
import { ObjectId } from 'mongodb'

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private allReviewsForMovie: Review[] = [];
  reviewForMovieSelectedEvent = new EventEmitter<Review>();
  reviewForMovieListChangedEvent = new Subject<Review[]>();

  constructor(
    private http: HttpClient,
    private movieService: MoviesService
  ) {}

  getReviewsForMovie(movieId: string): Observable<Review[]> {
    const movie = this.movieService.getMovie(movieId);
    if (movie) {
      return this.getReviewsFromMovieId(movie._id);
    }
    return new Observable<Review[]>();  // return an empty observable if movie not found
  }

  getReviewsFromMovieId(movieId: ObjectId): Observable<Review[]> {
    return new Observable<Review[]>((observer) => {
      this.http.get<Review[]>('http://localhost:3000/review/' + movieId).subscribe(
        (reviews: Review[]) => {
          this.allReviewsForMovie = reviews;
          observer.next(reviews);  // Emit the reviews
          observer.complete();  // Complete the observable
        },
        error => {
          console.error('Error fetching reviews:', error);
          observer.error(error);  // Emit the error
        }
      );
    });
  }
}
