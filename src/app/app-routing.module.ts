import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsDetailComponent } from './reviews/reviews-detail/reviews-detail.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/movie', pathMatch: 'full'},
  {path: 'movie', component: MoviesComponent, children: [
    {path: 'new', component: MoviesEditComponent},
    {path: ':id', component: MoviesDetailComponent},
    {path: ':id/edit', component: MoviesEditComponent},
  ]},
  {path: 'reviews', component: ReviewsComponent, children: [
    // {path: 'new', component: ContactEditComponent},
    {path: ':id', component: ReviewsDetailComponent},
    // {path: ':id/edit', component: ContactEditComponent},
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
