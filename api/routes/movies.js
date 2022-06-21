const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', (req, res, next) => {

    Movie.find()
    .then(result => {
        console.log(result.map(movies));
        res.status(200).json({
            movie: {
                title: result.title,
                director: result.director,
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});

router.post('/', (req, res, next) => {
    const newMovie = new Movie({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        director: req.body.director,
    });

    // write to the db
    newMovie.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Movie Saved",
                movie: {
                    title: result.title,
                    director: result.director,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
});

router.get('/:movieID', (req, res, next) => {
    const movieID = req.params.movieID;
    Movie.findOne({
        _id: movieID
    }).then(result => {
        res.status(200).json({
            movie: {
                title: result.title,
                director: result.director,
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});

router.patch('/:movieID', (req, res, next) => {
    const movieID = req.params.movieID;

    const updatedMovie = {
        title: req.body.title,
        director: req.body.director,
    };

    Movie.updateOne({
        _id: movieID
    }, {
        $set: updatedMovie
    }).then(result => {
        console.log(updatedMovie);
        res.status(200).json({
            message: "Movie Updated",
            movie: {
                title: updatedMovie.title,
                director: updatedMovie.director,
                id: movieID
            },
            metadata: {
                acknowledged: result.acknowledged,
                modifiedCount: result.modifiedCount,
                upsertedID: result.upsertedID,
                upsertedCount: result.upsertedCount,
                matchedCount: result.matchedCount,
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});


router.delete('/:movieID', (req, res, next) => {
    const movieID = req.params.movieID;

    Movie.deleteOne({
        _id: movieID
        })
        .then(result => {
            res.status(200).json({
                message: "Movie Deleted",
                metadata: {
                    host: req.hostname,
                    method: req.method
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
});

module.exports = router;