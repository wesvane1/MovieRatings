const mongoose = require('mongoose');

const movieReviewsSchema = mongoose.Schema({
   id: { type: String, required: true },
   movieId: { type: mongoose.Schema.Types.ObjectId, required: true },  // Correct usage of ObjectId
   textReview: { type: String, required: true },
   starReview: { type: Number, required: true }
});

module.exports = mongoose.model('Review', movieReviewsSchema);
