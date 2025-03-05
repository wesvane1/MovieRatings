const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxMovieId: { type: Number, required: true },
   maxReviewId: { type: Number, required: true },
});

module.exports = mongoose.model('Sequence', sequenceSchema, 'sequence');
