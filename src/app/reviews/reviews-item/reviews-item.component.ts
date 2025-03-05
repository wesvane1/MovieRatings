import { Component, Input } from '@angular/core';
import { Movie } from '../../movies/movies.model';

@Component({
  selector: 'app-reviews-item',
  standalone: false,
  templateUrl: './reviews-item.component.html',
  styleUrl: './reviews-item.component.scss'
})
export class ReviewsItemComponent {

  @Input() movie: Movie;

}
