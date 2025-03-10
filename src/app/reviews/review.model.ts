import { ObjectId } from 'mongodb';

export class Review {
  public id: string;
  public movieId: ObjectId;
  public textRating: string;
  public starRating: number;
  public screenName: string;

  constructor(
    id: string,
    movieId: ObjectId,
    textRating: string,
    starRating: number,
    screenName: string,
  ) {
    this.id = id;
    this.movieId = movieId;
    this.textRating = textRating;
    this.starRating = starRating;
    this.screenName = screenName;
  }
}
