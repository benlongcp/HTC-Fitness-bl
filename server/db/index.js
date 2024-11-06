const mongoose = require('mongoose');

// Exercise schema
const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
});

const weightSchema = new mongoose.Schema({
  weight: Number,
  date: Date,
});

const SavedExerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
  sets: { type: Number, default: null },
  reps: { type: Number, default: null },
});

const friendsSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  nameFirst: String,
  nameLast: String,
  email: String,
});

const meetupSchema = new mongoose.Schema({
  host: String,
  meetupName: String,
  meetupDate: String,
  meetupLocation: String,
  routine: Array,
  attendees: Array,
});

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  nameFirst: String,
  nameLast: String,
  email: String,
  goal_weight: Number,
  weights: [weightSchema],
  saved_exercises: [SavedExerciseSchema],
  friends_list: [friendsSchema],
  meetups_list: [],
});

const Meetups = mongoose.model('Meetups', meetupSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Exercise, User, Meetups };
