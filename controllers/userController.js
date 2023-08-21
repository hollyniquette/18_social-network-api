import { User } from '../models/index.js';

const userController = {
  /* get all users */
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  /* get one user by id */
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        // send 204 if no user is found
        return res.status(204).json({ message: 'No user with matching ID' });
      }
      res.status(200).json({ user, message: 'User found' });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  /* create a new user */
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      const allUsers = await User.find();
      res
        .status(201)
        .json({ message: 'User created!', updatedUsers: allUsers });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* update user by id */
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
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

  /* delete user by id */
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      const allUsers = await User.find();
      if (!user) {
        res.status(204).json({ message: 'No user with matching ID' });
      }
      res.json({ message: 'User deleted!', updatedUsers: allUsers });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;
