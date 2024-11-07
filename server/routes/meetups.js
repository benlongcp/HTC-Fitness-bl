const express = require('express');
const { User, Meetups } = require('../db/index');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const meetups = await Meetups.find({});
    // console.log('MEETUPS?', meetups);
    res.status(200)
      .send(meetups);
  } catch (err) {
    console.error('error during meetup get request', err);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const meetup = req.body;

  // console.log('REQ BODY - meetup', meetup);

  await Meetups.create(meetup);

  Meetups.find({})
    .then((data) => data)
    .catch((err) => console.error(err));

  // Meetups.find({})
  //   .then((data) => console.log('MEETUPS?', data, "RESULT", res))
  //   .catch((err) => console.error(err));
});

module.exports = router;
