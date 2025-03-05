// import { Component, OnInit } from '@angular/core';
// import { Movie } from '../../movies/movies.model';
// import { MoviesService } from '../../movies/movies.service';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { ReviewsService } from '../reviews.service';
// import { Review } from '../review.model';
// import { ObjectId } from 'mongodb'

// @Component({
//   selector: 'app-reviews-detail',
//   standalone: false,
//   templateUrl: './reviews-detail.component.html',
//   styleUrl: './reviews-detail.component.scss'
// })
// export class ReviewsDetailComponent implements OnInit{
//   reviewsForMovie: ObjectId | Review[];

//   constructor(
//     private readonly moviesService: MoviesService,
//     private readonly reviewService: ReviewsService,
//     private readonly router: Router,
//     private readonly route: ActivatedRoute,
//   ){}

//   ngOnInit(){
//     this.route.params.subscribe((params: Params) => {
//       const movieId = params['movieId'];
//       this.reviewsForMovie = this.reviewService.getReviewsForMovie(movieId);
//       console.log("REVIEWS FE: ", this.reviewsForMovie)
//     });
    
//   }

//   onDelete() {
//     // this.moviesService.deleteMovie(this.review);
//     this.router.navigate(['/review'])
//  }
// }
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movies/movies.model';
import { MoviesService } from '../../movies/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';
import { ObjectId } from 'mongodb';
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

  constructor(
    private readonly moviesService: MoviesService,
    private readonly reviewService: ReviewsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const movieId = params['movieId'];
      this.reviewsSubscription = this.reviewService.getReviewsForMovie(movieId).subscribe(
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

  onDelete() {
    // this.moviesService.deleteMovie(this.review);
    this.router.navigate(['/review']);
  }
}
