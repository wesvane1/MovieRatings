const Sequence = require('../models/sequence');

let maxMovieId;
let maxReviewId;
let sequenceId = null;

async function initializeSequence() {
  try {
    const sequence = await Sequence.findOne();

    if (!sequence) {
      throw new Error('Sequence not found');
    }

    sequenceId = sequence._id;
    maxMovieId = sequence.maxMovieId;
    maxReviewId = sequence.maxReviewId;
  } catch (err) {
    console.error('Error initializing sequence:', err);
  }
}

initializeSequence();

async function nextId(collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'movies':
      maxMovieId++;
      updateObject = { maxMovieId: maxMovieId };
      nextId = maxMovieId;
      break;
    case 'reviews':
      maxReviewId++;
      updateObject = { maxReviewId: maxReviewId };
      nextId = maxReviewId;
      break;
    default:
      return -1;
  }

  try {
    await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
    return nextId;
  } catch (err) {
    console.error("Error updating nextId:", err);
    return null;
  }
}

module.exports = {
  initializeSequence,
  nextId
};
