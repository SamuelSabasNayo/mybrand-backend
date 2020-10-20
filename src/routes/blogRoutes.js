import Router from 'express';
import blogController from '../controllers/blogControlller';
import auth from '../middlewares/authenticateUser';

const router = Router();

router.get('/', blogController.blog_get);

router.get('/:id', blogController.blog_getOne);

router.post('/', auth.authUser, blogController.blog_post);

router.put('/:id', auth.authUser, blogController.blog_update);

router.delete('/:id', auth.authUser, blogController.blog_delete);

export default router;