const router = require('express').Router();
const { slots } = require('./controllers/slots');
const {
  getUser, getLeaderboard, getCountry, getSpecificUser, createUser, addBalance, getGlobalChat, postGlobalChat,
} = require('../database/controllers');
const roulette = require('./controllers/roulettecontrollers.js');

router.put('/slots', slots);
router.get('/roulette', roulette.checkNum);

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

router.get('/user/:username', (req, res) => {
  getSpecificUser(req.params.username)
    .then((results) => res.send(results))
    .catch((err) => res.sendStatus(404));
});

router.post('/user', (req, res) => {
  createUser(req.body)
    .then((results) => {
      if (results.length === 0) {
        res.sendStatus(201);
      } else {
        res.sendStatus(409);
      }
    })
    .catch((err) => res.sendStatus(404));
});

router.post('/user/balance', (req, res) => {
  addBalance(req.body)
    .then((results) => res.status(201).send(results))
    .catch((err) => res.sendStatus(404));
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
