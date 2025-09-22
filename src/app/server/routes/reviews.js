const sequenceGenerator = require('./sequenceGenerator');
const Review = require('../models/reviews');
const Movie = require('../models/movies');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Review.find()
    .populate()
    .then(reviews => {
      res.status(200).json(reviews);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving reviews', error: err });
    });
});

router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;

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

router.post('/:movieId/new', async (req, res) => {
  try {
    const maxReviewId = await sequenceGenerator.nextId("reviews");

    const { movieId } = req.params;
    const { starRating, textRating, screenName } = req.body;

    if (!starRating || !textRating || !screenName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newReview = new Review({
      id: maxReviewId, 
      movieId, 
      starRating,
      textRating,
      screenName,
    });

    const savedReview = await newReview.save();

    const updatedMovie = await Movie.findOne({ id: movieId });

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (!updatedMovie.reviews) {
      updatedMovie.reviews = [];
    }

    updatedMovie.reviews.push(savedReview.id.toString());

    await updatedMovie.save();

    res.status(201).json({
      message: 'Review added successfully',
      review: savedReview,
      movie: updatedMovie
    });

  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});
router.put('/:movieId/:reviewId/edit', (req, res, next) => {
  Review.findOne({ id: req.params.reviewId })
    .then(review => {
      review.starRating = req.body.starRating;
      review.textRating = req.body.textRating;
      review.screenName = req.body.screenName;

      review.save()
        .then(result => {
          res.status(204).json({
            message: 'Review updated successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred while updating the review',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(404).json({
        message: 'Review not found.',
        error: { review: 'Review not found' }
      });
    });
});
router.delete("/:id", (req, res, next) => {
  Review.findOneAndDelete({ id: req.params.id })
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: 'Review not found',
          error: { review: 'Review not found' }
        });
      }
      res.status(200).json({
        message: 'Review deleted successfully',
        reviewId: req.params.id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred while deleting the review',
        error: error
      });
    });
});




module.exports = router;
