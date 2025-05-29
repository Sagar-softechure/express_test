const express = require('express');
const router = express.Router();
const userStore = require('../models/users');


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

router.get('/', async (req, res) => {
  try{
  const getuser = await userStore.find();
  res.json(getuser);
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
  // res.render('index', {
  //   title: 'User List',
  //   userdata: userStore.find()
  // });
});

// Handle form submission
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !age || !email) {
    return res.status(400).send('all fields are required');
  }
  userStore.addUser({ name,email, age: Number(age) });
  res.redirect('/users');
});

module.exports = router;
