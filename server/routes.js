const router = require('express').Router();
const slots = require('./controllers/slots');

router.get('/slots', slots.spin);
router.get('/weightedSlots', slots.weightedSpin);

router.get('/test', (req, res) => {
  res.status(200).send('hello!');
});

module.exports = router;
