const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Auction = require('../../models/Auction');

// Validation
const validateAuctionInput = require('../../validation/auction');

// @route   GET api/auctions/test
// @desc    Tests auctions route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auctions work' }));

// @route   GET api/auctions
// @desc    Get auctions
// @access  Public
router.get('/', (req, res) => {
  Auction.find()
    .sort({ date: -1 })
    .populate('seller', ['name', 'avatar', 'email'])
    .populate('organization', ['name'])
    .then(auctions => res.json(auctions))
    .catch(err =>
      res.status(404).json({ noauctionsfind: 'No auctions found' })
    );
});

// @route   GET api/auctions/:id
// @desc    Get auction by id
// @access  Public
router.get('/:id', (req, res) => {
  Auction.findById(req.params.id)
    // .populate('seller', ['name', 'avatar', 'email'])
    // .populate('organization', ['name'])
    .then(auction => {
      console.log('get auction by id');
      res.json(auction);
    })
    .catch(err =>
      res.status(404).json({ noauctionfind: 'No auction found with that ID' })
    );
});

// @route   POST api/auctions/create
// @desc    Register user
// @access  Public
router.post('/create', (req, res) => {
  const errors = {};

  const newAuction = new Auction({
    seller: req.body.seller,
    name: req.body.name,
    images: req.body.images,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    basePrice: req.body.basePrice,
    organization: req.body.organization
  });

  newAuction
    .save()
    .then(auction => res.json(auction))
    .catch(err => console.log(err));
});

// @route   POST api/auctions/add
// @desc    Add Auction
// @access  Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAuctionInput(req.body);
    console.log('after validate');
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log('there is no error to add auction');
    const newAuction = new Auction({
      seller: req.user.id,
      name: req.body.name,
      organization: req.body.organization,
      images: req.body.images,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      basePrice: req.body.basePrice
    });
    console.log(newAuction);
    newAuction
      .save()
      .then(auction => res.json(auction))
      .catch(err => console.log(err));
  }
);

// @route   POST api/auctions/bid/:user_id
// @desc    new bid from user
// @access  Public
router.put(
  '/bid/:auction_id/:',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAuctionInput(req.body);
    console.log('after validate');
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log('there is no error to bid auction');

    // Get Fields
    const auctionFields = {};

    if (req.user.id) auctionFiedls.buyer = req.user.id;
    if (req.body.price) auctionFields.highestbid = req.body.price;
    auctionFields.datLastBid = new Date.now();

    Auction.findOne({ seller: req.body.id }).then(auction => {
      if (auction) {
        // Update
        Auction.findOneAndUpdate(
          { seller: req.body.id },
          { $set: auctionFields },
          { new: true }
        ).then(auction => res.json(auction));
      }
    });
  }
);

// (req, res) => {
//   const time = new Date();
//   Auction.findOneAndUpdate(
//     {buyer: req.body.buyer},
//     {highestbid: req.body.highestbid},
//     {dateLastBid: time}
//     ).then(auction => res.json(auction))
//     .catch(err => console.log(err));
// });
module.exports = router;
