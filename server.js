const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/User');
const Poll = require('./models/Poll');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://votingsystem:arka2002@votingplatform.prmhb.mongodb.net/?retryWrites=true&w=majority&appName=votingplatform', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/register', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.send('User registered successfully');
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ userId: req.body.userId, password: req.body.password });
  if (user) {
    res.send(user);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/createPoll', async (req, res) => {
  const newPoll = new Poll(req.body);
  await newPoll.save();
  res.send('Poll created successfully');
});

app.get('/polls', async (req, res) => {
  const polls = await Poll.find();
  res.send(polls);
});

app.post('/vote', async (req, res) => {
  const { pollId, optionIndex } = req.body;
  const poll = await Poll.findOne({ pollId });
  if (poll) {
    poll.votes[optionIndex]++;
    await poll.save();
    res.send('Vote submitted successfully');
  } else {
    res.status(404).send('Poll not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});