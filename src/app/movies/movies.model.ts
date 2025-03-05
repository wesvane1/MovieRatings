// // import { Review } from "../reviews/review.model";
// import { ObjectId } from 'mongodb';

// export class Movie {
//   public id: string;
//   public title: string;
//   public description: string;
//   public reviews: ObjectId[] | null;

//   constructor(
//     id: string, 
//     title: string, 
//     description: string, 
//     reviews: ObjectId[] | null = null,
//   ) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.reviews = reviews;
//   }
// }
import { ObjectId } from 'mongodb';

export class Movie {
  public _id: ObjectId;  // Adjust _id to ObjectId, which is automatically created by MongoDB
  public id: string;
  public title: string;
  public description: string;
  public reviews: ObjectId[] | null;

  constructor(
    _id: ObjectId,  // Make _id an ObjectId
    id: string,
    title: string, 
    description: string, 
    reviews: ObjectId[] | null = null,
  ) {
    this._id = _id;
    this.id = id
    this.title = title;
    this.description = description;
    this.reviews = reviews;
  }
}
