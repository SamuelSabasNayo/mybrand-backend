import Router from 'express';
import commentController from '../controllers/commentController';
import auth from '../middlewares/authenticateUser';

const router = Router();

router.get('/', commentController.comment_get);

router.get('/:id', commentController.comment_getOne);

router.post('/', auth.authUser, commentController.comment_post);

router.delete('/:id', auth.authUser, commentController.comment_delete);

export default router;