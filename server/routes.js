const router = require('express').Router();
const { getTestData } = require('../database/controllers');

router.get('/test', (req, res) => {
  res.status(200).send('hello!');
});

module.exports = router;
