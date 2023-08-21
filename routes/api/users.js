import Router from 'express';
import user from '../../controllers/userController.js';
import friend from '../../controllers/friendController.js';

const router = Router();

/* 
    /api/users 
*/
router.route('/').get(user.getUsers).post(user.createUser);

/* 
    /api/users/:userId 
*/
router
  .route('/:userId')
  .get(user.getSingleUser)
  .put(user.updateUser)
  .delete(user.deleteUser);

/* 
    /api/users/:userId/friends/:friendId 
*/
router
  .route('/:userId/friends/:friendId')
  .post(friend.addFriend)
  .delete(friend.deleteFriend);

export default router;
