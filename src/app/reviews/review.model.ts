export class Review {
  public id: string;
  public movieId: string;
  public title: string;
  public description: string;
  public rating: number;

  constructor(
    id: string, 
    movieId: string, 
    title: string, 
    description: string, 
    rating: number
  ) {
    this.id = id;
    this.movieId = movieId;
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
}
