const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = router;
