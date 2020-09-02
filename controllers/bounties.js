// create router
const router = require('express').Router();

// import models
const db = require('../models');

// GET /bounties
router.get('/', (req, res) => {
	// get all the bounties
	db.Bounty.find()
		.then(foundBounties => {
			console.log(foundBounties);
			res.send(foundBounties);
		})
		.catch(err => {
			console.log(err);
			// 503 - service unavailable
			res.status(503).send({ message: 'Database asleep?' });
		});
	// res.send('You have reached the GET /bounties route.');
});

// GET /bounties/:id
router.get('/:id', (req, res) => {
	db.Bounty.findById(req.params.id)
		.then(foundBounty => {
			if (foundBounty) {
				res.send(foundBounty);
			} else {
				res.status(404).send({ message: 'Resource not located.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Service Unavailable' });
		});
	// res.send('You have reached the GET /bounties/:id route.');
});

// POST /bounties
router.post('/', (req, res) => {
	db.Bounty.create(req.body)
		.then(createdBounty => {
			res.status(201).send(createdBounty);
		})
		.catch(err => {
			console.log('Error while creating new bounty', err);
			if (err.name === 'Validation Error') {
				res.status(406).send({ message: 'Validation Error' });
			} else {
				res.status(503).send({ message: 'Database or server error!' });
			}
		});
	// res.send('You have reached the POST /bounties route.');
});

// PUT /bounties/:id
router.put('/:id', (req, res) => {
	db.Bounty.findOneAndUpdate(
		{
			_id: req.params.id,
		},
		req.body,
		{
			new: true,
		}
	)
		.then(updatedBounty => {
			res.send(updatedBounty);
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server Error' });
		});
	// res.send('You have reached the PUT /bounties/:id route.');
});

// DELETE /bounties
router.delete('/', (req, res) => {
	db.Bounty.deleteMany()
		.then(() => {
			res.status(204).send({ message: 'They are all purged!!!' });
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server Error' });
		});
});

// DELETE /bounties/:id
router.delete('/:id', (req, res) => {
	db.Bounty.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).send();
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server Error' });
		});
	// res.send('You have reached the DELETE /bounties/:id route.');
});

// export these routes so they can be used  in index.js
module.exports = router;
