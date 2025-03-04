import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsDetailComponent } from './reviews/reviews-detail/reviews-detail.component';
import { ReviewsListComponent } from './reviews/reviews-list/reviews-list.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    ReviewsComponent,
    ReviewsDetailComponent,
    ReviewsListComponent,
    MoviesDetailComponent,
    MoviesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
