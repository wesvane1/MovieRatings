import { Component, Input } from '@angular/core';
import { Movie } from '../movies.model';


@Component({
  selector: 'app-movies-item',
  standalone: false,
  templateUrl: './movies-item.component.html',
  styleUrl: './movies-item.component.scss'
})
export class MoviesItemComponent{

  @Input() movie!: Movie;

}
