import 'dotenv/config';
import db from '../db/connection.js';
import { User, Thought } from '../models/index.js';

db.once('open', async () => {
  // delete database contents
  await User.deleteMany({});
  await Thought.deleteMany({});

  const user1 = await User.create({
    username: 'testUser1',
    email: 'test1@gmail.com',
    thoughts: [],
    friends: [],
  });

  const user2 = await User.create({
    username: 'testUser2',
    email: 'test2@gmail.com',
    thoughts: [],
    friends: [],
  });

  const thought1 = await Thought.create({
    thoughtText: 'This is a thought',
    username: 'testUser1',
    userId: user1._id,
  });

  const thought2 = await Thought.create({
    thoughtText: 'This is a thought',
    username: 'testUser2',
    userId: user2._id,
  });

  await User.findOneAndUpdate(
    { _id: user1._id },
    { $push: { thoughts: thought1._id } },
    { new: true }
  );

  await User.findOneAndUpdate(
    { _id: user2._id },
    { $push: { thoughts: thought2._id, friends: user1._id } },
    { new: true }
  );

  console.log('Seed successful!');
  process.exit(0);
});
