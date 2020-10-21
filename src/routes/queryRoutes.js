import Router from 'express';
import queryController from '../controllers/queryController';

const router = Router();

router.get('/', queryController.query_get);

router.get('/:id', queryController.query_getOne);

router.post('/', queryController.query_post);

router.delete('/:id', queryController.query_delete);

export default router;