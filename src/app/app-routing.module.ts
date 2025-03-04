import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsDetailComponent } from './reviews/reviews-detail/reviews-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MoviesComponent, children: [
    // {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: MoviesDetailComponent},
    // {path: ':id/edit', component: DocumentEditComponent},
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
