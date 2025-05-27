const express = require('express');
const router = express.Router();
const userStore = require('../models/userStore');


// Show add-user form
router.get('/new', (req, res) => {
  res.render('form', { title: 'Add User' });
});
router.get('/:id', (req, res) => {
  var user = userStore.singleUser(req.params.id);
  console.log(user);
  res.render('single', {
    userdata: user,
  });
});

router.get('/', (req, res) => {
  res.render('index', {
    title: 'User List',
    userdata: userStore.getAll()
  });
});

// Handle form submission
router.post('/', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).send('Name and age required');
  }
  userStore.addUser({ name, age: Number(age) });
  res.redirect('/users');
});

module.exports = router;
