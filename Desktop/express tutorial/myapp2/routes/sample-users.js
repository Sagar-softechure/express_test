// routes/sampleUsers.js
const express = require('express');
const router = express.Router();
const SampleUser = require('../models/SampleUser');

router.get('/', async (req, res) => {
  try {
    const users = await SampleUser.find();
    res.render('index',{userdata:users});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
