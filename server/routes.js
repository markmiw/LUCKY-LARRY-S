/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { slots } = require('./controllers/slots');
const { addFriend, getAllFriends } = require('./controllers/friends');
const { sendDM, getAllDMsBetween } = require('./controllers/dms');
const {
  getUser,
  getLeaderboard,
  getCountry,
  getSpecificUser,
  createUser,
  addBalance,
  getGlobalChat,
  postGlobalChat,
  updateBalanceBasedOnWinnings,
} = require('../database/controllers');
const roulette = require('./controllers/roulettecontrollers');

router.put('/slots', slots);
router.get('/roulette', roulette.checkNum);

router.get('/users/:userID/friends', getAllFriends);

router.post('/users/:userID/friends', addFriend);

router.post('/userchat/', sendDM);

router.get('/userchat/:userID/:recipientID', getAllDMsBetween);

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

router.post('/user', async (req, res) => {
  const user = await getSpecificUser(req.body.username);
  if (user.length !== 0) res.status(200).send('User exists already');
  else {
    createUser(req.body)
      .then((results) => {
        res.status(201).send(results);
      })
      .catch((err) => res.sendStatus(404));
  }
});

router.post('/user/balance', (req, res) => {
  addBalance(req.body)
    .then((results) => res.status(201).send(results))
    .catch((err) => res.sendStatus(404));
});

router.post('/user/winnings', (req, res) => {
  updateBalanceBasedOnWinnings(req.body.id, req.body.bet, req.body.winnings)
    .then((results) => res.status(201).send({ results }))
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
