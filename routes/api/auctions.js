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

	const newAuction = new Auction({
		seller: req.body.seller,
		name: req.body.name,
		images: req.body.images,
		description: req.body.description,
		short_description: req.body.description,
		base_price: req.body.base_price,
		bid: {
			highestbid : req.body.base_price
		}

	});


	newAuction
            .save()
            .then(auction => res.json(auction))
            .catch(err => console.log(err));
});

// @route   GET api/auctions/:id
// @desc    Get auction by id
// @access  Public
router.get('/:id', (req, res) => {
  Auction.findById(req.params.id)
    .then(auction => res.json(auction))
    .catch(err =>
      res.status(404).json({ noauctionfound: 'No auction found with that ID' })
    );
});


// @route   DELETE api/auctions/:id
// @desc    Delete auction
// @access  Private
router.delete(
  '/:id',
  (req, res) => {
      Auction.findById(req.params.id)
        .then(auction => {

          // Delete
          auction.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ auction: 'No auction found' }));
  }
);



// @route   POST api/auctions/bid/:user_id
// @desc    new bid from user
// @access  Public
router.put('/bid/:auction_id', (req, res) => {


	Auction.findById(req.params.auction_id).then(auction => {
		if(req.body.highestbid <= auction.bid.highestbid) {
			return res.json( {biderrors : "Bid cannot be lower than current bid"});

		}
		auction.bid.highestbid = req.body.highestbid;
		auction.bid.buyer = req.body.buyer;
		auction.save().then(auction => res.json(auction));

	})
	.catch(err => console.log(err));


});




module.exports = router;
