import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movies/movies.model';
import { MoviesService } from '../../movies/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';

@Component({
  selector: 'app-reviews-detail',
  standalone: false,
  templateUrl: './reviews-detail.component.html',
  styleUrl: './reviews-detail.component.scss'
})
export class ReviewsDetailComponent implements OnInit{
  review: Review;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly reviewService: ReviewsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      const movieId = params['movieId'];
      this.review = this.reviewService.getReviewsForMovie(movieId) || {} as Review;
    });
    
  }

  onDelete() {
    // this.moviesService.deleteMovie(this.review);
    this.router.navigate(['/review'])
 }
}
