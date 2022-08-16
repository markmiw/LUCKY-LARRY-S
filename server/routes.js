const router = require('express').Router();
const slots = require('./controllers/slots');
const { getUser, getLeaderboard, getCountry } = require('../database/controllers');
router.get('/slots', slots.spin);
router.get('/weightedSlots', slots.weightedSpin);
// const { getUser } = require('../database/controllers');

router.get('/test', (req, res) => {
  res.status(200).send('hello!');
});

router.get('/user', (req, res) => {
  getUser()
    .then((results) => res.send(results))
    .catch((err) => res.sendStatus(404));
});

router.get('/')

module.exports = router;
