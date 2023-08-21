import Router from 'express';
import thought from '../../controllers/thoughtController.js';
import reaction from '../../controllers/reactionController.js';

const router = Router();

/*
    /api/thoughts
*/
router.route('/').get(thought.getThoughts).post(thought.createThought);

/*
    /api/thoughts/:thoughtId
*/
router
  .route('/:thoughtId')
  .get(thought.getSingleThought)
  .put(thought.updateThought)
  .delete(thought.deleteThought);

/*
    /api/thoughts/:thoughtId/reactions
*/
router.route('/:thoughtId/reactions').post(reaction.addReaction);

/*
    /api/thoughts/:thoughtId/reactions/:reactionId
*/
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(reaction.deleteReaction);

export default router;
