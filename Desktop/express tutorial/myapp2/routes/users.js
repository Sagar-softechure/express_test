const express = require('express');
const router = express.Router();
const userStore = require('../models/users');


// GET form to add user
router.get('/new', (req, res) => {
  res.render('form', { title: 'Add User' });
});

router.get('/edit/:id',async(req,res)=>{
  const userId = req.params.id;
  try {
    const user = await userStore.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('form', {title:'Edit User',userData:user});
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid user or server error');
  }
});

// GET all users (homepage)
router.get('/', async (req, res) => {
  try {
    const getuser = await userStore.find();
    res.render('index', {
      title: 'User List',
      userdata: getuser,
      message: req.query.message,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new user
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const user = new userStore({ name, email, age: Number(age) });
    await user.save();
    res.redirect('/users?message=User created successfully');
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      res.status(409).send('Email already exists.');
    } else {
      res.status(500).send('Something went wrong.');
    }
  }
});

// GET a specific user
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userStore.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user); // or render a view
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid user ID or server error');
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = {};

  if (req.body.name) updateData.name = req.body.name;
  if (req.body.email) updateData.email = req.body.email;
  if (req.body.age) updateData.age = Number(req.body.age);

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

    res.redirect('/users?message=User updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid user ID or update failed.');
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  // res.send('asd');
  const userId = req.params.id;

  try {
    const deletedUser = await userStore.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send('User not found.');
    }

    res.redirect('/users?message=User delete successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid user ID or delete failed.');
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});


module.exports = router;
