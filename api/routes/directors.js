const express = require('express');
const Director = require('../models/director');
const router = express.Router();
const { default: mongoose } = require("mongoose");
const Messages = require("../../messages/messages");


router.get('/', (req, res, next) => {
    res.json({
        message: "Directors - GET"
    });
});

router.post('/', (req, res, next) => {
    Director.find({
        name: req.body.name,
        movie: req.body.movie
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length >0) {
            return res.status(409).json({
                message: "Director is already cataloged"
            })
        }
        const newDirector = new Director({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            movie: req.body.movie
        });
        
        newDirector.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Director Saved",
                director: {
                    name: result.name,
                    movie: result.movie,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            });
        })
        .catch(err => {
            console.error(error);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: "Unable to save director with name: " + req.body.name
            }
        })
    })
});

router.get('/:directorID', (req, res, next) => {
    const directorID = req.params.directorID;

    Director.findById(directorID)
    .select("name _id")
    .populate("movie", "title director")
    .exec()
    .then(director => {
        if(!director){
            console.log(director);
            return res.status(404).json({
                message: Messages.director_not_found
            })
        }
        res.status(201).json({
            director: director
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    })
});

router.patch('/:directorID', (req, res, next) => {
    const directorID = req.params.directorID;

    res.json({
        message: "Directors - PATCH",
        id: directorID
    });
});

router.delete('/:directorID', (req, res, next) => {
    const directorID = req.params.directorID;

    Director.deleteOne({
        _id: directorID
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Director Deleted",
            request: {
                method: "GET",
                url: "http://localhost:3000/directors/" + directorID
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
});

module.exports = router;