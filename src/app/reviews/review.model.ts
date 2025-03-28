export class Review {
  public id: string;
  public movieId: string;
  public textRating: string;
  public starRating: string;
  public screenName: string;

  constructor(
    id: string,
    movieId: string,
    textRating: string,
    starRating: string,
    screenName: string,
  ) {
    this.id = id;
    this.movieId = movieId;
    this.textRating = textRating;
    this.starRating = starRating;
    this.screenName = screenName;
  }
}
