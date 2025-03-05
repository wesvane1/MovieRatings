import { Component } from '@angular/core';
import { Movie } from './movies.model';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

  selectedMovie: Movie;

  constructor(
    private readonly moviesService: MoviesService,
  ){}

  ngOnInit(){
    this.moviesService.movieSelectedEvent.subscribe(
      (movie: Movie) => {
        this.selectedMovie = movie
      }
    )
  }

}
