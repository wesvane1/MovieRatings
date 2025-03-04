import { Review } from "../reviews/review.model";

export class Movie {
  public id: string;
  public title: string;
  public description: string;
  public phone: string;
  public reviews: Review[] | null;

  constructor(
    id: string, 
    title: string, 
    description: string, 
    phone: string, 
    reviews: Review[] | null = null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.phone = phone;
    this.reviews = reviews;
  }
}
