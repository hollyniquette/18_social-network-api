import Router from 'express';
import thoughts from './thoughts.js';
import users from './users.js';

const router = Router();

router.use('/thoughts', thoughts);
router.use('/users', users);

export default router;
