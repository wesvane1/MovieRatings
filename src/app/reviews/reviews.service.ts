import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Review } from './review.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private reviewsForMovie: Review[] = [];
  private maxReviewId = 0;
  reviewForMovieSelectedEvent = new EventEmitter<Review>();
  reviewForMovieListChangedEvent = new Subject<Review[]>();

  constructor(
    private http: HttpClient
  ) {
    // this.reviewsForMovie = this.getReviewsForMovie()
    this.maxReviewId = this.getMaxId()
  }

  getReviewsForMovie(movieId: string): Review{
    this.http.get<Review[]>('http://localhost:3000/reviews').subscribe((reviewsForMovie: Review[]) => {
      this.reviewsForMovie = reviewsForMovie;
      this.maxReviewId = this.getMaxId();
      // this.reviewsForMovie.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));
      this.reviewForMovieListChangedEvent.next(this.reviewsForMovie.slice());
    }, (error: any) => {
      console.error('Error fetching reviews: ', error);
    });
    // return this.reviewsForMovie.slice()
    return
  }

  getMaxId(): number{
    let maxId = 0;

    for (const review of this.reviewsForMovie){
      if (+review.id > maxId){
        maxId = +review.id;
      }
    }
    return maxId;
  }
}
