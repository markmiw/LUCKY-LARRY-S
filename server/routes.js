const router = require('express').Router();
const slots = require('./controllers/slots');
const roulette = require('./controllers/roulettecontrollers.js');

router.get('/slots', slots.spin);
router.get('/weightedSlots', slots.weightedSpin);
console.log('in routes.js before roulette')
router.get('/roulette', roulette.checkNum);
const { getUser } = require('../database/controllers');

router.get('/test', (req, res) => {
  res.status(200).send('hello!');
});

router.get('/user', (req, res) => {
  getUser()
    .then((results) => res.send(results))
    .catch((err) => res.sendStatus(404));
});

module.exports = router;
