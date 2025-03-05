const sequenceGenerator = require('./sequenceGenerator');
const Movie = require('../models/movies')
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  Movie.find().populate().then(movies => {
    res.status(200).json(movies)
  }).catch(err => {
    res.status(500).json({message: 'Error retrieving movies', error: err})
  })
})

router.post('/', async (req, res, next) => {
  try {
    const maxMovieId = await sequenceGenerator.nextId("movies");

    const movie = new Movie({
      id: maxMovieId,
      title: req.body.title,
      description: req.body.description,
      reviews: req.body.reviews
    });

    const createdMovie = await movie.save();
    res.status(201).json({
      message: 'Movie added successfully',
      movie: createdMovie
    });

  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.put('/:id', (req, res, next) => {
  Movie.findOne({ id: req.params.id })
    .then(movie => {
      movie.title = req.body.title
      movie.description = req.body.description
      movie.reviews = req.body.reviews

      Movie.updateOne({ id: req.params.id }, movie)
        .then(result => {
          res.status(204).json({
            message: 'Movie updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Movie not found.',
        error: { movie: 'Movie not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Movie.findOne({ id: req.params.id })
    .then(movie => {
      Movie.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Movie deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Movie not found.',
        error: { movie: 'Movie not found'}
      });
    });
});


module.exports = router; 
