const router = require('express').Router();

const { slots } = require('./controllers/slots');
<<<<<<< HEAD
const {
  getUser, getLeaderboard, getCountry, getGlobalChat, postGlobalChat,
} = require('../database/controllers');
=======
const roulette = require('./controllers/roulettecontrollers.js');
>>>>>>> 1964d9395a0110862d0def478b049cd2432ca9f8

router.get('/slots', slots.spin);
router.put('/slots', slots);
router.get('/weightedSlots', slots.weightedSpin);
router.get('/roulette', roulette.checkNum);
const { getUser, getLeaderboard, getCountry } = require('../database/controllers');

router.get('/test', (req, res) => {
  res.status(200).send('hello!');
});

router.get('/user', (req, res) => {
  getUser()
    .then((results) => res.send(results))
    .catch(() => res.sendStatus(404));
});

router.get('/leaderboard', (req, res) => {
  getLeaderboard()
    .then((results) => res.send(results))
    .catch(() => res.sendStatus(404));
});

router.get('/country/:countryid', (req, res) => {
  getCountry(req.params.countryid)
    .then((results) => res.send(results))
    .catch(() => res.sendStatus(404));
});

router.get('/globalchat', (req, res) => {
  getGlobalChat(req.query.loginTime)
    .then((results) => res.send(results))
    .catch(() => res.sendStatus(404));
});

router.post('/globalchat', (req, res) => {
  const { username, message, country } = req.body;
  postGlobalChat(username, message, country).then((results) => res.send(results))
  .catch(() => res.sendStatus(404));
});

module.exports = router;
