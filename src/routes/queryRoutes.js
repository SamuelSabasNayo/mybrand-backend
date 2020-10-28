import Router from 'express';
import queryController from '../controllers/queryController';
import auth from '../middlewares/authenticateUser';

const router = Router();

router.get('/', queryController.query_get);

router.get('/:id', queryController.query_getOne);

router.post('/', auth.authUser, queryController.query_post);
// router.post('/', queryController.query_post);

router.delete('/:id', auth.authUser, queryController.query_delete);
// router.delete('/:id', queryController.query_delete);

export default router;