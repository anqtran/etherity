const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Auction = require('../../models/Auction');


// @route   GET api/auctions/test
// @desc    Tests auctions route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auctions work' }));


// @route   POST api/auctions/create
// @desc    Register user
// @access  Public
router.post('/create', (req, res) => {

	const errors = {};

	const newBid = {};

	const newAuction = new Auction({
		name: req.body.name,
		images: req.body.images,
		description: req.body.description,
		short_description: req.body.description,
		base_price: req.body.base_price,
		bid: {
			price : req.body.base_price
		}

	});


	newAuction
            .save()
            .then(auction => res.json(auction))
            .catch(err => console.log(err));



});



module.exports = router;
