import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../movies.model';
import { MoviesService } from '../movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movies-detail',
  standalone: false,
  templateUrl: './movies-detail.component.html',
  styleUrl: './movies-detail.component.scss'
})
export class MoviesDetailComponent implements OnInit{

  movie: Movie;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      const movieId = params['id'];
      console.log("MOVIE ID: ", movieId); // Debugging
      this.movie = this.moviesService.getMovie(movieId) || {} as Movie;
      console.log("MOVIE: ", this.movie);
    });
    
  }

  onDelete() {
    this.moviesService.deleteMovie(this.movie);
    this.router.navigate(['/movie'])
 }

}
