import { ObjectId } from 'mongodb';

const mongoose = require('mongoose');

const movieReviewsSchema = mongoose.Schema({
   id: { type: String, required: true },
   movieId: { type: ObjectId, required: true},
   textReview: { type: String, required: true },
   starReview: { type: Number, required: true }
});

module.exports = mongoose.model('Review', movieReviewsSchema);
