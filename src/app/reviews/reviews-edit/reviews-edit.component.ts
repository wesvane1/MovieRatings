import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Review } from '../review.model';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-reviews-edit',
  standalone: false,
  templateUrl: './reviews-edit.component.html',
  styleUrl: './reviews-edit.component.scss'
})
export class ReviewsEditComponent {

  originalReview: Review;
  review: Review;
  editMode: boolean = false;
  id: string;
  movieId: string;

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['reviewId']
      this.movieId = params['movieId']
      if (!id){
        this.editMode = false
        return;
      }
      this.originalReview = this.reviewsService.getReviewById(id)

      if (!this.originalReview){
        return
      }
      this.editMode = true;
      this.review = {...this.originalReview}
    })
  }

  onSubmit(form: NgForm){
    const value = form.value
    console.log("REVIEW: ", value)
    let review = new Review(
      value.id,
      this.movieId,
      value.textRating,
      value.starRating,
      value.screenName
    )
    // console.log("REVIEW: ", review)
    if(this.editMode){
      this.reviewsService.updateReview(this.originalReview, review)
      this.onUpdate()
    } else{
      this.reviewsService.addReview(review)
      this.onCreate()
    }
  }

  onCreate(){
    this.router.navigate(['/review'])
  }
  onUpdate(){
    this.router.navigate(['/review'])
  }
  onCancel(){
    this.router.navigate(['/review'])
  }

}
