import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list',
  standalone: false,
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit{

  movieList: Movie[] = []
  term: string = ''

  constructor(
    private readonly moviesService: MoviesService,
  ){}

  ngOnInit(){
    this.movieList = this.moviesService.getMovies()
  }

  search(value: string) {
    this.term = value;
  }
}
