const sequenceGenerator = require('./sequenceGenerator');
const Review = require('../models/reviews')
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  Review.find().populate().then(reviews => {
    res.status(200).json(reviews)
  }).catch(err => {
    res.status(500).json({message: 'Error retrieving reviews', error: err})
  })
})

router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId; // Get movieId from the route parameter
  
  // Find reviews associated with the given movieId
  Review.find({ movieId: movieId })
    .then(reviews => {
      if (!reviews) {
        return res.status(404).json({ message: 'Reviews not found for this movie' });
      }
      res.status(200).json(reviews);
    })
    .catch(err => {
      console.error('Error retrieving reviews:', err);
      res.status(500).json({ message: 'Error retrieving reviews', error: err });
    });
});


module.exports = router; 
