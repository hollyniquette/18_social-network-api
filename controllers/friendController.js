import { User } from '../models/index.js';

const friendController = {
  /* add a new friend to a user's friend list */
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(204).json({ message: 'No user with matching ID' });
      }
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* remove a friend from a user's friend list */
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(204).json({ message: 'No user with matching ID' });
      }
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default friendController;
