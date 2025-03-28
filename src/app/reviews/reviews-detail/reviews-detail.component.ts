import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews-detail',
  standalone: false,
  templateUrl: './reviews-detail.component.html',
  styleUrl: './reviews-detail.component.scss'
})
export class ReviewsDetailComponent implements OnInit {
  reviewsForMovie: Review[] = [];
  private reviewsSubscription: Subscription;
  movieId = '';

  constructor(
    private readonly reviewService: ReviewsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.movieId = params['movieId'];
      this.reviewsSubscription = this.reviewService.getReviewsForMovie(this.movieId).subscribe(
        (reviews: Review[]) => {
          this.reviewsForMovie = reviews;
          console.log("REVIEWS FE: ", this.reviewsForMovie);
        },
        error => {
          console.error("Error fetching reviews: ", error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.reviewsSubscription) {
      this.reviewsSubscription.unsubscribe();
    }
  }

  onDelete(reviewId: string) {
    this.reviewService.deleteReview(reviewId);
    
    // Optionally, you can manually remove the review from the UI without a page reload:
    this.reviewsForMovie = this.reviewsForMovie.filter(review => review.id !== reviewId);
    
    // Navigate back to the reviews list (or any other route) after deletion
    this.router.navigate(['/review']);
  }
  
}
