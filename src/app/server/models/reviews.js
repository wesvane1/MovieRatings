const mongoose = require('mongoose');

const movieReviewsSchema = mongoose.Schema({
   id: { type: String, required: true },
   movieId: { type: String, ref: 'Movie', required: true }, 
   textRating: { type: String, required: true },
   starRating: { type: String, required: true },
   screenName: { type: String, required: true}
});

module.exports = mongoose.model('Review', movieReviewsSchema);
