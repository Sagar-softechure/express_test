const express = require('express');
const router = express.Router();
const userStore = require('../models/users');


// Show add-user form
router.get('/new', (req, res) => {
  res.render('form', { title: 'Add User' });
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userStore.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user); // or render a view if using templates
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid user ID or server error');
  }
});

router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = {};

  // Only add fields to updateData if they exist in the request
  if (req.body.name) updateData.name = req.body.name;
  if (req.body.email) updateData.email = req.body.email;
  if (req.body.age) updateData.age = Number(req.body.age);

  // If no fields to update, return error
  if (Object.keys(updateData).length === 0) {
    return res.status(400).send('No fields to update provided.');
  }

  try {
    const updatedUser = await userStore.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found.');
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid user ID or update failed.');
  }
});


// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userStore.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send('User not found.');
    }

    res.send(`User with ID ${userId} has been deleted.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid user ID or delete failed.');
  }
});


router.get('/', async (req, res) => {
  try{
  const getuser = await userStore.find();
  res.render('index', {
    title: 'User List',
    userdata: getuser
  });
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Handle form submission
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const user = new userStore({ name, email, age: Number(age) });
    await user.save();
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      res.status(409).send('Email already exists.');
    } else {
      res.status(500).send('Something went wrong.');
    }
  }
});

module.exports = router;
