const sequenceGenerator = require('./sequenceGenerator');
const Review = require('../models/reviews');
const Movie = require('../models/movies');  // Assuming you have a Movie model
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// Get all reviews
router.get('/', (req, res, next) => {
  Review.find()
    .populate()  // If needed, populate movie data or other references
    .then(reviews => {
      res.status(200).json(reviews);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving reviews', error: err });
    });
});

// Get reviews by movieId
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

router.post('/:movieId/new', async (req, res) => {
  try {
    // Step 1: Generate the new review ID
    const maxReviewId = await sequenceGenerator.nextId("reviews");

    // Step 2: Get the movieId from the URL parameters and the required fields from the request body
    const { movieId } = req.params; // Get movieId from URL param
    const { starRating, textRating, screenName } = req.body; // Get review fields from body

    // Step 3: Validate required fields
    if (!starRating || !textRating || !screenName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Step 4: Create the new review with the generated ID
    const newReview = new Review({
      id: maxReviewId, // Use the generated review ID
      movieId, // Movie ID from URL parameter (it will be a string)
      starRating, // Star rating from request body
      textRating, // Text rating from request body
      screenName, // Screen name from request body
    });

    // Step 5: Save the new review
    const savedReview = await newReview.save();

    // Step 6: Fetch the movie by movieId (as a string) using findOne instead of findById
    const updatedMovie = await Movie.findOne({ id: movieId });
    console.log("MOVIE: ", updatedMovie);

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Step 7: Initialize reviews array if it's null or undefined
    if (!updatedMovie.reviews) {
      updatedMovie.reviews = [];
    }

    // Step 8: Push the new review ID into the movie's reviews array
    updatedMovie.reviews.push(savedReview.id.toString());

    // Step 9: Save the updated movie with the new review ID in its reviews array
    await updatedMovie.save();

    // Step 10: Return the response with the saved review and updated movie
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
  // Step 1: Find the review by its ID
  Review.findOne({ id: req.params.reviewId })
    .then(review => {
      // Step 2: Update the review fields with the data from the request body
      review.starRating = req.body.starRating;
      review.textRating = req.body.textRating;
      review.screenName = req.body.screenName;

      // Step 3: Save the updated review
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
  Review.findOneAndDelete({ id: req.params.id })  // Ensure that you're using the correct identifier
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
