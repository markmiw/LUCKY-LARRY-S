const express = require('express');
const slots = require('./controllers/slots');

const router = express.Router();

router.get('/slots', slots.spin);
router.get('/weightedSlots', slots.weightedSpin);

module.exports = router;
