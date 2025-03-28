export class Movie {
  public id: string;
  public title: string;
  public description: string;
  public reviews: string[] | null;

  constructor(
    id: string,
    title: string, 
    description: string, 
    reviews: string[] | null = null,
  ) {
    this.id = id
    this.title = title;
    this.description = description;
    this.reviews = reviews;
  }
}
