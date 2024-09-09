/* eslint-disable no-console */
const express = require('express');
const { User } = require('../db/index');

const router = express.Router();

// Get all stored users
router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error('Error finding user', err);
    });
});

// Get a single user that matches _id
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { exercise } = req.body;

  User.findByIdAndUpdate(userId, { saved_exercises: exercise })
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error('Error adding exercise to routine:', error);
      res.status(500).send('Error adding exercise to routine');
    });
});

// Endpoint to update user by id
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updates);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Goal weight updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal weight', error });
  }
});

// Endpoint to add weight/date pairs to a user's weights
router.patch('/:userId/weights', async (req, res) => {
  const { userId } = req.params;
  const { weights } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new weight/date pairs to the existing weights array
    user.weights.push(...weights);
    await user.save();

    res.json({ message: 'Weights updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating weights', error });
  }
});

router.delete('/:userId/goal-weight', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.goal_weight = 0;
    await user.save();
    res.status(200).json({ message: 'Goal weight removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting goal weight', error });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user.saved_exercises);
  } catch (error) {
    console.error('Error fetching user exercises:', error);
    res.status(500).send('Error fetching user exercises');
  }
});

// Delete user by ID
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;