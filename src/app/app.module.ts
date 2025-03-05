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
import { MoviesItemComponent } from './movies/movies-item/movies-item.component';
import { MoviesFilterPipe } from './movies/movies.filter-pipe';
import { MoviesService } from './movies/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';
import { FormsModule } from '@angular/forms';
import { ReviewsItemComponent } from './reviews/reviews-item/reviews-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    ReviewsComponent,
    ReviewsDetailComponent,
    ReviewsListComponent,
    MoviesDetailComponent,
    MoviesListComponent,
    MoviesItemComponent,
    MoviesFilterPipe,
    MoviesEditComponent,
    ReviewsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
