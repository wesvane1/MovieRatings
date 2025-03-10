import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsDetailComponent } from './reviews/reviews-detail/reviews-detail.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';
import { ReviewsEditComponent } from './reviews/reviews-edit/reviews-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/movie', pathMatch: 'full'},
  {path: 'movie', component: MoviesComponent, children: [
    {path: 'new', component: MoviesEditComponent},
    {path: ':id', component: MoviesDetailComponent},
    {path: ':id/edit', component: MoviesEditComponent},
  ]},
  {path: 'review', component: ReviewsComponent, children: [
    {path: ':movieId/new', component: ReviewsEditComponent},
    {path: ':movieId', component: ReviewsDetailComponent},
    {path: ':movieId/:reviewId/edit', component: ReviewsEditComponent},
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
