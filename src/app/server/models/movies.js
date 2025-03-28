
const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
   id: { type: String, required: true },
   title: { type: String, required: true },
   description: { type: String, required: true }, 
   reviews: [{ type: String }]
});

module.exports = mongoose.model('Movie', movieSchema);
