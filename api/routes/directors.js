const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        message: "Directors - GET"
    });
});

router.post('/', (req, res, next) => {
    res.json({
        message: "Directors - POST"
    });
});

router.get('/:directorID', (req, res, next) => {
    const directorID = req.params.directorID;

    res.json({
        message: "Directors - GET BY ID",
        id: directorID
    });
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

    res.json({
        message: "Directors - DELETE",
        id: directorID
    });
});

module.exports = router;