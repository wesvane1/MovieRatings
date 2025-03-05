import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Movie } from '../movies.model';
import { MoviesService } from '../movies.service';
import { Review } from '../../reviews/review.model';

@Component({
  selector: 'app-movies-edit',
  standalone: false,
  templateUrl: './movies-edit.component.html',
  styleUrl: './movies-edit.component.scss'
})
export class MoviesEditComponent implements OnInit{

  originalMovie: Movie;
  movie: Movie;
  editMode: boolean = false;
  id: string;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id']
      if (!id){
        this.editMode = false
        return;
      }
      this.originalMovie = this.moviesService.getMovie(id)

      if (!this.originalMovie){
        return
      }
      this.editMode = true;
      this.movie = {...this.originalMovie}
    })
  }

  onSubmit(form: NgForm){
    const value = form.value
    let movie = new Movie(
      value.id,
      value.title,
      value.description,
      null
    )
    if(this.editMode){
      this.moviesService.updateMovie(this.originalMovie, movie)
      this.onUpdate()
    } else{
      this.moviesService.addMovie(movie)
      this.onCreate()
    }
  }

  onCreate(){
    this.router.navigate(['/movie'])
  }
  onUpdate(){
    this.router.navigate(['/movie'])
  }
  onCancel(){
    this.router.navigate(['/movie'])
  }

}
