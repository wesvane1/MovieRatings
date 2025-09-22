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
        },
        error => {
          console.error("Error fetching reviews: ", error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.reviewsSubscription) {
      this.reviewsSubscription.unsubscribe();
    }
  }

  onDelete(reviewId: string) {
    this.reviewService.deleteReview(reviewId);
    
    this.reviewsForMovie = this.reviewsForMovie.filter(review => review.id !== reviewId);
    
    this.router.navigate(['/review']);
  }
  
}
