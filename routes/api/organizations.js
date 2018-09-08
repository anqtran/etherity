const express = require('express');
const router = express.Router();


const Organization = require('../../models/Organization');
// @route   GET api/organizations/test
// @desc    Tests organizations route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'organizations work' }));

// @route   POST api/organizations/new
// @desc    Register organizations
// @access  Public
router.post('/new', (req, res) => {

	const errors = {};

	const newOrganization = new Organization({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		avatar: req.body.avatar,
		website: req.body.website,
		description: req.body. description,
		wallet: req.body.wallet,

	});


	newOrganization
            .save()
            .then(organization => res.json(organization))
            .catch(err => console.log(err));

});

module.exports = router;
