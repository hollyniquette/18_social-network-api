import Router from 'express';
import routes from './api/index.js';

const router = Router();

router.use('/api', routes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

export default router;
