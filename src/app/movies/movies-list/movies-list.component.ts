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

  // movieList: Movie[] = []
  movieList: Movie[] = [
    new Movie('1', 'Test1Title', 'Test1Description', null),
    new Movie('2', 'Test2Title', 'Test2Description', null),
    new Movie('3', 'Test3Title', 'Test3Description', null),
  ]
  term: string = '';

  constructor(
    private readonly moviesService: MoviesService,
  ){}

  ngOnInit(){
    this.movieList = this.movieList
    // this.movieList = this.moviesService.getMovies()
  }

  search(value: string) {
    this.term = value;
  }
}
