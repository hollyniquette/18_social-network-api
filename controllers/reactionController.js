import { Thought } from '../models/index.js';

const reactionController = {
  /* create a reaction stored in a single thought's reactions array field */
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
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

  /* delete a reaction by reactionId */
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(204).json({ message: 'No thought with matching ID' });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default reactionController;
