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
    .then(auctions => res.json(auctions))
    .catch(err =>
      res.status(404).json({ noauctionsfind: 'No auctions found' })
    );
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Auction.findById(req.params.id)
    .then(auction => res.json(auction))
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
    short_description: req.body.description,
    base_price: req.body.base_price,
    bid: {
      highestbid: req.body.base_price
    }
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
router.put('/bid/:auction_id', (req, res) => {
  Auction.findById(req.params.auction_id)
    .then(auction => {
      if (req.body.highestbid <= auction.bid.highestbid) {
        return res.json({ biderrors: 'Bid cannot be lower than current bid' });
      }
      auction.bid.highestbid = req.body.highestbid;
      auction.bid.buyer = req.body.buyer;
      auction.save().then(auction => res.json(auction));
    })
    .catch(err => console.log(err));
});
module.exports = router;
