const router = require('express').Router();
const { slots } = require('./controllers/slots');
const { getUser, getSpecificUser, addUser, addBalance } = require('../database/controllers');

router.put('/slots', slots);

router.get('/test', (req, res) => {
  res.status(200).send('hello!');
});

router.get('/user', (req, res) => {
  getUser()
    .then((results) => res.send(results))
    .catch((err) => res.sendStatus(404));
});

router.get('/user/:username', (req, res) => {
  getSpecificUser(req.params.username)
    .then((results) => res.send(results))
    .catch((err) => res.sendStatus(404));
});

router.post('/user', (req, res) => {
  addUser(req.body)
    .then((results) => res.sendStatus(201))
    .catch((err) => res.sendStatus(404));
});

router.post('/user/balance', (req, res) => {
  addBalance(req.body)
    .then((results) => res.status(201).send(results))
    .catch((err) => res.sendStatus(404));
});

module.exports = router;
