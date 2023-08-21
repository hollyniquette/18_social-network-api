import { Thought } from '../models/index.js';

const thoughtController = {
  /* get all thoughts */
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json({ thoughts });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  /* get one thought by id */
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions');
      if (!thought) {
        // send 204 if no thought is found
        return res.status(204).json({ message: 'No thought with matching ID' });
      }
      res.status(200).json({ thought, message: 'Thought found' });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  /* create a new thought */
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const allThoughts = await Thought.find();
      res
        .status(201)
        .json({ message: 'Thought created!', updatedThoughts: allThoughts });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* update thought by id */
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(204).json({ message: 'No thought with matching ID' });
      }
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* delete thought by id */
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(204).json({ message: 'No thought with matching ID' });
      }
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default thoughtController;
