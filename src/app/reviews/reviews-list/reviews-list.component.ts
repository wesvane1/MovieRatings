import { Component } from '@angular/core';
import { MoviesService } from '../../movies/movies.service';
import { Movie } from '../../movies/movies.model';

@Component({
  selector: 'app-reviews-list',
  standalone: false,
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss'
})
export class ReviewsListComponent {

    movieListReview: Movie[] = []
    term: string = '';
  
    constructor(
      private readonly moviesService: MoviesService,
    ){}
  
    ngOnInit(){
      this.movieListReview = this.moviesService.getMovies()
    }
  
    search(value: string) {
      this.term = value;
    }

}
