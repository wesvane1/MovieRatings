import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Review } from './review.model';
import { Observable, Subject } from 'rxjs';
import { MoviesService } from '../movies/movies.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private allReviewsForMovie: Review[] = [];
  private allReviews: Review[] = [];
  reviewForMovieSelectedEvent = new EventEmitter<Review>();
  reviewForMovieListChangedEvent = new Subject<Review[]>();
  allReviewListChangeEvent = new Subject<Review[]>();
  private movieId = '';

  constructor(
    private http: HttpClient,
    private movieService: MoviesService
  ) {}

  getReviewsForMovie(movieId: string): Observable<Review[]> {
    const movie = this.movieService.getMovie(movieId);
    this.movieId = movieId
    if (movie) {
      return this.getReviewsFromMovieId(movie.id);
    } else{
      return
    }
    return new Observable<Review[]>();  // return an empty observable if movie not found
  }

  getAllReviews(): Review[]{
    this.http.get<Review[]>('http://localhost:3000/review').subscribe((reviews: Review[]) => {
      this.allReviews = reviews;
    }, (error: any) => {
      console.error('Error fetching reviews: ', error)
    })
    return this.allReviews.slice()
  }

  getReviewById(reviewId: string): Review {
    const reviews = this.getAllReviews()
    for (const review of reviews) {
      if (review.id === reviewId) {
        return review;
      }
    }
    return null;
  }

  getReviewsFromMovieId(movieId: string): Observable<Review[]> {
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

  addReview(review: Review) {
    if (!review) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    console.log("HERE1: ", review)
  
    // Step 1: Create the review
    // this.http.post<{ message: string, review: Review }>(`http://localhost:3000/review/${this.movieId}/new`, review, { headers: headers })
    //   .subscribe(
    //     (responseData) => {
    //       console.log("HERE2")
    //       this.allReviews.push(responseData.review);
    //       this.sortAndSend();
    //       this.addReviewToMovie(this.movieId, responseData.review.id);
    //     },
    //     (error) => {
    //       console.error('Error adding review:', error);
    //     }
    //   );
    this.http.post<{ message: string, review: Review }>(
      `http://localhost:3000/review/${this.movieId}/new`, 
      review, 
      { headers: headers }
    ).subscribe(
      (responseData) => {
        console.log("HERE2", responseData);
      },
      (error) => {
        console.error("Error adding review:", error);
        if (error.error) {
          console.error("Server Response:", error.error);
        }
      }
    );
    
  }

  updateReview(originalReview: Review, newReview: Review) {
    if (!originalReview || !newReview) {
      return;
    }
    const pos = this.allReviews.findIndex(d => d.id === originalReview.id);
    if (pos < 0) {
      return;
    }

    newReview.id = originalReview.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/review/' + this.movieId + '/' + originalReview.id + '/edit',
      newReview, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.allReviews[pos] = newReview;
          this.sortAndSend();
        }
      );
  }

  addReviewToMovie(movieId: string, reviewId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.patch<{ message: string }>(`http://localhost:3000/movie/${movieId}/edit`, { reviewId }, { headers: headers })
      .subscribe(
        (responseData) => {
          console.log('Review added to movie:', responseData);
        },
        (error) => {
          console.error('Error updating movie with review:', error);
        }
      );
  }
  deleteReview(reviewId: string) {
    if (!reviewId) {
      return;
    }
    const pos = this.allReviews.findIndex(d => d.id === reviewId);
    if (pos < 0) {
      return;
    }
    
    // Perform the HTTP DELETE request to delete the review on the server
    this.http.delete('http://localhost:3000/review/' + reviewId)
      .subscribe(
        (response: Response) => {
          // After successful deletion, remove the review locally
          this.allReviews.splice(pos, 1);
          this.sortAndSend();  // Re-sort the reviews and emit updated list
        },
        (error) => {
          console.error('Error deleting review:', error);
        }
      );
  }
  
  
  

  sortAndSend() {
    const reviewsJSON = JSON.stringify(this.allReviews);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    this.http.put(
      'http://localhost:3000/review',
      reviewsJSON,
      { headers }
    ).subscribe(
      () => {
        const movieListClone = this.allReviews.slice();
        this.allReviewListChangeEvent.next(movieListClone);
      },
      (error) => {
        console.error('Error storing reviews:', error);
      }
    );
  }
}
