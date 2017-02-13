var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage })

var Tour = require('../models/Tour.js');

/* GET /tour listing. */
router.get('/', function(req, res, next) {
  Tour.find(function (err, tours) {
    if (err) return next(err);
    res.json(tours);
  });
});

/* POST /tours */
router.post('/', upload.single('file'), function(req, res, next) {
  console.log(req.file);
  let tour = req.body;
  tour.images = req.file.path;
  Tour.create(req.body, function (err, tour) {
    if (err) return next(err);
    res.json(tour);
  });
});

/* GET /tours/id */
router.get('/:id', function(req, res, next) {
  Tour.findById(req.params.id, function (err, tour) {
    if (err) return next(err);
    res.json(tour);
  });
});

/* PUT /tours/:id */
router.put('/:id', function(req, res, next) {
  Tour.findByIdAndUpdate(req.params.id, req.body, function (err, tour) {
    if (err) return next(err);
    res.json(tour);
  });
});

/* DELETE /tours/:id */
router.delete('/:id', function(req, res, next) {
  Tour.findByIdAndRemove(req.params.id, req.body, function (err, tour) {
    if (err) return next(err);
    res.json(tour);
  });
});

module.exports = router;
